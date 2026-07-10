import { useRef, useState, useEffect } from 'react';
import Matter from 'matter-js';
import './FallingText.css';

const EMPTY_ARRAY = Object.freeze([]);

const FallingText = ({
  className = '',
  text = '',
  highlightWords = EMPTY_ARRAY,
  highlightClass = 'highlighted',
  trigger = 'auto',
  backgroundColor = 'transparent',
  wireframes = false,
  gravity = 1,
  mouseConstraintStiffness = 0.2,
  fontSize = '1rem'
}) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const isPhysicsActiveRef = useRef(false);

  const [effectStarted, setEffectStarted] = useState(false);

  // 1. Initialize HTML content
  useEffect(() => {
    if (!textRef.current) return;
    const words = text.trim().split(/\s+/);
    const newHTML = words
      .map(word => {
        const isHighlighted = highlightWords.some(hw => word.startsWith(hw));
        return `<span class="word ${isHighlighted ? highlightClass : ''}">${word}</span>`;
      })
      .join(' ');
    textRef.current.innerHTML = newHTML;
  }, [text, highlightWords, highlightClass]);

  // 2. Continuous Intersection Observer
  useEffect(() => {
    if (trigger === 'auto') {
      setEffectStarted(true);
      return;
    }
    if (trigger === 'scroll' && containerRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setEffectStarted(true);
          } else {
            setEffectStarted(false);
          }
        },
        { root: null, rootMargin: '0px', threshold: 0.25 }
      );
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, [trigger]);

  // 3. Physics Engine Setup
  useEffect(() => {
    if (!effectStarted) return;
    
    // Prevent duplicate initializations
    if (isPhysicsActiveRef.current) return;
    isPhysicsActiveRef.current = true;

    let engine;
    let render;
    let runner;
    let animationFrameId;
    let initFrameId;

    const { Engine, Render, World, Bodies, Runner, Mouse, MouseConstraint } = Matter;

    const initPhysics = () => {
      if (!containerRef.current || !textRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const width = containerRect.width;
      const height = containerRect.height;
      
      // Wait until layout is fully ready
      if (width <= 0 || height <= 0) {
        initFrameId = requestAnimationFrame(initPhysics);
        return;
      }

      engine = Engine.create();
      engine.world.gravity.y = gravity;

      render = Render.create({
        element: canvasContainerRef.current,
        engine,
        options: {
          width,
          height,
          background: backgroundColor,
          wireframes
        }
      });

      const boundaryOptions = {
        isStatic: true,
        render: { fillStyle: 'transparent' }
      };

      // Thick boundaries to prevent physics tunneling
      const floor = Bodies.rectangle(width / 2, height + 500, width * 2, 1000, boundaryOptions);
      const leftWall = Bodies.rectangle(-500, height / 2, 1000, height * 2, boundaryOptions);
      const rightWall = Bodies.rectangle(width + 500, height / 2, 1000, height * 2, boundaryOptions);
      const ceiling = Bodies.rectangle(width / 2, -500, width * 2, 1000, boundaryOptions);

      const wordSpans = textRef.current.querySelectorAll('.word');
      
      // Reset inline styles before measurement
      wordSpans.forEach(elem => {
        elem.style.position = '';
        elem.style.left = '';
        elem.style.top = '';
        elem.style.transform = '';
      });

      const wordBodies = [...wordSpans].map(elem => {
        const rect = elem.getBoundingClientRect();
        
        // Ensure words have dimensions
        if (rect.width === 0 || rect.height === 0) return null;

        const x = rect.left - containerRect.left + rect.width / 2;
        const y = rect.top - containerRect.top + rect.height / 2;

        const body = Bodies.rectangle(x, y, rect.width, rect.height, {
          render: { fillStyle: 'transparent' },
          restitution: 0.5,
          frictionAir: 0.02,
          friction: 0.2
        });

        Matter.Body.setVelocity(body, {
          x: (Math.random() - 0.5) * 0.5,
          y: 0
        });
        Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.015);
        return { elem, body };
      }).filter(Boolean);

      // If dimensions failed, retry next frame
      if (wordBodies.length === 0) {
        Engine.clear(engine);
        initFrameId = requestAnimationFrame(initPhysics);
        return;
      }

      // Physics bodies successfully created, now detach from DOM layout
      wordBodies.forEach(({ elem, body }) => {
        elem.style.position = 'absolute';
        elem.style.left = `${body.position.x}px`;
        elem.style.top = `${body.position.y}px`;
        elem.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`;
      });

      const mouse = Mouse.create(containerRef.current);
      const mouseConstraint = MouseConstraint.create(engine, {
        mouse,
        constraint: {
          stiffness: mouseConstraintStiffness,
          render: { visible: false }
        }
      });
      render.mouse = mouse;

      World.add(engine.world, [floor, leftWall, rightWall, ceiling, mouseConstraint, ...wordBodies.map(wb => wb.body)]);

      runner = Runner.create();
      Runner.run(runner, engine);
      Render.run(render);

      const updateLoop = () => {
        wordBodies.forEach(({ body, elem }) => {
          const { x, y } = body.position;
          elem.style.left = `${x}px`;
          elem.style.top = `${y}px`;
          elem.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`;
        });
        
        // DO NOT CALL Matter.Engine.update(engine) here!
        // Runner.run(runner, engine) already handles updates.
        
        animationFrameId = requestAnimationFrame(updateLoop);
      };
      
      animationFrameId = requestAnimationFrame(updateLoop);
    };

    // Delay initialization until layout paints
    initFrameId = requestAnimationFrame(initPhysics);

    return () => {
      // 4. Safe Teardown & Reset
      if (initFrameId) cancelAnimationFrame(initFrameId);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      
      if (render) Render.stop(render);
      if (runner) Runner.stop(runner);
      
      if (render && render.canvas && canvasContainerRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        canvasContainerRef.current.removeChild(render.canvas);
      }
      
      if (engine) {
        World.clear(engine.world);
        Engine.clear(engine);
      }

      // Reset words to static inline layout
      if (textRef.current) {
        const spans = textRef.current.querySelectorAll('.word');
        spans.forEach(elem => {
          elem.style.position = '';
          elem.style.left = '';
          elem.style.top = '';
          elem.style.transform = '';
        });
      }
      
      isPhysicsActiveRef.current = false;
    };
  }, [effectStarted, gravity, wireframes, backgroundColor, mouseConstraintStiffness]);

  const handleTrigger = () => {
    if (!effectStarted && (trigger === 'click' || trigger === 'hover')) {
      setEffectStarted(true);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`falling-text-container ${className}`}
      onClick={trigger === 'click' ? handleTrigger : undefined}
      onMouseEnter={trigger === 'hover' ? handleTrigger : undefined}
    >
      <div
        ref={textRef}
        className="falling-text-target"
        style={{
          fontSize: fontSize,
          lineHeight: 1.4
        }}
      />
      <div ref={canvasContainerRef} className="falling-text-canvas" />
    </div>
  );
};

export default FallingText;

/**
 * Device Detection & Performance Tiers
 * Helps optimize rendering quality based on device capabilities
 */

export const detectDevice = () => {
  if (typeof window === 'undefined') {
    return {
      isMobile: false,
      isTablet: false,
      isDesktop: true,
      isLowEnd: false,
      isHighEnd: false,
      devicePixelRatio: 1,
    };
  }

  const ua = navigator.userAgent.toLowerCase();
  const isMobile = /iphone|android|ipad|tablet|mobile/.test(ua);
  const isTablet = /ipad|android/.test(ua) && !/mobile/.test(ua);
  const isDesktop = !isMobile && !isTablet;

  // Detect performance tier based on hardware
  const isLowEnd =
    !navigator.hardwareConcurrency ||
    navigator.hardwareConcurrency <= 2 ||
    !navigator.deviceMemory ||
    navigator.deviceMemory <= 2;

  const isHighEnd =
    navigator.hardwareConcurrency >= 4 &&
    navigator.deviceMemory >= 8 &&
    navigator.maxTouchPoints === 0; // Not a touch device

  return {
    isMobile,
    isTablet,
    isDesktop,
    isLowEnd,
    isHighEnd,
    devicePixelRatio: Math.min(window.devicePixelRatio, 2),
  };
};

/**
 * Get rendering tier for Three.js environment
 * Returns particle counts and quality settings
 */
export const getRenderingTier = () => {
  const device = detectDevice();

  if (device.isLowEnd || device.isMobile) {
    return {
      starCount: 3000,
      sparkleCount: [200, 100, 75],
      particleQuality: 0.5,
      enableSSAA: false,
      name: 'low',
    };
  }

  if (device.isTablet || device.isDesktop) {
    return {
      starCount: 6000,
      sparkleCount: [400, 200, 150],
      particleQuality: 1,
      enableSSAA: true,
      name: 'medium',
    };
  }

  if (device.isHighEnd) {
    return {
      starCount: 8000,
      sparkleCount: [500, 250, 180],
      particleQuality: 1.2,
      enableSSAA: true,
      name: 'high',
    };
  }

  // Default to medium
  return {
    starCount: 6000,
    sparkleCount: [400, 200, 150],
    particleQuality: 1,
    enableSSAA: true,
    name: 'medium',
  };
};

/**
 * Check if device prefers reduced motion
 */
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Check if device is in dark mode (always true for this portfolio)
 */
export const prefersDarkMode = () => {
  if (typeof window === 'undefined') return true;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

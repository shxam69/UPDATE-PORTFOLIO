import { track } from '@vercel/analytics';

/**
 * Centralized utility for anonymous visitor tracking.
 * 
 * IMPORTANT PRIVACY RULES:
 * - Do NOT send PII (Personally Identifiable Information).
 * - Do NOT send raw text input.
 * - Do NOT send IP addresses, emails, or names.
 * - Stick to predefined event strings and basic categorical data.
 */
export const trackEvent = (eventName, properties = {}) => {
  try {
    track(eventName, properties);
  } catch (error) {
    // Fail silently in development or if analytics is blocked
  }
};

// Design tokens for GymControl
// Dark theme color palette and design system

export const colors = {
  // Primary colors
  background: '#0b0f14',
  surface: '#0f1720',
  surfaceHover: '#1a2332',
  primary: '#7c5cff',
  primaryHover: '#6b4ce6',
  secondary: '#00b894',
  secondaryHover: '#00a085',
  
  // Text colors
  textPrimary: '#e6eef8',
  textSecondary: '#98a0b3',
  textMuted: '#6b7584',
  
  // Status colors
  success: '#00b894',
  warning: '#fdcb6e',
  error: '#e74c3c',
  info: '#74b9ff',
  
  // Border and divider
  border: '#2d3748',
  borderLight: '#4a5568',
  
  // Accent colors
  accent: '#ff6b9d',
  accentSecondary: '#feca57',
} as const;

export const spacing = {
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  '2xl': '3rem',   // 48px
  '3xl': '4rem',   // 64px
} as const;

export const radii = {
  sm: '0.125rem',  // 2px
  md: '0.375rem',  // 6px
  lg: '0.5rem',    // 8px
  xl: '0.75rem',   // 12px
  '2xl': '1rem',   // 16px
  full: '9999px',
} as const;

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
} as const;

// Animation durations
export const animations = {
  fast: '150ms',
  normal: '300ms',
  slow: '500ms',
} as const;
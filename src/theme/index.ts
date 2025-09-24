// Color Palette
const COLORS = {
  // Primary colors
  PRIMARY: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
  },

  // Secondary colors (warm/cat-themed)
  SECONDARY: {
    50: '#fef7ed',
    100: '#fdedd3',
    200: '#fbd9a5',
    300: '#f8c06d',
    400: '#f5a32f',
    500: '#f18c0e',
    600: '#e2750a',
    700: '#c25e0b',
    800: '#9a4a0f',
    900: '#7c3a0f',
  },

  // Neutral colors
  NEUTRAL: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },

  // Semantic colors
  SUCCESS: {
    50: '#f0fdf4',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
  },

  WARNING: {
    50: '#fffbeb',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
  },

  ERROR: {
    50: '#fef2f2',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
  },

  // Common colors
  WHITE: '#ffffff',
  BLACK: '#000000',
  TRANSPARENT: 'transparent',
} as const;

// Theme object
export const THEME = {
  colors: {
    // Background colors
    background: {
      primary: COLORS.WHITE,
      secondary: COLORS.NEUTRAL[50],
      tertiary: COLORS.NEUTRAL[100],
    },

    // Text colors
    text: {
      primary: COLORS.BLACK,
      secondary: COLORS.NEUTRAL[600],
      tertiary: COLORS.NEUTRAL[500],
      inverse: COLORS.WHITE,
    },

    // Brand colors
    brand: {
      primary: COLORS.PRIMARY[500],
      secondary: COLORS.SECONDARY[500],
      accent: COLORS.SECONDARY[400],
    },

    // Status colors
    status: {
      success: COLORS.SUCCESS[500],
      warning: COLORS.WARNING[500],
      error: COLORS.ERROR[500],
    },

    // Border colors
    border: {
      light: COLORS.NEUTRAL[200],
      medium: COLORS.NEUTRAL[300],
      dark: COLORS.NEUTRAL[400],
    },

    // Overlay colors
    overlay: {
      light: 'rgba(255, 255, 255, 0.95)',
      medium: 'rgba(0, 0, 0, 0.5)',
      dark: 'rgba(0, 0, 0, 0.8)',
    },
  },

  // Typography
  typography: {
    fontFamily: {
      regular: 'System',
      medium: 'System',
      bold: 'System',
    },
  },

  // Shadows
  shadows: {
    card: {
      shadowColor: COLORS.BLACK,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    cardLarge: {
      shadowColor: COLORS.BLACK,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.5,
      shadowRadius: 15,
      elevation: 8,
    },
  },
} as const;

// Export individual color palettes for convenience
export { COLORS };

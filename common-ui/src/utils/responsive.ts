/**
 * Responsive Utility Functions
 * 반응형 디자인을 위한 유틸리티 함수
 */

/**
 * Breakpoint values in pixels
 */
export const breakpoints = {
  xs: 320,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export type Breakpoint = keyof typeof breakpoints;

/**
 * Generate media query string for min-width
 * @param breakpoint - Breakpoint key
 * @returns Media query string
 * 
 * @example
 * const styles = {
 *   [mediaQuery('md')]: {
 *     fontSize: '1.5rem'
 *   }
 * }
 */
export const mediaQuery = (breakpoint: Breakpoint): string => {
  return `@media (min-width: ${breakpoints[breakpoint]}px)`;
};

/**
 * Generate media query string for max-width
 * @param breakpoint - Breakpoint key
 * @returns Media query string
 * 
 * @example
 * const styles = {
 *   [mediaQueryMax('md')]: {
 *     fontSize: '0.875rem'
 *   }
 * }
 */
export const mediaQueryMax = (breakpoint: Breakpoint): string => {
  return `@media (max-width: ${breakpoints[breakpoint] - 1}px)`;
};

/**
 * Generate media query string for range
 * @param minBreakpoint - Minimum breakpoint key
 * @param maxBreakpoint - Maximum breakpoint key
 * @returns Media query string
 * 
 * @example
 * const styles = {
 *   [mediaQueryBetween('sm', 'lg')]: {
 *     fontSize: '1rem'
 *   }
 * }
 */
export const mediaQueryBetween = (
  minBreakpoint: Breakpoint,
  maxBreakpoint: Breakpoint
): string => {
  return `@media (min-width: ${breakpoints[minBreakpoint]}px) and (max-width: ${breakpoints[maxBreakpoint] - 1}px)`;
};

/**
 * Check if current viewport matches breakpoint
 * @param breakpoint - Breakpoint key
 * @returns Boolean indicating if viewport matches
 * 
 * @example
 * if (isBreakpoint('md')) {
 *   console.log('Tablet or larger');
 * }
 */
export const isBreakpoint = (breakpoint: Breakpoint): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= breakpoints[breakpoint];
};

/**
 * Check if current viewport is mobile
 * @returns Boolean indicating if viewport is mobile
 */
export const isMobile = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < breakpoints.md;
};

/**
 * Check if current viewport is tablet
 * @returns Boolean indicating if viewport is tablet
 */
export const isTablet = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= breakpoints.md && window.innerWidth < breakpoints.lg;
};

/**
 * Check if current viewport is desktop
 * @returns Boolean indicating if viewport is desktop
 */
export const isDesktop = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= breakpoints.lg;
};

/**
 * Get current breakpoint name
 * @returns Current breakpoint key
 * 
 * @example
 * const currentBreakpoint = getCurrentBreakpoint();
 * console.log(currentBreakpoint); // 'md'
 */
export const getCurrentBreakpoint = (): Breakpoint => {
  if (typeof window === 'undefined') return 'xs';
  
  const width = window.innerWidth;
  
  if (width >= breakpoints['2xl']) return '2xl';
  if (width >= breakpoints.xl) return 'xl';
  if (width >= breakpoints.lg) return 'lg';
  if (width >= breakpoints.md) return 'md';
  if (width >= breakpoints.sm) return 'sm';
  return 'xs';
};

/**
 * Responsive value selector
 * Returns appropriate value based on current breakpoint
 * 
 * @param values - Object with breakpoint keys and values
 * @returns Value for current breakpoint
 * 
 * @example
 * const fontSize = getResponsiveValue({
 *   xs: '0.875rem',
 *   md: '1rem',
 *   lg: '1.125rem'
 * });
 */
export const getResponsiveValue = <T>(
  values: Partial<Record<Breakpoint, T>>
): T | undefined => {
  if (typeof window === 'undefined') return values.xs;
  
  const currentBp = getCurrentBreakpoint();
  const orderedBreakpoints: Breakpoint[] = ['2xl', 'xl', 'lg', 'md', 'sm', 'xs'];
  
  // Find the first matching breakpoint value at or below current breakpoint
  const currentIndex = orderedBreakpoints.indexOf(currentBp);
  for (let i = currentIndex; i < orderedBreakpoints.length; i++) {
    const bp = orderedBreakpoints[i];
    if (values[bp] !== undefined) {
      return values[bp];
    }
  }
  
  return undefined;
};

/**
 * Create responsive CSS string
 * @param property - CSS property name
 * @param values - Object with breakpoint keys and values
 * @returns CSS string with media queries
 * 
 * @example
 * const css = responsiveCSS('font-size', {
 *   xs: '0.875rem',
 *   md: '1rem',
 *   lg: '1.125rem'
 * });
 */
export const responsiveCSS = (
  property: string,
  values: Partial<Record<Breakpoint, string | number>>
): string => {
  let css = '';
  
  Object.entries(values).forEach(([bp, value]) => {
    if (bp === 'xs') {
      css += `${property}: ${value};\n`;
    } else {
      css += `${mediaQuery(bp as Breakpoint)} {\n  ${property}: ${value};\n}\n`;
    }
  });
  
  return css;
};

/**
 * Touch-friendly minimum size (44x44px for mobile)
 */
export const TOUCH_TARGET_MIN_SIZE = 44;

/**
 * Get touch-friendly size
 * @param size - Desired size in pixels
 * @returns Size adjusted for touch targets on mobile
 * 
 * @example
 * const buttonHeight = getTouchFriendlySize(40); // Returns 44 on mobile
 */
export const getTouchFriendlySize = (size: number): number => {
  if (isMobile() && size < TOUCH_TARGET_MIN_SIZE) {
    return TOUCH_TARGET_MIN_SIZE;
  }
  return size;
};

/**
 * Clamp value between min and max based on viewport
 * @param min - Minimum value
 * @param preferred - Preferred value (viewport-based)
 * @param max - Maximum value
 * @returns Clamped CSS clamp() string
 * 
 * @example
 * const fontSize = clamp('1rem', '2vw', '2rem');
 * // Returns: 'clamp(1rem, 2vw, 2rem)'
 */
export const clamp = (
  min: string,
  preferred: string,
  max: string
): string => {
  return `clamp(${min}, ${preferred}, ${max})`;
};

/**
 * Convert px to rem
 * @param px - Pixel value
 * @param base - Base font size (default: 16)
 * @returns rem value
 * 
 * @example
 * const remValue = pxToRem(24); // Returns '1.5rem'
 */
export const pxToRem = (px: number, base: number = 16): string => {
  return `${px / base}rem`;
};

/**
 * Convert rem to px
 * @param rem - Rem value
 * @param base - Base font size (default: 16)
 * @returns Pixel value
 * 
 * @example
 * const pxValue = remToPx(1.5); // Returns 24
 */
export const remToPx = (rem: number, base: number = 16): number => {
  return rem * base;
};

/**
 * Viewport width unit
 * @param value - Percentage of viewport width
 * @returns vw string
 * 
 * @example
 * const width = vw(50); // Returns '50vw'
 */
export const vw = (value: number): string => {
  return `${value}vw`;
};

/**
 * Viewport height unit
 * @param value - Percentage of viewport height
 * @returns vh string
 * 
 * @example
 * const height = vh(100); // Returns '100vh'
 */
export const vh = (value: number): string => {
  return `${value}vh`;
};

/**
 * Get container max width for breakpoint
 * @param breakpoint - Breakpoint key
 * @returns Max width in pixels
 * 
 * @example
 * const maxWidth = getContainerMaxWidth('lg'); // Returns 1024
 */
export const getContainerMaxWidth = (breakpoint: Breakpoint): number => {
  return breakpoints[breakpoint];
};

/**
 * Responsive spacing helper
 * @param mobile - Mobile spacing value
 * @param desktop - Desktop spacing value
 * @returns Object with responsive spacing
 * 
 * @example
 * const padding = responsiveSpacing('1rem', '2rem');
 * // Returns: { padding: '1rem', '@media (min-width: 1024px)': { padding: '2rem' } }
 */
export const responsiveSpacing = (
  mobile: string,
  desktop: string
): Record<string, any> => {
  return {
    [mediaQueryMax('lg')]: mobile,
    [mediaQuery('lg')]: desktop,
  };
};

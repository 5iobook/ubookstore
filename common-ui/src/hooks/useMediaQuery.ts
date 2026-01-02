import { useState, useEffect } from 'react';
import { breakpoints } from '../utils/responsive';
import type { Breakpoint } from '../utils/responsive';

/**
 * Media Query Result Interface
 */
export interface MediaQueryResult {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLargeDesktop: boolean;
  currentBreakpoint: Breakpoint;
  width: number;
  height: number;
}

/**
 * useMediaQuery Hook
 * Detects responsive breakpoints and provides device type flags
 * 
 * @returns Media query result with device type flags
 * 
 * @example
 * const { isMobile, isTablet, isDesktop } = useMediaQuery();
 * 
 * return (
 *   <div>
 *     {isMobile && <MobileNav />}
 *     {isDesktop && <DesktopNav />}
 *   </div>
 * );
 */
export const useMediaQuery = (): MediaQueryResult => {
  const [mediaQuery, setMediaQuery] = useState<MediaQueryResult>(() => {
    if (typeof window === 'undefined') {
      return {
        isMobile: false,
        isTablet: false,
        isDesktop: true,
        isLargeDesktop: false,
        currentBreakpoint: 'lg' as Breakpoint,
        width: 1024,
        height: 768,
      };
    }

    return getMediaQueryResult();
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Update media query state
    const handleResize = () => {
      setMediaQuery(getMediaQueryResult());
    };

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Initial call
    handleResize();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return mediaQuery;
};

/**
 * Get current media query result
 * @returns Media query result object
 */
const getMediaQueryResult = (): MediaQueryResult => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  // Determine device type
  const isMobile = width < breakpoints.md;
  const isTablet = width >= breakpoints.md && width < breakpoints.lg;
  const isDesktop = width >= breakpoints.lg;
  const isLargeDesktop = width >= breakpoints.xl;

  // Determine current breakpoint
  let currentBreakpoint: Breakpoint = 'xs';
  if (width >= breakpoints['2xl']) {
    currentBreakpoint = '2xl';
  } else if (width >= breakpoints.xl) {
    currentBreakpoint = 'xl';
  } else if (width >= breakpoints.lg) {
    currentBreakpoint = 'lg';
  } else if (width >= breakpoints.md) {
    currentBreakpoint = 'md';
  } else if (width >= breakpoints.sm) {
    currentBreakpoint = 'sm';
  }

  return {
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
    currentBreakpoint,
    width,
    height,
  };
};

/**
 * useBreakpoint Hook
 * Check if current viewport matches a specific breakpoint
 * 
 * @param breakpoint - Breakpoint to check
 * @returns Boolean indicating if viewport matches breakpoint
 * 
 * @example
 * const isLargeScreen = useBreakpoint('lg');
 * 
 * return (
 *   <div style={{ columns: isLargeScreen ? 3 : 1 }}>
 *     {content}
 *   </div>
 * );
 */
export const useBreakpoint = (breakpoint: Breakpoint): boolean => {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth >= breakpoints[breakpoint];
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setMatches(window.innerWidth >= breakpoints[breakpoint]);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [breakpoint]);

  return matches;
};

/**
 * useCustomMediaQuery Hook
 * Check if a custom media query matches
 * 
 * @param query - Media query string (e.g., '(min-width: 768px)')
 * @returns Boolean indicating if media query matches
 * 
 * @example
 * const isPortrait = useCustomMediaQuery('(orientation: portrait)');
 * const prefersReducedMotion = useCustomMediaQuery('(prefers-reduced-motion: reduce)');
 */
export const useCustomMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia(query);

    const handleChange = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      setMatches(mediaQuery.matches);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
    // Legacy browsers
    else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange);
      setMatches(mediaQuery.matches);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, [query]);

  return matches;
};

/**
 * useOrientation Hook
 * Detect device orientation
 * 
 * @returns 'portrait' or 'landscape'
 * 
 * @example
 * const orientation = useOrientation();
 * 
 * return (
 *   <div className={`layout-${orientation}`}>
 *     {content}
 *   </div>
 * );
 */
export const useOrientation = (): 'portrait' | 'landscape' => {
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>(() => {
    if (typeof window === 'undefined') return 'landscape';
    return window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setOrientation(
        window.innerHeight > window.innerWidth ? 'portrait' : 'landscape'
      );
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return orientation;
};

/**
 * useViewportSize Hook
 * Get current viewport dimensions
 * 
 * @returns Object with width and height
 * 
 * @example
 * const { width, height } = useViewportSize();
 * 
 * return (
 *   <div>
 *     Viewport: {width}x{height}
 *   </div>
 * );
 */
export const useViewportSize = (): { width: number; height: number } => {
  const [size, setSize] = useState<{ width: number; height: number }>(() => {
    if (typeof window === 'undefined') {
      return { width: 1024, height: 768 };
    }
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return size;
};

export default useMediaQuery;

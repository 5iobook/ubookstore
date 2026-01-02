/**
 * Custom Hooks Index
 * Central export point for all custom hooks
 */

export { useTheme, ThemeProvider } from './useTheme';
export type { Theme } from '../styles/theme';

export {
  useMediaQuery,
  useBreakpoint,
  useCustomMediaQuery,
  useOrientation,
  useViewportSize,
} from './useMediaQuery';
export type { MediaQueryResult } from './useMediaQuery';

export { useToast, ToastProvider } from './useToast';
export type { ToastItem } from './useToast';

export { useNetworkStatus } from './useNetworkStatus';
export type { NetworkStatus } from './useNetworkStatus';

export { usePreloadRoute, usePreloadRoutes } from './usePreloadRoute';

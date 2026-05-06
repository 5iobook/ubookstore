import { useEffect } from 'react';

/**
 * usePreloadRoute Hook
 * 특정 라우트를 미리 로드하여 사용자 경험 개선
 * 
 * @example
 * // 마우스 호버 시 라우트 프리로드
 * const handleMouseEnter = usePreloadRoute(() => import('../pages/UserDetail'));
 */
export const usePreloadRoute = (importFn: () => Promise<any>) => {
  return () => {
    // 라우트 컴포넌트를 미리 로드
    importFn();
  };
};

/**
 * usePreloadRoutes Hook
 * 여러 라우트를 자동으로 프리로드
 * 
 * @param routes - 프리로드할 라우트 import 함수 배열
 * @param delay - 프리로드 시작 지연 시간 (ms)
 * 
 * @example
 * usePreloadRoutes([
 *   () => import('../pages/UserDetail'),
 *   () => import('../pages/UserForm'),
 * ], 2000);
 */
export const usePreloadRoutes = (
  routes: Array<() => Promise<any>>,
  delay: number = 2000
) => {
  useEffect(() => {
    // 초기 로드 후 일정 시간 뒤에 프리로드 시작
    const timer = setTimeout(() => {
      routes.forEach((importFn) => {
        importFn();
      });
    }, delay);

    return () => clearTimeout(timer);
  }, [routes, delay]);
};

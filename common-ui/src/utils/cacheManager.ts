/**
 * 오프라인 상태에서 캐시된 데이터를 관리하는 유틸리티
 */

const CACHE_PREFIX = 'app_cache_';
const CACHE_EXPIRY_MS = 5 * 60 * 1000; // 5분

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

/**
 * 데이터를 로컬 스토리지에 캐시
 */
export function setCacheData<T>(key: string, data: T): void {
  try {
    const cacheEntry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(cacheEntry));
  } catch (error) {
    console.error('캐시 저장 실패:', error);
  }
}

/**
 * 로컬 스토리지에서 캐시된 데이터 가져오기
 */
export function getCacheData<T>(key: string): T | null {
  try {
    const cached = localStorage.getItem(CACHE_PREFIX + key);
    if (!cached) return null;

    const cacheEntry: CacheEntry<T> = JSON.parse(cached);
    const now = Date.now();

    // 캐시 만료 확인
    if (now - cacheEntry.timestamp > CACHE_EXPIRY_MS) {
      localStorage.removeItem(CACHE_PREFIX + key);
      return null;
    }

    return cacheEntry.data;
  } catch (error) {
    console.error('캐시 읽기 실패:', error);
    return null;
  }
}

/**
 * 특정 캐시 삭제
 */
export function removeCacheData(key: string): void {
  try {
    localStorage.removeItem(CACHE_PREFIX + key);
  } catch (error) {
    console.error('캐시 삭제 실패:', error);
  }
}

/**
 * 모든 캐시 삭제
 */
export function clearAllCache(): void {
  try {
    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      if (key.startsWith(CACHE_PREFIX)) {
        localStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.error('캐시 전체 삭제 실패:', error);
  }
}

/**
 * 캐시 키 생성 헬퍼
 */
export function generateCacheKey(endpoint: string, params?: Record<string, any>): string {
  if (!params) return endpoint;
  const paramString = Object.entries(params)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
  return `${endpoint}?${paramString}`;
}

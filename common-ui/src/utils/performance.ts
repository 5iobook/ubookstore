/**
 * Performance Monitoring Utilities
 * 성능 모니터링 및 최적화 유틸리티
 */

/**
 * Web Vitals 측정
 * Core Web Vitals (LCP, FID, CLS) 측정
 */
export const measureWebVitals = () => {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
    return;
  }

  // Largest Contentful Paint (LCP)
  try {
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log('LCP:', lastEntry.startTime);
    });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
  } catch (e) {
    // LCP not supported
  }

  // First Input Delay (FID)
  try {
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        const fid = entry.processingStart - entry.startTime;
        console.log('FID:', fid);
      });
    });
    fidObserver.observe({ entryTypes: ['first-input'] });
  } catch (e) {
    // FID not supported
  }

  // Cumulative Layout Shift (CLS)
  try {
    let clsScore = 0;
    const clsObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsScore += entry.value;
        }
      });
      console.log('CLS:', clsScore);
    });
    clsObserver.observe({ entryTypes: ['layout-shift'] });
  } catch (e) {
    // CLS not supported
  }
};

/**
 * 리소스 로딩 시간 측정
 */
export const measureResourceTiming = () => {
  if (typeof window === 'undefined' || !window.performance) {
    return;
  }

  const resources = performance.getEntriesByType('resource');
  const resourceTiming = resources.map((resource: any) => ({
    name: resource.name,
    duration: resource.duration,
    size: resource.transferSize,
    type: resource.initiatorType,
  }));

  console.table(resourceTiming);
  return resourceTiming;
};

/**
 * 번들 크기 분석
 */
export const analyzeBundleSize = () => {
  if (typeof window === 'undefined' || !window.performance) {
    return;
  }

  const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
  const scripts = resources.filter((r) => r.initiatorType === 'script');
  const styles = resources.filter((r) => r.initiatorType === 'link' || r.initiatorType === 'css');

  const totalScriptSize = scripts.reduce((sum, r) => sum + (r.transferSize || 0), 0);
  const totalStyleSize = styles.reduce((sum, r) => sum + (r.transferSize || 0), 0);

  console.log('Bundle Analysis:');
  console.log(`Total JS: ${(totalScriptSize / 1024).toFixed(2)} KB`);
  console.log(`Total CSS: ${(totalStyleSize / 1024).toFixed(2)} KB`);
  console.log(`Total: ${((totalScriptSize + totalStyleSize) / 1024).toFixed(2)} KB`);

  return {
    scripts: totalScriptSize,
    styles: totalStyleSize,
    total: totalScriptSize + totalStyleSize,
  };
};

/**
 * 페이지 로드 시간 측정
 */
export const measurePageLoadTime = () => {
  if (typeof window === 'undefined' || !window.performance) {
    return;
  }

  const perfData = performance.timing;
  const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
  const connectTime = perfData.responseEnd - perfData.requestStart;
  const renderTime = perfData.domComplete - perfData.domLoading;

  console.log('Page Load Metrics:');
  console.log(`Total Load Time: ${pageLoadTime}ms`);
  console.log(`Connect Time: ${connectTime}ms`);
  console.log(`Render Time: ${renderTime}ms`);

  return {
    pageLoadTime,
    connectTime,
    renderTime,
  };
};

/**
 * 메모리 사용량 측정 (Chrome only)
 */
export const measureMemoryUsage = () => {
  if (typeof window === 'undefined' || !(performance as any).memory) {
    console.log('Memory API not supported');
    return;
  }

  const memory = (performance as any).memory;
  console.log('Memory Usage:');
  console.log(`Used: ${(memory.usedJSHeapSize / 1048576).toFixed(2)} MB`);
  console.log(`Total: ${(memory.totalJSHeapSize / 1048576).toFixed(2)} MB`);
  console.log(`Limit: ${(memory.jsHeapSizeLimit / 1048576).toFixed(2)} MB`);

  return {
    used: memory.usedJSHeapSize,
    total: memory.totalJSHeapSize,
    limit: memory.jsHeapSizeLimit,
  };
};

/**
 * 이미지 최적화 체크
 */
export const checkImageOptimization = () => {
  const images = document.querySelectorAll('img');
  const unoptimizedImages: Array<{ src: string; reason: string }> = [];

  images.forEach((img) => {
    // loading="lazy" 속성 체크
    if (!img.loading || img.loading !== 'lazy') {
      unoptimizedImages.push({
        src: img.src,
        reason: 'Missing loading="lazy" attribute',
      });
    }

    // alt 속성 체크 (접근성)
    if (!img.alt) {
      unoptimizedImages.push({
        src: img.src,
        reason: 'Missing alt attribute',
      });
    }

    // 크기 체크
    if (img.naturalWidth > 2000 || img.naturalHeight > 2000) {
      unoptimizedImages.push({
        src: img.src,
        reason: `Large image size: ${img.naturalWidth}x${img.naturalHeight}`,
      });
    }
  });

  if (unoptimizedImages.length > 0) {
    console.warn('Unoptimized Images:', unoptimizedImages);
  } else {
    console.log('All images are optimized!');
  }

  return unoptimizedImages;
};

/**
 * 개발 환경에서만 성능 모니터링 활성화
 */
export const enablePerformanceMonitoring = () => {
  if (import.meta.env.DEV) {
    console.log('🚀 Performance Monitoring Enabled');
    
    // 페이지 로드 완료 후 측정
    window.addEventListener('load', () => {
      setTimeout(() => {
        measurePageLoadTime();
        analyzeBundleSize();
        measureMemoryUsage();
        checkImageOptimization();
      }, 1000);
    });

    // Web Vitals 측정
    measureWebVitals();
  }
};

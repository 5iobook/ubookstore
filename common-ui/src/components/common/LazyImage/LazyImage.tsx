import { useState, useEffect, useRef } from 'react';
import type { ImgHTMLAttributes } from 'react';
import styles from './LazyImage.module.css';

interface LazyImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string;
  alt: string;
  placeholder?: string;
  threshold?: number;
  rootMargin?: string;
}

/**
 * LazyImage Component
 * 이미지 레이지 로딩을 구현한 컴포넌트
 * Intersection Observer API를 사용하여 뷰포트에 진입할 때만 이미지를 로드
 */
export const LazyImage = ({
  src,
  alt,
  placeholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23f0f0f0" width="400" height="300"/%3E%3C/svg%3E',
  threshold = 0.01,
  rootMargin = '50px',
  className = '',
  ...props
}: LazyImageProps) => {
  const [imageSrc, setImageSrc] = useState<string>(placeholder);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!imgRef.current) return;

    // Intersection Observer 설정
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 이미지가 뷰포트에 진입하면 실제 이미지 로드
            setImageSrc(src);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(imgRef.current);

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [src, threshold, rootMargin]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setIsError(true);
    setIsLoaded(true);
  };

  return (
    <div className={`${styles.lazyImageWrapper} ${className}`}>
      <img
        ref={imgRef}
        src={imageSrc}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        className={`${styles.lazyImage} ${isLoaded ? styles.loaded : ''} ${
          isError ? styles.error : ''
        }`}
        loading="lazy"
        {...props}
      />
      {!isLoaded && <div className={styles.loader} aria-label="이미지 로딩 중" />}
    </div>
  );
};

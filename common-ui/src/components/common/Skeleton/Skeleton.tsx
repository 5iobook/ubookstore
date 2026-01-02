import React from 'react';
import './Skeleton.css';

export type SkeletonVariant = 'text' | 'title' | 'avatar' | 'card' | 'rectangular' | 'circular';

export interface SkeletonProps {
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
  className?: string;
  count?: number;
  animation?: 'pulse' | 'wave' | 'none';
}

/**
 * Skeleton Component
 * 로딩 상태를 표시하는 스켈레톤 컴포넌트
 * 
 * @example
 * ```tsx
 * <Skeleton variant="text" count={3} />
 * <Skeleton variant="avatar" />
 * <Skeleton variant="card" height={200} />
 * ```
 */
export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  width,
  height,
  className = '',
  count = 1,
  animation = 'wave',
}) => {
  const getSkeletonStyle = () => {
    const style: React.CSSProperties = {};

    if (width) {
      style.width = typeof width === 'number' ? `${width}px` : width;
    }

    if (height) {
      style.height = typeof height === 'number' ? `${height}px` : height;
    }

    return style;
  };

  const skeletonClass = `
    skeleton 
    skeleton--${variant} 
    skeleton--animation-${animation}
    ${className}
  `.trim();

  if (count > 1) {
    return (
      <div className="skeleton-group">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className={skeletonClass}
            style={getSkeletonStyle()}
            aria-busy="true"
            aria-live="polite"
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={skeletonClass}
      style={getSkeletonStyle()}
      aria-busy="true"
      aria-live="polite"
    />
  );
};

export default Skeleton;

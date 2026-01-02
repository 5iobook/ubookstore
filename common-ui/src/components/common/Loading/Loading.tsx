import React from 'react';
import './Loading.css';

export interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'spinner' | 'dots' | 'pulse';
  fullScreen?: boolean;
  text?: string;
  className?: string;
}

export const Loading: React.FC<LoadingProps> = ({
  size = 'md',
  variant = 'spinner',
  fullScreen = false,
  text,
  className = '',
}) => {
  const containerClassNames = [
    'loading',
    fullScreen && 'loading--fullscreen',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const loaderClassNames = [
    'loading__loader',
    `loading__loader--${variant}`,
    `loading__loader--${size}`,
  ].join(' ');

  const renderLoader = () => {
    switch (variant) {
      case 'dots':
        return (
          <div className={loaderClassNames}>
            <span className="loading__dot" />
            <span className="loading__dot" />
            <span className="loading__dot" />
          </div>
        );
      case 'pulse':
        return (
          <div className={loaderClassNames}>
            <div className="loading__pulse" />
          </div>
        );
      case 'spinner':
      default:
        return (
          <div className={loaderClassNames}>
            <svg className="loading__spinner" viewBox="0 0 50 50">
              <circle
                className="loading__spinner-circle"
                cx="25"
                cy="25"
                r="20"
                fill="none"
                strokeWidth="4"
              />
            </svg>
          </div>
        );
    }
  };

  return (
    <div className={containerClassNames} role="status" aria-live="polite">
      {renderLoader()}
      {text && <p className="loading__text">{text}</p>}
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Loading;

import React from 'react';
import './ErrorFallback.css';
import Button from '../Button/Button';

export type ErrorType = 'network' | '404' | '500' | 'service-down';

export interface ErrorFallbackProps {
  type: ErrorType;
  serviceName?: string;
  message?: string;
  onRetry?: () => void;
  showHomeButton?: boolean;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  type,
  serviceName,
  message,
  onRetry,
  showHomeButton = true,
}) => {
  const getErrorContent = () => {
    switch (type) {
      case 'network':
        return {
          icon: (
            <svg width="120" height="120" viewBox="0 0 24 24" fill="none">
              <path
                d="M19.35 10.04C18.67 6.59 15.64 4 12 4c-1.48 0-2.85.43-4.01 1.17l1.46 1.46C10.21 6.23 11.08 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3 0 1.13-.64 2.11-1.56 2.62l1.45 1.45C23.16 18.16 24 16.68 24 15c0-2.64-2.05-4.78-4.65-4.96zM3 5.27l2.75 2.74C2.56 8.15 0 10.77 0 14c0 3.31 2.69 6 6 6h11.73l2 2L21 20.73 4.27 4 3 5.27zM7.73 10l8 8H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h1.73z"
                fill="var(--color-error)"
              />
            </svg>
          ),
          title: '네트워크 연결 오류',
          description: message || '인터넷 연결을 확인하고 다시 시도해주세요.',
        };

      case '404':
        return {
          icon: (
            <svg width="120" height="120" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
                fill="var(--color-warning)"
              />
            </svg>
          ),
          title: '페이지를 찾을 수 없습니다',
          description: message || '요청하신 페이지가 존재하지 않거나 이동되었습니다.',
        };

      case '500':
        return {
          icon: (
            <svg width="120" height="120" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                fill="var(--color-error)"
                transform="rotate(180 12 12)"
              />
              <circle cx="12" cy="12" r="10" stroke="var(--color-error)" strokeWidth="2" fill="none" />
              <path d="M12 7v6M12 15v2" stroke="var(--color-error)" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ),
          title: '서버 오류가 발생했습니다',
          description: message || '일시적인 서버 오류입니다. 잠시 후 다시 시도해주세요.',
        };

      case 'service-down':
        return {
          icon: (
            <svg width="120" height="120" viewBox="0 0 24 24" fill="none">
              <path
                d="M23 12l-2.44-2.78.34-3.68-3.61-.82-1.89-3.18L12 3 8.6 1.54 6.71 4.72l-3.61.81.34 3.68L1 12l2.44 2.78-.34 3.69 3.61.82 1.89 3.18L12 21l3.4 1.46 1.89-3.18 3.61-.82-.34-3.68L23 12zm-10 5h-2v-2h2v2zm0-4h-2V7h2v6z"
                fill="var(--color-info)"
              />
            </svg>
          ),
          title: `${serviceName || '서비스'}를 사용할 수 없습니다`,
          description: message || '서비스가 일시적으로 중단되었습니다. 잠시 후 다시 시도해주세요.',
        };

      default:
        return {
          icon: null,
          title: '오류가 발생했습니다',
          description: message || '알 수 없는 오류가 발생했습니다.',
        };
    }
  };

  const content = getErrorContent();

  return (
    <div className="error-fallback">
      <div className="error-fallback__container">
        {content.icon && (
          <div className="error-fallback__icon">
            {content.icon}
          </div>
        )}

        <h1 className="error-fallback__title">{content.title}</h1>
        
        <p className="error-fallback__description">
          {content.description}
        </p>

        {serviceName && type === 'service-down' && (
          <div className="error-fallback__service-badge">
            <span className="error-fallback__service-name">{serviceName}</span>
            <span className="error-fallback__service-status">오프라인</span>
          </div>
        )}

        <div className="error-fallback__actions">
          {onRetry && (
            <Button
              variant="primary"
              size="lg"
              onClick={onRetry}
            >
              다시 시도
            </Button>
          )}
          
          {showHomeButton && (
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.location.href = '/'}
            >
              홈으로 이동
            </Button>
          )}
        </div>

        {type === 'network' && (
          <div className="error-fallback__tips">
            <p className="error-fallback__tips-title">해결 방법:</p>
            <ul className="error-fallback__tips-list">
              <li>인터넷 연결 상태를 확인해주세요</li>
              <li>Wi-Fi 또는 모바일 데이터가 켜져 있는지 확인해주세요</li>
              <li>방화벽이나 VPN 설정을 확인해주세요</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ErrorFallback;

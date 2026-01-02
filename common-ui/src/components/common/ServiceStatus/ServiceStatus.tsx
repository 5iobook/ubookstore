import React from 'react';
import './ServiceStatus.css';
import ErrorFallback from '../ErrorFallback/ErrorFallback';

export type ServiceName = 'user' | 'book' | 'post' | 'chat' | 'trade' | 'wish';
export type ServiceStatusType = 'online' | 'offline' | 'degraded';

export interface ServiceStatusProps {
  service: ServiceName;
  status: ServiceStatusType;
  message?: string;
  onRetry?: () => void;
}

const serviceDisplayNames: Record<ServiceName, string> = {
  user: '사용자 서비스',
  book: '도서 서비스',
  post: '게시글 서비스',
  chat: '채팅 서비스',
  trade: '거래 서비스',
  wish: '위시리스트 서비스',
};

const ServiceStatus: React.FC<ServiceStatusProps> = ({
  service,
  status,
  message,
  onRetry,
}) => {
  const serviceName = serviceDisplayNames[service];

  // 서비스가 오프라인인 경우 전체 폴백 UI 표시
  if (status === 'offline') {
    return (
      <ErrorFallback
        type="service-down"
        serviceName={serviceName}
        message={message || `${serviceName}가 일시적으로 사용 불가능합니다.`}
        onRetry={onRetry}
        showHomeButton={true}
      />
    );
  }

  // 서비스가 저하된 경우 경고 배너 표시
  if (status === 'degraded') {
    return (
      <div className="service-status-banner service-status-banner--warning">
        <div className="service-status-banner__icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div className="service-status-banner__content">
          <p className="service-status-banner__title">
            {serviceName} 성능 저하
          </p>
          <p className="service-status-banner__message">
            {message || '일부 기능이 느리게 작동할 수 있습니다.'}
          </p>
        </div>
        {onRetry && (
          <button
            className="service-status-banner__retry"
            onClick={onRetry}
            aria-label="다시 시도"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"
                fill="currentColor"
              />
            </svg>
          </button>
        )}
      </div>
    );
  }

  // 서비스가 정상인 경우 아무것도 표시하지 않음
  return null;
};

export default ServiceStatus;

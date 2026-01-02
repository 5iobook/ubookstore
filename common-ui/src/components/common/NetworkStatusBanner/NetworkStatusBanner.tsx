import React, { useEffect, useState } from 'react';
import { useNetworkStatus } from '../../../hooks/useNetworkStatus';
import './NetworkStatusBanner.css';

const NetworkStatusBanner: React.FC = () => {
  const { isOnline, wasOffline } = useNetworkStatus();
  const [showReconnected, setShowReconnected] = useState(false);

  useEffect(() => {
    if (isOnline && wasOffline) {
      setShowReconnected(true);
      const timer = setTimeout(() => {
        setShowReconnected(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOnline, wasOffline]);

  if (!isOnline) {
    return (
      <div className="network-status-banner network-status-banner--offline">
        <div className="network-status-banner__icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M19.35 10.04C18.67 6.59 15.64 4 12 4c-1.48 0-2.85.43-4.01 1.17l1.46 1.46C10.21 6.23 11.08 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3 0 1.13-.64 2.11-1.56 2.62l1.45 1.45C23.16 18.16 24 16.68 24 15c0-2.64-2.05-4.78-4.65-4.96zM3 5.27l2.75 2.74C2.56 8.15 0 10.77 0 14c0 3.31 2.69 6 6 6h11.73l2 2L21 20.73 4.27 4 3 5.27zM7.73 10l8 8H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h1.73z"
              fill="currentColor"
            />
          </svg>
        </div>
        <span className="network-status-banner__text">
          인터넷 연결이 끊어졌습니다
        </span>
      </div>
    );
  }

  if (showReconnected) {
    return (
      <div className="network-status-banner network-status-banner--online">
        <div className="network-status-banner__icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
              fill="currentColor"
            />
          </svg>
        </div>
        <span className="network-status-banner__text">
          인터넷에 다시 연결되었습니다
        </span>
      </div>
    );
  }

  return null;
};

export default NetworkStatusBanner;

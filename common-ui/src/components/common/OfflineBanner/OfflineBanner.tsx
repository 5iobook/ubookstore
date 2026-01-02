import React from 'react';
import styles from './OfflineBanner.module.css';

interface OfflineBannerProps {
  isOnline: boolean;
  wasOffline: boolean;
}

export const OfflineBanner: React.FC<OfflineBannerProps> = ({ isOnline, wasOffline }) => {
  const [showReconnected, setShowReconnected] = React.useState(false);

  React.useEffect(() => {
    if (isOnline && wasOffline) {
      setShowReconnected(true);
      const timer = setTimeout(() => {
        setShowReconnected(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOnline, wasOffline]);

  if (isOnline && !showReconnected) {
    return null;
  }

  return (
    <div className={`${styles.banner} ${isOnline ? styles.online : styles.offline}`}>
      <div className={styles.content}>
        {isOnline ? (
          <>
            <span className={styles.icon}>✓</span>
            <span className={styles.message}>인터넷 연결이 복구되었습니다</span>
          </>
        ) : (
          <>
            <span className={styles.icon}>⚠</span>
            <span className={styles.message}>
              오프라인 모드 - 일부 기능이 제한될 수 있습니다
            </span>
          </>
        )}
      </div>
    </div>
  );
};

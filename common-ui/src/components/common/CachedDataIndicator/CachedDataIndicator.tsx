import React from 'react';
import styles from './CachedDataIndicator.module.css';

interface CachedDataIndicatorProps {
  show: boolean;
}

export const CachedDataIndicator: React.FC<CachedDataIndicatorProps> = ({ show }) => {
  if (!show) return null;

  return (
    <div className={styles.indicator}>
      <span className={styles.icon}>💾</span>
      <span className={styles.text}>캐시된 데이터를 표시하고 있습니다</span>
    </div>
  );
};

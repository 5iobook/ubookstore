import React from 'react';
import { ErrorFallback } from '@bookstore/common-ui';

const ServerErrorPage: React.FC = () => {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <ErrorFallback
      type="500"
      message="서버에서 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
      onRetry={handleRetry}
      showHomeButton={true}
    />
  );
};

export default ServerErrorPage;

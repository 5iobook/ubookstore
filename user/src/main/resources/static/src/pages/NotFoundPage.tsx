import React from 'react';
import { ErrorFallback } from '@bookstore/common-ui';

const NotFoundPage: React.FC = () => {
  return (
    <ErrorFallback
      type="404"
      message="요청하신 페이지를 찾을 수 없습니다. URL을 확인하거나 홈으로 돌아가주세요."
      showHomeButton={true}
    />
  );
};

export default NotFoundPage;

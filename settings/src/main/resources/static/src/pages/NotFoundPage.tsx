import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="settings-section" style={{ textAlign: 'center' }}>
      <h2>페이지를 찾을 수 없습니다</h2>
      <p>요청하신 페이지가 존재하지 않습니다.</p>
      <div style={{ marginTop: 'var(--spacing-6)' }}>
        <Link to="/" className="btn-primary" style={{ textDecoration: 'none' }}>
          설정 홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
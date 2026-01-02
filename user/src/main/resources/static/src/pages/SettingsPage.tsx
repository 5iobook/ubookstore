import { useState, useEffect } from 'react';
import { Card, Button } from '@bookstore/common-ui';
import './SettingsPage.css';

function SettingsPage() {
  const [isAuthenticated] = useState(false);
  const [user] = useState<{ name: string; email?: string; avatar?: string } | undefined>(
    undefined
  );
  const currentYear = new Date().getFullYear();

  // 설정 서비스로 리다이렉트
  useEffect(() => {
    window.location.href = 'http://localhost:5180';
  }, []);

  return (
    <div className="settings-container">
      <h1>설정 페이지로 이동 중...</h1>
      <p>잠시만 기다려주세요. 설정 페이지로 이동합니다.</p>
      
      <Card>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>자동으로 이동되지 않는다면 아래 버튼을 클릭하세요.</p>
          <Button
            variant="primary"
            onClick={() => window.location.href = 'http://localhost:5180'}
            style={{ marginTop: '1rem' }}
          >
            설정 페이지로 이동
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default SettingsPage;

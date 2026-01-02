import React, { useState } from 'react';

import { Container, Card, Button, Checkbox } from '@bookstore/common-ui';


const PreferencesSettings: React.FC = () => {
  const [preferences, setPreferences] = useState({
    theme: 'light',
    language: 'ko',
    timezone: 'Asia/Seoul',
    itemsPerPage: '10',
    autoSave: true,
    showTutorials: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API ?�출�??�경?�정 ?�데?�트
    alert('환경설정이 저장되었습니다.');
  };


  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPreferences(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (name: string) => (checked: boolean) => {
    setPreferences(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const resetToDefaults = () => {
    setPreferences({
      theme: 'light',
      language: 'ko',
      timezone: 'Asia/Seoul',
      itemsPerPage: '10',
      autoSave: true,
      showTutorials: true
    });
  };

  return (
    <Container maxWidth="xl">
      <header style={{ 
        marginBottom: 'var(--spacing-6)',
        textAlign: 'center'
      }}>
        <h1 style={{ 
          margin: 0, 
          fontSize: 'var(--font-size-2xl)', 
          fontWeight: 'var(--font-weight-bold)' 
        }}>
          ?�경 ?�정
        </h1>
        <p style={{ 
          margin: 'var(--spacing-2) 0 0', 
          color: 'var(--text-secondary)' 
        }}>
          시스템 사용 환경을 개인화하세요.
        </p>
      </header>

      <Card>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gap: 'var(--spacing-4)', marginBottom: 'var(--spacing-6)' }}>
            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: 'var(--spacing-2)',
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'var(--font-weight-medium)',
                color: 'var(--text-primary)'
              }}>
                ?�마
              </label>
              <select
                name="theme"
                value={preferences.theme}
                onChange={handleSelectChange}
                style={{
                  width: '100%',
                  padding: 'var(--spacing-3)',
                  border: '1px solid var(--border-primary)',
                  borderRadius: 'var(--radius-base)',
                  fontSize: 'var(--font-size-sm)',
                  backgroundColor: 'var(--background-primary)'
                }}
              >
                <option value="light">?�이??모드</option>
                <option value="dark">?�크 모드</option>
                <option value="auto">시스템 설정 따름</option>
              </select>
            </div>

            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: 'var(--spacing-2)',
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'var(--font-weight-medium)',
                color: 'var(--text-primary)'
              }}>
                ?�어
              </label>
              <select
                name="language"
                value={preferences.language}
                onChange={handleSelectChange}
                style={{
                  width: '100%',
                  padding: 'var(--spacing-3)',
                  border: '1px solid var(--border-primary)',
                  borderRadius: 'var(--radius-base)',
                  fontSize: 'var(--font-size-sm)',
                  backgroundColor: 'var(--background-primary)'
                }}
              >
                <option value="ko">?�국??/option>
                <option value="en">English</option>
                <option value="ja">?�本�?/option>
              </select>
            </div>

            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: 'var(--spacing-2)',
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'var(--font-weight-medium)',
                color: 'var(--text-primary)'
              }}>
                ?�간?�
              </label>
              <select
                name="timezone"
                value={preferences.timezone}
                onChange={handleSelectChange}
                style={{
                  width: '100%',
                  padding: 'var(--spacing-3)',
                  border: '1px solid var(--border-primary)',
                  borderRadius: 'var(--radius-base)',
                  fontSize: 'var(--font-size-sm)',
                  backgroundColor: 'var(--background-primary)'
                }}
              >
                <option value="Asia/Seoul">?�울 (UTC+9)</option>
                <option value="Asia/Tokyo">?�쿄 (UTC+9)</option>
                <option value="America/New_York">?�욕 (UTC-5)</option>
                <option value="Europe/London">?�던 (UTC+0)</option>
              </select>
            </div>

            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: 'var(--spacing-2)',
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'var(--font-weight-medium)',
                color: 'var(--text-primary)'
              }}>
                페이지당 항목 수
              </label>
              <select
                name="itemsPerPage"
                value={preferences.itemsPerPage}
                onChange={handleSelectChange}
                style={{
                  width: '100%',
                  padding: 'var(--spacing-3)',
                  border: '1px solid var(--border-primary)',
                  borderRadius: 'var(--radius-base)',
                  fontSize: 'var(--font-size-sm)',
                  backgroundColor: 'var(--background-primary)'
                }}
              >
                <option value="5">5�?/option>
                <option value="10">10�?/option>
                <option value="20">20�?/option>
                <option value="50">50�?/option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: 'var(--spacing-6)' }}>
            <h3 style={{ 
              marginBottom: 'var(--spacing-4)', 
              color: 'var(--text-primary)',
              fontSize: 'var(--font-size-lg)',
              fontWeight: 'var(--font-weight-semibold)'
            }}>
              기능 ?�정
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
              <Checkbox
                id="autoSave"
                label="자동 저장 활성화"
                checked={preferences.autoSave}
                onChange={handleCheckboxChange('autoSave')}
              />

              <Checkbox
                id="showTutorials"
                label="?�토리얼 �??��?�??�시"
                checked={preferences.showTutorials}
                onChange={handleCheckboxChange('showTutorials')}
              />
            </div>
          </div>

          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            gap: 'var(--spacing-3)',
            paddingTop: 'var(--spacing-4)',
            borderTop: '1px solid var(--border-secondary)'
          }}>
            <Button 
              type="button" 
              variant="outline"
              onClick={resetToDefaults}
            >
              기본값으�?복원
            </Button>
            <Button type="submit" variant="primary">
              ?�??
            </Button>
          </div>
        </form>
      </Card>
    </Container>

  );
};

export default PreferencesSettings;
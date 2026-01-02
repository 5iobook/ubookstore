import React, { useState } from 'react';
<<<<<<< HEAD
import { Container, Card, Button, Checkbox } from '@bookstore/common-ui';
=======
>>>>>>> dev

const NotificationSettings: React.FC = () => {
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    newMessages: true,
    tradeUpdates: true,
    bookRecommendations: false,
    systemUpdates: true,
    marketingEmails: false,
    weeklyDigest: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API 호출로 알림 설정 업데이트
    alert('알림 설정이 저장되었습니다.');
  };

<<<<<<< HEAD
  const handleChange = (name: string) => (checked: boolean) => {
=======
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
>>>>>>> dev
    setNotifications(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  return (
<<<<<<< HEAD
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
          알림 설정
        </h1>
        <p style={{ 
          margin: 'var(--spacing-2) 0 0', 
          color: 'var(--text-secondary)' 
        }}>
          받고 싶은 알림 유형을 선택하세요.
        </p>
      </header>

      <Card>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 'var(--spacing-6)' }}>
            <h3 style={{ 
              marginBottom: 'var(--spacing-4)', 
              color: 'var(--text-primary)',
              fontSize: 'var(--font-size-lg)',
              fontWeight: 'var(--font-weight-semibold)'
            }}>
              알림 방식
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
              <Checkbox
                id="emailNotifications"
                label="이메일 알림"
                checked={notifications.emailNotifications}
                onChange={handleChange('emailNotifications')}
              />

              <Checkbox
                id="pushNotifications"
                label="푸시 알림"
                checked={notifications.pushNotifications}
                onChange={handleChange('pushNotifications')}
              />

              <Checkbox
                id="smsNotifications"
                label="SMS 알림"
                checked={notifications.smsNotifications}
                onChange={handleChange('smsNotifications')}
              />
            </div>
          </div>

          <div style={{ marginBottom: 'var(--spacing-6)' }}>
            <h3 style={{ 
              marginBottom: 'var(--spacing-4)', 
              color: 'var(--text-primary)',
              fontSize: 'var(--font-size-lg)',
              fontWeight: 'var(--font-weight-semibold)'
            }}>
              알림 내용
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
              <Checkbox
                id="newMessages"
                label="새 메시지"
                checked={notifications.newMessages}
                onChange={handleChange('newMessages')}
              />

              <Checkbox
                id="tradeUpdates"
                label="거래 업데이트"
                checked={notifications.tradeUpdates}
                onChange={handleChange('tradeUpdates')}
              />

              <Checkbox
                id="bookRecommendations"
                label="도서 추천"
                checked={notifications.bookRecommendations}
                onChange={handleChange('bookRecommendations')}
              />

              <Checkbox
                id="systemUpdates"
                label="시스템 업데이트"
                checked={notifications.systemUpdates}
                onChange={handleChange('systemUpdates')}
              />

              <Checkbox
                id="marketingEmails"
                label="마케팅 이메일"
                checked={notifications.marketingEmails}
                onChange={handleChange('marketingEmails')}
              />

              <Checkbox
                id="weeklyDigest"
                label="주간 요약"
                checked={notifications.weeklyDigest}
                onChange={handleChange('weeklyDigest')}
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
              onClick={() => {
                const allOff = Object.keys(notifications).reduce((acc, key) => {
                  acc[key] = false;
                  return acc;
                }, {} as any);
                setNotifications(allOff);
              }}
            >
              모두 끄기
            </Button>
            <Button type="submit" variant="primary">
              저장
            </Button>
          </div>
        </form>
      </Card>
    </Container>
=======
    <div className="settings-section">
      <h2>알림 설정</h2>
      <p>받고 싶은 알림 유형을 선택하세요.</p>
      
      <form className="settings-form" onSubmit={handleSubmit}>
        <div style={{ marginBottom: 'var(--spacing-6)' }}>
          <h3 style={{ marginBottom: 'var(--spacing-4)', color: 'var(--text-primary)' }}>
            알림 방식
          </h3>
          
          <div className="form-checkbox">
            <input
              type="checkbox"
              id="emailNotifications"
              name="emailNotifications"
              checked={notifications.emailNotifications}
              onChange={handleChange}
            />
            <label className="form-label" htmlFor="emailNotifications">이메일 알림</label>
          </div>

          <div className="form-checkbox">
            <input
              type="checkbox"
              id="pushNotifications"
              name="pushNotifications"
              checked={notifications.pushNotifications}
              onChange={handleChange}
            />
            <label className="form-label" htmlFor="pushNotifications">푸시 알림</label>
          </div>

          <div className="form-checkbox">
            <input
              type="checkbox"
              id="smsNotifications"
              name="smsNotifications"
              checked={notifications.smsNotifications}
              onChange={handleChange}
            />
            <label className="form-label" htmlFor="smsNotifications">SMS 알림</label>
          </div>
        </div>

        <div style={{ marginBottom: 'var(--spacing-6)' }}>
          <h3 style={{ marginBottom: 'var(--spacing-4)', color: 'var(--text-primary)' }}>
            알림 내용
          </h3>
          
          <div className="form-checkbox">
            <input
              type="checkbox"
              id="newMessages"
              name="newMessages"
              checked={notifications.newMessages}
              onChange={handleChange}
            />
            <label className="form-label" htmlFor="newMessages">새 메시지</label>
          </div>

          <div className="form-checkbox">
            <input
              type="checkbox"
              id="tradeUpdates"
              name="tradeUpdates"
              checked={notifications.tradeUpdates}
              onChange={handleChange}
            />
            <label className="form-label" htmlFor="tradeUpdates">거래 업데이트</label>
          </div>

          <div className="form-checkbox">
            <input
              type="checkbox"
              id="bookRecommendations"
              name="bookRecommendations"
              checked={notifications.bookRecommendations}
              onChange={handleChange}
            />
            <label className="form-label" htmlFor="bookRecommendations">도서 추천</label>
          </div>

          <div className="form-checkbox">
            <input
              type="checkbox"
              id="systemUpdates"
              name="systemUpdates"
              checked={notifications.systemUpdates}
              onChange={handleChange}
            />
            <label className="form-label" htmlFor="systemUpdates">시스템 업데이트</label>
          </div>

          <div className="form-checkbox">
            <input
              type="checkbox"
              id="marketingEmails"
              name="marketingEmails"
              checked={notifications.marketingEmails}
              onChange={handleChange}
            />
            <label className="form-label" htmlFor="marketingEmails">마케팅 이메일</label>
          </div>

          <div className="form-checkbox">
            <input
              type="checkbox"
              id="weeklyDigest"
              name="weeklyDigest"
              checked={notifications.weeklyDigest}
              onChange={handleChange}
            />
            <label className="form-label" htmlFor="weeklyDigest">주간 요약</label>
          </div>
        </div>

        <div className="btn-group">
          <button type="button" className="btn-secondary">
            모두 끄기
          </button>
          <button type="submit" className="btn-primary">
            저장
          </button>
        </div>
      </form>
    </div>
>>>>>>> dev
  );
};

export default NotificationSettings;
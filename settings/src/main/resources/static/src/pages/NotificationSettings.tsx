import React, { useState } from 'react';

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNotifications(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  return (
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
  );
};

export default NotificationSettings;
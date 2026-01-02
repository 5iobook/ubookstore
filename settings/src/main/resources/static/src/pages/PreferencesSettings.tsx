import React, { useState } from 'react';

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
    // TODO: API 호출로 환경설정 업데이트
    alert('환경설정이 저장되었습니다.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setPreferences(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <div className="settings-section">
      <h2>환경 설정</h2>
      <p>시스템 사용 환경을 개인화하세요.</p>
      
      <form className="settings-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="theme">테마</label>
          <select
            id="theme"
            name="theme"
            className="form-select"
            value={preferences.theme}
            onChange={handleChange}
          >
            <option value="light">라이트 모드</option>
            <option value="dark">다크 모드</option>
            <option value="auto">시스템 설정 따름</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="language">언어</label>
          <select
            id="language"
            name="language"
            className="form-select"
            value={preferences.language}
            onChange={handleChange}
          >
            <option value="ko">한국어</option>
            <option value="en">English</option>
            <option value="ja">日本語</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="timezone">시간대</label>
          <select
            id="timezone"
            name="timezone"
            className="form-select"
            value={preferences.timezone}
            onChange={handleChange}
          >
            <option value="Asia/Seoul">서울 (UTC+9)</option>
            <option value="Asia/Tokyo">도쿄 (UTC+9)</option>
            <option value="America/New_York">뉴욕 (UTC-5)</option>
            <option value="Europe/London">런던 (UTC+0)</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="itemsPerPage">페이지당 항목 수</label>
          <select
            id="itemsPerPage"
            name="itemsPerPage"
            className="form-select"
            value={preferences.itemsPerPage}
            onChange={handleChange}
          >
            <option value="5">5개</option>
            <option value="10">10개</option>
            <option value="20">20개</option>
            <option value="50">50개</option>
          </select>
        </div>

        <div className="form-checkbox">
          <input
            type="checkbox"
            id="autoSave"
            name="autoSave"
            checked={preferences.autoSave}
            onChange={handleChange}
          />
          <label className="form-label" htmlFor="autoSave">자동 저장 활성화</label>
        </div>

        <div className="form-checkbox">
          <input
            type="checkbox"
            id="showTutorials"
            name="showTutorials"
            checked={preferences.showTutorials}
            onChange={handleChange}
          />
          <label className="form-label" htmlFor="showTutorials">튜토리얼 및 도움말 표시</label>
        </div>

        <div className="btn-group">
          <button type="button" className="btn-secondary">
            기본값으로 복원
          </button>
          <button type="submit" className="btn-primary">
            저장
          </button>
        </div>
      </form>
    </div>
  );
};

export default PreferencesSettings;
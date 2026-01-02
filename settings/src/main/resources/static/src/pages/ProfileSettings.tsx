import React, { useState } from 'react';

const ProfileSettings: React.FC = () => {
  const [profile, setProfile] = useState({
    name: '홍길동',
    email: 'hong@example.com',
    phone: '010-1234-5678',
    bio: '책을 사랑하는 독서가입니다.',
    location: '서울, 대한민국'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API 호출로 프로필 업데이트
    alert('프로필이 업데이트되었습니다.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="settings-section">
      <h2>프로필 설정</h2>
      <p>개인 정보와 프로필을 관리하세요.</p>
      
      <form className="settings-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="name">이름</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-input"
            value={profile.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-input"
            value={profile.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="phone">전화번호</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="form-input"
            value={profile.phone}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="location">위치</label>
          <input
            type="text"
            id="location"
            name="location"
            className="form-input"
            value={profile.location}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="bio">자기소개</label>
          <textarea
            id="bio"
            name="bio"
            className="form-input form-textarea"
            value={profile.bio}
            onChange={handleChange}
            placeholder="자신을 소개해주세요..."
          />
        </div>

        <div className="btn-group">
          <button type="button" className="btn-secondary">
            취소
          </button>
          <button type="submit" className="btn-primary">
            저장
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSettings;
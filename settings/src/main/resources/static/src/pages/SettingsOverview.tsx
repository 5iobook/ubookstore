import React from 'react';
import { Link } from 'react-router-dom';

const SettingsOverview: React.FC = () => {
  const settingsCategories = [
    {
      title: '계정 관리',
      description: '로그인 상태 확인 및 서비스 바로가기를 제공합니다.',
      path: '/account',
      icon: '👤'
    },
    {
      title: '프로필 설정',
      description: '개인 정보, 프로필 사진, 연락처 정보를 관리합니다.',
      path: '/profile',
      icon: '📝'
    },
    {
      title: '환경 설정',
      description: '테마, 언어, 화면 표시 옵션을 설정합니다.',
      path: '/preferences',
      icon: '⚙️'
    },
    {
      title: '알림 설정',
      description: '이메일, 푸시 알림, 시스템 알림을 관리합니다.',
      path: '/notifications',
      icon: '🔔'
    },
    {
      title: '개인정보 설정',
      description: '계정 보안, 개인정보 보호 설정을 관리합니다.',
      path: '/privacy',
      icon: '🔒'
    },
    {
      title: '고객지원',
      description: '도움말, FAQ, 문의하기 및 서비스 정보를 제공합니다.',
      path: '/support',
      icon: '💬'
    }
  ];

  return (
    <>
      <div className="settings-section">
        <h2>설정 개요</h2>
        <p>시스템의 다양한 설정을 관리할 수 있습니다. 아래 카테고리 중 하나를 선택하여 시작하세요.</p>
      </div>

      <div className="settings-grid">
        {settingsCategories.map((category) => (
          <Link
            key={category.path}
            to={category.path}
            className="settings-card"
          >
            <div className="settings-card-icon">
              {category.icon}
            </div>
            <h3 className="settings-card-title">
              {category.title}
            </h3>
            <p className="settings-card-description">
              {category.description}
            </p>
          </Link>
        ))}
      </div>
    </>
  );
};

export default SettingsOverview;
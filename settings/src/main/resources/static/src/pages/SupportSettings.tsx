import React from 'react';

const SupportSettings: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const supportLinks = [
    { href: '/help', icon: '❓', title: '도움말', description: '서비스 이용 가이드' },
    { href: '/faq', icon: '💡', title: '자주 묻는 질문', description: 'FAQ 및 문제 해결' },
    { href: '/contact', icon: '📧', title: '문의하기', description: '고객 지원 문의' },
    { href: '/terms', icon: '📋', title: '이용약관', description: '서비스 이용 규정' }
  ];

  const infoLinks = [
    { href: '/privacy', icon: '🔒', title: '개인정보처리방침', description: '개인정보 보호 정책' },
    { href: '/terms-of-service', icon: '📄', title: '서비스 이용약관', description: '서비스 약관 및 조건' },
    { href: '/notice', icon: '📢', title: '공지사항', description: '최신 소식 및 업데이트' }
  ];

  const socialLinks = [
    { href: 'https://github.com', icon: '💻', title: 'GitHub', description: '소스코드 및 이슈' },
    { href: 'https://twitter.com', icon: '🐦', title: 'Twitter', description: '최신 소식' },
    { href: 'mailto:contact@example.com', icon: '📧', title: 'Email', description: '직접 문의' }
  ];

  return (
    <>
      <div className="settings-section">
        <h2>고객지원</h2>
        <p>도움이 필요하시면 아래 링크를 이용해주세요.</p>
        
        <div className="settings-grid">
          {supportLinks.map((link) => (
            <a key={link.href} href={link.href} className="settings-card">
              <div className="settings-card-icon">{link.icon}</div>
              <h3 className="settings-card-title">{link.title}</h3>
              <p className="settings-card-description">{link.description}</p>
            </a>
          ))}
        </div>
      </div>

      <div className="settings-section">
        <h2>정보 및 정책</h2>
        <p>서비스 정책 및 법적 정보를 확인하세요.</p>
        
        <div className="settings-grid">
          {infoLinks.map((link) => (
            <a key={link.href} href={link.href} className="settings-card">
              <div className="settings-card-icon">{link.icon}</div>
              <h3 className="settings-card-title">{link.title}</h3>
              <p className="settings-card-description">{link.description}</p>
            </a>
          ))}
        </div>
      </div>

      <div className="settings-section">
        <h2>소셜 미디어</h2>
        <p>다양한 채널을 통해 소통하세요.</p>
        
        <div className="settings-grid">
          {socialLinks.map((link) => (
            <a 
              key={link.href} 
              href={link.href} 
              className="settings-card"
              target={link.href.startsWith('http') ? '_blank' : '_self'}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              <div className="settings-card-icon">{link.icon}</div>
              <h3 className="settings-card-title">{link.title}</h3>
              <p className="settings-card-description">{link.description}</p>
            </a>
          ))}
        </div>
      </div>

      <div className="settings-section">
        <h2>서비스 정보</h2>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            gap: 'var(--spacing-2)',
            marginBottom: 'var(--spacing-3)'
          }}>
            <span style={{ fontSize: 'var(--font-size-2xl)' }}>📚</span>
            <span style={{ 
              fontSize: 'var(--font-size-xl)', 
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--text-primary)'
            }}>
              책거래
            </span>
          </div>
          <p style={{ 
            color: 'var(--text-secondary)', 
            marginBottom: 'var(--spacing-2)'
          }}>
            온라인 중고 책거래 플랫폼
          </p>
          <p style={{ 
            fontSize: 'var(--font-size-sm)',
            color: 'var(--text-tertiary)'
          }}>
            © {currentYear} 책거래. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
};

export default SupportSettings;
import React, { useState } from 'react';
<<<<<<< HEAD
import { Container, Card, Button } from '@bookstore/common-ui';
=======
>>>>>>> dev

const AccountSettings: React.FC = () => {
  const [isAuthenticated] = useState(false);
  const [user] = useState<{ name: string; email?: string; avatar?: string } | undefined>(
    undefined
  );

  const handleLogout = () => {
    console.log('로그아웃');
    window.location.href = 'http://localhost:5173/signin';
  };

  const handleLogin = () => {
    window.location.href = 'http://localhost:5173/signin';
  };

  const handleSignup = () => {
    window.location.href = 'http://localhost:5173/signup';
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
          계정 관리
        </h1>
        <p style={{ 
          margin: 'var(--spacing-2) 0 0', 
          color: 'var(--text-secondary)' 
        }}>
          로그인 상태를 확인하고 계정을 관리하세요.
        </p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
        <Card>
          {isAuthenticated && user ? (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              padding: 'var(--spacing-4)',
              backgroundColor: 'var(--color-success-50)',
              borderRadius: 'var(--radius-base)',
              border: '1px solid var(--color-success-200)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
                {user.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: 'var(--radius-full)',
                      objectFit: 'cover'
                    }}
                  />
                ) : (
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'var(--color-primary-500)',
                    color: 'var(--color-neutral-0)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 'var(--font-size-lg)',
                    fontWeight: 'var(--font-weight-bold)'
                  }}>
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <div style={{ 
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--text-primary)'
                  }}>
                    {user.name}
                  </div>
                  {user.email && (
                    <div style={{ 
                      fontSize: 'var(--font-size-sm)',
                      color: 'var(--text-secondary)'
                    }}>
                      {user.email}
                    </div>
                  )}
                </div>
              </div>
              <Button
                variant="outline"
                onClick={handleLogout}
              >
                로그아웃
              </Button>
            </div>
          ) : (
            <div style={{
              padding: 'var(--spacing-6)',
              backgroundColor: 'var(--color-neutral-50)',
              borderRadius: 'var(--radius-base)',
              textAlign: 'center',
              border: '1px solid var(--border-secondary)'
            }}>
              <p style={{ 
                marginBottom: 'var(--spacing-4)',
                color: 'var(--text-primary)',
                fontSize: 'var(--font-size-base)'
              }}>
                로그인하여 더 많은 기능을 이용하세요
              </p>
              <div style={{ display: 'flex', gap: 'var(--spacing-3)', justifyContent: 'center' }}>
                <Button variant="primary" onClick={handleLogin}>
                  로그인
                </Button>
                <Button variant="outline" onClick={handleSignup}>
                  회원가입
                </Button>
              </div>
            </div>
          )}
        </Card>

        <Card>
          <header style={{ 
            marginBottom: 'var(--spacing-4)'
          }}>
            <h2 style={{ 
              margin: 0, 
              fontSize: 'var(--font-size-xl)', 
              fontWeight: 'var(--font-weight-bold)' 
            }}>
              서비스 바로가기
            </h2>
            <p style={{ 
              margin: 'var(--spacing-2) 0 0', 
              color: 'var(--text-secondary)' 
            }}>
              다른 서비스로 빠르게 이동하세요.
            </p>
          </header>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'var(--spacing-4)'
          }}>
            <a 
              href="http://localhost:5173" 
              style={{
                display: 'block',
                padding: 'var(--spacing-4)',
                backgroundColor: 'var(--background-secondary)',
                borderRadius: 'var(--radius-base)',
                border: '1px solid var(--border-secondary)',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-primary-50)';
                e.currentTarget.style.borderColor = 'var(--color-primary-200)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--background-secondary)';
                e.currentTarget.style.borderColor = 'var(--border-secondary)';
              }}
            >
              <div style={{ fontSize: 'var(--font-size-2xl)', marginBottom: 'var(--spacing-2)' }}>👤</div>
              <h3 style={{ 
                margin: '0 0 var(--spacing-1)', 
                fontSize: 'var(--font-size-lg)',
                fontWeight: 'var(--font-weight-semibold)'
              }}>
                사용자
              </h3>
              <p style={{ 
                margin: 0, 
                fontSize: 'var(--font-size-sm)',
                color: 'var(--text-secondary)'
              }}>
                사용자 관리 및 프로필
              </p>
            </a>
            
            <a 
              href="http://localhost:5175" 
              style={{
                display: 'block',
                padding: 'var(--spacing-4)',
                backgroundColor: 'var(--background-secondary)',
                borderRadius: 'var(--radius-base)',
                border: '1px solid var(--border-secondary)',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-primary-50)';
                e.currentTarget.style.borderColor = 'var(--color-primary-200)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--background-secondary)';
                e.currentTarget.style.borderColor = 'var(--border-secondary)';
              }}
            >
              <div style={{ fontSize: 'var(--font-size-2xl)', marginBottom: 'var(--spacing-2)' }}>📝</div>
              <h3 style={{ 
                margin: '0 0 var(--spacing-1)', 
                fontSize: 'var(--font-size-lg)',
                fontWeight: 'var(--font-weight-semibold)'
              }}>
                게시글
              </h3>
              <p style={{ 
                margin: 0, 
                fontSize: 'var(--font-size-sm)',
                color: 'var(--text-secondary)'
              }}>
                커뮤니티 게시글
              </p>
            </a>
            
            <a 
              href="http://localhost:5176" 
              style={{
                display: 'block',
                padding: 'var(--spacing-4)',
                backgroundColor: 'var(--background-secondary)',
                borderRadius: 'var(--radius-base)',
                border: '1px solid var(--border-secondary)',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-primary-50)';
                e.currentTarget.style.borderColor = 'var(--color-primary-200)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--background-secondary)';
                e.currentTarget.style.borderColor = 'var(--border-secondary)';
              }}
            >
              <div style={{ fontSize: 'var(--font-size-2xl)', marginBottom: 'var(--spacing-2)' }}>📚</div>
              <h3 style={{ 
                margin: '0 0 var(--spacing-1)', 
                fontSize: 'var(--font-size-lg)',
                fontWeight: 'var(--font-weight-semibold)'
              }}>
                도서
              </h3>
              <p style={{ 
                margin: 0, 
                fontSize: 'var(--font-size-sm)',
                color: 'var(--text-secondary)'
              }}>
                도서 검색 및 관리
              </p>
            </a>
            
            <a 
              href="http://localhost:5177" 
              style={{
                display: 'block',
                padding: 'var(--spacing-4)',
                backgroundColor: 'var(--background-secondary)',
                borderRadius: 'var(--radius-base)',
                border: '1px solid var(--border-secondary)',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-primary-50)';
                e.currentTarget.style.borderColor = 'var(--color-primary-200)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--background-secondary)';
                e.currentTarget.style.borderColor = 'var(--border-secondary)';
              }}
            >
              <div style={{ fontSize: 'var(--font-size-2xl)', marginBottom: 'var(--spacing-2)' }}>💬</div>
              <h3 style={{ 
                margin: '0 0 var(--spacing-1)', 
                fontSize: 'var(--font-size-lg)',
                fontWeight: 'var(--font-weight-semibold)'
              }}>
                채팅
              </h3>
              <p style={{ 
                margin: 0, 
                fontSize: 'var(--font-size-sm)',
                color: 'var(--text-secondary)'
              }}>
                실시간 채팅
              </p>
            </a>
            
            <a 
              href="http://localhost:5174" 
              style={{
                display: 'block',
                padding: 'var(--spacing-4)',
                backgroundColor: 'var(--background-secondary)',
                borderRadius: 'var(--radius-base)',
                border: '1px solid var(--border-secondary)',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-primary-50)';
                e.currentTarget.style.borderColor = 'var(--color-primary-200)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--background-secondary)';
                e.currentTarget.style.borderColor = 'var(--border-secondary)';
              }}
            >
              <div style={{ fontSize: 'var(--font-size-2xl)', marginBottom: 'var(--spacing-2)' }}>🔔</div>
              <h3 style={{ 
                margin: '0 0 var(--spacing-1)', 
                fontSize: 'var(--font-size-lg)',
                fontWeight: 'var(--font-weight-semibold)'
              }}>
                알림
              </h3>
              <p style={{ 
                margin: 0, 
                fontSize: 'var(--font-size-sm)',
                color: 'var(--text-secondary)'
              }}>
                시스템 알림
              </p>
            </a>
            
            <a 
              href="http://localhost:5178" 
              style={{
                display: 'block',
                padding: 'var(--spacing-4)',
                backgroundColor: 'var(--background-secondary)',
                borderRadius: 'var(--radius-base)',
                border: '1px solid var(--border-secondary)',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-primary-50)';
                e.currentTarget.style.borderColor = 'var(--color-primary-200)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--background-secondary)';
                e.currentTarget.style.borderColor = 'var(--border-secondary)';
              }}
            >
              <div style={{ fontSize: 'var(--font-size-2xl)', marginBottom: 'var(--spacing-2)' }}>💰</div>
              <h3 style={{ 
                margin: '0 0 var(--spacing-1)', 
                fontSize: 'var(--font-size-lg)',
                fontWeight: 'var(--font-weight-semibold)'
              }}>
                거래
              </h3>
              <p style={{ 
                margin: 0, 
                fontSize: 'var(--font-size-sm)',
                color: 'var(--text-secondary)'
              }}>
                도서 거래
              </p>
            </a>
            
            <a 
              href="http://localhost:5179" 
              style={{
                display: 'block',
                padding: 'var(--spacing-4)',
                backgroundColor: 'var(--background-secondary)',
                borderRadius: 'var(--radius-base)',
                border: '1px solid var(--border-secondary)',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-primary-50)';
                e.currentTarget.style.borderColor = 'var(--color-primary-200)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--background-secondary)';
                e.currentTarget.style.borderColor = 'var(--border-secondary)';
              }}
            >
              <div style={{ fontSize: 'var(--font-size-2xl)', marginBottom: 'var(--spacing-2)' }}>⭐</div>
              <h3 style={{ 
                margin: '0 0 var(--spacing-1)', 
                fontSize: 'var(--font-size-lg)',
                fontWeight: 'var(--font-weight-semibold)'
              }}>
                위시리스트
              </h3>
              <p style={{ 
                margin: 0, 
                fontSize: 'var(--font-size-sm)',
                color: 'var(--text-secondary)'
              }}>
                관심 도서
              </p>
            </a>
          </div>
        </Card>
      </div>
    </Container>
=======
    <>
      <div className="settings-section">
        <h2>계정 관리</h2>
        <p>로그인 상태를 확인하고 계정을 관리하세요.</p>
        
        {isAuthenticated && user ? (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            padding: 'var(--spacing-4)',
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: 'var(--radius-base)',
            marginTop: 'var(--spacing-4)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
              {user.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: 'var(--radius-full)',
                    objectFit: 'cover'
                  }}
                />
              ) : (
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--color-primary-500)',
                  color: 'var(--color-neutral-0)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'var(--font-size-lg)',
                  fontWeight: 'var(--font-weight-bold)'
                }}>
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <div style={{ 
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--text-primary)'
                }}>
                  {user.name}
                </div>
                {user.email && (
                  <div style={{ 
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--text-secondary)'
                  }}>
                    {user.email}
                  </div>
                )}
              </div>
            </div>
            <button
              className="btn-secondary"
              onClick={handleLogout}
              style={{ backgroundColor: 'var(--color-error)', color: 'var(--color-neutral-0)' }}
            >
              로그아웃
            </button>
          </div>
        ) : (
          <div style={{
            padding: 'var(--spacing-6)',
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: 'var(--radius-base)',
            textAlign: 'center',
            marginTop: 'var(--spacing-4)'
          }}>
            <p style={{ marginBottom: 'var(--spacing-4)' }}>
              로그인하여 더 많은 기능을 이용하세요
            </p>
            <div style={{ display: 'flex', gap: 'var(--spacing-3)', justifyContent: 'center' }}>
              <button className="btn-primary" onClick={handleLogin}>
                로그인
              </button>
              <button className="btn-secondary" onClick={handleSignup}>
                회원가입
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="settings-section">
        <h2>서비스 바로가기</h2>
        <p>다른 서비스로 빠르게 이동하세요.</p>
        
        <div className="settings-grid">
          <a href="http://localhost:5173" className="settings-card">
            <div className="settings-card-icon">👤</div>
            <h3 className="settings-card-title">사용자</h3>
            <p className="settings-card-description">사용자 관리 및 프로필</p>
          </a>
          
          <a href="http://localhost:5175" className="settings-card">
            <div className="settings-card-icon">📝</div>
            <h3 className="settings-card-title">게시글</h3>
            <p className="settings-card-description">커뮤니티 게시글</p>
          </a>
          
          <a href="http://localhost:5176/book/" className="settings-card">
            <div className="settings-card-icon">📚</div>
            <h3 className="settings-card-title">도서</h3>
            <p className="settings-card-description">도서 검색 및 관리</p>
          </a>
          
          <a href="http://localhost:5177/chat/" className="settings-card">
            <div className="settings-card-icon">💬</div>
            <h3 className="settings-card-title">채팅</h3>
            <p className="settings-card-description">실시간 채팅</p>
          </a>
          
          <a href="http://localhost:5174" className="settings-card">
            <div className="settings-card-icon">🔔</div>
            <h3 className="settings-card-title">알림</h3>
            <p className="settings-card-description">시스템 알림</p>
          </a>
          
          <a href="http://localhost:5178" className="settings-card">
            <div className="settings-card-icon">💰</div>
            <h3 className="settings-card-title">거래</h3>
            <p className="settings-card-description">도서 거래</p>
          </a>
          
          <a href="http://localhost:5179" className="settings-card">
            <div className="settings-card-icon">⭐</div>
            <h3 className="settings-card-title">위시리스트</h3>
            <p className="settings-card-description">관심 도서</p>
          </a>
        </div>
      </div>
    </>
>>>>>>> dev
  );
};

export default AccountSettings;
import React, { useState } from 'react';

import { Container, Card, Button } from '@bookstore/common-ui';


const AccountSettings: React.FC = () => {
  const [isAuthenticated] = useState(false);
  const [user] = useState<{ name: string; email?: string; avatar?: string } | undefined>(
    undefined
  );

  const handleLogout = () => {
    console.log('Î°úÍ∑∏?ÑÏõÉ');
    window.location.href = 'http://localhost:5173/signin';
  };

  const handleLogin = () => {
    window.location.href = 'http://localhost:5173/signin';
  };

  const handleSignup = () => {
    window.location.href = 'http://localhost:5173/signup';
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
          Í≥ÑÏ†ï Í¥ÄÎ¶?
        </h1>
        <p style={{ 
          margin: 'var(--spacing-2) 0 0', 
          color: 'var(--text-secondary)' 
        }}>
          Î°úÍ∑∏???ÅÌÉúÎ•??ïÏù∏?òÍ≥† Í≥ÑÏ†ï??Í¥ÄÎ¶¨Ìïò?∏Ïöî.
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
                Î°úÍ∑∏?ÑÏõÉ
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
                Î°úÍ∑∏?∏Ìïò????ÎßéÏ? Í∏∞Îä•???¥Ïö©?òÏÑ∏??
              </p>
              <div style={{ display: 'flex', gap: 'var(--spacing-3)', justifyContent: 'center' }}>
                <Button variant="primary" onClick={handleLogin}>
                  Î°úÍ∑∏??
                </Button>
                <Button variant="outline" onClick={handleSignup}>
                  ?åÏõêÍ∞Ä??
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
              ?úÎπÑ??Î∞îÎ°úÍ∞ÄÍ∏?
            </h2>
            <p style={{ 
              margin: 'var(--spacing-2) 0 0', 
              color: 'var(--text-secondary)' 
            }}>
              ?§Î•∏ ?úÎπÑ?§Î°ú Îπ†Î•¥Í≤??¥Îèô?òÏÑ∏??
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
              <div style={{ fontSize: 'var(--font-size-2xl)', marginBottom: 'var(--spacing-2)' }}>?ë§</div>
              <h3 style={{ 
                margin: '0 0 var(--spacing-1)', 
                fontSize: 'var(--font-size-lg)',
                fontWeight: 'var(--font-weight-semibold)'
              }}>
                ?¨Ïö©??
              </h3>
              <p style={{ 
                margin: 0, 
                fontSize: 'var(--font-size-sm)',
                color: 'var(--text-secondary)'
              }}>
                ?¨Ïö©??Í¥ÄÎ¶?Î∞??ÑÎ°ú??
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
              <div style={{ fontSize: 'var(--font-size-2xl)', marginBottom: 'var(--spacing-2)' }}>?ìù</div>
              <h3 style={{ 
                margin: '0 0 var(--spacing-1)', 
                fontSize: 'var(--font-size-lg)',
                fontWeight: 'var(--font-weight-semibold)'
              }}>
                Í≤åÏãúÍ∏Ä
              </h3>
              <p style={{ 
                margin: 0, 
                fontSize: 'var(--font-size-sm)',
                color: 'var(--text-secondary)'
              }}>
                Ïª§Î??àÌã∞ Í≤åÏãúÍ∏Ä
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
              <div style={{ fontSize: 'var(--font-size-2xl)', marginBottom: 'var(--spacing-2)' }}>?ìö</div>
              <h3 style={{ 
                margin: '0 0 var(--spacing-1)', 
                fontSize: 'var(--font-size-lg)',
                fontWeight: 'var(--font-weight-semibold)'
              }}>
                ?ÑÏÑú
              </h3>
              <p style={{ 
                margin: 0, 
                fontSize: 'var(--font-size-sm)',
                color: 'var(--text-secondary)'
              }}>
                ?ÑÏÑú Í≤Ä??Î∞?Í¥ÄÎ¶?
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
              <div style={{ fontSize: 'var(--font-size-2xl)', marginBottom: 'var(--spacing-2)' }}>?í¨</div>
              <h3 style={{ 
                margin: '0 0 var(--spacing-1)', 
                fontSize: 'var(--font-size-lg)',
                fontWeight: 'var(--font-weight-semibold)'
              }}>
                Ï±ÑÌåÖ
              </h3>
              <p style={{ 
                margin: 0, 
                fontSize: 'var(--font-size-sm)',
                color: 'var(--text-secondary)'
              }}>
                ?§ÏãúÍ∞?Ï±ÑÌåÖ
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
              <div style={{ fontSize: 'var(--font-size-2xl)', marginBottom: 'var(--spacing-2)' }}>?îî</div>
              <h3 style={{ 
                margin: '0 0 var(--spacing-1)', 
                fontSize: 'var(--font-size-lg)',
                fontWeight: 'var(--font-weight-semibold)'
              }}>
                ?åÎ¶º
              </h3>
              <p style={{ 
                margin: 0, 
                fontSize: 'var(--font-size-sm)',
                color: 'var(--text-secondary)'
              }}>
                ?úÏä§???åÎ¶º
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
              <div style={{ fontSize: 'var(--font-size-2xl)', marginBottom: 'var(--spacing-2)' }}>?í∞</div>
              <h3 style={{ 
                margin: '0 0 var(--spacing-1)', 
                fontSize: 'var(--font-size-lg)',
                fontWeight: 'var(--font-weight-semibold)'
              }}>
                Í±∞Îûò
              </h3>
              <p style={{ 
                margin: 0, 
                fontSize: 'var(--font-size-sm)',
                color: 'var(--text-secondary)'
              }}>
                ?ÑÏÑú Í±∞Îûò
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
              <div style={{ fontSize: 'var(--font-size-2xl)', marginBottom: 'var(--spacing-2)' }}>‚≠?/div>
              <h3 style={{ 
                margin: '0 0 var(--spacing-1)', 
                fontSize: 'var(--font-size-lg)',
                fontWeight: 'var(--font-weight-semibold)'
              }}>
                ?ÑÏãúÎ¶¨Ïä§??
              </h3>
              <p style={{ 
                margin: 0, 
                fontSize: 'var(--font-size-sm)',
                color: 'var(--text-secondary)'
              }}>
                Í¥Ä???ÑÏÑú
              </p>
            </a>
          </div>
        </Card>
      </div>
    </Container>

  );
};

export default AccountSettings;
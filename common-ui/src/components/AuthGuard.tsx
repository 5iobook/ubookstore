import React, { useEffect, useState } from 'react';
import { Container, Card, Button } from '../index';
import Onboarding from './Onboarding';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthGuardProps {
  children: React.ReactNode;
  serviceName?: string;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children, serviceName = '서비스' }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // 로컬 스토리지에서 토큰 확인
      const token = localStorage.getItem('authToken');
      const userData = localStorage.getItem('userData');
      const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
      
      if (token && userData) {
        // 토큰이 있으면 서버에서 유효성 검증 (실제 구현에서는 API 호출)
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsAuthenticated(true);
        
        // 온보딩을 본 적이 없다면 표시
        if (!hasSeenOnboarding) {
          setShowOnboarding(true);
        }
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('인증 상태 확인 실패:', error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    // 간단한 모의 로그인 (실제로는 OAuth나 로그인 서버로 리다이렉트)
    const mockUser = {
      id: '1',
      name: '사용자',
      email: 'user@example.com'
    };
    
    const mockToken = 'mock-jwt-token-' + Date.now();
    
    localStorage.setItem('authToken', mockToken);
    localStorage.setItem('userData', JSON.stringify(mockUser));
    
    setUser(mockUser);
    setIsAuthenticated(true);
    
    // 새로 로그인한 사용자에게는 온보딩 표시
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    if (!hasSeenOnboarding) {
      setShowOnboarding(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    localStorage.removeItem('hasSeenOnboarding');
    setUser(null);
    setIsAuthenticated(false);
    setShowOnboarding(false);
  };

  const handleOnboardingComplete = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    setShowOnboarding(false);
  };

  if (loading) {
    return (
      <Container maxWidth="md" style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh' 
      }}>
        <div>로딩 중...</div>
      </Container>
    );
  }

  if (!isAuthenticated) {
    return (
      <Container maxWidth="md" style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh' 
      }}>
        <Card style={{ padding: '2rem', textAlign: 'center', maxWidth: '400px' }}>
          <h2 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
            로그인이 필요합니다
          </h2>
          <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>
            {serviceName}를 이용하려면 로그인해주세요.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Button variant="primary" onClick={handleLogin}>
              로그인
            </Button>
            <Button variant="outline" onClick={() => window.location.href = '/'}>
              홈으로
            </Button>
          </div>
          <div style={{ 
            marginTop: '2rem', 
            padding: '1rem', 
            backgroundColor: 'var(--bg-secondary)', 
            borderRadius: 'var(--radius-base)',
            fontSize: 'var(--font-size-sm)',
            color: 'var(--text-tertiary)'
          }}>
            <p>데모용 로그인: 위의 "로그인" 버튼을 클릭하면 자동으로 로그인됩니다.</p>
          </div>
        </Card>
      </Container>
    );
  }

  return (
    <div>
      {/* 온보딩 표시 */}
      {showOnboarding && (
        <Onboarding onComplete={handleOnboardingComplete} />
      )}
      
      {/* 로그인된 사용자 정보 표시 */}
      <div style={{
        position: 'fixed',
        top: '1rem',
        right: '1rem',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem 1rem',
        backgroundColor: 'var(--bg-primary)',
        border: '1px solid var(--border-primary)',
        borderRadius: 'var(--radius-base)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
          {user?.name}님
        </span>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleLogout}
          style={{ fontSize: 'var(--font-size-xs)', padding: '0.25rem 0.5rem' }}
        >
          로그아웃
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setShowOnboarding(true)}
          style={{ fontSize: 'var(--font-size-xs)', padding: '0.25rem 0.5rem' }}
        >
          튜토리얼
        </Button>
      </div>
      
      {children}
    </div>
  );
};

export default AuthGuard;
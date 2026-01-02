import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppLayout, ErrorBoundary, NetworkStatusBanner, Loading } from '@bookstore/common-ui';
import './styles-common.css';
import './App.css';

// Code Splitting: Lazy load page components
const UserList = lazy(() => import('./pages/UserList'));
const UserDetail = lazy(() => import('./pages/UserDetail'));
const UserForm = lazy(() => import('./pages/UserForm'));
const SignupForm = lazy(() => import('./pages/SignupForm'));
const SigninForm = lazy(() => import('./pages/SigninForm'));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function App() {
  const navItems = [
    { label: '사용자 목록', path: '/' },
    { label: '사용자 등록', path: '/new' },
    { label: '회원가입', path: '/signup' },
    { label: '로그인', path: '/signin' }
  ];

  return (
    <ErrorBoundary>
      <Router>
        {/* Skip to main content link for keyboard users */}
        <a href="#main-content" className="skip-link">
          메인 콘텐츠로 건너뛰기
        </a>

        <NetworkStatusBanner />

        <AppLayout 
          title="사용자 관리" 
          navItems={navItems}
          pageTitle="사용자 관리"
          pageDescription="사용자 계정을 관리하고 회원가입, 로그인 기능을 제공합니다."
        >
          <main id="main-content" role="main">
            <Suspense fallback={<Loading size="lg" text="페이지 로딩 중..." />}>
              <Routes>
                <Route path="/" element={<UserList />} />
                <Route path="/user/:id" element={<UserDetail />} />
                <Route path="/new" element={<UserForm />} />
                <Route path="/signup" element={<SignupForm />} />
                <Route path="/signin" element={<SigninForm />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </main>
        </AppLayout>
      </Router>
    </ErrorBoundary>
  );
}

export default App;

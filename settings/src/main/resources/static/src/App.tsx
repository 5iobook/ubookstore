import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppLayout, ErrorBoundary, NetworkStatusBanner, Loading } from '@bookstore/common-ui';
import './styles-common.css';
import './App.css';

// Code Splitting: Lazy load page components
const SettingsOverview = lazy(() => import('./pages/SettingsOverview'));
const AccountSettings = lazy(() => import('./pages/AccountSettings'));
const ProfileSettings = lazy(() => import('./pages/ProfileSettings'));
const PreferencesSettings = lazy(() => import('./pages/PreferencesSettings'));
const NotificationSettings = lazy(() => import('./pages/NotificationSettings'));
const PrivacySettings = lazy(() => import('./pages/PrivacySettings'));
const SupportSettings = lazy(() => import('./pages/SupportSettings'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function App() {
  const navItems = [
    { label: '설정 개요', path: '/' },
    { label: '계정 관리', path: '/account' },
    { label: '프로필 설정', path: '/profile' },
    { label: '환경 설정', path: '/preferences' },
    { label: '알림 설정', path: '/notifications' },
    { label: '개인정보 설정', path: '/privacy' },
    { label: '고객지원', path: '/support' }
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
          title="설정" 
          navItems={navItems}
          pageTitle="시스템 설정"
          pageDescription="개인 프로필, 환경 설정, 알림 및 개인정보 보호 설정을 관리하세요."
        >
          <main id="main-content" role="main">
            <Suspense fallback={<Loading size="lg" text="페이지 로딩 중..." />}>
              <Routes>
                <Route path="/" element={<SettingsOverview />} />
                <Route path="/account" element={<AccountSettings />} />
                <Route path="/profile" element={<ProfileSettings />} />
                <Route path="/preferences" element={<PreferencesSettings />} />
                <Route path="/notifications" element={<NotificationSettings />} />
                <Route path="/privacy" element={<PrivacySettings />} />
                <Route path="/support" element={<SupportSettings />} />
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
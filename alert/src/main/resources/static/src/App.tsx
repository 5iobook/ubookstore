import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppLayout, ErrorBoundary, NetworkStatusBanner, Loading } from '@bookstore/common-ui';
import './styles-common.css';
import './App.css';

// Code Splitting: Lazy load page components
const AlertList = lazy(() => import('./pages/AlertList'));
const AlertDetail = lazy(() => import('./pages/AlertDetail'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function App() {
  const navItems = [
    { label: '알림 목록', path: '/' }
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
          title="알림" 
          navItems={navItems}
          pageTitle="알림 관리"
          pageDescription="시스템 알림과 메시지를 확인하고 관리하세요."
        >
          <main id="main-content" role="main">
            <Suspense fallback={<Loading size="lg" text="페이지 로딩 중..." />}>
              <Routes>
                <Route path="/" element={<AlertList />} />
                <Route path="/alert/:id" element={<AlertDetail />} />
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

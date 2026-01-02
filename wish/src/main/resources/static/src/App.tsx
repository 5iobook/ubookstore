import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
<<<<<<< HEAD
import { AppLayout, ErrorBoundary, NetworkStatusBanner, Loading, AuthGuard } from '@bookstore/common-ui';
=======
import { AppLayout, ErrorBoundary, NetworkStatusBanner, Loading } from '@bookstore/common-ui';
>>>>>>> dev
import './styles-common.css';
import './App.css';

// Code Splitting: Lazy load page components
const WishList = lazy(() => import('./pages/WishList'));
const WishForm = lazy(() => import('./pages/WishForm'));

function App() {
  const navItems = [
    { label: '위시리스트 목록', path: '/' },
    { label: '위시리스트 추가', path: '/new' }
  ];

  return (
<<<<<<< HEAD
    <AuthGuard serviceName="위시리스트 서비스">
      <ErrorBoundary>
        <Router>
          <a href="#main-content" className="skip-link">
            메인 콘텐츠로 건너뛰기
          </a>

          <NetworkStatusBanner />

          <AppLayout 
            title="위시리스트" 
            navItems={navItems}
            pageTitle="위시리스트"
            pageDescription="관심 있는 도서를 저장하고 관리하세요."
          >
            <main id="main-content" role="main">
              <Suspense fallback={<Loading size="lg" text="페이지 로딩 중..." />}>
                <Routes>
                  <Route path="/" element={<WishList />} />
                  <Route path="/new" element={<WishForm />} />
                </Routes>
              </Suspense>
            </main>
          </AppLayout>
        </Router>
      </ErrorBoundary>
    </AuthGuard>
=======
    <ErrorBoundary>
      <Router>
        <a href="#main-content" className="skip-link">
          메인 콘텐츠로 건너뛰기
        </a>

        <NetworkStatusBanner />

        <AppLayout 
          title="위시리스트" 
          navItems={navItems}
          pageTitle="위시리스트"
          pageDescription="관심 있는 도서를 저장하고 관리하세요."
        >
          <main id="main-content" role="main">
            <Suspense fallback={<Loading size="lg" text="페이지 로딩 중..." />}>
              <Routes>
                <Route path="/" element={<WishList />} />
                <Route path="/new" element={<WishForm />} />
              </Routes>
            </Suspense>
          </main>
        </AppLayout>
      </Router>
    </ErrorBoundary>
>>>>>>> dev
  );
}

export default App;

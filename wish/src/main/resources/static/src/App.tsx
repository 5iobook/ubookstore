import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AppLayout, ErrorBoundary, NetworkStatusBanner, Loading, AuthGuard } from '@bookstore/common-ui';

import './styles-common.css';
import './App.css';

// Code Splitting: Lazy load page components
const WishList = lazy(() => import('./pages/WishList'));
const WishForm = lazy(() => import('./pages/WishForm'));

function App() {
  const navItems = [
    { label: '?�시리스??목록', path: '/' },
    { label: '?�시리스??추�?', path: '/new' }
  ];

  return (

    <AuthGuard serviceName="?�시리스???�비??>
      <ErrorBoundary>
        <Router>
          <a href="#main-content" className="skip-link">
            메인 콘텐츠로 건너?�기
          </a>

          <NetworkStatusBanner />

          <AppLayout 
            title="?�시리스?? 
            navItems={navItems}
            pageTitle="?�시리스??
            pageDescription="관???�는 ?�서�??�?�하�?관리하?�요."
          >
            <main id="main-content" role="main">
              <Suspense fallback={<Loading size="lg" text="?�이지 로딩 �?.." />}>
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

  );
}

export default App;

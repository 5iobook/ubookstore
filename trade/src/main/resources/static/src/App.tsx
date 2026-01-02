import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AppLayout, ErrorBoundary, NetworkStatusBanner, Loading, AuthGuard } from '@bookstore/common-ui';

import './styles-common.css';
import './App.css';

// Code Splitting: Lazy load page components
const TradeList = lazy(() => import('./pages/TradeList'));
const TradeDetail = lazy(() => import('./pages/TradeDetail'));
const TradeForm = lazy(() => import('./pages/TradeForm'));
const MyTrades = lazy(() => import('./pages/MyTrades'));

function App() {
  const navItems = [
    { label: '거래 목록', path: '/' },

    { label: '거래 ?�록', path: '/new' },

    { label: '??거래', path: '/my-trades' }
  ];

  return (

    <AuthGuard serviceName="?�서 거래 ?�비??>
      <ErrorBoundary>
        <Router>
          <a href="#main-content" className="skip-link">
            메인 콘텐츠로 건너?�기
          </a>

          <NetworkStatusBanner />

          <AppLayout 
            title="거래" 
            navItems={navItems}
            pageTitle="?�서 거래"
            pageDescription="중고 ?�서�??�고?�고 거래 ?�역??관리하?�요."
          >
            <main id="main-content" role="main">
              <Suspense fallback={<Loading size="lg" text="?�이지 로딩 �?.." />}>
                <Routes>
                  <Route path="/" element={<TradeList />} />
                  <Route path="/trade/:id" element={<TradeDetail />} />
                  <Route path="/new" element={<TradeForm />} />
                  <Route path="/my-trades" element={<MyTrades />} />
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

# Error Handling Components

에러 처리 UI 컴포넌트 사용 가이드

## 컴포넌트 목록

### 1. ErrorBoundary
React 컴포넌트 트리에서 발생하는 JavaScript 에러를 캐치하는 컴포넌트

### 2. ErrorFallback
네트워크 에러, 404, 500 등 다양한 에러 상황에 대한 폴백 UI

### 3. ServiceStatus
MSA 백엔드 서비스별 상태를 표시하는 컴포넌트

### 4. NetworkStatusBanner
네트워크 연결 상태를 실시간으로 표시하는 배너

## 사용 예제

### ErrorBoundary 사용

```tsx
import { ErrorBoundary } from './components/common';

function App() {
  return (
    <ErrorBoundary
      onError={(error, errorInfo) => {
        // 에러 로깅 서비스로 전송
        console.error('Error caught:', error, errorInfo);
      }}
    >
      <YourApp />
    </ErrorBoundary>
  );
}
```

### 커스텀 폴백 UI 사용

```tsx
import { ErrorBoundary } from './components/common';

function App() {
  return (
    <ErrorBoundary
      fallback={
        <div>
          <h1>앗! 문제가 발생했습니다</h1>
          <button onClick={() => window.location.reload()}>
            새로고침
          </button>
        </div>
      }
    >
      <YourApp />
    </ErrorBoundary>
  );
}
```

### ErrorFallback 사용

```tsx
import { ErrorFallback } from './components/common';

// 네트워크 에러
function NetworkErrorPage() {
  return (
    <ErrorFallback
      type="network"
      onRetry={() => window.location.reload()}
    />
  );
}

// 404 에러
function NotFoundPage() {
  return (
    <ErrorFallback
      type="404"
      message="요청하신 페이지를 찾을 수 없습니다."
      showHomeButton={true}
    />
  );
}

// 500 에러
function ServerErrorPage() {
  return (
    <ErrorFallback
      type="500"
      message="서버에서 오류가 발생했습니다."
      onRetry={() => window.location.reload()}
    />
  );
}

// 서비스 다운
function ServiceDownPage() {
  return (
    <ErrorFallback
      type="service-down"
      serviceName="도서 서비스"
      message="도서 서비스가 일시적으로 사용 불가능합니다."
      onRetry={handleRetry}
    />
  );
}
```

### ServiceStatus 사용

```tsx
import { ServiceStatus } from './components/common';
import { useState, useEffect } from 'react';

function BookListPage() {
  const [serviceStatus, setServiceStatus] = useState<'online' | 'offline' | 'degraded'>('online');

  useEffect(() => {
    // 서비스 상태 체크
    checkServiceHealth()
      .then(() => setServiceStatus('online'))
      .catch(() => setServiceStatus('offline'));
  }, []);

  return (
    <div>
      <ServiceStatus
        service="book"
        status={serviceStatus}
        message="도서 서비스가 일시적으로 느려질 수 있습니다."
        onRetry={() => window.location.reload()}
      />
      {/* 페이지 컨텐츠 */}
    </div>
  );
}
```

### NetworkStatusBanner 사용

```tsx
import { NetworkStatusBanner } from './components/common';

function App() {
  return (
    <div>
      <NetworkStatusBanner />
      {/* 앱 컨텐츠 */}
    </div>
  );
}
```

### API 에러 처리 예제

```tsx
import { parseApiError, logError } from '../utils/errorHandler';
import { ErrorFallback } from '../components/common';
import { useState, useEffect } from 'react';

function UserListPage() {
  const [error, setError] = useState<ApiError | null>(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers()
      .then(setUsers)
      .catch((err) => {
        const apiError = parseApiError(err);
        setError(apiError);
        logError(err, { page: 'UserList' });
      });
  }, []);

  if (error) {
    return (
      <ErrorFallback
        type={error.type}
        message={error.message}
        onRetry={() => {
          setError(null);
          window.location.reload();
        }}
      />
    );
  }

  return (
    <div>
      {/* 사용자 목록 렌더링 */}
    </div>
  );
}
```

### useNetworkStatus Hook 사용

```tsx
import { useNetworkStatus } from '../hooks';

function MyComponent() {
  const { isOnline, wasOffline } = useNetworkStatus();

  if (!isOnline) {
    return <div>오프라인 상태입니다.</div>;
  }

  if (wasOffline) {
    return <div>다시 온라인 상태가 되었습니다!</div>;
  }

  return <div>정상 작동 중</div>;
}
```

## 라우팅에 에러 페이지 추가

```tsx
import { Routes, Route } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';
import ServerErrorPage from './pages/ServerErrorPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/users" element={<UserListPage />} />
      {/* 404 페이지 - 모든 매칭되지 않는 경로 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
```

## 에러 로깅

프로덕션 환경에서는 에러를 외부 서비스로 전송하는 것을 권장합니다:

```tsx
import * as Sentry from '@sentry/react';

// ErrorBoundary에서 에러 로깅
<ErrorBoundary
  onError={(error, errorInfo) => {
    if (process.env.NODE_ENV === 'production') {
      Sentry.captureException(error, {
        extra: errorInfo,
      });
    }
  }}
>
  <App />
</ErrorBoundary>
```

## 베스트 프랙티스

1. **전역 ErrorBoundary**: 앱의 최상위에 ErrorBoundary를 배치하여 모든 에러를 캐치
2. **세분화된 ErrorBoundary**: 중요한 섹션마다 별도의 ErrorBoundary를 사용하여 부분적인 에러 처리
3. **에러 로깅**: 프로덕션에서는 항상 에러를 로깅 서비스로 전송
4. **사용자 친화적 메시지**: 기술적인 에러 메시지 대신 사용자가 이해하기 쉬운 메시지 제공
5. **재시도 옵션**: 가능한 경우 사용자가 재시도할 수 있는 옵션 제공
6. **네트워크 상태 모니터링**: NetworkStatusBanner를 사용하여 실시간 연결 상태 표시

## 요구사항 충족

이 구현은 다음 요구사항을 충족합니다:

- **Requirement 7.5**: MSA 백엔드 서비스가 응답하지 않을 때 서비스별 폴백 UI 표시
- 전역 에러 캐치 및 폴백 UI 표시
- 에러 로깅 (개발/프로덕션 환경 구분)
- 네트워크 에러, 404, 500, 서비스 다운 등 다양한 에러 시나리오 처리
- 사용자 친화적인 에러 메시지 및 재시도 옵션 제공

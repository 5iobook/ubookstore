# Custom Hooks

이 디렉토리는 디자인 시스템에서 사용하는 커스텀 React 훅을 포함합니다.

## 📚 Available Hooks

### 1. useTheme

다크 모드 토글 및 테마 관리를 위한 훅입니다.

**Features:**
- 다크/라이트 모드 전환
- 로컬 스토리지 연동
- 시스템 테마 감지
- CSS 변수 자동 적용

**Usage:**

```tsx
import { ThemeProvider, useTheme } from './hooks';

// App.tsx - Wrap your app with ThemeProvider
function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  );
}

// Component.tsx - Use the hook
function Component() {
  const { theme, isDarkMode, toggleDarkMode } = useTheme();
  
  return (
    <button onClick={toggleDarkMode}>
      {isDarkMode ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
}
```

### 2. useMediaQuery

반응형 브레이크포인트 감지 및 디바이스 타입 판별을 위한 훅입니다.

**Features:**
- 모바일/태블릿/데스크톱 감지
- 현재 브레이크포인트 추적
- 뷰포트 크기 제공
- 실시간 리사이즈 감지

**Usage:**

```tsx
import { useMediaQuery } from './hooks';

function ResponsiveComponent() {
  const { isMobile, isTablet, isDesktop, currentBreakpoint } = useMediaQuery();
  
  return (
    <div>
      {isMobile && <MobileNav />}
      {isDesktop && <DesktopNav />}
      <p>Current breakpoint: {currentBreakpoint}</p>
    </div>
  );
}
```

**Additional Hooks:**

```tsx
// Check specific breakpoint
const isLargeScreen = useBreakpoint('lg');

// Custom media query
const isPortrait = useCustomMediaQuery('(orientation: portrait)');

// Get orientation
const orientation = useOrientation(); // 'portrait' | 'landscape'

// Get viewport size
const { width, height } = useViewportSize();
```

### 3. useToast

토스트 알림 시스템을 위한 훅입니다.

**Features:**
- 성공/에러/경고/정보 토스트
- 자동 사라짐 타이머
- 여러 토스트 큐 관리
- 커스텀 액션 버튼
- 위치 설정 가능

**Usage:**

```tsx
import { ToastProvider, useToast } from './hooks';

// App.tsx - Wrap your app with ToastProvider
function App() {
  return (
    <ToastProvider maxToasts={5} position="top-right">
      <YourApp />
    </ToastProvider>
  );
}

// Component.tsx - Use the hook
function Component() {
  const { success, error, warning, info, showToast } = useToast();
  
  const handleSave = async () => {
    try {
      await saveData();
      success('저장되었습니다!');
    } catch (err) {
      error('저장에 실패했습니다');
    }
  };
  
  const handleNotification = () => {
    showToast({
      type: 'info',
      message: '새 메시지가 도착했습니다',
      duration: 10000,
      action: {
        label: '보기',
        onClick: () => navigate('/messages')
      }
    });
  };
  
  return (
    <div>
      <button onClick={handleSave}>저장</button>
      <button onClick={handleNotification}>알림 표시</button>
    </div>
  );
}
```

## 🎯 Requirements Mapping

### useTheme
- **Requirement 4.4**: 라이트 모드와 다크 모드 지원

### useMediaQuery
- **Requirement 1.2**: 모바일 기기에서 터치 친화적인 인터페이스 제공
- **Requirement 1.3**: 데스크톱에서 넓은 화면을 효율적으로 활용
- **Requirement 1.4**: 최소 320px 너비부터 1920px 너비까지 지원

### useToast
- **Requirement 5.3**: 로딩 상태를 명확하게 표시
- **Requirement 6.2**: 유효성 검증 실패 시 명확한 에러 메시지 표시
- **Requirement 6.4**: 에러, 경고, 성공, 정보 상태를 구분하는 색상 시스템

## 🔧 Implementation Details

### useTheme
- 로컬 스토리지 키: `app-theme-mode`
- CSS 변수 자동 적용 (`--color-*`)
- `data-theme` 속성 설정 (CSS 타겟팅용)
- 시스템 테마 변경 감지 (`prefers-color-scheme`)

### useMediaQuery
- 브레이크포인트: xs(320px), sm(640px), md(768px), lg(1024px), xl(1280px), 2xl(1536px)
- 디바이스 타입:
  - Mobile: < 768px
  - Tablet: 768px ~ 1023px
  - Desktop: >= 1024px
  - Large Desktop: >= 1280px

### useToast
- 최대 토스트 수: 기본 5개 (설정 가능)
- 기본 지속 시간: 5000ms
- 위치 옵션: top-left, top-center, top-right, bottom-left, bottom-center, bottom-right
- z-index: 9999

## 📝 Best Practices

1. **Provider 설정**: 앱의 최상위 레벨에서 Provider를 설정하세요
2. **에러 처리**: 훅은 Provider 외부에서 사용 시 에러를 발생시킵니다
3. **성능**: 모든 훅은 메모이제이션과 최적화가 적용되어 있습니다
4. **타입 안정성**: TypeScript 타입 정의가 완전히 제공됩니다

## 🧪 Testing

각 훅은 다음과 같이 테스트할 수 있습니다:

```tsx
import { renderHook, act } from '@testing-library/react';
import { useTheme, ThemeProvider } from './hooks';

test('toggleDarkMode changes theme', () => {
  const wrapper = ({ children }) => <ThemeProvider>{children}</ThemeProvider>;
  const { result } = renderHook(() => useTheme(), { wrapper });
  
  expect(result.current.isDarkMode).toBe(false);
  
  act(() => {
    result.current.toggleDarkMode();
  });
  
  expect(result.current.isDarkMode).toBe(true);
});
```

## 🔗 Related Files

- `src/styles/theme.ts` - 테마 토큰 정의
- `src/utils/responsive.ts` - 반응형 유틸리티 함수
- `src/components/common/Toast/Toast.tsx` - Toast 컴포넌트

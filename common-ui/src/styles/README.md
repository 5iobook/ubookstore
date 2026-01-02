# Design System Foundation

이 디렉토리는 하이브리드 웹앱 디자인 시스템의 기반을 포함합니다.

## 파일 구조

- **theme.ts**: 디자인 토큰 시스템 (색상, 타이포그래피, 간격, 그림자 등)
- **global.css**: 글로벌 스타일 및 CSS 변수 정의

## 사용 방법

### 1. TypeScript에서 테마 사용

```typescript
import { theme } from './styles/theme';

const buttonStyle = {
  backgroundColor: theme.colors.primary[500],
  padding: `${theme.spacing[3]} ${theme.spacing[6]}`,
  borderRadius: theme.borderRadius.base,
  fontSize: theme.typography.fontSize.base,
};
```

### 2. CSS에서 CSS 변수 사용

```css
.button {
  background-color: var(--color-primary-500);
  padding: var(--spacing-3) var(--spacing-6);
  border-radius: var(--radius-base);
  font-size: var(--font-size-base);
  transition: all var(--transition-base);
}

.button:hover {
  background-color: var(--color-primary-600);
  box-shadow: var(--shadow-md);
}
```

### 3. 다크 모드 지원

HTML 요소에 `data-theme="dark"` 속성을 추가하면 다크 모드가 활성화됩니다:

```typescript
// 다크 모드 토글
document.documentElement.setAttribute('data-theme', 'dark');

// 라이트 모드로 전환
document.documentElement.setAttribute('data-theme', 'light');
```

### 4. 반응형 유틸리티 사용

```typescript
import { 
  isMobile, 
  isTablet, 
  isDesktop,
  mediaQuery,
  getResponsiveValue 
} from './utils/responsive';

// 현재 뷰포트 체크
if (isMobile()) {
  console.log('Mobile view');
}

// 반응형 값 가져오기
const fontSize = getResponsiveValue({
  xs: '0.875rem',
  md: '1rem',
  lg: '1.125rem'
});

// CSS-in-JS에서 미디어 쿼리 사용
const styles = {
  fontSize: '0.875rem',
  [mediaQuery('md')]: {
    fontSize: '1rem'
  },
  [mediaQuery('lg')]: {
    fontSize: '1.125rem'
  }
};
```

## 디자인 토큰

### 색상 팔레트

- **Primary**: 따뜻한 세피아 브라운 (#FF9F43)
- **Secondary**: 차분한 블루 (#3B95FF)
- **Neutral**: 그레이 스케일
- **Semantic**: Success, Warning, Error, Info

### 타이포그래피

- **Font Family**: Pretendard (한글 최적화)
- **Font Sizes**: xs (12px) ~ 5xl (48px)
- **Font Weights**: light (300) ~ bold (700)

### 간격 시스템

4px 기반 간격 시스템:
- spacing-1: 4px
- spacing-2: 8px
- spacing-3: 12px
- spacing-4: 16px
- spacing-6: 24px
- spacing-8: 32px

### 브레이크포인트

- xs: 320px (모바일)
- sm: 640px (큰 모바일)
- md: 768px (태블릿)
- lg: 1024px (데스크톱)
- xl: 1280px (큰 데스크톱)
- 2xl: 1536px (초대형 화면)

## 접근성

- WCAG 2.1 AA 준수
- 색상 대비율: 최소 4.5:1
- 키보드 네비게이션 지원
- 포커스 표시 명확화
- 터치 타겟 최소 크기: 44x44px

## 애니메이션

- fast: 150ms
- base: 200ms
- slow: 300ms

모든 애니메이션은 `ease-in-out` 타이밍 함수를 사용합니다.

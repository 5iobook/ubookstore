# Layout Components

레이아웃 컴포넌트는 애플리케이션의 구조와 배치를 담당하는 컴포넌트들입니다.

## Components

### Navigation

반응형 네비게이션 컴포넌트로, 모바일에서는 하단 탭 네비게이션, 데스크톱에서는 상단 헤더 네비게이션으로 표시됩니다.

**Props:**
- `isAuthenticated?: boolean` - 사용자 로그인 상태
- `user?: { name: string; avatar?: string }` - 사용자 정보

**Features:**
- 모바일: 하단 고정 탭 바 (5개 메뉴)
- 데스크톱: 상단 헤더 네비게이션
- 현재 활성 메뉴 강조 표시
- 로그인 상태에 따른 메뉴 변경
- 터치 친화적 디자인 (최소 44px)

**Usage:**
```tsx
import { Navigation } from '@/components/layout';

<Navigation 
  isAuthenticated={true}
  user={{ name: '홍길동', avatar: '/avatar.jpg' }}
/>
```

---

### Header

로고, 브랜드, 사용자 프로필 드롭다운을 포함하는 헤더 컴포넌트입니다.

**Props:**
- `isAuthenticated?: boolean` - 사용자 로그인 상태
- `user?: { name: string; email?: string; avatar?: string }` - 사용자 정보
- `onLogout?: () => void` - 로그아웃 핸들러

**Features:**
- 로고 및 브랜드 영역
- 사용자 프로필 드롭다운 메뉴
- 로그인/회원가입 버튼 (비로그인 시)
- Sticky 헤더 (스크롤 시 상단 고정)

**Usage:**
```tsx
import { Header } from '@/components/layout';

<Header 
  isAuthenticated={true}
  user={{ 
    name: '홍길동', 
    email: 'hong@example.com',
    avatar: '/avatar.jpg' 
  }}
  onLogout={() => console.log('로그아웃')}
/>
```

---

### Footer

푸터 정보 및 링크를 포함하는 푸터 컴포넌트입니다.

**Props:**
- `className?: string` - 추가 CSS 클래스

**Features:**
- 브랜드 정보 및 설명
- 서비스 링크
- 고객지원 링크
- 법적 정보 링크
- 소셜 미디어 링크
- 반응형 그리드 레이아웃

**Usage:**
```tsx
import { Footer } from '@/components/layout';

<Footer />
```

---

### Container

중앙 정렬 및 최대 너비를 제공하는 컨테이너 컴포넌트입니다.

**Props:**
- `children: React.ReactNode` - 자식 요소
- `maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full'` - 최대 너비 (기본값: 'xl')
- `padding?: boolean` - 좌우 패딩 적용 여부 (기본값: true)
- `className?: string` - 추가 CSS 클래스
- `as?: keyof JSX.IntrinsicElements` - HTML 요소 타입 (기본값: 'div')

**Max Width Values:**
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `full`: 100%

**Usage:**
```tsx
import { Container } from '@/components/layout';

<Container maxWidth="lg">
  <h1>콘텐츠</h1>
</Container>

<Container maxWidth="md" padding={false} as="section">
  <p>패딩 없는 섹션</p>
</Container>
```

---

### Grid

반응형 그리드 레이아웃 시스템입니다.

**Grid Props:**
- `children: React.ReactNode` - 자식 요소
- `columns?: 1 | 2 | 3 | 4 | 6 | 12` - 컬럼 수 (기본값: 12)
- `gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl'` - 간격 (기본값: 'md')
- `className?: string` - 추가 CSS 클래스
- `responsive?: boolean` - 반응형 활성화 (기본값: true)

**Grid.Item Props:**
- `children: React.ReactNode` - 자식 요소
- `span?: 1 | 2 | 3 | 4 | 6 | 12` - 모바일 컬럼 스팬 (기본값: 1)
- `spanMd?: 1 | 2 | 3 | 4 | 6 | 12` - 태블릿 컬럼 스팬
- `spanLg?: 1 | 2 | 3 | 4 | 6 | 12` - 데스크톱 컬럼 스팬
- `className?: string` - 추가 CSS 클래스

**Responsive Behavior:**
- 모바일 (< 640px): 1 컬럼
- 태블릿 (640px ~ 1023px): 2-3 컬럼
- 데스크톱 (≥ 1024px): 전체 컬럼 수

**Usage:**
```tsx
import { Grid } from '@/components/layout';

// 기본 그리드
<Grid columns={3} gap="lg">
  <Grid.Item>아이템 1</Grid.Item>
  <Grid.Item>아이템 2</Grid.Item>
  <Grid.Item>아이템 3</Grid.Item>
</Grid>

// 반응형 그리드
<Grid columns={12} gap="md">
  <Grid.Item span={12} spanMd={6} spanLg={4}>
    모바일: 전체, 태블릿: 절반, 데스크톱: 1/3
  </Grid.Item>
  <Grid.Item span={12} spanMd={6} spanLg={8}>
    모바일: 전체, 태블릿: 절반, 데스크톱: 2/3
  </Grid.Item>
</Grid>
```

---

## Layout Patterns

### Basic Page Layout

```tsx
import { Navigation, Header, Footer, Container } from '@/components/layout';

function App() {
  return (
    <>
      <Header isAuthenticated={true} user={user} />
      <Navigation isAuthenticated={true} user={user} />
      
      <main>
        <Container maxWidth="xl">
          {/* 페이지 콘텐츠 */}
        </Container>
      </main>
      
      <Footer />
    </>
  );
}
```

### Grid Layout Example

```tsx
import { Container, Grid } from '@/components/layout';
import { Card } from '@/components/common';

function BookList() {
  return (
    <Container>
      <Grid columns={4} gap="lg" responsive>
        {books.map(book => (
          <Grid.Item key={book.id}>
            <Card>{book.title}</Card>
          </Grid.Item>
        ))}
      </Grid>
    </Container>
  );
}
```

---

## Accessibility

모든 레이아웃 컴포넌트는 접근성을 고려하여 구현되었습니다:

- 시맨틱 HTML 사용 (`<nav>`, `<header>`, `<footer>`, `<main>`)
- ARIA 레이블 및 속성 적용
- 키보드 네비게이션 지원
- 포커스 표시 (`:focus-visible`)
- 스크린 리더 호환성

---

## Responsive Design

모든 레이아웃 컴포넌트는 모바일 우선(Mobile-First) 접근 방식으로 구현되었습니다:

- **모바일** (< 768px): 단일 컬럼, 하단 네비게이션
- **태블릿** (768px ~ 1023px): 2-3 컬럼, 상단 네비게이션
- **데스크톱** (≥ 1024px): 전체 그리드, 확장된 레이아웃

---

## Design Tokens

레이아웃 컴포넌트는 디자인 토큰 시스템을 사용합니다:

- 간격: `var(--spacing-*)` (4px 기반)
- 색상: `var(--color-*)`, `var(--bg-*)`, `var(--text-*)`
- 그림자: `var(--shadow-*)`
- 전환: `var(--transition-*)`
- 브레이크포인트: 640px, 768px, 1024px, 1280px

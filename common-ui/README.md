# @bookstore/common-ui

중고책거래 플랫폼의 공통 UI 컴포넌트 라이브러리

## 설치

```bash
npm install @bookstore/common-ui
```

## 사용법

```typescript
import { Button, Card, AppLayout } from '@bookstore/common-ui';

function App() {
  return (
    <AppLayout title="My Service">
      <Card>
        <h2>Hello World</h2>
        <Button>Click me</Button>
      </Card>
    </AppLayout>
  );
}
```

## 컴포넌트

### Layout
- `AppLayout` - 전체 레이아웃 (헤더, 네비게이션, 푸터 포함)
- `Container` - 컨텐츠 컨테이너
- `Grid` - 반응형 그리드
- `Header` - 헤더
- `Footer` - 푸터
- `Navigation` - 네비게이션

### Common
- `Button` - 버튼
- `Input` - 입력 필드
- `Card` - 카드
- `Modal` - 모달
- `Loading` - 로딩 스피너
- `Toast` - 토스트 알림
- `Skeleton` - 스켈레톤 로더

### Domain
- `UserCard` - 사용자 카드
- `PostCard` - 게시글 카드
- `BookCard` - 도서 카드
- `ChatBubble` - 채팅 말풍선

## Hooks

- `useTheme` - 테마 관리
- `useToast` - 토스트 알림
- `useMediaQuery` - 미디어 쿼리
- `useNetworkStatus` - 네트워크 상태
- `usePreloadRoute` - 라우트 프리로드

## 스타일

글로벌 스타일은 각 모듈의 `styles-common.css`에 포함되어 있습니다.

## 개발

```bash
# 타입 체크
npm run build

# 린트
npm run lint
```

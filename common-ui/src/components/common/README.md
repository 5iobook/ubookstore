# Common Components Library

공통 컴포넌트 라이브러리는 재사용 가능한 UI 컴포넌트를 제공합니다.

## Components

### Button
다양한 스타일과 상태를 지원하는 버튼 컴포넌트

```tsx
import { Button } from '@/components/common';

<Button variant="primary" size="md" onClick={handleClick}>
  클릭하세요
</Button>

<Button variant="outline" loading={isLoading}>
  로딩 중...
</Button>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
- `size`: 'sm' | 'md' | 'lg'
- `fullWidth`: boolean
- `disabled`: boolean
- `loading`: boolean
- `icon`: React.ReactNode

### Input
플로팅 레이블과 유효성 검증을 지원하는 입력 컴포넌트

```tsx
import { Input } from '@/components/common';

<Input
  label="이메일"
  type="email"
  value={email}
  onChange={setEmail}
  error={emailError}
  helperText="로그인에 사용할 이메일을 입력하세요"
/>
```

**Props:**
- `type`: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'
- `label`: string
- `value`: string
- `onChange`: (value: string) => void
- `error`: string
- `success`: boolean
- `icon`: React.ReactNode
- `iconPosition`: 'left' | 'right'

### Card
다양한 스타일의 카드 컴포넌트

```tsx
import { Card } from '@/components/common';

<Card variant="elevated" padding="md" hoverable>
  <h3>카드 제목</h3>
  <p>카드 내용</p>
</Card>

<Card variant="outlined" clickable onClick={handleClick}>
  클릭 가능한 카드
</Card>
```

**Props:**
- `variant`: 'elevated' | 'outlined' | 'filled'
- `padding`: 'none' | 'sm' | 'md' | 'lg'
- `hoverable`: boolean
- `clickable`: boolean
- `onClick`: () => void

### Modal
반응형 모달 컴포넌트

```tsx
import { Modal } from '@/components/common';

<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="모달 제목"
  size="md"
  footer={
    <>
      <Button variant="ghost" onClick={handleClose}>취소</Button>
      <Button variant="primary" onClick={handleConfirm}>확인</Button>
    </>
  }
>
  <p>모달 내용</p>
</Modal>
```

**Props:**
- `isOpen`: boolean
- `onClose`: () => void
- `title`: string
- `size`: 'sm' | 'md' | 'lg' | 'full'
- `footer`: React.ReactNode
- `closeOnOverlayClick`: boolean
- `closeOnEscape`: boolean

### Loading
로딩 상태를 표시하는 컴포넌트

```tsx
import { Loading } from '@/components/common';

<Loading size="md" variant="spinner" text="로딩 중..." />

<Loading variant="dots" fullScreen />
```

**Props:**
- `size`: 'sm' | 'md' | 'lg'
- `variant`: 'spinner' | 'dots' | 'pulse'
- `fullScreen`: boolean
- `text`: string

### Toast
알림 메시지를 표시하는 컴포넌트

```tsx
import { ToastContainer } from '@/components/common';

// ToastContainer를 앱 최상위에 배치
<ToastContainer toasts={toasts} position="top-right" />

// Toast 추가 예제
const addToast = (message: string, type: 'success' | 'error' | 'warning' | 'info') => {
  const newToast = {
    id: Date.now().toString(),
    type,
    message,
    duration: 5000,
    onClose: (id: string) => removeToast(id),
  };
  setToasts([...toasts, newToast]);
};
```

**Toast Props:**
- `id`: string
- `type`: 'success' | 'error' | 'warning' | 'info'
- `message`: string
- `duration`: number (ms)
- `onClose`: (id: string) => void
- `action`: { label: string; onClick: () => void }

**ToastContainer Props:**
- `toasts`: ToastProps[]
- `position`: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'

## Features

### 접근성 (Accessibility)
- 모든 컴포넌트는 WCAG 2.1 AA 기준을 준수합니다
- 키보드 네비게이션 지원
- ARIA 속성 적용
- 스크린 리더 호환

### 반응형 디자인
- 모바일 우선 접근 방식
- 터치 친화적 인터페이스 (최소 44px 터치 타겟)
- 다양한 화면 크기 지원 (320px ~ 1920px)

### 애니메이션
- 부드러운 전환 효과
- prefers-reduced-motion 지원
- 성능 최적화된 애니메이션

### 다크 모드
- prefers-color-scheme 지원
- CSS 변수를 통한 테마 전환

## Usage

모든 컴포넌트는 중앙 index에서 import할 수 있습니다:

```tsx
import { Button, Input, Card, Modal, Loading, ToastContainer } from '@/components/common';
```

또는 개별적으로 import:

```tsx
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
```

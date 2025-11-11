# Design Document

## Overview

이 설계 문서는 bookstore 마이크로서비스 프로젝트의 6개 도메인 모듈(book, wish, user, post, chat, alert)에 프론트엔드 환경을 구축하는 방법을 정의합니다. 기존 trade 모듈의 React + TypeScript + Vite 구조를 템플릿으로 사용하여 각 도메인에 일관된 프론트엔드를 구축하고, 도메인별로 독립적인 Git 커밋/푸시를 수행합니다.

## Architecture

### Technology Stack

- **Frontend Framework**: React 19.1.0
- **Language**: TypeScript 5.8.3
- **Build Tool**: Vite 7.0.4
- **Routing**: react-router-dom 7.6.3
- **HTTP Client**: axios 1.10.0
- **Linting**: ESLint 9.30.1

### Directory Structure

각 도메인 모듈의 프론트엔드는 다음 구조를 따릅니다:

```
{domain}/src/main/resources/static/
├── src/
│   ├── api/
│   │   └── {domain}Api.ts          # API 클라이언트
│   ├── assets/
│   │   └── react.svg
│   ├── pages/
│   │   ├── {Domain}List.tsx        # 목록 페이지
│   │   ├── {Domain}Detail.tsx      # 상세 페이지
│   │   └── {Domain}Form.tsx        # 등록/수정 페이지
│   ├── App.tsx                     # 메인 앱 컴포넌트
│   ├── App.css
│   ├── main.tsx                    # 엔트리 포인트
│   ├── index.css
│   └── vite-env.d.ts
├── public/
│   └── vite.svg
├── dist/                           # 빌드 결과물
├── node_modules/
├── index.html
├── package.json
├── package-lock.json
├── vite.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── eslint.config.js
├── .gitignore
└── Dockerfile
```

### Domain-Specific Configuration

각 도메인의 백엔드 포트와 API 경로:

| Domain | Port | API Base Path | Description |
|--------|------|---------------|-------------|
| book   | TBD  | /v1/books     | 도서 관리 |
| wish   | 8082 | /v1/wishes    | 위시리스트 |
| user   | 8083 | /v1/users     | 사용자 관리 |
| post   | 8081 | /v1/posts     | 게시글 관리 |
| chat   | 8084 | /v1/chats     | 채팅 |
| alert  | 8085 | /v1/alerts    | 알림 |

## Components and Interfaces

### 1. Configuration Files

#### package.json
모든 도메인에 동일한 의존성 설정:
- React 19, TypeScript, Vite
- react-router-dom, axios
- ESLint 및 관련 플러그인

#### vite.config.ts
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

#### tsconfig.json
TypeScript 컴파일러 설정 (app, node 참조)

### 2. API Client Layer

각 도메인의 `src/api/{domain}Api.ts` 파일:

```typescript
import axios from 'axios';

const API_BASE = 'http://localhost:{PORT}/v1/{domain}s';

// 페이지네이션 목록 조회
export async function fetch{Domain}ListPage(page: number, size: number) {
  const res = await axios.get(`${API_BASE}`, { params: { page, size } });
  // 응답 구조에 맞게 파싱
  return {
    items: res.data.data.content,
    totalPages: res.data.data.page.totalPages,
    totalElements: res.data.data.page.totalElements,
    page: res.data.data.page.number,
    size: res.data.data.page.size,
  };
}

// 상세 조회
export async function fetch{Domain}Detail(id: string) {
  const res = await axios.get(`${API_BASE}/${id}`);
  return res.data.data;
}

// 생성
export async function create{Domain}(data: any) {
  const res = await axios.post(API_BASE, data);
  return res.data.data;
}
```

### 3. Page Components

#### List Page (`{Domain}List.tsx`)
- 목록 조회 및 페이지네이션
- 상세 페이지로 이동 링크
- 등록 페이지로 이동 버튼

#### Detail Page (`{Domain}Detail.tsx`)
- URL 파라미터에서 ID 추출
- 상세 정보 표시
- 목록으로 돌아가기 버튼

#### Form Page (`{Domain}Form.tsx`)
- 입력 폼
- 등록/수정 처리
- 유효성 검사

### 4. Routing Configuration

`App.tsx`에서 react-router-dom을 사용한 라우팅:

```typescript
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">{Domain} 목록</Link>
        <Link to="/{domain}/new">{Domain} 등록</Link>
      </nav>
      <Routes>
        <Route path="/" element={<{Domain}List />} />
        <Route path="/{domain}/:id" element={<{Domain}Detail />} />
        <Route path="/{domain}/new" element={<{Domain}Form />} />
      </Routes>
    </Router>
  );
}
```

## Data Models

### Domain-Specific Models

각 도메인의 데이터 모델은 백엔드 API 응답 구조를 따릅니다:

#### Book Domain
```typescript
interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  price: number;
  stock: number;
  createdAt: string;
}
```

#### Wish Domain
```typescript
interface Wish {
  id: string;
  userId: string;
  bookId: string;
  createdAt: string;
}
```

#### User Domain
```typescript
interface User {
  id: string;
  username: string;
  email: string;
  createdAt: string;
}
```

#### Post Domain
```typescript
interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: string;
}
```

#### Chat Domain
```typescript
interface ChatRoom {
  id: string;
  name: string;
  participants: string[];
  createdAt: string;
}
```

#### Alert Domain
```typescript
interface Alert {
  id: string;
  userId: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
}
```

## Error Handling

### API Error Handling

모든 API 호출에서 try-catch를 사용하여 에러 처리:

```typescript
try {
  const data = await fetchDomainList();
  // 성공 처리
} catch (error) {
  console.error('API 호출 실패:', error);
  // 에러 메시지 표시
}
```

### CORS Configuration

백엔드 컨트롤러에 `@CrossOrigin(origins = "http://localhost:3000")` 설정 필요

## Testing Strategy

### Manual Testing

각 도메인 완료 후:
1. `npm install` - 의존성 설치
2. `npm run dev` - 개발 서버 실행
3. 브라우저에서 기능 확인
4. `npm run build` - 프로덕션 빌드 테스트

### Testing Checklist

- [ ] 목록 페이지 렌더링
- [ ] 페이지네이션 동작
- [ ] 상세 페이지 이동 및 데이터 표시
- [ ] 등록 폼 제출 및 검증
- [ ] API 연동 확인
- [ ] 빌드 성공 확인

## Implementation Workflow

### Phase 1: Setup Configuration Files
각 도메인에 package.json, vite.config.ts, tsconfig 파일 생성

### Phase 2: Create Directory Structure
src, public, dist 디렉토리 및 기본 파일 생성

### Phase 3: Implement API Client
도메인별 API 클라이언트 작성

### Phase 4: Create Page Components
목록, 상세, 등록 페이지 컴포넌트 작성

### Phase 5: Configure Routing
App.tsx에서 라우팅 설정

### Phase 6: Git Commit and Push
각 도메인 완료 후 독립적으로 커밋/푸시

## Git Workflow

### Commit Strategy

각 도메인 작업 완료 후:

```bash
# 변경사항 스테이징
git add {domain}/src/main/resources/static/

# 커밋
git commit -m "feat({domain}): Add React frontend with Vite and TypeScript

- Setup React 19 + TypeScript + Vite environment
- Create {domain} list, detail, and form pages
- Implement API integration with axios
- Configure routing with react-router-dom"

# 푸시
git push origin main
```

### Commit Order

1. book 도메인
2. wish 도메인
3. user 도메인
4. post 도메인
5. chat 도메인
6. alert 도메인

## Build and Deployment

### Development Mode

```bash
cd {domain}/src/main/resources/static
npm install
npm run dev
```

### Production Build

```bash
npm run build
```

빌드 결과물은 `dist/` 디렉토리에 생성되며, Spring Boot의 정적 리소스로 서빙됩니다.

## Notes

- 각 도메인의 백엔드 API가 실행 중이어야 프론트엔드 테스트 가능
- CORS 설정이 백엔드에 적용되어 있어야 함
- book 도메인의 포트 번호는 application.yml 확인 필요
- 모든 도메인은 독립적으로 개발 및 배포 가능

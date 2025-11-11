# Book Frontend

React + TypeScript + Vite 기반 도서 관리 프론트엔드

## 🚀 빠른 시작

### 1. 패키지 설치

```bash
cd book/src/main/resources/static
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

개발 서버가 http://localhost:5173 에서 실행됩니다.

### 3. 프로덕션 빌드

```bash
npm run build
```

빌드된 파일은 `dist/` 디렉토리에 생성됩니다.

## 📁 프로젝트 구조

```
src/
├── api/
│   └── bookApi.ts          # API 클라이언트
├── pages/
│   ├── BookList.tsx        # 도서 목록 페이지
│   ├── BookDetail.tsx      # 도서 상세 페이지
│   └── BookForm.tsx        # 도서 등록 페이지
├── App.tsx                 # 메인 앱 컴포넌트
├── App.css                 # 앱 스타일
├── index.css               # 글로벌 스타일
└── main.tsx                # 엔트리 포인트
```

## 🔧 설정

### API 엔드포인트

`src/api/bookApi.ts` 파일에서 백엔드 API 주소를 설정할 수 있습니다:

```typescript
const API_BASE = 'http://localhost:8080/v1/books';
```

### Base Path (Nginx 프록시 사용 시)

`vite.config.ts`에서 base path가 설정되어 있습니다:

```typescript
export default defineConfig({
  plugins: [react()],
  base: '/book/',  // Nginx에서 /book 경로로 라우팅
})
```

## 📝 사용 가능한 스크립트

- `npm run dev` - 개발 서버 실행
- `npm run build` - 프로덕션 빌드
- `npm run preview` - 빌드된 앱 미리보기
- `npm run lint` - ESLint 실행

## 🌐 페이지

- `/` - 도서 목록 (페이지네이션)
- `/book/:id` - 도서 상세 정보
- `/book/new` - 새 도서 등록

## 🔗 백엔드 연동

백엔드 API가 실행 중이어야 합니다:

```bash
# Book 서비스 실행 (포트 8080 예상)
./gradlew :book:bootRun
```

## 🐳 Docker로 실행

```bash
# 프론트엔드만 빌드 및 실행
docker-compose up -d --build book-frontend

# Nginx 게이트웨이와 함께 실행
docker-compose up -d --build nginx-gateway book-frontend
```

Docker로 실행 시 http://localhost/book 에서 접속 가능합니다.

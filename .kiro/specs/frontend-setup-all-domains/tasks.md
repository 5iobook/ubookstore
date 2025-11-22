# Implementation Plan

- [-] 1. Book 도메인 프론트엔드 구축


  - book/src/main/resources/static 디렉토리에 React + TypeScript + Vite 환경 구축
  - package.json, vite.config.ts, tsconfig 파일 생성
  - src/api/bookApi.ts에 API 클라이언트 작성
  - src/pages/BookList.tsx, BookDetail.tsx, BookForm.tsx 페이지 생성
  - App.tsx에서 라우팅 설정
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 2.1, 3.1, 3.2, 3.3, 3.4, 5.1, 5.2, 5.3, 5.4, 5.5_

- [x] 1.1 Book 도메인 설정 파일 생성


  - package.json, vite.config.ts, tsconfig.json, tsconfig.app.json, tsconfig.node.json 생성
  - eslint.config.js, .gitignore 생성
  - index.html 생성
  - _Requirements: 1.1, 1.3, 5.1_

- [x] 1.2 Book 도메인 디렉토리 구조 및 기본 파일 생성


  - src, public, dist 디렉토리 생성
  - src/main.tsx, src/App.tsx, src/App.css, src/index.css, src/vite-env.d.ts 생성
  - public/vite.svg, src/assets/react.svg 복사
  - _Requirements: 1.2, 1.4, 5.2, 5.4_

- [x] 1.3 Book 도메인 API 클라이언트 작성


  - src/api/bookApi.ts 생성
  - fetchBookListPage, fetchBookDetail, createBook 함수 구현
  - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [x] 1.4 Book 도메인 페이지 컴포넌트 작성


  - src/pages/BookList.tsx 생성 (목록 및 페이지네이션)
  - src/pages/BookDetail.tsx 생성 (상세 정보)
  - src/pages/BookForm.tsx 생성 (등록 폼)
  - App.tsx에서 라우팅 설정
  - _Requirements: 2.1, 5.3_

- [x] 1.5 Book 도메인 Git 커밋 및 푸시



  - book/src/main/resources/static 변경사항 스테이징
  - "feat(book): Add React frontend with Vite and TypeScript" 커밋 메시지로 커밋
  - 원격 저장소에 푸시
  - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [ ] 2. Wish 도메인 프론트엔드 구축
  - wish/src/main/resources/static 디렉토리에 React + TypeScript + Vite 환경 구축
  - package.json, vite.config.ts, tsconfig 파일 생성
  - src/api/wishApi.ts에 API 클라이언트 작성
  - src/pages/WishList.tsx, WishForm.tsx 페이지 생성
  - App.tsx에서 라우팅 설정
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 2.2, 3.1, 3.2, 3.3, 3.4, 5.1, 5.2, 5.3, 5.4, 5.5_

- [ ] 2.1 Wish 도메인 설정 파일 생성
  - package.json, vite.config.ts, tsconfig.json, tsconfig.app.json, tsconfig.node.json 생성
  - eslint.config.js, .gitignore 생성
  - index.html 생성
  - _Requirements: 1.1, 1.3, 5.1_

- [ ] 2.2 Wish 도메인 디렉토리 구조 및 기본 파일 생성
  - src, public, dist 디렉토리 생성
  - src/main.tsx, src/App.tsx, src/App.css, src/index.css, src/vite-env.d.ts 생성
  - public/vite.svg, src/assets/react.svg 복사
  - _Requirements: 1.2, 1.4, 5.2, 5.4_

- [ ] 2.3 Wish 도메인 API 클라이언트 작성
  - src/api/wishApi.ts 생성
  - fetchWishListPage, createWish 함수 구현
  - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [ ] 2.4 Wish 도메인 페이지 컴포넌트 작성
  - src/pages/WishList.tsx 생성 (목록 및 페이지네이션)
  - src/pages/WishForm.tsx 생성 (추가 폼)
  - App.tsx에서 라우팅 설정
  - _Requirements: 2.2, 5.3_

- [ ] 2.5 Wish 도메인 Git 커밋 및 푸시
  - wish/src/main/resources/static 변경사항 스테이징
  - "feat(wish): Add React frontend with Vite and TypeScript" 커밋 메시지로 커밋
  - 원격 저장소에 푸시
  - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [ ] 3. User 도메인 프론트엔드 구축
  - user/src/main/resources/static 디렉토리에 React + TypeScript + Vite 환경 구축
  - package.json, vite.config.ts, tsconfig 파일 생성
  - src/api/userApi.ts에 API 클라이언트 작성
  - src/pages/UserList.tsx, UserDetail.tsx, UserForm.tsx 페이지 생성
  - App.tsx에서 라우팅 설정
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 2.3, 3.1, 3.2, 3.3, 3.4, 5.1, 5.2, 5.3, 5.4, 5.5_

- [ ] 3.1 User 도메인 설정 파일 생성
  - package.json, vite.config.ts, tsconfig.json, tsconfig.app.json, tsconfig.node.json 생성
  - eslint.config.js, .gitignore 생성
  - index.html 생성
  - _Requirements: 1.1, 1.3, 5.1_

- [ ] 3.2 User 도메인 디렉토리 구조 및 기본 파일 생성
  - src, public, dist 디렉토리 생성
  - src/main.tsx, src/App.tsx, src/App.css, src/index.css, src/vite-env.d.ts 생성
  - public/vite.svg, src/assets/react.svg 복사
  - _Requirements: 1.2, 1.4, 5.2, 5.4_

- [ ] 3.3 User 도메인 API 클라이언트 작성
  - src/api/userApi.ts 생성
  - fetchUserListPage, fetchUserDetail, createUser 함수 구현
  - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [ ] 3.4 User 도메인 페이지 컴포넌트 작성
  - src/pages/UserList.tsx 생성 (목록 및 페이지네이션)
  - src/pages/UserDetail.tsx 생성 (상세 정보)
  - src/pages/UserForm.tsx 생성 (등록 폼)
  - App.tsx에서 라우팅 설정
  - _Requirements: 2.3, 5.3_

- [ ] 3.5 User 도메인 Git 커밋 및 푸시
  - user/src/main/resources/static 변경사항 스테이징
  - "feat(user): Add React frontend with Vite and TypeScript" 커밋 메시지로 커밋
  - 원격 저장소에 푸시
  - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [ ] 4. Post 도메인 프론트엔드 구축
  - post/src/main/resources/static 디렉토리에 React + TypeScript + Vite 환경 구축
  - package.json, vite.config.ts, tsconfig 파일 생성
  - src/api/postApi.ts에 API 클라이언트 작성
  - src/pages/PostList.tsx, PostDetail.tsx, PostForm.tsx 페이지 생성
  - App.tsx에서 라우팅 설정
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 2.4, 3.1, 3.2, 3.3, 3.4, 5.1, 5.2, 5.3, 5.4, 5.5_

- [ ] 4.1 Post 도메인 설정 파일 생성
  - package.json, vite.config.ts, tsconfig.json, tsconfig.app.json, tsconfig.node.json 생성
  - eslint.config.js, .gitignore 생성
  - index.html 생성
  - _Requirements: 1.1, 1.3, 5.1_

- [ ] 4.2 Post 도메인 디렉토리 구조 및 기본 파일 생성
  - src, public, dist 디렉토리 생성
  - src/main.tsx, src/App.tsx, src/App.css, src/index.css, src/vite-env.d.ts 생성
  - public/vite.svg, src/assets/react.svg 복사
  - _Requirements: 1.2, 1.4, 5.2, 5.4_

- [ ] 4.3 Post 도메인 API 클라이언트 작성
  - src/api/postApi.ts 생성
  - fetchPostListPage, fetchPostDetail, createPost 함수 구현
  - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [ ] 4.4 Post 도메인 페이지 컴포넌트 작성
  - src/pages/PostList.tsx 생성 (목록 및 페이지네이션)
  - src/pages/PostDetail.tsx 생성 (상세 정보)
  - src/pages/PostForm.tsx 생성 (작성 폼)
  - App.tsx에서 라우팅 설정
  - _Requirements: 2.4, 5.3_

- [ ] 4.5 Post 도메인 Git 커밋 및 푸시
  - post/src/main/resources/static 변경사항 스테이징
  - "feat(post): Add React frontend with Vite and TypeScript" 커밋 메시지로 커밋
  - 원격 저장소에 푸시
  - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [ ] 5. Chat 도메인 프론트엔드 구축
  - chat/src/main/resources/static 디렉토리에 React + TypeScript + Vite 환경 구축
  - package.json, vite.config.ts, tsconfig 파일 생성
  - src/api/chatApi.ts에 API 클라이언트 작성
  - src/pages/ChatRoomList.tsx, ChatRoom.tsx 페이지 생성
  - App.tsx에서 라우팅 설정
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 2.5, 3.1, 3.2, 3.3, 3.4, 5.1, 5.2, 5.3, 5.4, 5.5_

- [ ] 5.1 Chat 도메인 설정 파일 생성
  - package.json, vite.config.ts, tsconfig.json, tsconfig.app.json, tsconfig.node.json 생성
  - eslint.config.js, .gitignore 생성
  - index.html 생성
  - _Requirements: 1.1, 1.3, 5.1_

- [ ] 5.2 Chat 도메인 디렉토리 구조 및 기본 파일 생성
  - src, public, dist 디렉토리 생성
  - src/main.tsx, src/App.tsx, src/App.css, src/index.css, src/vite-env.d.ts 생성
  - public/vite.svg, src/assets/react.svg 복사
  - _Requirements: 1.2, 1.4, 5.2, 5.4_

- [ ] 5.3 Chat 도메인 API 클라이언트 작성
  - src/api/chatApi.ts 생성
  - fetchChatRoomListPage, fetchChatRoomDetail, createChatRoom 함수 구현
  - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [ ] 5.4 Chat 도메인 페이지 컴포넌트 작성
  - src/pages/ChatRoomList.tsx 생성 (채팅방 목록)
  - src/pages/ChatRoom.tsx 생성 (채팅방 입장)
  - App.tsx에서 라우팅 설정
  - _Requirements: 2.5, 5.3_

- [ ] 5.5 Chat 도메인 Git 커밋 및 푸시
  - chat/src/main/resources/static 변경사항 스테이징
  - "feat(chat): Add React frontend with Vite and TypeScript" 커밋 메시지로 커밋
  - 원격 저장소에 푸시
  - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [ ] 6. Alert 도메인 프론트엔드 구축
  - alert/src/main/resources/static 디렉토리에 React + TypeScript + Vite 환경 구축
  - package.json, vite.config.ts, tsconfig 파일 생성
  - src/api/alertApi.ts에 API 클라이언트 작성
  - src/pages/AlertList.tsx, AlertDetail.tsx 페이지 생성
  - App.tsx에서 라우팅 설정
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 2.6, 3.1, 3.2, 3.3, 3.4, 5.1, 5.2, 5.3, 5.4, 5.5_

- [ ] 6.1 Alert 도메인 설정 파일 생성
  - package.json, vite.config.ts, tsconfig.json, tsconfig.app.json, tsconfig.node.json 생성
  - eslint.config.js, .gitignore 생성
  - index.html 생성
  - _Requirements: 1.1, 1.3, 5.1_

- [ ] 6.2 Alert 도메인 디렉토리 구조 및 기본 파일 생성
  - src, public, dist 디렉토리 생성
  - src/main.tsx, src/App.tsx, src/App.css, src/index.css, src/vite-env.d.ts 생성
  - public/vite.svg, src/assets/react.svg 복사
  - _Requirements: 1.2, 1.4, 5.2, 5.4_

- [ ] 6.3 Alert 도메인 API 클라이언트 작성
  - src/api/alertApi.ts 생성
  - fetchAlertListPage, fetchAlertDetail 함수 구현
  - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [ ] 6.4 Alert 도메인 페이지 컴포넌트 작성
  - src/pages/AlertList.tsx 생성 (알림 목록)
  - src/pages/AlertDetail.tsx 생성 (알림 상세)
  - App.tsx에서 라우팅 설정
  - _Requirements: 2.6, 5.3_

- [ ] 6.5 Alert 도메인 Git 커밋 및 푸시
  - alert/src/main/resources/static 변경사항 스테이징
  - "feat(alert): Add React frontend with Vite and TypeScript" 커밋 메시지로 커밋
  - 원격 저장소에 푸시
  - _Requirements: 4.1, 4.2, 4.3, 4.4_

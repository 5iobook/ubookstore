# Requirements Document

## Introduction

이 문서는 마이크로서비스 아키텍처 기반의 bookstore 프로젝트에서 각 도메인 모듈(book, wish, user, post, chat, alert)에 프론트엔드 화면을 추가하는 요구사항을 정의합니다. 기존 trade 모듈에 적용된 React + TypeScript + Vite 기반의 프론트엔드 환경을 참고하여 동일한 구조로 각 도메인에 프론트엔드를 구축합니다.

## Glossary

- **Domain Module**: bookstore 프로젝트의 각 마이크로서비스 모듈 (book, wish, user, post, chat, alert)
- **Frontend Environment**: React 19, TypeScript, Vite를 기반으로 한 프론트엔드 개발 환경
- **Static Resources**: Spring Boot의 src/main/resources/static 디렉토리에 위치하는 정적 리소스
- **Trade Module**: 이미 프론트엔드가 구축된 참조 모듈
- **API Integration**: 각 도메인의 백엔드 API와 프론트엔드를 연결하는 작업
- **Git Commit**: 각 도메인 모듈별로 독립적으로 커밋하는 버전 관리 작업

## Requirements

### Requirement 1

**User Story:** 개발자로서, 각 도메인 모듈에 일관된 프론트엔드 환경을 구축하여 유지보수성을 높이고 싶습니다.

#### Acceptance Criteria

1. WHEN 프론트엔드 환경을 구축할 때, THE System SHALL trade 모듈의 package.json, vite.config.ts, tsconfig.json 설정을 기반으로 동일한 의존성과 설정을 사용한다
2. WHEN 프론트엔드 디렉토리를 생성할 때, THE System SHALL 각 도메인 모듈의 src/main/resources/static 디렉토리에 프론트엔드 코드를 배치한다
3. THE System SHALL React 19, TypeScript, Vite, react-router-dom, axios를 포함한 동일한 기술 스택을 모든 도메인에 적용한다
4. THE System SHALL 각 도메인에 src, public, dist 디렉토리 구조를 생성한다

### Requirement 2

**User Story:** 개발자로서, 각 도메인의 특성에 맞는 페이지와 API 연동을 구현하여 도메인별 기능을 제공하고 싶습니다.

#### Acceptance Criteria

1. WHEN book 도메인의 프론트엔드를 구축할 때, THE System SHALL 도서 목록, 도서 상세, 도서 등록 페이지를 생성한다
2. WHEN wish 도메인의 프론트엔드를 구축할 때, THE System SHALL 위시리스트 목록, 위시리스트 추가 페이지를 생성한다
3. WHEN user 도메인의 프론트엔드를 구축할 때, THE System SHALL 사용자 목록, 사용자 상세, 사용자 등록 페이지를 생성한다
4. WHEN post 도메인의 프론트엔드를 구축할 때, THE System SHALL 게시글 목록, 게시글 상세, 게시글 작성 페이지를 생성한다
5. WHEN chat 도메인의 프론트엔드를 구축할 때, THE System SHALL 채팅방 목록, 채팅방 입장 페이지를 생성한다
6. WHEN alert 도메인의 프론트엔드를 구축할 때, THE System SHALL 알림 목록, 알림 상세 페이지를 생성한다

### Requirement 3

**User Story:** 개발자로서, 각 도메인의 백엔드 API와 프론트엔드를 연동하여 실제 데이터를 화면에 표시하고 싶습니다.

#### Acceptance Criteria

1. WHEN API 클라이언트를 생성할 때, THE System SHALL 각 도메인의 src/api 디렉토리에 axios 기반의 API 함수를 작성한다
2. WHEN API 엔드포인트를 설정할 때, THE System SHALL 각 도메인의 백엔드 포트와 API 경로를 정확하게 매핑한다
3. THE System SHALL 목록 조회, 상세 조회, 생성 API를 각 도메인에 구현한다
4. WHEN API 응답을 처리할 때, THE System SHALL 백엔드의 응답 구조에 맞게 데이터를 파싱한다

### Requirement 4

**User Story:** 개발자로서, 각 도메인별로 독립적으로 Git 커밋과 푸시를 수행하여 변경 이력을 명확하게 관리하고 싶습니다.

#### Acceptance Criteria

1. WHEN 도메인의 프론트엔드 작업이 완료될 때, THE System SHALL 해당 도메인의 변경사항만 Git에 스테이징한다
2. WHEN Git 커밋을 생성할 때, THE System SHALL 도메인 이름을 포함한 명확한 커밋 메시지를 작성한다
3. WHEN Git 푸시를 수행할 때, THE System SHALL 각 도메인 작업 완료 후 즉시 원격 저장소에 푸시한다
4. THE System SHALL book, wish, user, post, chat, alert 순서로 각 도메인의 작업을 완료하고 커밋한다

### Requirement 5

**User Story:** 개발자로서, 프론트엔드 코드의 품질과 일관성을 유지하기 위해 공통 설정과 구조를 적용하고 싶습니다.

#### Acceptance Criteria

1. THE System SHALL 모든 도메인에 ESLint 설정을 적용하여 코드 품질을 유지한다
2. THE System SHALL 각 도메인에 App.tsx, main.tsx, index.html 등 공통 엔트리 파일을 생성한다
3. THE System SHALL react-router-dom을 사용하여 각 도메인의 페이지 라우팅을 구현한다
4. THE System SHALL 각 도메인에 기본 CSS 파일(App.css, index.css)을 생성한다
5. WHEN 프론트엔드 빌드를 수행할 때, THE System SHALL dist 디렉토리에 빌드 결과물을 생성한다

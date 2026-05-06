# 📚 Bookstore - 마이크로서비스 기반 온라인 중고 책거래

Spring Boot와 React를 활용한 마이크로서비스 아키텍처 기반의 온라인 중고 책거래 플랫폼입니다.

## 🏗️ 아키텍처

### 마이크로서비스 구성

```
bookstore/
├── eureka-server/    # 서비스 디스커버리
├── user/             # 사용자 관리 서비스
├── book/             # 도서 관리 서비스
├── post/             # 게시글 관리 서비스
├── chat/             # 채팅 서비스
├── alert/            # 알림 서비스
├── trade/            # 거래 서비스
└── wish/             # 위시리스트 서비스
```

### 기술 스택

**백엔드**
- Java 17
- Spring Boot 3.4.3
- Spring Cloud (Eureka)
- Spring Data JPA
- Spring Security + JWT
- MySQL 8.0
- WebSocket (채팅)

**프론트엔드**
- React 18
- TypeScript
- Vite
- React Router
- Axios

**인프라**
- Docker & Docker Compose
- Nginx (API Gateway)
- ELK Stack 

## 🚀 시작하기

### 사전 요구사항

- Java 17 이상
- Node.js 18 이상
- Docker & Docker Compose
- MySQL 8.0

### 설치 및 실행

#### 1. 저장소 클론
```bash
git clone https://github.com/5iobook/ubookstore.git
cd bookstore
```

#### 2. 데이터베이스 시작
```bash
docker-compose up -d
```

#### 3. 전체 서비스 실행
```bash
./run-all.sh
```

### 4. 전체 서비스 중지
```bash
./stop-all.sh
```

### 5. 개별 서비스 실행 (백엔드)
```bash
# 특정 서비스만 실행
./gradlew :user:bootRun
./gradlew :book:bootRun
```
### 6. 개별 서비스 실행 (프론트)
```bash
cd user/src/main/resources/static
npm run dev
```

## 📡 서비스 포트

| 서비스 | 백엔드 포트 | 프론트엔드 포트 | 설명 |
|--------|------------|----------------|------|
| Eureka Server | 8761 | - | 서비스 디스커버리 |
| User Service  | 8083 | 5173 | 사용자 관리 |
| Wish Service  | 8082 | 5179 | 위시리스트 |
| Post Service  | 8081 | 5175 | 게시글 관리 |
| Chat Service  | 8084 | 5177 | 채팅 |
| Alert Service | 8085 | 5174 | 알림 |
| Trade Service | 8086 | 5178 | 거래 관리 |
| Book Service  | 8087 | 5176 | 도서 관리 |
| MySQL         | 3306 | - | 데이터베이스 |

## 📦 프로젝트 구조

### 백엔드 (각 서비스 공통)
```
service/
├── src/main/java/com/bookstore/{service}/
│   ├── domain/              # 도메인 모델
│   │   ├── entity/          # JPA 엔티티
│   │   ├── repository/      # 리포지토리 인터페이스
│   │   └── vo/              # Value Object
│   ├── application/         # 애플리케이션 계층
│   │   ├── dto/             # DTO
│   │   └── service/         # 비즈니스 로직
│   ├── infrastructure/      # 인프라 계층
│   │   ├── config/          # 설정
│   │   └── repository/      # 리포지토리 구현
│   └── presentation/        # 프레젠테이션 계층
│       └── controller/      # REST API 컨트롤러
└── src/main/resources/
    ├── static/              # 프론트엔드 빌드 파일
    └── application.yml      # 설정 파일
```

### 프론트엔드 (각 서비스 공통)
```
service/src/main/resources/static/
├── src/
│   ├── api/                 # API 클라이언트
│   ├── pages/               # 페이지 컴포넌트
│   ├── App.tsx              # 메인 앱
│   └── main.tsx             # 엔트리 포인트
├── package.json
└── vite.config.ts
```

## 📄 라이선스

MIT License

## 🔗 관련 링크

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Spring Cloud Netflix](https://spring.io/projects/spring-cloud-netflix)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)

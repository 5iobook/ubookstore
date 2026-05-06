# Nginx API Gateway 설정 가이드

## 📋 개요

마이크로서비스 아키텍처에서 여러 프론트엔드를 단일 진입점으로 통합하는 Nginx 리버스 프록시 설정입니다.

## 🏗️ 아키텍처

```
사용자 브라우저
    ↓
http://localhost (포트 80)
    ↓
Nginx Gateway (리버스 프록시)
    ├─ /book  → book-frontend:80
    └─ /trade → trade-frontend:80
```

## 🚀 실행 방법

### 1. 전체 서비스 실행

```bash
# 모든 서비스 빌드 및 실행
docker-compose up -d

# 또는 프론트엔드만 실행
docker-compose up -d nginx-gateway book-frontend trade-frontend
```

### 2. 개별 서비스 재빌드

```bash
# Book 프론트엔드만 재빌드
docker-compose up -d --build book-frontend

# Trade 프론트엔드만 재빌드
docker-compose up -d --build trade-frontend

# Nginx 게이트웨이만 재빌드
docker-compose up -d --build nginx-gateway
```

### 3. 로그 확인

```bash
# Nginx 로그 확인
docker-compose logs -f nginx-gateway

# 특정 프론트엔드 로그 확인
docker-compose logs -f book-frontend
docker-compose logs -f trade-frontend
```

## 🌐 접속 URL

| 서비스 | URL | 설명 |
|--------|-----|------|
| 메인 페이지 | http://localhost | 서비스 목록 페이지 |
| Book 서비스 | http://localhost/book | 도서 관리 |
| Trade 서비스 | http://localhost/trade | 거래 관리 |
| 헬스체크 | http://localhost/health | Nginx 상태 확인 |

## 📁 디렉토리 구조

```
ubookstore/
├── nginx/
│   ├── Dockerfile          # Nginx 컨테이너 설정
│   └── nginx.conf          # Nginx 라우팅 설정
├── book/src/main/resources/static/
│   ├── Dockerfile          # Book 프론트엔드 빌드
│   └── vite.config.ts      # base: '/book/' 설정
├── trade/src/main/resources/static/
│   ├── Dockerfile          # Trade 프론트엔드 빌드
│   └── vite.config.ts      # base: '/trade/' 설정
└── docker-compose.yml      # 전체 서비스 오케스트레이션
```

## ⚙️ 주요 설정

### Vite Base Path 설정

각 프론트엔드의 `vite.config.ts`에 base path 설정:

```typescript
// book/src/main/resources/static/vite.config.ts
export default defineConfig({
  plugins: [react()],
  base: '/book/',  // ← 중요!
})
```

### Nginx 라우팅 설정

`nginx/nginx.conf`에서 경로 기반 라우팅:

```nginx
location /book {
    proxy_pass http://book-frontend;
    rewrite ^/book/(.*)$ /$1 break;
}
```

## 🔧 트러블슈팅

### 1. 404 에러 발생

**증상:** http://localhost/book 접속 시 404 에러

**해결:**
```bash
# 프론트엔드 재빌드 (base path 적용)
docker-compose up -d --build book-frontend

# Nginx 재시작
docker-compose restart nginx-gateway
```

### 2. CSS/JS 파일 로드 실패

**증상:** 페이지는 뜨지만 스타일이 깨짐

**원인:** vite.config.ts에 base path 미설정

**해결:** vite.config.ts에 `base: '/book/'` 추가 후 재빌드

### 3. 프론트엔드 간 통신 불가

**증상:** book에서 trade API 호출 실패

**해결:** 
- 각 프론트엔드는 독립적으로 백엔드 API 호출
- API 주소는 절대 경로 사용 (예: `http://localhost:8080/v1/books`)

### 4. 컨테이너 네트워크 문제

```bash
# 네트워크 확인
docker network ls

# 컨테이너 네트워크 연결 확인
docker network inspect ubookstore_frontend

# 전체 재시작
docker-compose down
docker-compose up -d
```

## 🎯 장점

1. **단일 진입점**: 사용자는 하나의 URL만 기억
2. **독립적 배포**: 각 프론트엔드 독립적으로 빌드/배포
3. **CORS 해결**: 같은 도메인에서 서비스
4. **확장 용이**: 새 서비스 추가 시 nginx.conf만 수정
5. **프로덕션 준비**: 실제 운영 환경과 동일한 구조

## 📊 성능 최적화

### Nginx 캐싱 설정 (선택사항)

```nginx
# nginx.conf에 추가
proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=frontend_cache:10m max_size=1g;

location /book {
    proxy_cache frontend_cache;
    proxy_cache_valid 200 1h;
    # ... 기존 설정
}
```

### Gzip 압축 (이미 활성화됨)

```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript;
```

## 🔐 보안 고려사항

1. **HTTPS 설정** (프로덕션 필수)
2. **Rate Limiting** (DDoS 방어)
3. **헤더 보안** (X-Frame-Options, CSP 등)

## 📝 추가 서비스 등록 방법

새로운 프론트엔드 서비스 추가 시:

1. **vite.config.ts 설정**
```typescript
base: '/user/',  // 새 서비스 경로
```

2. **nginx.conf에 라우팅 추가**
```nginx
location /user {
    proxy_pass http://user-frontend;
    rewrite ^/user/(.*)$ /$1 break;
}
```

3. **docker-compose.yml에 서비스 추가**
```yaml
user-frontend:
  build: ./user/src/main/resources/static
  networks:
    - frontend
```

4. **재빌드 및 실행**
```bash
docker-compose up -d --build
```

## 🆚 다른 방식과의 비교

| 방식 | 장점 | 단점 | 적합한 경우 |
|------|------|------|------------|
| **Nginx 프록시** (현재) | 독립 배포, 단일 진입점 | 초기 설정 필요 | MSA, 팀 분리 |
| 포트 분리 | 설정 간단 | 사용자 불편, CORS | 개발 환경만 |
| 단일 앱 통합 | 코드 공유 쉬움 | 결합도 증가 | 소규모 프로젝트 |
| Module Federation | 런타임 통합 | 복잡도 높음 | 대규모 MSA |

## 📚 참고 자료

- [Nginx 공식 문서](https://nginx.org/en/docs/)
- [Vite Base Path 설정](https://vitejs.dev/config/shared-options.html#base)
- [마이크로프론트엔드 패턴](https://martinfowler.com/articles/micro-frontends.html)

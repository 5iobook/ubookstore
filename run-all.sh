#!/bin/bash

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Bookstore 프로젝트 전체 실행${NC}"
echo -e "${BLUE}========================================${NC}"

# logs 디렉토리 생성
mkdir -p logs

# 0. 프론트엔드 빌드
echo -e "\n${YELLOW}[0/6] 프론트엔드 빌드 중...${NC}"

echo -e "${YELLOW}  - User 프론트엔드 빌드...${NC}"
npm install --prefix user/src/main/resources/static > /dev/null 2>&1
npm run build --prefix user/src/main/resources/static > /dev/null 2>&1
echo -e "${GREEN}    ✓ User 프론트엔드 빌드 완료${NC}"

echo -e "${YELLOW}  - Post 프론트엔드 빌드...${NC}"
npm install --prefix post/src/main/resources/static > /dev/null 2>&1
npm run build --prefix post/src/main/resources/static > /dev/null 2>&1
echo -e "${GREEN}    ✓ Post 프론트엔드 빌드 완료${NC}"

echo -e "${YELLOW}  - Book 프론트엔드 빌드...${NC}"
npm install --prefix book/src/main/resources/static > /dev/null 2>&1
npm run build --prefix book/src/main/resources/static > /dev/null 2>&1
echo -e "${GREEN}    ✓ Book 프론트엔드 빌드 완료${NC}"

echo -e "${YELLOW}  - Chat 프론트엔드 빌드...${NC}"
npm install --prefix chat/src/main/resources/static > /dev/null 2>&1
npm run build --prefix chat/src/main/resources/static > /dev/null 2>&1
echo -e "${GREEN}    ✓ Chat 프론트엔드 빌드 완료${NC}"

echo -e "${GREEN}✓ 모든 프론트엔드 빌드 완료${NC}"

# 1. MySQL 시작
echo -e "\n${YELLOW}[1/6] MySQL 시작 중...${NC}"
docker-compose up -d
sleep 3
echo -e "${GREEN}✓ MySQL 시작 완료${NC}"

# 2. Eureka Server 시작
echo -e "\n${YELLOW}[2/6] Eureka Server 시작 중...${NC}"
cd eureka-server
./gradlew bootRun > ../logs/eureka-server.log 2>&1 &
EUREKA_PID=$!
cd ..
sleep 5
echo -e "${GREEN}✓ Eureka Server 시작 완료 (PID: $EUREKA_PID)${NC}"

# 3. User 서비스 시작
echo -e "\n${YELLOW}[3/6] User 서비스 시작 중...${NC}"
cd user
./gradlew bootRun > ../logs/user-service.log 2>&1 &
USER_PID=$!
cd ..
sleep 5
echo -e "${GREEN}✓ User 서비스 시작 완료 (PID: $USER_PID)${NC}"

# 4. Post 서비스 시작
echo -e "\n${YELLOW}[4/6] Post 서비스 시작 중...${NC}"
cd post
./gradlew bootRun > ../logs/post-service.log 2>&1 &
POST_PID=$!
cd ..
sleep 5
echo -e "${GREEN}✓ Post 서비스 시작 완료 (PID: $POST_PID)${NC}"

# 5. Book 서비스 시작
echo -e "\n${YELLOW}[5/6] Book 서비스 시작 중...${NC}"
cd book
./gradlew bootRun > ../logs/book-service.log 2>&1 &
BOOK_PID=$!
cd ..
sleep 5
echo -e "${GREEN}✓ Book 서비스 시작 완료 (PID: $BOOK_PID)${NC}"

# 6. Chat 서비스 시작
echo -e "\n${YELLOW}[6/6] Chat 서비스 시작 중...${NC}"
cd chat
./gradlew bootRun > ../logs/chat-service.log 2>&1 &
CHAT_PID=$!
cd ..
sleep 5
echo -e "${GREEN}✓ Chat 서비스 시작 완료 (PID: $CHAT_PID)${NC}"

# 서비스 상태 확인
echo -e "\n${BLUE}========================================${NC}"
echo -e "${BLUE}서비스 상태 확인${NC}"
echo -e "${BLUE}========================================${NC}"

sleep 3

echo -e "\n${YELLOW}Eureka Server 상태:${NC}"
curl -s http://localhost:8761/eureka/apps | grep -o '<name>[^<]*</name>' | head -10 || echo "연결 중..."

echo -e "\n${YELLOW}User 서비스 (8083):${NC}"
curl -s http://localhost:8083/actuator/health 2>/dev/null | grep -o '"status":"[^"]*"' || echo "연결 중..."

echo -e "\n${YELLOW}Post 서비스 (8081):${NC}"
curl -s http://localhost:8081/actuator/health 2>/dev/null | grep -o '"status":"[^"]*"' || echo "연결 중..."

echo -e "\n${YELLOW}Book 서비스 (8087):${NC}"
curl -s http://localhost:8087/actuator/health 2>/dev/null | grep -o '"status":"[^"]*"' || echo "연결 중..."

echo -e "\n${YELLOW}Chat 서비스 (8084):${NC}"
curl -s http://localhost:8084/actuator/health 2>/dev/null | grep -o '"status":"[^"]*"' || echo "연결 중..."

# 프론트엔드 접속 정보
echo -e "\n${BLUE}========================================${NC}"
echo -e "${BLUE}프론트엔드 접속 정보${NC}"
echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}User 프론트엔드: http://localhost:8083${NC}"
echo -e "${GREEN}Post 프론트엔드: http://localhost:8081${NC}"
echo -e "${GREEN}Book 프론트엔드: http://localhost:8087${NC}"
echo -e "${GREEN}Chat 프론트엔드: http://localhost:8084${NC}"

# 로그 모니터링
echo -e "\n${BLUE}========================================${NC}"
echo -e "${BLUE}실행 중인 프로세스${NC}"
echo -e "${BLUE}========================================${NC}"
echo -e "Eureka Server (PID: $EUREKA_PID)"
echo -e "User Service (PID: $USER_PID)"
echo -e "Post Service (PID: $POST_PID)"
echo -e "Book Service (PID: $BOOK_PID)"
echo -e "Chat Service (PID: $CHAT_PID)"

echo -e "\n${YELLOW}로그 파일 위치:${NC}"
echo -e "- logs/eureka-server.log"
echo -e "- logs/user-service.log"
echo -e "- logs/post-service.log"
echo -e "- logs/book-service.log"
echo -e "- logs/chat-service.log"

echo -e "\n${YELLOW}모든 서비스 중지하려면:${NC}"
echo -e "kill $EUREKA_PID $USER_PID $POST_PID $BOOK_PID $CHAT_PID"

# 프로세스 ID 저장
echo "$EUREKA_PID $USER_PID $POST_PID $BOOK_PID $CHAT_PID" > .pids

# 계속 실행 상태 유지
wait

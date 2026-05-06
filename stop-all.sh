#!/bin/bash

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Bookstore 프로젝트 전체 중지${NC}"
echo -e "${BLUE}========================================${NC}"

# .pids 파일에서 프로세스 ID 읽기
if [ -f .pids ]; then
    read EUREKA_PID USER_PID POST_PID BOOK_PID CHAT_PID < .pids
    
    echo -e "\n${YELLOW}프로세스 중지 중...${NC}"
    
    kill $EUREKA_PID 2>/dev/null && echo -e "${GREEN}✓ Eureka Server 중지 (PID: $EUREKA_PID)${NC}" || echo -e "${RED}✗ Eureka Server 중지 실패${NC}"
    kill $USER_PID 2>/dev/null && echo -e "${GREEN}✓ User 서비스 중지 (PID: $USER_PID)${NC}" || echo -e "${RED}✗ User 서비스 중지 실패${NC}"
    kill $POST_PID 2>/dev/null && echo -e "${GREEN}✓ Post 서비스 중지 (PID: $POST_PID)${NC}" || echo -e "${RED}✗ Post 서비스 중지 실패${NC}"
    kill $BOOK_PID 2>/dev/null && echo -e "${GREEN}✓ Book 서비스 중지 (PID: $BOOK_PID)${NC}" || echo -e "${RED}✗ Book 서비스 중지 실패${NC}"
    kill $CHAT_PID 2>/dev/null && echo -e "${GREEN}✓ Chat 서비스 중지 (PID: $CHAT_PID)${NC}" || echo -e "${RED}✗ Chat 서비스 중지 실패${NC}"
    
    sleep 2
    
    # Docker 컨테이너 중지
    echo -e "\n${YELLOW}Docker 컨테이너 중지 중...${NC}"
    docker-compose down
    
    # .pids 파일 삭제
    rm .pids
    
    echo -e "\n${GREEN}모든 서비스가 중지되었습니다.${NC}"
else
    echo -e "${RED}.pids 파일을 찾을 수 없습니다.${NC}"
    echo -e "${YELLOW}수동으로 프로세스를 중지하려면:${NC}"
    echo -e "ps aux | grep gradlew"
    echo -e "kill <PID>"
fi

echo -e "\n${BLUE}========================================${NC}"

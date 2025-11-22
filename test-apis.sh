#!/bin/bash

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}API 연결 테스트${NC}"
echo -e "${BLUE}========================================${NC}"

# 함수: API 테스트
test_api() {
    local name=$1
    local url=$2
    local method=${3:-GET}
    
    echo -e "\n${YELLOW}테스트: $name${NC}"
    echo -e "URL: $url"
    
    if [ "$method" = "GET" ]; then
        response=$(curl -s -w "\n%{http_code}" "$url")
    else
        response=$(curl -s -w "\n%{http_code}" -X "$method" "$url")
    fi
    
    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | head -n-1)
    
    if [ "$http_code" -ge 200 ] && [ "$http_code" -lt 300 ]; then
        echo -e "${GREEN}✓ 성공 (HTTP $http_code)${NC}"
        echo -e "응답: $body" | head -c 200
        echo ""
    elif [ "$http_code" -ge 400 ] && [ "$http_code" -lt 500 ]; then
        echo -e "${YELLOW}⚠ 클라이언트 오류 (HTTP $http_code)${NC}"
        echo -e "응답: $body" | head -c 200
        echo ""
    else
        echo -e "${RED}✗ 실패 (HTTP $http_code)${NC}"
        echo -e "응답: $body" | head -c 200
        echo ""
    fi
}

# Eureka 서버 확인
echo -e "\n${BLUE}========================================${NC}"
echo -e "${BLUE}1. Eureka Server 확인${NC}"
echo -e "${BLUE}========================================${NC}"
test_api "Eureka Server" "http://localhost:8761/eureka/apps"

# User 서비스 확인
echo -e "\n${BLUE}========================================${NC}"
echo -e "${BLUE}2. User 서비스 확인${NC}"
echo -e "${BLUE}========================================${NC}"
test_api "User 서비스 Health" "http://localhost:8083/actuator/health"
test_api "User 목록 조회" "http://localhost:8083/api/v1/users"

# Post 서비스 확인
echo -e "\n${BLUE}========================================${NC}"
echo -e "${BLUE}3. Post 서비스 확인${NC}"
echo -e "${BLUE}========================================${NC}"
test_api "Post 서비스 Health" "http://localhost:8081/actuator/health"
test_api "Post 목록 조회" "http://localhost:8081/api/v1/posts"

# Book 서비스 확인
echo -e "\n${BLUE}========================================${NC}"
echo -e "${BLUE}4. Book 서비스 확인${NC}"
echo -e "${BLUE}========================================${NC}"
test_api "Book 서비스 Health" "http://localhost:8087/actuator/health"
test_api "Book 목록 조회" "http://localhost:8087/api/v1/books"

# Chat 서비스 확인
echo -e "\n${BLUE}========================================${NC}"
echo -e "${BLUE}5. Chat 서비스 확인${NC}"
echo -e "${BLUE}========================================${NC}"
test_api "Chat 서비스 Health" "http://localhost:8084/actuator/health"
test_api "Chat 채팅방 목록" "http://localhost:8084/api/chatroom"

echo -e "\n${BLUE}========================================${NC}"
echo -e "${BLUE}테스트 완료${NC}"
echo -e "${BLUE}========================================${NC}"

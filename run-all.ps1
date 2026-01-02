# Bookstore 프로젝트 전체 실행 스크립트 (Windows PowerShell)

Write-Host "========================================" -ForegroundColor Blue
Write-Host "Bookstore 프로젝트 전체 실행" -ForegroundColor Blue
Write-Host "========================================" -ForegroundColor Blue

# logs 디렉토리 생성
New-Item -ItemType Directory -Force -Path logs | Out-Null

# 0. 프론트엔드 빌드
Write-Host "`n[0/5] 프론트엔드 빌드 중..." -ForegroundColor Yellow

Write-Host "  - User 프론트엔드 빌드..." -ForegroundColor Yellow
Set-Location user/src/main/resources/static
npm install 2>&1 | Out-Null
npm run build 2>&1 | Out-Null
Set-Location ../../../../../
Write-Host "    ✓ User 프론트엔드 빌드 완료" -ForegroundColor Green

Write-Host "  - Post 프론트엔드 빌드..." -ForegroundColor Yellow
Set-Location post/src/main/resources/static
npm install 2>&1 | Out-Null
npm run build 2>&1 | Out-Null
Set-Location ../../../../../
Write-Host "    ✓ Post 프론트엔드 빌드 완료" -ForegroundColor Green

Write-Host "  - Book 프론트엔드 빌드..." -ForegroundColor Yellow
Set-Location book/src/main/resources/static
npm install 2>&1 | Out-Null
npm run build 2>&1 | Out-Null
Set-Location ../../../../../
Write-Host "    ✓ Book 프론트엔드 빌드 완료" -ForegroundColor Green

Write-Host "  - Chat 프론트엔드 빌드..." -ForegroundColor Yellow
Set-Location chat/src/main/resources/static
npm install 2>&1 | Out-Null
npm run build 2>&1 | Out-Null
Set-Location ../../../../../
Write-Host "    ✓ Chat 프론트엔드 빌드 완료" -ForegroundColor Green

Write-Host "  - Alert 프론트엔드 빌드..." -ForegroundColor Yellow
Set-Location alert/src/main/resources/static
npm install 2>&1 | Out-Null
npm run build 2>&1 | Out-Null
Set-Location ../../../../../
Write-Host "    ✓ Alert 프론트엔드 빌드 완료" -ForegroundColor Green

Write-Host "✓ 모든 프론트엔드 빌드 완료" -ForegroundColor Green

# 1. MySQL 시작 (Docker Compose)
Write-Host "`n[1/5] MySQL 시작 중..." -ForegroundColor Yellow
docker-compose up -d 2>&1 | Out-Null
Start-Sleep -Seconds 5
Write-Host "✓ MySQL 시작 완료" -ForegroundColor Green

# 2. User 서비스 시작
Write-Host "`n[2/5] User 서비스 시작 중..." -ForegroundColor Yellow
$userJob = Start-Job -ScriptBlock { 
    Set-Location $using:PWD
    ./gradlew :user:bootRun 2>&1 | Out-File -FilePath logs/user-service.log
}
Start-Sleep -Seconds 10
Write-Host "✓ User 서비스 시작 완료 (Job ID: $($userJob.Id))" -ForegroundColor Green

# 3. Post 서비스 시작
Write-Host "`n[3/5] Post 서비스 시작 중..." -ForegroundColor Yellow
$postJob = Start-Job -ScriptBlock { 
    Set-Location $using:PWD
    ./gradlew :post:bootRun 2>&1 | Out-File -FilePath logs/post-service.log
}
Start-Sleep -Seconds 10
Write-Host "✓ Post 서비스 시작 완료 (Job ID: $($postJob.Id))" -ForegroundColor Green

# 4. Book 서비스 시작
Write-Host "`n[4/5] Book 서비스 시작 중..." -ForegroundColor Yellow
$bookJob = Start-Job -ScriptBlock { 
    Set-Location $using:PWD
    ./gradlew :book:bootRun 2>&1 | Out-File -FilePath logs/book-service.log
}
Start-Sleep -Seconds 10
Write-Host "✓ Book 서비스 시작 완료 (Job ID: $($bookJob.Id))" -ForegroundColor Green

# 5. Chat 서비스 시작
Write-Host "`n[5/5] Chat 서비스 시작 중..." -ForegroundColor Yellow
$chatJob = Start-Job -ScriptBlock { 
    Set-Location $using:PWD
    ./gradlew :chat:bootRun 2>&1 | Out-File -FilePath logs/chat-service.log
}
Start-Sleep -Seconds 10
Write-Host "✓ Chat 서비스 시작 완료 (Job ID: $($chatJob.Id))" -ForegroundColor Green

# 6. Alert 서비스 시작
Write-Host "`n[6/6] Alert 서비스 시작 중..." -ForegroundColor Yellow
$alertJob = Start-Job -ScriptBlock { 
    Set-Location $using:PWD
    ./gradlew :alert:bootRun 2>&1 | Out-File -FilePath logs/alert-service.log
}
Start-Sleep -Seconds 10
Write-Host "✓ Alert 서비스 시작 완료 (Job ID: $($alertJob.Id))" -ForegroundColor Green

# 서비스 상태 확인
Write-Host "`n========================================" -ForegroundColor Blue
Write-Host "서비스 상태 확인" -ForegroundColor Blue
Write-Host "========================================" -ForegroundColor Blue

Start-Sleep -Seconds 5

Write-Host "`nUser 서비스 (8083):" -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8083/actuator/health" -TimeoutSec 2 -ErrorAction SilentlyContinue
    Write-Host "  ✓ 정상 작동 중" -ForegroundColor Green
} catch {
    Write-Host "  연결 중..." -ForegroundColor Gray
}

Write-Host "`nPost 서비스 (8081):" -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8081/actuator/health" -TimeoutSec 2 -ErrorAction SilentlyContinue
    Write-Host "  ✓ 정상 작동 중" -ForegroundColor Green
} catch {
    Write-Host "  연결 중..." -ForegroundColor Gray
}

Write-Host "`nBook 서비스 (8087):" -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8087/actuator/health" -TimeoutSec 2 -ErrorAction SilentlyContinue
    Write-Host "  ✓ 정상 작동 중" -ForegroundColor Green
} catch {
    Write-Host "  연결 중..." -ForegroundColor Gray
}

Write-Host "`nChat 서비스 (8084):" -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8084/actuator/health" -TimeoutSec 2 -ErrorAction SilentlyContinue
    Write-Host "  ✓ 정상 작동 중" -ForegroundColor Green
} catch {
    Write-Host "  연결 중..." -ForegroundColor Gray
}

Write-Host "`nAlert 서비스 (8085):" -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8085/actuator/health" -TimeoutSec 2 -ErrorAction SilentlyContinue
    Write-Host "  ✓ 정상 작동 중" -ForegroundColor Green
} catch {
    Write-Host "  연결 중..." -ForegroundColor Gray
}

# 프론트엔드 접속 정보
Write-Host "`n========================================" -ForegroundColor Blue
Write-Host "프론트엔드 접속 정보" -ForegroundColor Blue
Write-Host "========================================" -ForegroundColor Blue
Write-Host "User 프론트엔드: http://localhost:8083" -ForegroundColor Green
Write-Host "Post 프론트엔드: http://localhost:8081" -ForegroundColor Green
Write-Host "Book 프론트엔드: http://localhost:8087" -ForegroundColor Green
Write-Host "Chat 프론트엔드: http://localhost:8084" -ForegroundColor Green
Write-Host "Alert 프론트엔드: http://localhost:8085" -ForegroundColor Green

# 실행 중인 Job 정보
Write-Host "`n========================================" -ForegroundColor Blue
Write-Host "실행 중인 서비스" -ForegroundColor Blue
Write-Host "========================================" -ForegroundColor Blue
Write-Host "User Service (Job ID: $($userJob.Id))"
Write-Host "Post Service (Job ID: $($postJob.Id))"
Write-Host "Book Service (Job ID: $($bookJob.Id))"
Write-Host "Chat Service (Job ID: $($chatJob.Id))"
Write-Host "Alert Service (Job ID: $($alertJob.Id))"

Write-Host "`n로그 파일 위치:" -ForegroundColor Yellow
Write-Host "- logs/user-service.log"
Write-Host "- logs/post-service.log"
Write-Host "- logs/book-service.log"
Write-Host "- logs/chat-service.log"
Write-Host "- logs/alert-service.log"

Write-Host "`n모든 서비스 중지하려면:" -ForegroundColor Yellow
Write-Host "Get-Job | Stop-Job; Get-Job | Remove-Job"

Write-Host "`n또는 stop-all.ps1 스크립트를 실행하세요." -ForegroundColor Yellow

# Job ID를 파일에 저장
"$($userJob.Id),$($postJob.Id),$($bookJob.Id),$($chatJob.Id),$($alertJob.Id)" | Out-File -FilePath .job-ids

Write-Host "`n모든 서비스가 시작되었습니다!" -ForegroundColor Green
Write-Host "서비스가 완전히 시작되려면 1-2분 정도 소요될 수 있습니다." -ForegroundColor Yellow

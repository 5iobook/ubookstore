# Bookstore 프로젝트 전체 중지 스크립트 (Windows PowerShell)

Write-Host "========================================" -ForegroundColor Blue
Write-Host "Bookstore 프로젝트 전체 중지" -ForegroundColor Blue
Write-Host "========================================" -ForegroundColor Blue

# Job ID 파일에서 읽기
if (Test-Path .job-ids) {
    $jobIds = (Get-Content .job-ids).Split(',')
    
    Write-Host "`n저장된 Job 중지 중..." -ForegroundColor Yellow
    foreach ($jobId in $jobIds) {
        try {
            $job = Get-Job -Id $jobId -ErrorAction SilentlyContinue
            if ($job) {
                Stop-Job -Id $jobId
                Remove-Job -Id $jobId
                Write-Host "  ✓ Job $jobId 중지 완료" -ForegroundColor Green
            }
        } catch {
            Write-Host "  Job $jobId 를 찾을 수 없습니다" -ForegroundColor Gray
        }
    }
    
    Remove-Item .job-ids
}

# 모든 실행 중인 Job 중지
Write-Host "`n모든 실행 중인 Job 중지 중..." -ForegroundColor Yellow
$jobs = Get-Job
if ($jobs) {
    $jobs | Stop-Job
    $jobs | Remove-Job
    Write-Host "  ✓ 모든 Job 중지 완료" -ForegroundColor Green
} else {
    Write-Host "  실행 중인 Job이 없습니다" -ForegroundColor Gray
}

# Gradle 데몬 중지
Write-Host "`nGradle 데몬 중지 중..." -ForegroundColor Yellow
./gradlew --stop 2>&1 | Out-Null
Write-Host "  ✓ Gradle 데몬 중지 완료" -ForegroundColor Green

# Docker Compose 중지
Write-Host "`nDocker 컨테이너 중지 중..." -ForegroundColor Yellow
docker-compose down 2>&1 | Out-Null
Write-Host "  ✓ Docker 컨테이너 중지 완료" -ForegroundColor Green

Write-Host "`n========================================" -ForegroundColor Blue
Write-Host "모든 서비스가 중지되었습니다!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Blue

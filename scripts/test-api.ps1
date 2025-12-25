# PowerShell API 테스트 스크립트
$BASE_URL = if ($env:NEXT_PUBLIC_API_URL) { $env:NEXT_PUBLIC_API_URL } else { "http://localhost:3000" }

Write-Host "Testing QuickTalk API..."
Write-Host "Base URL: $BASE_URL"
Write-Host ""

# Test 1: GET /api/situations
Write-Host "1. Testing GET /api/situations"
try {
    $response = Invoke-RestMethod -Uri "$BASE_URL/api/situations" -Method Get
    $response | ConvertTo-Json -Depth 10
} catch {
    Write-Host "Failed: $_"
}
Write-Host ""

# Test 2: GET /api/intents (with situationId)
Write-Host "2. Testing GET /api/intents?situationId=situation_001"
try {
    $response = Invoke-RestMethod -Uri "$BASE_URL/api/intents?situationId=situation_001" -Method Get
    $response | ConvertTo-Json -Depth 10
} catch {
    Write-Host "Failed: $_"
}
Write-Host ""

# Test 3: GET /api/intents (without situationId - should fail)
Write-Host "3. Testing GET /api/intents (should return 400)"
try {
    $response = Invoke-RestMethod -Uri "$BASE_URL/api/intents" -Method Get
    $response | ConvertTo-Json -Depth 10
} catch {
    Write-Host "Expected error: $_"
}
Write-Host ""

# Test 4: POST /api/log
Write-Host "4. Testing POST /api/log"
$logData = @{
    sessionId = "test_session_123"
    situationId = "situation_001"
    intentId = "intent_001"
    sentences = @("테스트 문장")
    ttsPlayed = $false
    resultRating = 3
    timestamp = (Get-Date -Format "yyyy-MM-ddTHH:mm:ssZ")
    userAgent = "test-agent"
    device = "desktop"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$BASE_URL/api/log" -Method Post -Body $logData -ContentType "application/json"
    $response | ConvertTo-Json -Depth 10
} catch {
    Write-Host "Failed: $_"
}
Write-Host ""

Write-Host "API tests completed!"




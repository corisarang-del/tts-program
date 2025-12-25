#!/bin/bash

# API 테스트 스크립트
BASE_URL="${NEXT_PUBLIC_API_URL:-http://localhost:3000}"

echo "Testing QuickTalk API..."
echo "Base URL: $BASE_URL"
echo ""

# Test 1: GET /api/situations
echo "1. Testing GET /api/situations"
curl -s "$BASE_URL/api/situations" | jq '.' || echo "Failed"
echo ""

# Test 2: GET /api/intents (with situationId)
echo "2. Testing GET /api/intents?situationId=situation_001"
curl -s "$BASE_URL/api/intents?situationId=situation_001" | jq '.' || echo "Failed"
echo ""

# Test 3: GET /api/intents (without situationId - should fail)
echo "3. Testing GET /api/intents (should return 400)"
curl -s "$BASE_URL/api/intents" | jq '.' || echo "Failed"
echo ""

# Test 4: POST /api/log
echo "4. Testing POST /api/log"
curl -s -X POST "$BASE_URL/api/log" \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "test_session_123",
    "situationId": "situation_001",
    "intentId": "intent_001",
    "sentences": ["테스트 문장"],
    "ttsPlayed": false,
    "resultRating": 3,
    "timestamp": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'",
    "userAgent": "test-agent",
    "device": "desktop"
  }' | jq '.' || echo "Failed"
echo ""

echo "API tests completed!"




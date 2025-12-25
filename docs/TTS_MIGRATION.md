# TTS 마이그레이션: OpenAI → Google Cloud Text-to-Speech

**작성일**: 2025-12-25

## 변경 사항

### 1. TTS 제공자 변경
- **이전**: OpenAI TTS API (`tts-1` 모델)
- **현재**: Google Cloud Text-to-Speech API

### 2. 변경 이유
- Google Cloud TTS가 한국어 음성 품질이 더 우수함
- 다양한 음성 옵션 제공 (Standard/Wavenet)
- 더 나은 가격 정책
- 한국어 최적화된 음성 합성

## 수정된 파일

### 1. `lib/tts.ts`
- OpenAI 클라이언트 → Google Cloud Text-to-Speech 클라이언트로 변경
- 음성 옵션 타입 변경: `'alloy' | 'echo' | ...` → `'ko-KR-Standard-A' | ...`
- 인증 방식 변경: API 키 → 서비스 계정 키 또는 프로젝트 ID + 키 JSON

### 2. `app/api/tts/route.ts`
- 기본 음성 변경: `'nova'` → `'ko-KR-Standard-A'`

### 3. `lib/env.ts`
- Google Cloud TTS 인증 검증 로직 추가

### 4. `package.json`
- `openai` 패키지 유지 (문장 생성용)
- `@google-cloud/text-to-speech` 패키지 추가

## 환경 변수 설정

### 이전 설정
```env
OPENAI_API_KEY=sk-proj-...
```

### 현재 설정
```env
# OpenAI (문장 생성용 - 유지)
OPENAI_API_KEY=sk-proj-...

# Google Cloud TTS (음성 합성용 - 추가)
# 방법 1: 서비스 계정 키 파일 경로
GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account-key.json

# 방법 2: 프로젝트 ID와 키 JSON 문자열
GOOGLE_CLOUD_PROJECT_ID=your-project-id
GOOGLE_CLOUD_KEY={"type":"service_account","project_id":"..."}
```

## Google Cloud 설정 방법

1. **Google Cloud Console 접속**
   - https://console.cloud.google.com/

2. **프로젝트 생성 또는 선택**

3. **Cloud Text-to-Speech API 활성화**
   - API 및 서비스 → 라이브러리
   - "Cloud Text-to-Speech API" 검색 및 활성화

4. **서비스 계정 생성**
   - IAM 및 관리자 → 서비스 계정
   - "서비스 계정 만들기" 클릭
   - 이름 입력 및 역할: "Cloud Text-to-Speech API 사용자"

5. **서비스 계정 키 다운로드**
   - 생성된 서비스 계정 클릭
   - "키" 탭 → "키 추가" → "새 키 만들기"
   - JSON 형식 선택 및 다운로드

6. **환경 변수 설정**
   - 다운로드한 JSON 파일 경로를 `GOOGLE_APPLICATION_CREDENTIALS`에 설정
   - 또는 JSON 내용을 `GOOGLE_CLOUD_KEY`에 설정하고 `GOOGLE_CLOUD_PROJECT_ID` 설정

## 지원 음성 목록

### Standard 음성 (기본, 저렴)
- `ko-KR-Standard-A` - 여성 음성 (기본값)
- `ko-KR-Standard-B` - 남성 음성
- `ko-KR-Standard-C` - 여성 음성
- `ko-KR-Standard-D` - 남성 음성

### Wavenet 음성 (고품질, 비쌈)
- `ko-KR-Wavenet-A` - 고품질 여성 음성
- `ko-KR-Wavenet-B` - 고품질 남성 음성
- `ko-KR-Wavenet-C` - 고품질 여성 음성
- `ko-KR-Wavenet-D` - 고품질 남성 음성

## API 변경 사항

### 요청 형식 (변경 없음)
```json
{
  "text": "텍스트 내용",
  "voice": "ko-KR-Standard-A"
}
```

### 응답 형식 (변경 없음)
- Content-Type: `audio/mpeg`
- X-Audio-Cached: `true/false`
- X-Audio-Duration: `3.5`

## 마이그레이션 체크리스트

- [x] Google Cloud TTS 패키지 설치
- [x] `lib/tts.ts` 코드 변경
- [x] 환경 변수 설정 업데이트
- [x] API Route 기본 음성 변경
- [x] 문서 업데이트 (README.md, prd.md, TODO.md)
- [ ] 테스트 실행 및 검증
- [ ] 프로덕션 환경 변수 설정

## 주의사항

1. **인증 방식**: Google Cloud는 API 키가 아닌 서비스 계정 키를 사용합니다.
2. **비용**: Google Cloud TTS는 사용량 기반 과금입니다. 무료 할당량 확인 필요.
3. **캐싱**: 기존 캐싱 로직은 그대로 유지되지만, 음성 해시 키에 voice 파라미터가 포함됩니다.
4. **에러 처리**: Google Cloud TTS 전용 에러 코드가 추가되었습니다.

## 참고 자료

- [Google Cloud Text-to-Speech 문서](https://cloud.google.com/text-to-speech/docs)
- [Node.js 클라이언트 라이브러리](https://github.com/googleapis/nodejs-text-to-speech)
- [가격 정보](https://cloud.google.com/text-to-speech/pricing)


# 한글 인코딩 및 TTS 재생 문제 수정

**작성일**: 2025-12-25

## 해결한 문제

### 1. 한글 인코딩 문제
- **문제**: JSON 파일에서 한글이 `??`로 깨져서 표시됨
- **원인**: 파일 인코딩이 UTF-8이 아닌 다른 인코딩으로 저장됨
- **해결**:
  - `app/layout.tsx`: UTF-8 메타 태그 추가
  - `next.config.js`: Webpack 설정 추가
  - `data/intents.json`: 모든 깨진 한글 수정 (intent_032 ~ intent_054)
  - `data/situations.json`: 일본어/중국어 번역 수정 (situation_011 ~ situation_017)
  - `.gitattributes`: Git 인코딩 설정 추가

### 2. TTS 재생 문제
- **문제**: 듣기 버튼 클릭 시 음성이 재생되지 않음
- **원인**: 
  - API 에러 메시지가 깨져있어서 에러 확인 어려움
  - Audio 재생 에러 핸들링 부족
  - 브라우저 자동 재생 정책 미처리
- **해결**:
  - `app/api/tts/route.ts`: 에러 메시지 한글 수정
  - `app/sentence/page.tsx`: 
    - 에러 메시지 한글 수정
    - Audio 재생 에러 핸들링 개선
    - 브라우저 자동 재생 정책 에러 처리 추가
    - URL 정리 로직 개선

## 수정된 파일

### API
- `app/api/tts/route.ts`: 에러 메시지 한글 수정

### 프론트엔드
- `app/sentence/page.tsx`: TTS 재생 로직 개선, 에러 핸들링 강화
- `app/layout.tsx`: UTF-8 메타 태그 추가

### 설정
- `next.config.js`: Webpack UTF-8 설정 추가
- `.gitattributes`: Git 인코딩 설정 추가

### 데이터
- `data/intents.json`: intent_032 ~ intent_054 한글 수정
- `data/situations.json`: situation_011 ~ situation_017 일본어/중국어 번역 수정

## 수정 내용 상세

### TTS 재생 개선
```typescript
// 브라우저 자동 재생 정책 에러 처리
try {
  await newAudio.play();
} catch (playError) {
  if (playError instanceof Error && playError.name === 'NotAllowedError') {
    toast.error('브라우저에서 자동 재생이 차단되었습니다. 재생 버튼을 다시 클릭해주세요.');
  } else {
    throw playError;
  }
}
```

### 한글 인코딩 보장
- HTML 메타 태그: `<meta charSet="utf-8" />`
- Next.js 설정: Webpack UTF-8 설정
- Git 설정: `.gitattributes`로 파일 인코딩 명시

## 테스트 필요 사항

1. **TTS 재생 테스트**
   - 듣기 버튼 클릭 시 음성 재생 확인
   - 에러 발생 시 적절한 메시지 표시 확인
   - 브라우저 자동 재생 차단 시 처리 확인

2. **한글 표시 테스트**
   - 모든 상황/의도에서 한글이 정상 표시되는지 확인
   - 일본어/중국어 번역도 정상 표시되는지 확인

## 남은 작업

- `data/intents.json`에 약 2개의 깨진 한글 부분이 남아있을 수 있음 (확인 필요)
- TTS API 실제 동작 테스트 필요 (Google Cloud TTS 인증 확인)


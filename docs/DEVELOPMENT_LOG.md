# 개발 일지 (Development Log)

## 2025-12-26 - 의도 리스트 표시 문제 해결 및 문장 데이터 확장

### 작성 시각
2025-12-26

### 해결하고자 한 문제
1. **의도 리스트 미표시 문제**: 의도 선택 페이지에서 의도 목록이 화면에 표시되지 않는 문제
2. **문장 데이터 부족**: 각 의도당 3개의 문장만 있어 다양성이 부족
3. **Gemini API 키 미설정**: 새로운 문장 생성이 불가능한 상태

### 해결된 것
1. ✅ **의도 리스트 표시 문제 해결**
   - **원인**: `lib/db.ts`에서 Supabase 연결이 활성화되어 있었으나, 실제 데이터베이스에는 데이터가 없었음
   - **해결 방법**: Supabase 연결을 주석 처리하여 JSON 파일(`data/intents.json`)을 사용하도록 수정
   - **수정 파일**: `lib/db.ts`

2. ✅ **문장 데이터 확장 (Intent 001~012)**
   - 각 의도에 9개의 추가 문장을 생성하여 총 12개로 확장
   - 4개 언어 (ko, en, ja, zh) 모두 12개 문장으로 확장
   - 일본어와 중국어의 깨진 문자 수정
   - **완료된 의도**: intent_001 ~ intent_012 (12개 의도)

3. ✅ **문장 데이터 확장 (Intent 013~054)**
   - Intent 013~054 추가 완료 (42개 의도)
   - 각 의도에 3개의 추가 문장을 생성하여 총 6개로 확장
   - 4개 언어 (ko, en, ja, zh) 모두 6개 문장으로 확장
   - **완료된 의도**: intent_013 ~ intent_054 (42개 의도)
   - **전체 완료**: intent_001 ~ intent_054 (총 54개 의도)

### 해결되지 않은 것

2. ❌ **Gemini API 키 미설정**
   - `.env.local` 파일에 `GOOGLE_GEMINI_API_KEY`가 `your-gemini-api-key` 플레이스홀더로 설정됨
   - 실제 API 키가 필요하여 AI 기반 문장 생성 불가능
   - 사용자가 직접 Gemini API 키를 발급받아 설정해야 함

3. ⏳ **Google Cloud TTS 인증 문제**
   - 서비스 계정 키 파일이 제공되었으나 여전히 "Google Cloud TTS 설정이 필요합니다" 오류 발생
   - 추가 디버깅 필요

### 향후 개발을 위한 컨텍스트 정리

#### 1. 현재 프로젝트 상태
- **데이터 소스**: JSON 파일 (`data/situations.json`, `data/intents.json`)
- **데이터베이스**: Supabase 연결은 설정되어 있으나 현재는 사용하지 않음 (주석 처리)
- **TTS**: Google Cloud Text-to-Speech API 사용 (인증 문제 있음)
- **문장 생성**: Google Gemini API 사용 (API 키 미설정)

#### 2. 데이터 구조
```typescript
interface Intent {
  id: string;
  situationId: string;
  name: LocalizedText;
  description: LocalizedText;
  displayOrder: number;
  sentences?: LocalizedSentences; // 선택적 필드
}

type LocalizedSentences = {
  ko: string[];
  en: string[];
  ja: string[];
  zh: string[];
};
```

#### 3. 우선순위 로직
- **저장된 문장 우선**: `intent.sentences`에 값이 있으면 이를 먼저 사용
- **AI 생성 폴백**: 저장된 문장이 없거나 `forceGenerate: true`일 때만 Gemini API 호출

#### 4. 다음 단계
1. **즉시 해결 필요**:
   - 나머지 42개 의도에 대해 각각 9개 문장 추가 (intent_013 ~ intent_054)
   - Google Cloud TTS 인증 문제 해결

2. **사용자 설정 필요**:
   - Gemini API 키 발급 및 `.env.local` 설정
   - Google Cloud Project 설정 확인

3. **향후 개선 사항**:
   - Supabase 데이터베이스에 데이터 마이그레이션 (옵션)
   - 문장 데이터 추가 확장 (상황별 다양성 증가)
   - TTS 캐싱 로직 개선

#### 5. 파일 구조
```
data/
  ├── situations.json     # 17개 상황 정의 (완료)
  └── intents.json        # 54개 의도 정의 (완료)
    - intent_001~012: 각 12개 문장
    - intent_013~054: 각 6개 문장

app/
  ├── situation/page.tsx  # 상황 선택 페이지
  ├── intent/page.tsx     # 의도 선택 페이지 (수정됨)
  └── sentence/page.tsx   # 문장 표시 페이지

app/api/
  ├── situations/route.ts # 상황 목록 API
  ├── intents/route.ts    # 의도 목록 API
  ├── generate/route.ts   # 문장 생성 API
  └── tts/route.ts        # TTS API

lib/
  ├── db.ts               # 데이터베이스/JSON 파일 핸들러 (수정됨)
  ├── tts.ts              # Google Cloud TTS 클라이언트
  ├── openai.ts           # Gemini API 클라이언트
  └── i18n.ts             # 다국어 지원 유틸리티
```

#### 6. 환경 변수 상태
- ✅ `NEXT_PUBLIC_SUPABASE_URL`: 설정됨 (현재 사용 안 함)
- ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY`: 설정됨 (현재 사용 안 함)
- ⚠️ `GOOGLE_GEMINI_API_KEY`: 플레이스홀더 값 (`your-gemini-api-key`)
- ⚠️ `GOOGLE_CLOUD_API_KEY`: 설정됨 (인증 문제 있음)
- ✅ `GOOGLE_CLOUD_PROJECT_ID`: 설정됨
- ✅ `GOOGLE_APPLICATION_CREDENTIALS`: 서비스 계정 키 파일 경로 설정됨

#### 7. 알려진 문제 및 해결 방법
- **문제**: 의도 리스트가 표시되지 않음
  - **원인**: Supabase 연결 시도로 빈 데이터 반환
  - **해결**: `lib/db.ts`에서 Supabase 연결 비활성화

- **문제**: "다시 생성하기" 버튼 클릭 시 화면 미업데이트
  - **원인**: React 상태 변경 감지 실패
  - **해결**: `setSentences([])`로 먼저 초기화, 새 배열 참조 생성

- **문제**: Gemini API 호출 실패
  - **원인**: API 키 미설정
  - **현재 상태**: 저장된 문장으로 폴백

---

## 이전 로그

### 2025-12-26 - TTS 마이그레이션 및 환경 설정

#### 작성 시각
2025-12-26 오전

#### 해결하고자 한 문제
1. OpenAI TTS에서 Google Cloud Text-to-Speech로 마이그레이션
2. 한글 인코딩 깨짐 문제
3. TTS 재생 실패 문제
4. "다시 생성하기" 버튼 동작 문제

#### 해결된 것
1. ✅ **TTS 마이그레이션 완료**
   - OpenAI TTS → Google Cloud Text-to-Speech
   - REST API 기반 구현으로 변경
   - 다국어 음성 지원 (ko-KR, en-US, ja-JP, zh-CN)

2. ✅ **한글 인코딩 문제 해결**
   - `data/intents.json`, `data/situations.json` 파일의 깨진 한글 수동 수정
   - `.gitattributes` 파일 생성하여 UTF-8 인코딩 강제
   - `app/layout.tsx`에 UTF-8 메타 태그 추가

3. ✅ **TTS 재생 에러 핸들링 개선**
   - 브라우저 자동재생 정책 관련 안내 추가
   - API 에러 메시지 상세화

4. ✅ **"다시 생성하기" 버튼 로직 개선**
   - `forceGenerate: true` 플래그 추가
   - 상태 초기화 및 재렌더링 강제

#### 해결되지 않은 것
1. ❌ **Google Cloud TTS 인증 문제**
   - 서비스 계정 키 제공 후에도 여전히 "설정 필요" 오류
   - 디버깅 필요

2. ❌ **Gemini API 키 미설정**
   - 새로운 문장 생성 불가능

### 참고 문서
- [TTS_MIGRATION.md](./TTS_MIGRATION.md) - TTS 마이그레이션 상세 가이드
- [ENCODING_FIX.md](./ENCODING_FIX.md) - 인코딩 문제 해결 가이드
- [CODE_REVIEW.md](./CODE_REVIEW.md) - 코드 리뷰 결과

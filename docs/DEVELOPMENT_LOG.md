# QuickTalk MVP 개발 일지

## 작성 시각

2025-01-XX (개발 시작일)

## 해결하고자 한 문제

상황 기반 즉시 소통 서비스(QuickTalk) MVP 개발을 통해:

1. 사용자가 상황과 의도만 선택하면 AI가 즉시 사용 가능한 문장을 생성
2. 생성된 문장을 음성(TTS)으로 제공
3. 사용자 행동 로그를 수집하여 서비스 개선

## 해결된 것

### 1. 프로젝트 초기화 및 환경 설정

- Next.js 14+ (App Router) 프로젝트 생성
- TypeScript, Tailwind CSS 설정 완료
- pnpm 패키지 매니저 사용
- 필수 패키지 설치: zustand, axios, react-hot-toast, openai, @supabase/supabase-js

### 2. 타입 정의 및 상수

- Situation, Intent, UsageLog 타입 정의
- API 응답 타입 정의
- Store 타입 정의
- API 엔드포인트 및 상수 정의

### 3. 데이터베이스 설정

- PostgreSQL 연결 설정 (Supabase 클라이언트 또는 직접 연결)
- 데이터베이스 스키마 SQL 생성
- 초기 데이터 JSON 파일 생성 (4개 상황, 12개 의도)
- Fallback으로 JSON 파일 사용 가능하도록 구현

### 4. 상태 관리

- Zustand store 구현
- 상황, 의도, 문장, TTS 재생 여부, 평가 상태 관리
- resetStore 액션 구현

### 5. 공통 유틸리티

- API fetch wrapper (GET, POST, 에러 핸들링)
- 로깅 유틸리티 (세션 ID 생성, 디바이스 감지 등)
- OpenAI 클라이언트 (문장 생성 함수, 프롬프트 템플릿)
- TTS 클라이언트 (OpenAI TTS API 호출, 캐싱)

### 6. 공통 UI 컴포넌트

- Button 컴포넌트 (variant, size, loading 상태)
- Card 컴포넌트 (hover/active 효과)
- Loader 컴포넌트 (로딩 스피너)
- Header 컴포넌트 (로고, 뒤로가기 버튼)

### 7. API Routes 구현

- GET /api/situations: 모든 상황 목록 반환
- GET /api/intents: 특정 상황의 의도 목록 반환
- POST /api/generate: OpenAI로 문장 생성
- POST /api/tts: OpenAI TTS로 음성 생성
- POST /api/log: 사용자 행동 로그 저장

### 8. 프론트엔드 페이지 구현

- 랜딩 페이지: 서비스 소개, 핵심 가치, 사용 방법
- 상황 선택 페이지: 상황 카드 그리드, 클릭 시 의도 선택으로 이동
- 의도 선택 페이지: 의도 버튼 리스트, 클릭 시 문장 생성
- 문장 출력 페이지: 생성된 문장 표시, 복사, TTS 재생, 다시 생성
- 결과 평가 페이지: 평가 버튼 (해결됨/보통/도움 안됨), 건너뛰기
- 분석 페이지: 사용 완료 메시지, 재사용 CTA

### 9. 스타일링

- Tailwind CSS 커스터마이징 (브랜드 컬러)
- 반응형 디자인 (모바일 우선)
- 글로벌 스타일 설정

### 10. 테스트 환경 설정 및 에러 핸들링 개선 (최신)

- Jest 테스트 환경 설정
- API 엔드포인트 테스트 작성 (TDD 방식)
- 통합 에러 핸들러 구현 (AppError 클래스, createErrorResponse 함수)
- 모든 API Routes에 에러 핸들러 적용
- 환경 변수 설정 파일 (.env.local.example) 생성
- API 테스트 스크립트 작성 (bash, PowerShell)

## 안된 것 / 향후 개선 사항

### 1. 데이터베이스 연동

- 현재는 JSON 파일 fallback만 작동
- PostgreSQL/Supabase 실제 연동 필요
- 환경 변수 설정 필요 (DATABASE_URL 또는 Supabase 키)

### 2. OpenAI API 키 설정

- .env.local 파일에 OPENAI_API_KEY 설정 필요
- 실제 API 호출 테스트 필요

### 3. TTS 캐싱

- 현재 파일 시스템 캐싱 구현됨
- 프로덕션 환경에서는 Redis 또는 Vercel KV 사용 권장

### 4. 테스트 실행

- Jest 테스트 실행 필요 (`pnpm test`)
- 실제 API 호출 테스트 필요 (테스트 스크립트 사용)

### 5. 배포

- Vercel 배포 설정 미완료
- 환경 변수 설정 필요
- 프로덕션 빌드 테스트 필요

## 향후 개발을 위한 컨텍스트

### 환경 변수 설정 필요

`.env.local` 파일 생성:

```env
OPENAI_API_KEY=sk-proj-...
DATABASE_URL=postgresql://...
# 또는
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
NEXT_PUBLIC_API_URL=http://localhost:3000
NODE_ENV=development
```

### 데이터베이스 스키마 실행

`lib/db.ts`의 `CREATE_SCHEMA_SQL`을 PostgreSQL에서 실행 필요

### 초기 데이터 삽입

`data/situations.json`과 `data/intents.json`의 데이터를 데이터베이스에 삽입 필요

### 개발 서버 실행

```bash
pnpm install
pnpm dev
```

### 테스트 실행

```bash
# Jest 테스트 실행
pnpm test

# API 테스트 스크립트 실행 (서버 실행 후)
# Windows PowerShell
.\scripts\test-api.ps1

# Linux/Mac
chmod +x scripts/test-api.sh
./scripts/test-api.sh
```

### 주요 파일 구조

- `/app`: Next.js App Router 페이지 및 API Routes
- `/components`: React 컴포넌트
- `/lib`: 유틸리티 및 비즈니스 로직
  - `error-handler.ts`: 통합 에러 핸들링
- `/types`: TypeScript 타입 정의
- `/data`: 초기 데이터 JSON 파일
- `/__tests__`: Jest 테스트 파일
- `/scripts`: 테스트 스크립트

### 다음 단계

1. ✅ 환경 변수 설정 및 데이터베이스 연동 (진행 중)
2. ✅ 실제 API 호출 테스트 (테스트 코드 작성 완료)
3. ✅ 에러 핸들링 개선 (완료)
4. 테스트 실행 및 검증
5. 프로덕션 빌드 및 배포

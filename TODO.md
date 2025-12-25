# MVP TODO LIST (Phase 1)

## 📋 개발 순서
1. **환경 설정 및 기본 구조** (Day 1)
2. **공통 컴포넌트 및 상태 관리** (Day 1-2)
3. **백엔드 API 구현** (Day 2-3)
4. **프론트엔드 페이지 구현** (Day 3-5)
5. **통합 테스트 및 배포** (Day 5-7)

---

## 🔧 환경 설정 및 초기화 (Priority: P0)

### 프로젝트 설정
- [ ] Next.js 14+ 프로젝트 초기화
  ```bash
  npx create-next-app@latest quicktalk --typescript --tailwind --app
  ```
- [ ] 필수 패키지 설치
  ```bash
  npm install zustand axios react-hot-toast
  npm install -D @types/node
  ```
- [ ] 환경 변수 설정 (.env.local)
  ```
  OPENAI_API_KEY=
  DATABASE_URL=
  NEXT_PUBLIC_API_URL=
  ```
- [ ] ESLint, Prettier 설정
- [ ] Git 저장소 초기화 및 .gitignore 확인

### 폴더 구조 생성
- [ ] /app 라우트 구조 생성
- [ ] /components 폴더 생성
- [ ] /lib 폴더 생성 (유틸리티)
- [ ] /types 폴더 생성
- [ ] /public 폴더 정리

---

## 🎨 공통 컴포넌트 (Priority: P0)

### 상태 관리
- [ ] `/lib/store.ts` - Zustand store 생성
  - [ ] situation state (id, name, icon)
  - [ ] intent state (id, name, situationId)
  - [ ] sentences state (array of generated sentences)
  - [ ] ttsPlayed state (boolean)
  - [ ] resultRating state (1-3)
  - [ ] resetStore action

### 공통 유틸리티
- [ ] `/lib/api.ts` - API fetch wrapper
  - [ ] GET 요청 함수
  - [ ] POST 요청 함수
  - [ ] 에러 핸들링
  - [ ] 로딩 상태 관리
- [ ] `/lib/logger.ts` - 로그 전송 함수
  - [ ] logSelection(type, data)
  - [ ] logGeneration(sentences)
  - [ ] logRating(rating)
  - [ ] logTTSPlay()
- [ ] `/lib/constants.ts` - 상수 정의
  - [ ] API endpoints
  - [ ] 로컬 스토리지 키
  - [ ] 기본 설정값

### UI 컴포넌트
- [ ] `/components/Button.tsx` - 공통 버튼 컴포넌트
  - [ ] variant: primary, secondary, ghost
  - [ ] size: sm, md, lg
  - [ ] loading state
- [ ] `/components/Card.tsx` - 카드 컴포넌트
  - [ ] 상황/의도 선택용
  - [ ] hover/active 상태
- [ ] `/components/Loader.tsx` - 로딩 스피너
- [ ] `/components/Toast.tsx` - 알림 메시지 (react-hot-toast)
- [ ] `/components/Header.tsx` - 공통 헤더
  - [ ] 로고
  - [ ] 뒤로가기 버튼 (조건부)

---

## 🔌 백엔드 API (Priority: P0)

### 데이터베이스 (간이 구현)
- [ ] `/lib/db.ts` - In-memory DB 또는 JSON 파일
  - [ ] situations 데이터
  - [ ] intents 데이터 (situationId 매핑)
  - [ ] logs 배열
- [ ] 테스트 데이터 준비 (최소 3개 상황, 각 3개 의도)

### API Routes (App Router)
- [ ] `/app/api/situations/route.ts` - GET
  - [ ] 모든 상황 목록 반환
  - [ ] 응답 형식: `{ situations: [...] }`
  
- [ ] `/app/api/intents/route.ts` - GET
  - [ ] Query: `?situationId=xxx`
  - [ ] 해당 상황의 의도 목록 반환
  - [ ] 응답 형식: `{ intents: [...] }`
  
- [ ] `/app/api/generate/route.ts` - POST
  - [ ] Body: `{ situationId, intentId }`
  - [ ] OpenAI API 호출 (GPT-4 또는 GPT-3.5-turbo)
  - [ ] 2-3개 문장 생성
  - [ ] 응답 형식: `{ sentences: [...] }`
  - [ ] 에러 핸들링 및 재시도 로직
  
- [x] `/app/api/tts/route.ts` - POST (Priority: P1)
  - [x] Body: `{ text }`
  - [x] TTS API 호출 (Google Cloud Text-to-Speech)
  - [x] 오디오 Buffer 반환
  - [x] 캐싱 전략 구현 (메모리 + 파일 캐시)
  
- [ ] `/app/api/log/route.ts` - POST
  - [ ] Body: `{ type, situationId, intentId, sentences, rating, ttsPlayed, timestamp }`
  - [ ] 로그 저장 (DB 또는 파일)
  - [ ] 응답: `{ success: true }`

### OpenAI 통합
- [ ] `/lib/openai.ts` - OpenAI 클라이언트
  - [ ] generateSentences(situation, intent) 함수
  - [ ] 프롬프트 템플릿 작성
    ```
    상황: {situation}
    의도: {intent}
    
    위 상황에서 {intent}를 표현하는 자연스럽고 예의 바른 문장 3개를 생성해주세요.
    각 문장은 실제 메신저나 이메일에서 바로 사용할 수 있어야 합니다.
    ```
  - [ ] 응답 파싱 및 검증
  - [ ] Rate limiting 처리

---

## 🎯 프론트엔드 페이지 (Priority: P0)

### 1. 랜딩 페이지 `/app/page.tsx`
- [ ] 헤더 섹션
  - [ ] 서비스 제목 "QuickTalk"
  - [ ] 한 줄 설명: "상황만 선택하면 바로 쓸 수 있는 문장"
- [ ] 핵심 가치 3가지 표시
  - [ ] 아이콘 + 텍스트 카드
  - [ ] "최소 클릭", "즉시 제공", "음성 지원"
- [ ] 사용 방법 요약 (3단계 시각화)
  - [ ] 1단계: 상황 선택
  - [ ] 2단계: 의도 선택
  - [ ] 3단계: 문장 사용
- [ ] 시작하기 버튼
  - [ ] 클릭 시 `/situation` 이동
  - [ ] 로그 수집 동의 안내 (간단한 모달 또는 툴팁)
- [ ] 반응형 레이아웃 (모바일 우선)

### 2. 상황 선택 페이지 `/app/situation/page.tsx`
- [ ] 헤더
  - [ ] 제목: "어떤 상황인가요?"
  - [ ] 뒤로가기 버튼 (홈으로)
- [ ] 상황 카드 그리드 (3-4개)
  - [ ] API 데이터 fetch (useEffect)
  - [ ] 로딩 상태 표시
  - [ ] 각 카드: 아이콘 + 상황명 + 설명
  - [ ] hover/active 효과
- [ ] 카드 클릭 핸들러
  - [ ] Zustand store에 선택한 상황 저장
  - [ ] 로그 전송 (선택 시점)
  - [ ] `/intent` 페이지로 이동
- [ ] 에러 상태 처리

### 3. 의도 선택 페이지 `/app/intent/page.tsx`
- [ ] 헤더
  - [ ] 제목: "어떻게 전달하고 싶으신가요?"
  - [ ] 서브타이틀: 선택한 상황 표시
  - [ ] 뒤로가기 버튼 (상황 선택으로)
- [ ] 의도 버튼 리스트 (3-4개)
  - [ ] API 데이터 fetch (situationId 파라미터)
  - [ ] 로딩 상태 표시
  - [ ] 버튼 스타일 (큰 터치 영역)
- [ ] 버튼 클릭 핸들러
  - [ ] Zustand store에 선택한 의도 저장
  - [ ] API 호출: `/api/generate` (POST)
  - [ ] 로딩 스피너 표시 (1초 이내)
  - [ ] 응답 받으면 sentences를 store에 저장
  - [ ] `/sentence` 페이지로 이동
- [ ] 에러 핸들링 (재시도 버튼)

### 4. 문장 출력 페이지 `/app/sentence/page.tsx`
- [ ] 헤더
  - [ ] 제목: "생성된 문장"
  - [ ] 뒤로가기 버튼 (의도 선택으로)
- [ ] 문장 카드 리스트 (2-3개)
  - [ ] 각 카드: 문장 텍스트 표시
  - [ ] 복사 버튼
    - [ ] 클릭 시 클립보드 복사
    - [ ] 토스트 알림: "복사되었습니다"
  - [ ] TTS 재생 버튼 (Priority: P1)
    - [ ] 클릭 시 `/api/tts` 호출
    - [ ] 오디오 재생
    - [ ] 재생 중/일시정지 상태 표시
    - [ ] store에 ttsPlayed = true 저장
- [ ] 하단 버튼
  - [ ] "다시 생성" 버튼
    - [ ] 동일한 상황/의도로 재생성
    - [ ] API 재호출
  - [ ] "다음" 버튼 → `/result` 이동
- [ ] 빈 상태 처리 (sentences가 없을 경우)

### 5. 결과 평가 페이지 `/app/result/page.tsx`
- [ ] 헤더
  - [ ] 제목: "도움이 되셨나요?"
- [ ] 평가 버튼 (3개)
  - [ ] "해결됨 😊" (rating: 3)
  - [ ] "보통 😐" (rating: 2)
  - [ ] "도움 안됨 😞" (rating: 1)
  - [ ] 큰 터치 영역, 시각적 피드백
- [ ] 버튼 클릭 핸들러
  - [ ] store에 rating 저장
  - [ ] 로그 전송: `/api/log` (POST)
    - [ ] 전체 세션 데이터 전송
  - [ ] `/analysis` 페이지로 이동
- [ ] 건너뛰기 버튼
  - [ ] 평가 없이 다음으로 이동
  - [ ] 로그는 rating=null로 전송

### 6. 분석 페이지 `/app/analysis/page.tsx` (Priority: P1)
- [ ] 헤더
  - [ ] 제목: "사용 완료"
- [ ] 사용 요약
  - [ ] "오늘 {n}번째 사용입니다"
  - [ ] 간단한 메시지 또는 격려
- [ ] 재사용 CTA
  - [ ] "다른 상황 선택" 버튼 → `/situation`
  - [ ] "처음으로" 버튼 → `/`
- [ ] (선택) 히스토리 미리보기
  - [ ] 최근 3개 사용 내역

---

## 🎨 스타일링 (Priority: P0)

### Tailwind 설정
- [ ] `tailwind.config.js` 커스터마이징
  - [ ] 브랜드 컬러 정의
    ```js
    colors: {
      primary: '#4F46E5',    // Indigo
      secondary: '#10B981',  // Green
      accent: '#F59E0B',     // Amber
    }
    ```
  - [ ] 폰트 설정 (Pretendard 또는 Inter)
- [ ] 글로벌 스타일 (`app/globals.css`)
  - [ ] 기본 폰트, 배경색
  - [ ] 버튼 hover 효과
  - [ ] 애니메이션 (fade-in, slide-up)

### 컴포넌트 스타일
- [ ] 카드 컴포넌트 스타일
  - [ ] 그림자, 둥근 모서리
  - [ ] hover: 확대, 그림자 증가
  - [ ] active: 약간 축소
- [ ] 버튼 스타일
  - [ ] primary: 배경색, 텍스트 색
  - [ ] hover: 어둡게
  - [ ] disabled: 투명도 50%
- [ ] 반응형 브레이크포인트
  - [ ] 모바일: < 640px
  - [ ] 태블릿: 640px - 1024px
  - [ ] 데스크톱: > 1024px

---

## 🧪 테스트 및 QA (Priority: P1)

### 기능 테스트
- [ ] 전체 플로우 테스트 (E2E)
  - [ ] 랜딩 → 상황 → 의도 → 문장 → 결과 → 분석
- [ ] API 엔드포인트 테스트
  - [ ] 각 API 응답 확인
  - [ ] 에러 케이스 테스트
- [ ] 상태 관리 테스트
  - [ ] store 데이터 저장/불러오기
  - [ ] resetStore 동작 확인
- [ ] 로그 전송 확인
  - [ ] 콘솔 또는 DB에서 로그 확인

### 성능 테스트
- [ ] Lighthouse 점수 확인
  - [ ] Performance > 90
  - [ ] Accessibility > 90
- [ ] API 응답 시간 측정
  - [ ] /api/generate < 2초
  - [ ] /api/tts < 1초 (캐시된 경우)
- [ ] 페이지 로딩 시간
  - [ ] 각 페이지 < 1초

### 디바이스 테스트
- [ ] iOS Safari (모바일)
- [ ] Android Chrome (모바일)
- [ ] Desktop Chrome
- [ ] Desktop Safari

---

## 🚀 배포 (Priority: P0)

### Vercel 배포
- [ ] GitHub 저장소 연결
- [ ] 환경 변수 설정 (Vercel Dashboard)
  - [ ] OPENAI_API_KEY
  - [ ] 기타 필요한 키
- [ ] 프로덕션 빌드 테스트
  ```bash
  npm run build
  npm run start
  ```
- [ ] 도메인 연결 (선택)
- [ ] 배포 후 전체 플로우 재테스트

### 모니터링 설정
- [ ] Vercel Analytics 활성화
- [ ] 에러 로깅 (Sentry 또는 로그 파일)
- [ ] API 사용량 모니터링 (OpenAI 대시보드)

---

## 📊 데이터 수집 및 분석 (Priority: P1)

### 로그 분석
- [ ] 로그 데이터 조회 스크립트 작성
- [ ] 주요 지표 계산
  - [ ] 문장 생성 성공률
  - [ ] TTS 재생률
  - [ ] 평가 응답률
  - [ ] 상황별/의도별 사용 빈도
- [ ] 주간 리포트 자동화 (선택)

---

## 🔄 Phase 2 준비 (Priority: P2)

- [ ] 사용자 인증 시스템 설계
- [ ] 즐겨찾기 기능 스펙
- [ ] 커스텀 상황/의도 추가 기능
- [ ] 다국어 지원 준비 (i18n)

---

## 📝 문서화 (Priority: P1)

- [ ] README.md 업데이트
  - [ ] 프로젝트 소개
  - [ ] 설치 방법
  - [ ] 실행 방법
  - [ ] API 문서
- [ ] CHANGELOG.md 작성
- [ ] 사용자 가이드 작성 (랜딩 페이지 포함)

---

## ✅ 완료 기준

### MVP 출시 조건
- [x] 모든 P0 항목 완료
- [x] 환경 설정 및 기본 구조 완료
- [x] 공통 컴포넌트 및 상태 관리 완료
- [x] 백엔드 API 구현 완료 (OpenAI GPT-4, Google Cloud TTS)
- [x] 프론트엔드 페이지 구현 완료
- [x] 데이터베이스 연동 완료 (Supabase PostgreSQL)
- [x] 에러 핸들링 및 로깅 시스템 완료
- [x] Jest 테스트 환경 설정 완료
- [ ] 전체 플로우 정상 동작 확인
- [ ] 3명 이상 베타 테스터 피드백 수집
- [ ] Lighthouse 성능 점수 > 85
- [ ] 모바일/데스크톱 양쪽에서 정상 작동
- [x] 프로덕션 배포 준비 완료 (GitHub 푸시 완료)
- [x] 최소 3가지 상황, 각 3가지 의도 데이터 준비

---

## 💡 팁

1. **작은 단위로 커밋**: 각 기능 완료 시 즉시 커밋
2. **API 먼저 구현**: 프론트엔드 작업 전 API 동작 확인
3. **모바일 우선**: 스타일링 시 모바일부터 시작
4. **로그 적극 활용**: 모든 사용자 행동 로깅하여 개선점 발견
5. **빠른 반복**: 완벽보다는 빠른 출시 후 개선

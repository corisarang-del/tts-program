# QuickTalk - 상황 기반 즉시 소통 서비스

> "상황만 선택하면 바로 쓸 수 있는 문장"

사용자가 '상황'과 '의도'만 선택하면 AI가 즉시 사용 가능한 문장과 음성(TTS)을 제공하는 서비스입니다.

---

## 📚 목차
1. [기술 스택](#-기술-스택)
2. [폴더 구조](#-폴더-구조)
3. [API 엔드포인트](#-api-엔드포인트)
4. [테스트 데이터 형식](#-테스트-데이터-형식)
5. [설치 및 실행](#-설치-및-실행)
6. [개발 가이드](#-개발-가이드)

---

## 🛠 기술 스택

### 1) 기술 스택 선정 이유

#### **Frontend**
- **Next.js 14+ (App Router)**
  - **이유**: 파일 기반 라우팅으로 빠른 개발, SSR/SSG 지원, API Routes 내장
  - **장점**: SEO 최적화, 빠른 페이지 로딩, Vercel 배포 간편
  
- **TypeScript**
  - **이유**: 타입 안정성, 개발 생산성 향상, 런타임 에러 방지
  - **장점**: IDE 자동완성, 리팩토링 용이, 코드 품질 향상
  
- **Tailwind CSS**
  - **이유**: 유틸리티 우선 CSS, 빠른 프로토타이핑, 일관된 디자인
  - **장점**: 번들 사이즈 최소화, 반응형 디자인 간편, 커스터마이징 용이
  
- **Zustand**
  - **이유**: Redux보다 간단, Context API보다 성능 우수
  - **장점**: 보일러플레이트 최소화, TypeScript 지원, DevTools 지원

#### **Backend & API**
- **Next.js API Routes**
  - **이유**: 별도 백엔드 서버 불필요, 프론트엔드와 같은 저장소
  - **장점**: 배포 간편, Edge Functions 지원, 낮은 레이턴시
  
- **OpenAI GPT-4 API**
  - **이유**: 자연스러운 문장 생성, 다양한 상황/의도 처리 가능
  - **장점**: 빠른 응답 속도, 한국어 성능 우수, API 사용 간편
  
- **Google Cloud Text-to-Speech**
  - **이유**: 고품질 한국어 음성 합성, 안정적 서비스, 다양한 음성 옵션
  - **장점**: Standard/Wavenet 음성 선택, 캐싱 가능, 합리적 가격, 한국어 최적화

#### **Database & Storage**
- **Supabase PostgreSQL (구현 완료)**
  - **이유**: 관계형 데이터 관리, 실시간 동기화, 확장성
  - **장점**: 무료 플랜 충분, 인증 내장, 자동 백업
- **JSON 파일 (Fallback)**
  - **이유**: 개발 환경에서 Supabase 없이 동작
  - **구현**: /data/situations.json, /data/intents.json
- **메모리 캐싱 (TTS)**
  - **이유**: 동일 문장 반복 생성 시 비용 절감
  - **구현**: 세션 중 캐시 유지

#### **Deployment & Monitoring**
- **Vercel**
  - **이유**: Next.js 최적화, 무료 플랜, CI/CD 자동화
  - **장점**: 1클릭 배포, 프리뷰 배포, Edge Network
  
- **Vercel Analytics**
  - **이유**: 통합 분석 도구, 실시간 데이터
  - **장점**: 설정 불필요, Web Vitals 자동 수집

---

## 📁 폴더 구조

```
quicktalk/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # 랜딩 페이지
│   ├── layout.tsx                # 루트 레이아웃
│   ├── globals.css               # 글로벌 스타일
│   │
│   ├── situation/                # 상황 선택 페이지
│   │   └── page.tsx
│   │
│   ├── intent/                   # 의도 선택 페이지
│   │   └── page.tsx
│   │
│   ├── sentence/                 # 문장 출력 페이지
│   │   └── page.tsx
│   │
│   ├── result/                   # 결과 평가 페이지
│   │   └── page.tsx
│   │
│   ├── analysis/                 # 분석 페이지
│   │   └── page.tsx
│   │
│   └── api/                      # API Routes
│       ├── situations/
│       │   └── route.ts          # GET /api/situations
│       ├── intents/
│       │   └── route.ts          # GET /api/intents
│       ├── generate/
│       │   └── route.ts          # POST /api/generate
│       ├── tts/
│       │   └── route.ts          # POST /api/tts
│       └── log/
│           └── route.ts          # POST /api/log
│
├── components/                   # React 컴포넌트
│   ├── ui/                       # UI 컴포넌트
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Loader.tsx
│   │   └── Header.tsx
│   │
│   └── layout/                   # 레이아웃 컴포넌트
│       └── Container.tsx
│
├── lib/                          # 유틸리티 & 비즈니스 로직
│   ├── store.ts                  # Zustand 상태 관리 (situation, intent, language 포함)
│   ├── api.ts                    # API fetch wrapper
│   ├── logger.ts                 # 로깅 유틸리티
│   ├── constants.ts              # 상수 정의
│   ├── openai.ts                 # OpenAI GPT-4 클라이언트
│   ├── tts.ts                    # Google Cloud TTS 클라이언트 (캐싱 포함)
│   ├── db.ts                     # Supabase PostgreSQL + JSON Fallback
│   ├── env.ts                    # 환경 변수 검증
│   ├── error-handler.ts          # AppError 클래스, 에러 응답 처리
│   └── i18n.ts                   # 다국어 지원 (ko, en, ja, zh)
│
├── types/                        # TypeScript 타입 정의
│   ├── index.ts                  # 공통 타입 (Situation, Intent, UsageLog, Locale, LocalizedText)
│   ├── api.ts                    # API 응답 타입 (GenerateResponse, etc)
│   └── store.ts                  # Store 타입 (AppState)
│
├── data/                         # 정적 데이터
│   ├── situations.json           # 상황 목록
│   └── intents.json              # 의도 목록
│
├── public/                       # 정적 파일
│   ├── icons/                    # 아이콘
│   └── images/                   # 이미지
│
├── .env.local                    # 환경 변수 (로컬)
├── .gitignore
├── next.config.js                # Next.js 설정
├── tailwind.config.ts            # Tailwind 설정
├── tsconfig.json                 # TypeScript 설정
├── package.json
└── README.md
```

### 주요 파일 설명

#### `/lib/store.ts` - 전역 상태 관리
```typescript
interface AppState {
  // 선택한 데이터
  situation: Situation | null;
  intent: Intent | null;
  sentences: string[];
  
  // 사용자 행동
  ttsPlayed: boolean;
  resultRating: number | null;
  
  // Actions
  setSituation: (situation: Situation) => void;
  setIntent: (intent: Intent) => void;
  setSentences: (sentences: string[]) => void;
  setTtsPlayed: (played: boolean) => void;
  setResultRating: (rating: number) => void;
  resetStore: () => void;
}
```

#### `/lib/api.ts` - API 호출 래퍼
```typescript
export async function apiGet<T>(endpoint: string): Promise<T>
export async function apiPost<T>(endpoint: string, data: any): Promise<T>
```

#### `/lib/logger.ts` - 로깅 유틸리티
```typescript
export function logSelection(type: 'situation' | 'intent', data: any)
export function logGeneration(sentences: string[])
export function logRating(rating: number)
export function logTTSPlay()
```

---

## 🔌 API 엔드포인트

### 1. GET `/api/situations`
**목적**: 모든 상황 목록 반환

**Request**
```http
GET /api/situations
```

**Response** (200 OK)
```json
{
  "situations": [
    {
      "id": "situation_001",
      "name": "회의 지각",
      "description": "회의에 늦을 때",
      "icon": "clock",
      "displayOrder": 1
    },
    {
      "id": "situation_002",
      "name": "일정 변경 요청",
      "description": "약속 시간을 변경하고 싶을 때",
      "icon": "calendar",
      "displayOrder": 2
    }
  ]
}
```

**Error Response** (500)
```json
{
  "error": "Failed to fetch situations",
  "message": "상황 목록을 불러올 수 없습니다."
}
```

---

### 2. GET `/api/intents`
**목적**: 특정 상황에 대한 의도 목록 반환

**Request**
```http
GET /api/intents?situationId=situation_001
```

**Query Parameters**
- `situationId` (required): 상황 ID

**Response** (200 OK)
```json
{
  "intents": [
    {
      "id": "intent_001",
      "situationId": "situation_001",
      "name": "사과",
      "description": "늦어서 죄송하다는 의사 전달",
      "displayOrder": 1
    },
    {
      "id": "intent_002",
      "situationId": "situation_001",
      "name": "도착 시간 알림",
      "description": "예상 도착 시간 안내",
      "displayOrder": 2
    }
  ]
}
```

**Error Response** (400)
```json
{
  "error": "Missing situationId",
  "message": "situationId를 입력해주세요."
}
```

---

### 3. POST `/api/generate`
**목적**: 상황과 의도에 맞는 문장 생성 (AI)

**Request**
```http
POST /api/generate
Content-Type: application/json

{
  "situationId": "situation_001",
  "intentId": "intent_001"
}
```

**Response** (200 OK)
```json
{
  "sentences": [
    "죄송합니다. 교통 상황으로 10분 정도 늦을 것 같습니다.",
    "늦어서 죄송합니다. 최대한 빨리 도착하겠습니다.",
    "예상보다 길이 막혀 조금 늦게 도착할 것 같습니다. 양해 부탁드립니다."
  ],
  "generatedAt": "2025-12-25T10:30:00Z"
}
```

**Error Response** (500)
```json
{
  "error": "Generation failed",
  "message": "문장 생성 중 오류가 발생했습니다. 다시 시도해주세요."
}
```

**Rate Limit** (429)
```json
{
  "error": "Rate limit exceeded",
  "message": "요청이 너무 많습니다. 잠시 후 다시 시도해주세요.",
  "retryAfter": 60
}
```

---

### 4. POST `/api/tts`
**목적**: 텍스트를 음성으로 변환 (Google Cloud TTS)

**Request**
```http
POST /api/tts
Content-Type: application/json

{
  "text": "죄송합니다. 교통 상황으로 10분 정도 늦을 것 같습니다.",
  "voice": "ko-KR-Standard-A"  // optional, 기본값: ko-KR-Standard-A
}
```

**지원 음성**:
- `ko-KR-Standard-A` (여성, 기본값)
- `ko-KR-Standard-B` (남성)
- `ko-KR-Standard-C` (여성)
- `ko-KR-Standard-D` (남성)
- `ko-KR-Wavenet-A` (고품질 여성)
- `ko-KR-Wavenet-B` (고품질 남성)
- `ko-KR-Wavenet-C` (고품질 여성)
- `ko-KR-Wavenet-D` (고품질 남성)

**Response** (200 OK)
```
Content-Type: audio/mpeg
X-Audio-Cached: true/false
X-Audio-Duration: 3.5

[MP3 오디오 바이너리 데이터]
```

**Error Response** (500)
```json
{
  "error": "TTS generation failed",
  "message": "음성 생성 중 오류가 발생했습니다."
}
```

---

### 5. POST `/api/log`
**목적**: 사용자 행동 로그 저장

**Request**
```http
POST /api/log
Content-Type: application/json

{
  "sessionId": "session_abc123",
  "situationId": "situation_001",
  "intentId": "intent_001",
  "sentences": [
    "죄송합니다. 교통 상황으로 10분 정도 늦을 것 같습니다."
  ],
  "selectedSentenceIndex": 0,
  "ttsPlayed": true,
  "resultRating": 3,
  "timestamp": "2025-12-25T10:30:00Z",
  "userAgent": "Mozilla/5.0...",
  "device": "mobile"
}
```

**Response** (200 OK)
```json
{
  "success": true,
  "logId": "log_xyz789"
}
```

**Error Response** (500)
```json
{
  "error": "Failed to save log",
  "message": "로그 저장에 실패했습니다."
}
```

---

## 📊 테스트 데이터 형식

### 1. Situation (상황)
```typescript
interface Situation {
  id: string;              // 고유 ID (예: "situation_001")
  name: string;            // 상황명 (예: "회의 지각")
  description: string;     // 설명 (예: "회의에 늦을 때")
  icon: string;            // 아이콘 이름 (예: "clock")
  displayOrder: number;    // 표시 순서
}
```

**예시 데이터** (`data/situations.json`)
```json
[
  {
    "id": "situation_001",
    "name": "회의 지각",
    "description": "회의에 늦을 때",
    "icon": "clock",
    "displayOrder": 1
  },
  {
    "id": "situation_002",
    "name": "일정 변경 요청",
    "description": "약속 시간을 변경하고 싶을 때",
    "icon": "calendar",
    "displayOrder": 2
  },
  {
    "id": "situation_003",
    "name": "도움 요청",
    "description": "동료나 상사에게 도움을 요청할 때",
    "icon": "help-circle",
    "displayOrder": 3
  },
  {
    "id": "situation_004",
    "name": "보고 사항",
    "description": "업무 진행 상황을 보고할 때",
    "icon": "file-text",
    "displayOrder": 4
  }
]
```

---

### 2. Intent (의도)
```typescript
interface Intent {
  id: string;              // 고유 ID (예: "intent_001")
  situationId: string;     // 연결된 상황 ID
  name: string;            // 의도명 (예: "사과")
  description: string;     // 설명
  displayOrder: number;    // 표시 순서
}
```

**예시 데이터** (`data/intents.json`)
```json
[
  {
    "id": "intent_001",
    "situationId": "situation_001",
    "name": "사과",
    "description": "늦어서 죄송하다는 의사 전달",
    "displayOrder": 1
  },
  {
    "id": "intent_002",
    "situationId": "situation_001",
    "name": "도착 시간 알림",
    "description": "예상 도착 시간 안내",
    "displayOrder": 2
  },
  {
    "id": "intent_003",
    "situationId": "situation_001",
    "name": "온라인 참여 요청",
    "description": "온라인으로 먼저 참여하겠다는 의사",
    "displayOrder": 3
  },
  {
    "id": "intent_004",
    "situationId": "situation_002",
    "name": "공손한 요청",
    "description": "정중하게 일정 변경 요청",
    "displayOrder": 1
  },
  {
    "id": "intent_005",
    "situationId": "situation_002",
    "name": "대안 제시",
    "description": "다른 시간대 제안",
    "displayOrder": 2
  }
]
```

---

### 3. UsageLog (사용 로그)
```typescript
interface UsageLog {
  logId: string;                    // 로그 ID
  sessionId: string;                // 세션 ID
  userId?: string;                  // 사용자 ID (선택, Phase 2)
  situationId: string;              // 선택한 상황
  intentId: string;                 // 선택한 의도
  sentences: string[];              // 생성된 문장 목록
  selectedSentenceIndex?: number;   // 사용자가 선택한 문장 인덱스
  ttsPlayed: boolean;               // TTS 재생 여부
  resultRating: number | null;      // 평가 (1-3, null=미평가)
  timestamp: string;                // 생성 시간 (ISO 8601)
  userAgent: string;                // User Agent
  device: 'mobile' | 'tablet' | 'desktop';  // 디바이스 타입
}
```

**예시 로그 데이터**
```json
{
  "logId": "log_20251225_001",
  "sessionId": "session_abc123",
  "situationId": "situation_001",
  "intentId": "intent_001",
  "sentences": [
    "죄송합니다. 교통 상황으로 10분 정도 늦을 것 같습니다.",
    "늦어서 죄송합니다. 최대한 빨리 도착하겠습니다.",
    "예상보다 길이 막혀 조금 늦게 도착할 것 같습니다. 양해 부탁드립니다."
  ],
  "selectedSentenceIndex": 0,
  "ttsPlayed": true,
  "resultRating": 3,
  "timestamp": "2025-12-25T10:30:00Z",
  "userAgent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)...",
  "device": "mobile"
}
```

---

### 4. OpenAI 프롬프트 템플릿
```typescript
interface PromptTemplate {
  situation: string;
  intent: string;
  systemPrompt: string;
  userPrompt: string;
}
```

**예시 프롬프트**
```typescript
const systemPrompt = `당신은 한국 직장 문화에 정통한 커뮤니케이션 전문가입니다. 
사용자가 제시한 상황과 의도에 맞는 자연스럽고 예의 바른 문장을 생성해주세요.

규칙:
1. 각 문장은 실제 메신저나 이메일에서 바로 사용할 수 있어야 합니다.
2. 존댓말을 사용하되, 과하지 않게 자연스러워야 합니다.
3. 문장은 2-3줄 이내로 간결하게 작성합니다.
4. 3개의 다양한 옵션을 제공합니다.`;

const userPrompt = `
상황: ${situation.name} (${situation.description})
의도: ${intent.name} (${intent.description})

위 상황에서 ${intent.name}를 표현하는 문장 3개를 생성해주세요.
JSON 배열 형식으로만 응답해주세요: ["문장1", "문장2", "문장3"]
`;
```

---

## 🚀 설치 및 실행

### 1. Prerequisites
- Node.js 18+ 
- pnpm (권장) 또는 npm
- OpenAI API Key
- Google Cloud 프로젝트 및 서비스 계정 키

### 2. 설치
```bash
# 저장소 클론
git clone https://github.com/your-username/quicktalk.git
cd quicktalk

# 의존성 설치
npm install
```

### 3. 환경 변수 설정
`.env.local` 파일 생성:
```env
# OpenAI (문장 생성)
OPENAI_API_KEY=sk-proj-...

# Google Cloud Text-to-Speech (음성 합성)
# 방법 1: 서비스 계정 키 파일 경로
GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account-key.json

# 방법 2: 프로젝트 ID와 키 JSON 문자열
GOOGLE_CLOUD_PROJECT_ID=your-project-id
GOOGLE_CLOUD_KEY={"type":"service_account","project_id":"..."}

# Supabase (데이터베이스)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Analytics (선택)
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=...
```

**Google Cloud 설정 방법**:
1. [Google Cloud Console](https://console.cloud.google.com/)에서 프로젝트 생성
2. Cloud Text-to-Speech API 활성화
3. 서비스 계정 생성 및 키 다운로드
4. 환경 변수에 설정

### 4. 개발 서버 실행
```bash
npm run dev
```

브라우저에서 http://localhost:3000 접속

### 5. 빌드 및 프로덕션 실행
```bash
# 빌드
npm run build

# 프로덕션 실행
npm run start
```

---

## 👨‍💻 개발 가이드

### Cursor AI 사용 팁

#### 1. 컴포넌트 생성
```
@프롬프트: "Button 컴포넌트를 만들어줘. variant(primary, secondary, ghost), size(sm, md, lg), loading 상태를 지원해야 해. Tailwind CSS 사용."
```

#### 2. API Route 생성
```
@프롬프트: "/api/situations route를 만들어줘. data/situations.json 파일을 읽어서 반환하고, 에러 핸들링도 포함해줘."
```

#### 3. 페이지 생성
```
@프롬프트: "상황 선택 페이지를 만들어줘. /api/situations를 호출해서 카드 그리드로 표시하고, 클릭 시 Zustand store에 저장 후 /intent로 이동해야 해."
```

#### 4. 타입 정의
```
@프롬프트: "Situation, Intent, UsageLog 타입을 types/index.ts에 정의해줘. README.md의 테스트 데이터 형식 참고."
```

### 코딩 컨벤션

#### 파일명
- 컴포넌트: PascalCase (예: `Button.tsx`)
- 유틸리티: camelCase (예: `logger.ts`)
- 페이지: lowercase (예: `page.tsx`)

#### 컴포넌트 구조
```typescript
// 1. Imports
import { useState } from 'react';

// 2. Types
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

// 3. Component
export default function Button({ variant = 'primary', onClick }: ButtonProps) {
  // 4. State & Hooks
  const [loading, setLoading] = useState(false);
  
  // 5. Handlers
  const handleClick = () => {
    onClick?.();
  };
  
  // 6. Render
  return (
    <button onClick={handleClick} className="...">
      Click me
    </button>
  );
}
```

#### API Route 구조
```typescript
// app/api/situations/route.ts
import { NextResponse } from 'next/server';
import situations from '@/data/situations.json';

export async function GET() {
  try {
    // 로직
    return NextResponse.json({ situations });
  } catch (error) {
    console.error('Error fetching situations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch situations' },
      { status: 500 }
    );
  }
}
```

### Git 커밋 컨벤션
```
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 포맷팅
refactor: 코드 리팩토링
test: 테스트 추가
chore: 빌드 업무, 패키지 매니저 수정

예시:
feat: Add situation selection page
fix: Fix TTS audio not playing on mobile
docs: Update API documentation
```

---

## 📈 성능 최적화

### 1. Image Optimization
- Next.js `<Image>` 컴포넌트 사용
- WebP 포맷 사용
- Lazy loading

### 2. Code Splitting
- Dynamic import 사용
```typescript
const HeavyComponent = dynamic(() => import('./HeavyComponent'));
```

### 3. API Caching
```typescript
// app/api/situations/route.ts
export const revalidate = 3600; // 1시간 캐싱
```

### 4. TTS 캐싱
- 동일한 텍스트는 캐싱하여 재사용
- Redis 또는 Vercel KV 활용

---

## 🧪 테스트

### Unit Tests (Jest)
```bash
npm run test
```

### E2E Tests (Playwright)
```bash
npm run test:e2e
```

### Lighthouse CI
```bash
npm run lighthouse
```

---

## 📦 배포

### Vercel 배포 (권장)
```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel
```

### 환경 변수 설정 (Vercel Dashboard)
1. Project Settings → Environment Variables
2. 모든 환경 변수 추가
3. Production, Preview, Development 선택

---

## 📊 모니터링

### Vercel Analytics
- 자동으로 페이지 뷰, Web Vitals 수집
- Dashboard에서 확인

### Custom Logging
```typescript
// lib/logger.ts
export function trackEvent(eventName: string, data: any) {
  // Vercel Analytics, Mixpanel, etc.
  console.log('[Event]', eventName, data);
}
```

---

## 🐛 트러블슈팅

### 1. OpenAI API 에러
**문제**: `429 Rate Limit Exceeded`
**해결**: 
- `.env.local`에 API 키 확인
- OpenAI 대시보드에서 사용량 확인
- 재시도 로직 추가

### 2. Google Cloud TTS 인증 에러
**문제**: `GOOGLE_APPLICATION_CREDENTIALS` 누락 또는 인증 실패
**해결**:
- Google Cloud Console에서 서비스 계정 생성 후 JSON 키 다운로드
- `.env.local`에 설정:
  ```env
  GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account-key.json
  # 또는
  GOOGLE_CLOUD_PROJECT_ID=your-project-id
  GOOGLE_CLOUD_KEY={"type":"service_account",...}
  ```
- Google Cloud Console에서 Cloud Text-to-Speech API 활성화 확인
- 서비스 계정에 `roles/tts.client` 역할 부여

### 3. TTS 재생 안됨 (모바일)
**문제**: iOS Safari에서 TTS 재생 안됨
**해결**: 
- 사용자 인터랙션 후 재생 시작
- autoplay 정책 확인

### 4. 빌드 에러
**문제**: `Module not found`
**해결**:
```bash
rm -rf .next node_modules
npm install
npm run build
```

---

## 📞 지원

- **이슈 제보**: [GitHub Issues](https://github.com/your-username/quicktalk/issues)
- **문의**: your-email@example.com

---

## 📄 라이선스

MIT License

---

## 🙏 감사의 말

이 프로젝트는 말로 표현하기 어려운 순간을 겪는 모든 분들을 위해 만들어졌습니다.

**Made with ❤️ by QuickTalk Team**

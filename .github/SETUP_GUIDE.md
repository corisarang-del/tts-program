# 배포 설정 완전 가이드

GitHub Pages + Vercel API 배포를 한 번에 설정하는 가이드입니다.

## 개요

```
┌─────────────────────────────────────────────────────────┐
│                  Your Repository                        │
├─────────────────────────────────────────────────────────┤
│  /app              (Frontend 코드)                       │
│  /lib              (API 클라이언트, 공용 로직)           │
│  /components       (React 컴포넌트)                      │
│  /app/api          (API Routes - Vercel에서 배포)       │
│  package.json      (Next.js 14.2.5)                     │
│  next.config.js    (환경별 설정)                        │
└─────────────────────────────────────────────────────────┘
         ↓                           ↓
    GitHub Actions              GitHub Actions
    (매번 push 시)              (Vercel webhook)
         ↓                           ↓
┌─────────────────┐         ┌──────────────────┐
│  GitHub Pages   │         │  Vercel          │
│  Frontend Only  │         │  API Serverless  │
└─────────────────┘         └──────────────────┘
   정적 파일 호스팅          API Routes → Functions
   (out 폴더)                 (.next 폴더)
```

## 배포 아키텍처

| 구성            | GitHub Pages                | Vercel                 |
| --------------- | --------------------------- | ---------------------- |
| **배포 대상**   | 프론트엔드만                | API만                  |
| **빌드 설정**   | `output: 'export'`          | API routes 활성화      |
| **생성 폴더**   | `out/` (정적 HTML)          | `.next/` (Serverless)  |
| **호스팅 방식** | Static Files                | Serverless Functions   |
| **비용**        | 무료                        | 무료 (소규모)          |
| **URL 예**      | https://user.github.io/repo | https://api.vercel.app |

## 단계별 설정

### 1단계: 로컬 확인

프로젝트를 받았거나 클론했을 때:

```bash
# 의존성 설치
npm ci

# 로컬 개발
npm run dev
# http://localhost:3000

# GitHub Pages용 빌드 테스트
# Unix/Linux/Mac:
DEPLOYMENT_TARGET=github-pages npm run build
ls out/  # 정적 파일 확인

# Windows PowerShell:
$env:DEPLOYMENT_TARGET="github-pages"; npm run build
Get-ChildItem out/  # 정적 파일 확인

# Windows CMD:
set DEPLOYMENT_TARGET=github-pages && npm run build
dir out\  # 정적 파일 확인

# Vercel용 빌드 테스트
npm run build
ls .next/  # 동적 빌드 확인 (PowerShell: Get-ChildItem .next/)
```

### 2단계: GitHub 리포지토리 설정

#### 2.1 GitHub Pages 활성화

1. GitHub 리포지토리 → Settings → Pages
2. Build and deployment:
   - Source: **GitHub Actions** 선택
   - (자동으로 `.github/workflows/github-pages.yml` 감지)

#### 2.2 GitHub Secrets 추가

Settings → Secrets and variables → Actions:

```
GITHUB_PAGES_API_URL = https://your-api.vercel.app
```

(Vercel API URL은 나중에 추가)

### 3단계: Vercel 프로젝트 생성 및 배포

#### 3.1 Vercel에서 프로젝트 생성

1. https://vercel.com/dashboard 접속
2. "Add New..." → "Project"
3. GitHub 리포젖토리 선택
4. 프로젝트명: `quicktalk-api` (또는 원하는 이름)
5. Framework: **Next.js** 선택

#### 3.2 빌드 및 환경 설정

Vercel 프로젝트 Settings:

**Build Settings:**

```
Build Command: npm run build
Output Directory: .next
Install Command: npm ci
```

**Environment Variables:**

```
GOOGLE_API_KEY = <your-google-api-key>
SUPABASE_URL = <your-supabase-url>
SUPABASE_ANON_KEY = <your-supabase-key>
NEXT_PUBLIC_API_URL = https://your-api.vercel.app
```

#### 3.3 배포

Vercel에서 "Deploy" 클릭

배포 완료 후:

- Vercel 프로젝트 URL 확인 (예: https://quicktalk-api.vercel.app)
- 이 URL을 GitHub Secrets에 추가

### 4단계: GitHub Secrets 업데이트

Settings → Secrets and variables → Actions에서:

```
GITHUB_PAGES_API_URL = https://quicktalk-api.vercel.app
```

(위에서 취득한 Vercel API URL 입력)

### 5단계: 배포 확인

1. main 브랜치에 작은 변경 커밋

```bash
git add .
git commit -m "chore: setup deployment"
git push origin main
```

2. GitHub Actions 실행 확인

   - Repository → Actions 탭
   - "Deploy to GitHub Pages" workflow 실행 확인

3. 배포된 사이트 확인

   - https://username.github.io/repository-name
   - 페이지 로드 확인
   - 개발자 도구 Console에서 에러 확인

4. API 연결 확인
   - Network 탭에서 `/api/` 요청 확인
   - Response status 200 확인

## 파일 구조 및 역할

```
.github/
├── workflows/
│   ├── pr-check.yml              # PR 검증 (lint, test, build)
│   ├── github-pages.yml          # GitHub Pages 배포
│   └── deploy.yml                # Vercel 배포 (선택)
├── GITHUB_PAGES_SETUP.md         # GitHub Pages 설정 가이드
├── VERCEL_API_DEPLOYMENT.md      # Vercel API 배포 가이드
├── DEPLOYMENT.md                 # Vercel 통합 배포 가이드
└── SETUP_GUIDE.md                # 이 파일

next.config.js                      # 환경별 빌드 설정
├ DEPLOYMENT_TARGET=github-pages
│  → output: 'export' (정적 빌드)
└ DEPLOYMENT_TARGET=vercel
  → output 제거 (동적 빌드)
```

## 워크플로우 흐름

### 배포 흐름

```
Developer Push to Main
    ↓
GitHub Actions Trigger
    ├─ Lint & Test (pr-check.yml)
    │  ├ Run ESLint
    │  ├ Run TypeScript check
    │  ├ Run Jest tests
    │  └ Build test
    │
    ├─ GitHub Pages Deployment (github-pages.yml)
    │  ├ DEPLOYMENT_TARGET=github-pages
    │  ├ npm run build → out/
    │  ├ Upload to GitHub Pages
    │  └ https://user.github.io/repo ✓
    │
    └─ Vercel Webhook (자동 배포)
       ├ Vercel detects push
       ├ npm run build → .next/
       ├ Deploy to Vercel
       └ https://your-api.vercel.app ✓
```

### 요청 흐름

```
Browser (https://user.github.io/repo)
    ↓
1. Fetch index.html (GitHub Pages 제공)
    ↓
2. Load JavaScript
    ↓
3. Call fetch('https://your-api.vercel.app/api/generate')
    ↓
4. Vercel API Function 실행
    ↓
5. Response: { sentences: [...], tts_urls: [...] }
    ↓
6. Browser 렌더링
```

## 환경 변수 체계

### 빌드 타임 변수

```bash
DEPLOYMENT_TARGET=github-pages  # GitHub Pages용 (정적)
DEPLOYMENT_TARGET=vercel        # Vercel용 (동적)
```

### 런타임 변수

**프론트엔드 (public):**

- `NEXT_PUBLIC_API_URL`: API 서버 URL
  - GitHub Pages: `https://your-api.vercel.app`
  - 로컬 개발: `http://localhost:3000`

**API 서버 (private):**

- `GOOGLE_API_KEY`: Google Cloud API
- `SUPABASE_URL`: Supabase 데이터베이스
- `SUPABASE_ANON_KEY`: Supabase 인증

## 로컬 개발

### 풀스택 개발 (한 터미널)

```bash
npm run dev
# http://localhost:3000
# API도 함께 실행됨
```

### GitHub Pages 정적 빌드 테스트 (두 터미널)

**Unix/Linux/Mac:**

```bash
# 터미널 1: 정적 빌드
DEPLOYMENT_TARGET=github-pages npm run build
npx http-server ./out -p 8080
# http://localhost:8080

# 터미널 2: API 서버 (필요 시)
# 또는 환경 변수로 API URL 변경
NEXT_PUBLIC_API_URL=http://actual-api-server.com
```

**Windows PowerShell:**

```powershell
# 터미널 1: 정적 빌드
$env:DEPLOYMENT_TARGET="github-pages"; npm run build
npx http-server ./out -p 8080
# http://localhost:8080

# 터미널 2: API 서버 (필요 시)
# 또는 환경 변수로 API URL 변경
$env:NEXT_PUBLIC_API_URL="http://actual-api-server.com"
```

**Windows CMD:**

```cmd
# 터미널 1: 정적 빌드
set DEPLOYMENT_TARGET=github-pages && npm run build
npx http-server ./out -p 8080
# http://localhost:8080

# 터미널 2: API 서버 (필요 시)
# 또는 환경 변수로 API URL 변경
set NEXT_PUBLIC_API_URL=http://actual-api-server.com
```

### Vercel 로컬 시뮬레이션

```bash
npm install -g vercel
vercel dev
# http://localhost:3000 (Vercel 환경 시뮬레이션)
```

## 배포 후 체크리스트

- [ ] GitHub Pages URL 접속 가능
- [ ] 페이지 로드 시간 < 2초
- [ ] 모든 API 호출이 Vercel로 감 (Network 탭)
- [ ] API 응답 상태 200
- [ ] Console에 에러 없음
- [ ] 모든 기능 정상 동작
- [ ] 모바일에서도 정상 동작

## 트러블슈팅

### GitHub Pages에 배포되지 않음

**확인:**

1. Settings → Pages → Source: GitHub Actions 선택됨
2. Actions 탭에서 워크플로우 실행 로그 확인
3. `npm run build` 로컬에서 성공하는지 확인

### API 호출 실패 (404, CORS)

**확인:**

1. `GITHUB_PAGES_API_URL` Secrets 설정됨
2. Vercel 배포 성공 (대시보드 확인)
3. API URL이 올바른지 (예: https://your-api.vercel.app)
4. CORS 헤더 설정 (API 서버)

### 환경 변수 누락

**확인:**

```bash
# Vercel 환경 변수 확인
vercel env ls

# GitHub Secrets 확인
# Repository → Settings → Secrets and variables
```

## 다음 단계

배포 후:

1. **로그 모니터링**

   - Vercel 대시보드 → Analytics, Logs
   - GitHub Pages 빌드 로그

2. **성능 모니터링**

   - Vercel Speed Insights
   - Web Vitals 추적

3. **에러 트래킹**

   - Browser Console 에러
   - API Server Logs

4. **지속적 배포**
   - main 브랜치에 push
   - 자동 배포 됨

## 참고 자료

- [GitHub Pages 문서](https://docs.github.com/en/pages)
- [Vercel 배포 가이드](https://vercel.com/docs)
- [Next.js 배포](https://nextjs.org/docs/deployment)
- [GitHub Actions](https://docs.github.com/en/actions)
- [Environment Variables in Next.js](https://nextjs.org/docs/basic-features/environment-variables)

## 문의

문제가 있으면:

1. 로그 확인 (GitHub Actions, Vercel)
2. 환경 변수 확인 (GitHub Secrets, Vercel Settings)
3. 로컬 빌드 테스트
4. 문서의 트러블슈팅 섹션 참조

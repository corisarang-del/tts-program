# Vercel API 배포 가이드

프론트엔드는 GitHub Pages에, API는 Vercel에 배포하는 구성입니다.

## 아키텍처

```
GitHub Pages (Frontend - Static)    Vercel (API - Serverless Functions)
  https://username.github.io/repo    https://your-api.vercel.app
         ↓                                    ↑
    index.html                        /api/generate
    styles.css                        /api/tts
    scripts.js                        /api/situations
         └────────────────────────────┘
```

## 1. Vercel 프로젝트 설정

### 1.1 새 Vercel 프로젝트 생성

1. [Vercel 대시보드](https://vercel.com/dashboard)에 접속
2. "Add New..." → "Project" 클릭
3. GitHub 리포지토리 선택
   - 같은 리포지토리를 선택 (이미 GitHub Pages용이 있을 수 있음)
   - 또는 새로운 Vercel 프로젝트 생성
4. Project Name: `quicktalk-api` (또는 원하는 이름)
5. Framework: **Next.js** 선택

### 1.2 빌드 설정

1. Vercel에서 프로젝트 Settings 클릭
2. **Build & Development Settings** 섹션:
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm ci`

3. **Environment Variables** 섹션에서 다음 추가:
   - `GOOGLE_API_KEY`: Google Cloud API 키
   - `SUPABASE_URL`: Supabase URL
   - `SUPABASE_ANON_KEY`: Supabase Anonymous Key
   - `NEXT_PUBLIC_API_URL`: `https://your-api.vercel.app` (자신의 API URL)

### 1.3 배포

1. "Deploy" 또는 "Redeploy" 클릭
2. 배포 완료 대기
3. 배포된 API URL 확인 (예: `https://quicktalk-api.vercel.app`)

## 2. GitHub Secrets 설정

### 2.1 Vercel 연동 (자동 배포용)

GitHub Repository Settings → Secrets and variables → Actions에서 추가:

**Option A: Vercel GitHub Integration 사용 (권장)**
- 설정: Vercel 프로젝트 Settings → Git에서 "GitHub integration" 확인
- Vercel이 자동으로 push 시 배포

**Option B: GitHub Actions로 Vercel 배포**

다음 Secrets 추가:
- `VERCEL_TOKEN`: Vercel Personal Access Token
- `VERCEL_ORG_ID`: Vercel 조직 ID
- `VERCEL_PROJECT_ID`: Vercel 프로젝트 ID (API용)

### 2.2 프론트엔드 배포용

GitHub Repository Settings → Secrets에 추가:
- `GITHUB_PAGES_API_URL`: API 배포 URL
  - 예: `https://quicktalk-api.vercel.app`

## 3. 워크플로우 설정

### 3.1 GitHub Pages 워크플로우

`.github/workflows/github-pages.yml`:
- main 브랜치 push 시 자동 실행
- `DEPLOYMENT_TARGET=github-pages` 설정
- `next.config.js`에서 정적 빌드 활성화
- `out` 폴더를 GitHub Pages에 배포
- `NEXT_PUBLIC_API_URL` 환경 변수로 API URL 주입

### 3.2 Vercel API 배포 워크플로우

`.github/workflows/deploy.yml` (또는 Vercel 자동 배포):
- main 브랜치 push 시 자동 배포
- Vercel이 `.next` 빌드 결과 감지
- API routes 자동 Serverless Functions로 변환

## 4. 동작 방식

### 4.1 빌드 프로세스

```
User Push
   ↓
GitHub Actions Trigger
   ├─ GitHub Pages Workflow
   │  ├ DEPLOYMENT_TARGET=github-pages
   │  ├ npm run build → output: 'export' 활성화
   │  ├ out 폴더 생성 (정적 HTML)
   │  └ GitHub Pages에 배포
   │
   └─ Vercel Webhook (자동)
      ├ next.config.js에서 output: 'export' 비활성화
      ├ npm run build → .next 생성
      ├ API routes 감지
      ├ Serverless Functions로 변환
      └ Vercel에 배포
```

### 4.2 브라우저 요청 흐름

```
1. User visits https://username.github.io/repo
   ↓
2. GitHub Pages serves index.html (static)
   ↓
3. Browser loads JavaScript
   ↓
4. JavaScript calls fetch('https://quicktalk-api.vercel.app/api/generate')
   ↓
5. Vercel executes API function
   ↓
6. Response sent back to browser
```

## 5. 로컬 개발

### 5.1 전체 개발 환경

```bash
# 터미널 1: Next.js 개발 서버 (API + Frontend)
npm run dev
# http://localhost:3000에서 접근 가능

# 또는 다른 포트
npm run dev -- -p 3001
```

### 5.2 GitHub Pages 빌드 테스트

```bash
# 프론트엔드 정적 빌드 테스트
DEPLOYMENT_TARGET=github-pages npm run build

# 생성된 out 폴더 확인
ls out/

# 정적 서버로 테스트
npx http-server ./out -p 8080
# http://localhost:8080 접속
```

### 5.3 Vercel API 테스트

```bash
# Vercel 로컬 환경 시뮬레이션
npm install -g vercel

# 로컬 Vercel 실행
vercel dev
# http://localhost:3000 접속 (API + Frontend)
```

## 6. 환경 변수 관리

### 6.1 변수 종류

**1. 프론트엔드 노출 변수 (public)**
```
NEXT_PUBLIC_API_URL=https://quicktalk-api.vercel.app
```
- 브라우저에서 접근 가능
- GitHub Actions에서 주입
- NEXT_PUBLIC_ 접두사 필수

**2. API 서버 전용 변수 (private)**
```
GOOGLE_API_KEY=xxx
SUPABASE_URL=xxx
SUPABASE_ANON_KEY=xxx
```
- Vercel 환경 변수에만 설정
- 브라우저에 노출 안 됨

### 6.2 설정 방식

**로컬 개발:**
`.env.local` 파일:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
GOOGLE_API_KEY=xxx
SUPABASE_URL=xxx
SUPABASE_ANON_KEY=xxx
```

**GitHub Pages 배포:**
GitHub Secrets → `GITHUB_PAGES_API_URL`:
```
https://quicktalk-api.vercel.app
```

**Vercel API 배포:**
Vercel 프로젝트 Settings → Environment Variables에서 모두 설정

## 7. CORS 설정

프론트엔드와 API가 다른 도메인에 있으므로 CORS 설정 필요:

### 7.1 API 서버 CORS 헤더

`lib/` 폴더에 CORS 미들웨어 작성:

```typescript
export const corsHeaders = {
  'Access-Control-Allow-Origin': process.env.FRONTEND_URL || '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};
```

### 7.2 API Route에 적용

```typescript
export async function OPTIONS(request: Request) {
  return new Response(null, { headers: corsHeaders });
}

export async function POST(request: Request) {
  const headers = corsHeaders;
  // ... API 로직
  return new Response(JSON.stringify(data), { headers });
}
```

### 7.3 Vercel 환경 변수

Vercel Settings → Environment Variables:
```
FRONTEND_URL=https://username.github.io/repository-name
```

## 8. 배포 후 확인

### 8.1 GitHub Pages 확인

1. https://username.github.io/repository-name 접속
2. 페이지가 로드되는지 확인
3. 개발자 도구 (F12) 확인:
   - Console: 에러 없는지
   - Network: 요청이 API URL로 가는지

### 8.2 Vercel API 확인

1. https://quicktalk-api.vercel.app/api/situations 접속
2. JSON 응답이 오는지 확인
3. Vercel 대시보드 → Deployments → Function Logs 확인

### 8.3 통합 테스트

1. GitHub Pages에서 API 호출
2. Network 탭에서 API 응답 확인
3. 성공 응답 받는지 확인 (200 상태 코드)

## 9. 배포 자동화

### 9.1 GitHub Actions 자동 배포

1. main 브랜치에 push
2. GitHub Actions 워크플로우 자동 실행
3. GitHub Pages에 배포됨
4. Vercel Webhook 또는 Actions가 API 배포

### 9.2 수동 배포

```bash
# 로컬에서 테스트
npm run build
npm test

# GitHub에 push
git add .
git commit -m "feat: API update"
git push origin main

# Vercel 대시보드에서 배포 확인
# https://vercel.com/dashboard
```

## 10. 트러블슈팅

### 10.1 CORS 에러

```
Access to XMLHttpRequest blocked by CORS policy
```

**해결:**
1. API 서버의 CORS 헤더 확인
2. `FRONTEND_URL` 환경 변수 확인
3. Vercel 배포 재실행

### 10.2 API 404 에러

```
GET https://quicktalk-api.vercel.app/api/generate 404
```

**해결:**
1. API URL이 올바른지 확인
2. `GITHUB_PAGES_API_URL` 환경 변수 확인
3. Vercel 배포가 성공했는지 확인

### 10.3 환경 변수 누락

**확인:**
```bash
# 로컬에서 빌드 테스트
npm run build

# 에러가 있으면 환경 변수 확인
echo $GOOGLE_API_KEY
```

## 11. 요약

| 항목 | 값 |
|------|-----|
| 프론트엔드 배포 | GitHub Pages |
| API 배포 | Vercel |
| 프론트엔드 URL | https://username.github.io/repo |
| API URL | https://your-api.vercel.app |
| 자동 배포 | GitHub Actions + Vercel Webhook |
| 환경 변수 | GitHub Secrets + Vercel Settings |

## 12. 다음 단계

1. Vercel 프로젝트 생성
2. GitHub Secrets 설정
3. main 브랜치에 push
4. GitHub Actions 실행 확인
5. 배포된 사이트 접속해서 테스트

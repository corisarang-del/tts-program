# GitHub Pages 배포 가이드

프론트엔드를 GitHub Pages에 배포하고, API를 별도 서버에서 관리하는 설정 가이드입니다.

## 아키텍처 개요

```
GitHub Pages (Frontend)         External Server (API)
    ↓                                ↓
index.html                      /api/generate
scripts.js                       /api/tts
styles.css                       /api/situations
                                 /api/intents
                                 /api/log
```

## 1. GitHub Pages 설정

### 1.1 리포지토리 설정

1. GitHub 리포지토리 페이지로 이동
2. Settings → Pages
3. Build and deployment:
   - Source: **GitHub Actions** 선택
   - (자동으로 workflows가 감지됨)

### 1.2 리포지토리 Secrets 추가

GitHub Settings → Secrets and variables → Actions에서 다음 추가:

**필수:**
- `GITHUB_PAGES_API_URL`: API 서버의 베이스 URL
  - 예: `https://api.example.com`
  - 또는 Vercel: `https://your-app.vercel.app`
  - 또는 로컬 개발: `http://localhost:3001`

## 2. API 배포 옵션

API를 별도로 호스팅해야 합니다. 다음 중 하나를 선택하세요:

### 옵션 A: Vercel에 API만 배포 (권장)

Next.js API routes를 계속 사용하면서 Vercel에 배포:

**장점:**
- 간단한 설정
- Next.js 최적화
- 비용 무료 (소규모)

**단계:**

1. Vercel 프로젝트 생성
2. `vercel.json` 생성:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api/$1" }
  ]
}
```

3. GitHub에서 Vercel 연동 또는 CLI로 배포:
```bash
vercel --prod
```

4. Vercel 배포 URL을 GitHub Secrets에 추가:
   - `GITHUB_PAGES_API_URL`: `https://your-api.vercel.app`

### 옵션 B: 별도 Node.js 서버 배포

EC2, Railway, Render 등에서 호스팅:

```bash
# 1. 프로덕션 서버 시작
npm run build
npm start

# 2. 환경 변수 설정
export NEXT_PUBLIC_API_URL=https://your-server.com
```

### 옵션 C: 로컬/개발용 API 서버

개발 중에는 로컬 서버에서 API 실행:

```bash
# 터미널 1: API 서버
npm run dev

# 터미널 2: 프론트엔드 빌드 (GitHub Pages용)
npm run build
```

`GITHUB_PAGES_API_URL=http://localhost:3001`로 설정

## 3. API 호출 설정

### 3.1 환경 변수 확인

`lib/api.ts`에서 이미 설정됨:

```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';
```

### 3.2 환경 변수 파일

**로컬 개발용 `.env.local`:**

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

**빌드 시 (GitHub Actions):**

- GitHub Secrets에서 자동 주입
- `.github/workflows/github-pages.yml`에서:

```yaml
env:
  NEXT_PUBLIC_API_URL: ${{ secrets.GITHUB_PAGES_API_URL }}
```

## 4. API Routes 분리 (선택사항)

만약 API를 Vercel에 배포하려면, 불필요한 routes를 제거할 수 있습니다.

현재 API 구조:
```
app/api/
├── generate/   - 문장 생성
├── tts/        - 음성 합성
├── situations/ - 상황 조회
├── intents/    - 의도 조회
└── log/        - 로그 저장
```

**API 서버에서만 유지:**
- `/api/generate`
- `/api/tts`
- `/api/log`
- `/api/situations`
- `/api/intents`

**프론트엔드에서 제거 (프록시 사용):**
- 불필요한 경우 없음 (API는 외부 서버에서)

## 5. CORS 설정 (중요)

API 서버에서 GitHub Pages 도메인을 허용해야 합니다.

### 5.1 API 서버 CORS 설정

`app/api/[route]/route.ts`에 추가:

```typescript
export const corsHeaders = {
  'Access-Control-Allow-Origin': process.env.FRONTEND_URL || '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return new Response(null, { headers: corsHeaders });
}
```

### 5.2 환경 변수

API 서버의 `.env`:

```env
FRONTEND_URL=https://username.github.io
```

또는 여러 도메인:

```env
FRONTEND_URL=https://username.github.io,https://example.com,http://localhost:3000
```

## 6. 배포 프로세스

### 6.1 초기 배포

1. 이 문서 따라 GitHub Pages, API 서버 설정
2. GitHub Secrets 추가:
   ```
   GITHUB_PAGES_API_URL = API 서버 URL
   ```
3. main 브랜치에 push
4. GitHub Actions 실행 자동 시작
5. Actions 탭에서 배포 상태 확인

### 6.2 반복 배포

main 브랜치에 push할 때마다 자동 배포:

```bash
git add .
git commit -m "feat: new feature"
git push origin main
```

GitHub Actions 탭에서 진행 상황 확인

## 7. 배포 후 확인

1. **GitHub Pages URL 접속**
   - `https://username.github.io/repository-name`
   - 또는 커스텀 도메인 설정 시 그 URL

2. **API 연결 확인**
   - 개발자 도구 (F12) → Network 탭
   - API 호출이 `GITHUB_PAGES_API_URL`로 가는지 확인
   - 200 상태 코드 받는지 확인

3. **Console 에러 확인**
   - CORS 에러: API 서버의 CORS 설정 확인
   - 404 에러: API URL이 올바른지 확인

## 8. 커스텀 도메인 설정 (선택사항)

GitHub Pages에서 커스텀 도메인 사용:

1. Settings → Pages → Custom domain
2. 도메인 입력 (예: `quicktalk.example.com`)
3. DNS 레코드 추가:
   ```
   CNAME quicktalk.example.com → username.github.io
   ```
4. HTTPS 자동 설정됨

## 9. 문제 해결

### 9.1 배포 실패

**확인사항:**
1. GitHub Actions 로그 확인
2. `npm run build` 로컬에서 성공하는지 확인
3. Node.js 버전 일치 확인 (18.x)

### 9.2 API 호출 실패

**CORS 에러:**
```
Access to XMLHttpRequest blocked by CORS policy
```
- API 서버의 CORS 설정 확인
- `FRONTEND_URL` 환경 변수 확인

**404 에러:**
```
GET https://api.example.com/api/generate 404
```
- `GITHUB_PAGES_API_URL` 확인
- API 서버가 실행 중인지 확인

### 9.3 페이지 표시 안 됨

- 브라우저 캐시 삭제 (Ctrl+Shift+Del)
- GitHub Pages 빌드 로그 확인
- 몇 분 대기 후 새로고침

## 10. 로컬 테스트

### 10.1 GitHub Pages처럼 테스트

```bash
# 1. 프로덕션 빌드
npm run build

# 2. out 폴더로 정적 서버 실행
npx http-server ./out -p 8080

# 3. http://localhost:8080 접속
```

### 10.2 API 함께 테스트

```bash
# 터미널 1: API 서버
npm run dev -- --port 3001

# 터미널 2: 정적 서버 (환경 변수 설정)
NEXT_PUBLIC_API_URL=http://localhost:3001 npm run build
npx http-server ./out -p 8080
```

## 11. 참고 자료

- [GitHub Pages 공식 문서](https://docs.github.com/en/pages)
- [GitHub Actions 문서](https://docs.github.com/en/actions)
- [Next.js Static Export](https://nextjs.org/docs/advanced-features/static-html-export)
- [Vercel 배포](https://vercel.com/docs)

## 12. 워크플로우 파일

`.github/workflows/github-pages.yml`:
- main 브랜치 push 시 자동 빌드 및 배포
- `NEXT_PUBLIC_API_URL` 주입
- GitHub Pages에 자동 배포

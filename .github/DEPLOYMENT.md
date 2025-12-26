# GitHub Actions 배포 설정 가이드

이 문서는 GitHub Actions 워크플로우를 설정하고 Vercel에 자동 배포하는 방법을 설명합니다.

## 1. GitHub Secrets 설정

GitHub 리포지토리에서 다음 secrets를 설정해야 합니다.

### 1.1 Vercel 연동 필수 Secrets

1. **VERCEL_TOKEN**
   - Vercel 계정의 Personal Access Token
   - 설정 방법:
     1. https://vercel.com/account/tokens 접속
     2. "Create Token" 클릭
     3. Token 이름 입력 (예: "GitHub Actions")
     4. 생성된 토큰 복사

2. **VERCEL_ORG_ID**
   - Vercel 팀/조직 ID
   - 설정 방법:
     1. Vercel 프로젝트 대시보드 접속
     2. 프로젝트 Settings → General에서 "Org ID" 확인

3. **VERCEL_PROJECT_ID**
   - Vercel 프로젝트 ID
   - 설정 방법:
     1. Vercel 프로젝트 Settings → General에서 "Project ID" 확인

### 1.2 애플리케이션 필수 Secrets

4. **NEXT_PUBLIC_API_BASE_URL**
   - API 베이스 URL
   - 예: `https://api.example.com`

5. **GOOGLE_API_KEY**
   - Google Cloud API 키 (Gemini, TTS)
   - 설정 방법:
     1. Google Cloud Console에서 프로젝트 선택
     2. "API 및 서비스" → "사용자 인증정보" → "API 키" 확인

6. **SUPABASE_URL**
   - Supabase 프로젝트 URL
   - 설정 방법:
     1. Supabase 대시보드에서 프로젝트 선택
     2. Settings → API에서 "Project URL" 확인

7. **SUPABASE_ANON_KEY**
   - Supabase Anonymous Key
   - 설정 방법:
     1. Supabase 대시보드에서 프로젝트 선택
     2. Settings → API에서 "anon [public]" 키 확인

## 2. GitHub에서 Secrets 추가하는 방법

1. GitHub 리포지토리 페이지로 이동
2. Settings → Secrets and variables → Actions
3. "New repository secret" 클릭
4. Name과 Secret 값 입력
5. "Add secret" 클릭

## 3. 워크플로우 동작 방식

### 3.1 PR Check Workflow (pr-check.yml)

pull_request 또는 develop/main 브랜치로의 push 시 실행:
- **Lint**: ESLint로 코드 스타일 검사
- **Type Check**: TypeScript 타입 검사
- **Test**: Jest로 단위 테스트 실행
- **Build**: Next.js 빌드 테스트

모든 검사가 통과해야 merge 가능 (권장 설정)

### 3.2 Deploy Workflow (deploy.yml)

main 브랜치로의 push 또는 PR Check 완료 시 실행:
1. 코드 checkout
2. Node.js 18 설정
3. 의존성 설치
4. 프로젝트 빌드
5. Vercel에 production 배포

## 4. Branch Protection Rules 설정 (선택사항)

안정성을 위해 main 브랜치에 protection rules을 설정할 수 있습니다:

1. Settings → Branches
2. "Add rule" 클릭
3. Branch name pattern: `main`
4. 다음 옵션 활성화:
   - "Require a pull request before merging"
   - "Require status checks to pass before merging"
   - Status checks 선택: lint, type-check, test, build

## 5. 로컬 개발 환경 설정

### 5.1 환경 변수 파일 생성

`.env.local` 파일을 프로젝트 루트에 생성:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
GOOGLE_API_KEY=your_google_api_key
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 6. 배포 후 확인사항

배포 완료 후:

1. Vercel 프로젝트 대시보드에서 배포 상태 확인
2. 배포된 URL로 접속하여 기능 테스트
3. 콘솔에서 에러 확인 (F12 개발자 도구)
4. Network 탭에서 API 호출 확인

## 7. 문제 해결

### 7.1 배포 실패

1. GitHub Actions 로그 확인
   - Repository → Actions → 해당 workflow 클릭
   - 실패한 job 로그 확인

2. 일반적인 원인:
   - Secrets 누락 또는 잘못된 값
   - 환경 변수 누락
   - 빌드 오류 (로컬에서 `npm run build` 실행하여 확인)

### 7.2 배포는 성공했으나 사이트 에러

1. Vercel 로그 확인
   - Vercel 대시보드 → 프로젝트 → Deployments → Runtime Logs

2. 환경 변수 확인
   - Vercel 프로젝트 Settings → Environment Variables

## 8. 워크플로우 커스터마이징

### 8.1 테스트 제외

특정 테스트를 제외하려면 `pr-check.yml`의 test job 수정:

```yaml
run: npm test -- --testPathIgnorePatterns='/__tests__/integration' --testNamePattern='!(slow)'
```

### 8.2 배포 조건 변경

특정 브랜치에서만 배포하려면 `deploy.yml` 수정:

```yaml
on:
  push:
    branches: [main, staging]  # staging 브랜치에서도 배포
```

## 9. 자동화된 프로세스 요약

```
Feature Branch
    ↓
Pull Request Created
    ↓
PR Check Workflow 실행 (lint, type-check, test, build)
    ↓ (모두 통과)
Code Review & Approval
    ↓
Merge to Main
    ↓
Deploy Workflow 실행
    ↓
Vercel 배포 완료
    ↓
Production 반영
```

## 10. 참고 자료

- [Vercel GitHub Integration](https://vercel.com/docs/git/vercel-for-github)
- [GitHub Actions 문서](https://docs.github.com/en/actions)
- [Next.js 배포 가이드](https://nextjs.org/docs/deployment)

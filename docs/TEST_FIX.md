# 테스트 환경 설정 수정 (2025-12-25)

## 문제점

Jest 테스트 실행 시 Next.js API Routes 테스트에서 다음 에러 발생:

```
ReferenceError: Request is not defined
```

**원인**:
- Next.js 14의 `NextRequest`는 Web API의 `Request`를 확장
- Jest 환경에서 `Request`가 정의되지 않음
- `testEnvironment: 'jest-environment-jsdom'`은 브라우저 환경을 시뮬레이션하므로 Web API가 없음

## 해결 방법

### 1. Jest 환경 변경

`jest.config.js`에서 `testEnvironment`를 `'node'`로 변경:

```javascript
testEnvironment: 'node', // API Routes 테스트를 위해 node 환경 사용
```

### 2. Web API 폴리필 추가

`jest.setup.js`에 Web API 폴리필 추가:

```javascript
// undici를 사용하여 Web API 폴리필 제공
const { Request: WebRequest, Response: WebResponse, Headers: WebHeaders } = require('undici')

global.Request = WebRequest
global.Response = WebResponse
global.Headers = WebHeaders
```

### 3. 의존성 추가

```bash
pnpm add -D undici @types/node@^20
```

## 수정된 파일

1. `jest.config.js`: `testEnvironment`를 `'node'`로 변경
2. `jest.setup.js`: Web API 폴리필 추가
3. `package.json`: `undici` 및 `@types/node` 추가

## 테스트 실행

```bash
pnpm test
```

또는 API 테스트만 실행:

```bash
pnpm test:api
```

## 참고사항

- Node.js 18+에서는 Web API가 기본 제공되지만, Jest 환경에서는 명시적으로 활성화 필요
- `undici`는 Node.js의 내장 fetch 구현체로, Web API 폴리필로 사용 가능
- 컴포넌트 테스트가 필요한 경우 별도의 Jest 설정 파일 사용 고려


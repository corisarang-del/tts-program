import '@testing-library/jest-dom'

// Next.js API Routes 테스트를 위한 Web API 폴리필
import { TextEncoder, TextDecoder } from 'util'

// Node.js 환경에서 TextEncoder/TextDecoder 사용 가능하도록 설정
if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder
  global.TextDecoder = TextDecoder
}

// Next.js 14+ API Routes 테스트를 위한 Web API 폴리필
// Node.js 18+에서는 Web API가 기본 제공되지만, Jest 환경에서는 명시적으로 활성화 필요
// Next.js의 NextRequest는 Web API Request를 확장하므로 Request가 정의되어야 함

// jsdom 환경에서는 Web API가 이미 제공되므로, node 환경에서만 undici 로드
if (typeof global.Request === 'undefined') {
  // Node.js 18+에서는 Web API가 기본 제공되지만, Jest에서는 명시적으로 활성화 필요
  // undici를 사용하여 Web API 폴리필 제공
  try {
    const { Request: WebRequest, Response: WebResponse, Headers: WebHeaders } = require('undici')

    // 전역으로 설정 (Next.js가 사용할 수 있도록)
    global.Request = WebRequest
    global.Response = WebResponse
    global.Headers = WebHeaders

    // fetch도 설정 (필요한 경우)
    if (typeof global.fetch === 'undefined') {
      const { fetch: undiciFetch } = require('undici')
      global.fetch = undiciFetch
    }
  } catch (e) {
    // jsdom 환경에서는 undici 로드 실패해도 괜찮음
    if (e.message && !e.message.includes('ReadableStream')) {
      throw e
    }
  }
}




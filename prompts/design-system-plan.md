# QuickTalk 디자인 시스템 재구성 계획

## 개요
daglo.ai의 모던하고 기술 중심적인 디자인 언어를 참고하여 QuickTalk의 전체 디자인 시스템을 재구성합니다.

## Phase 1: 디자인 기초 구축

### 1.1 색상 시스템 개선
**목표**: 뉘앙스 있는 색상 팔레트 구성

#### 이전 색상
- Primary: #4F46E5 (인디고)
- Secondary: #10B981 (에메랄드)
- Accent: #F59E0B (앰버)

#### 개선된 색상 팔레트

**기본 중립색 (New)**
```
neutral-50:   #fafafa
neutral-100:  #f5f5f5
neutral-200:  #e5e5e5
neutral-300:  #d4d4d4
neutral-400:  #a3a3a3
neutral-500:  #737373
neutral-600:  #525252
neutral-700:  #404040
neutral-800:  #262626
neutral-900:  #171717
```

**Primary Color (조정)**
- primary-50:   #f5f3ff
- primary-100:  #ede9fe
- primary-500:  #8b5cf6 (주 강조색)
- primary-600:  #7c3aed (인터랙션)
- primary-700:  #6d28d9 (다크)

**Semantic Colors**
- success: #10b981 (성공/완료)
- warning: #f59e0b (경고)
- error: #ef4444 (오류)
- info: #3b82f6 (정보)

### 1.2 타이포그래피 시스템
**목표**: 명확한 계층 구조 수립

#### 폰트 패밀리
- **Primary**: Inter, -apple-system, BlinkMacSystemFont (모던하고 깔끔함)
- **Fallback**: sans-serif

#### 크기 체계
```
xs:   12px / line-height: 16px
sm:   14px / line-height: 20px
base: 16px / line-height: 24px
lg:   18px / line-height: 28px
xl:   20px / line-height: 28px
2xl:  24px / line-height: 32px
3xl:  30px / line-height: 36px
4xl:  36px / line-height: 44px
```

#### 스타일 정의
- **H1**: 4xl / bold / tracking-tight
- **H2**: 3xl / bold / tracking-tight
- **H3**: 2xl / semibold / tracking-tight
- **Body**: base / regular / tracking-normal
- **Small**: sm / regular / tracking-normal

### 1.3 스페이싱 시스템
**목표**: 일관성 있는 여백 체계

```
xs:  4px
sm:  8px
md:  12px
lg:  16px
xl:  24px
2xl: 32px
3xl: 48px
4xl: 64px
5xl: 96px
```

### 1.4 컴포넌트 기본 설정
**Border Radius**
- xs: 4px (작은 버튼, 입력 필드)
- sm: 8px (카드, 모달)
- md: 12px (대형 카드)
- lg: 16px (컨테이너)

**그림자 (Shadow)**
- sm: 0 1px 2px 0 rgba(0,0,0,0.05)
- md: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)
- lg: 0 10px 15px -3px rgba(0,0,0,0.1)
- xl: 0 20px 25px -5px rgba(0,0,0,0.1)

**전환 효과 (Transition)**
- Duration: 150ms (hover), 300ms (modal, slide)
- Easing: cubic-bezier(0.4, 0, 0.2, 1)

## Phase 2: 컴포넌트 라이브러리 구성

### 2.1 기본 컴포넌트 (재구성)
- **Button**: primary, secondary, ghost, text, danger variants
- **Card**: elevated, outlined, filled variants
- **Input**: text, textarea, select, checkbox, radio
- **Header**: responsive navigation, breadcrumbs
- **Badge**: label, status, variant colors

### 2.2 복합 컴포넌트 (신규)
- **Section**: 페이지 섹션 래퍼
- **Container**: 콘텐츠 폭 제한
- **Stack**: 방향성 레이아웃 (vertical, horizontal)
- **Grid**: 반응형 그리드
- **Modal/Dialog**: 접근성 지원
- **Toast**: 알림 메시지

### 2.3 패턴 컴포넌트 (신규)
- **EmptyState**: 데이터 없음 상태
- **ErrorBoundary**: 에러 처리
- **Loading**: 스켈레톤, 스피너
- **Pagination**: 페이지네이션
- **Breadcrumb**: 네비게이션 경로

## Phase 3: 페이지별 레이아웃 개선

### 3.1 홈페이지 (/)
- Hero 섹션: 큰 제목, 설명, CTA
- Features 섹션: 카드 그리드
- How it works: 단계별 설명
- CTA 섹션: 강조된 다음 액션

### 3.2 상황 선택 (situation/)
- 스크롤 기반 섹션
- 카드 레이아웃 (2-3 컬럼)
- hover 효과: scale, 그림자 증가

### 3.3 의도 선택 (intent/)
- 버튼 목록
- active 상태 시각화
- 로딩 상태 표시

### 3.4 문장 표시 (sentence/)
- 카드 기반 문장 표시
- 마이크로 인터랙션: 복사, TTS 버튼
- 피드백 애니메이션

### 3.5 평가 (result/)
- 큰 버튼으로 선택지 제시
- 완료 상태 시각화

### 3.6 완료 (analysis/)
- 성공 아이콘 애니메이션
- 다음 액션 버튼

## Phase 4: 접근성 및 성능

### 4.1 접근성
- ARIA 라벨 추가
- 키보드 네비게이션 지원
- 포커스 표시 명확화
- 색상 대비율 확보 (WCAG AA 이상)

### 4.2 다크모드
- CSS 변수로 색상 전환
- prefers-color-scheme 미디어 쿼리 활용
- 다크모드에서 충분한 가독성 확보

### 4.3 반응형 디자인
- 모바일 우선 접근
- breakpoint: sm(640px), md(768px), lg(1024px), xl(1280px), 2xl(1536px)
- 터치 타겟 최소 44x44px

### 4.4 성능 최적화
- 이미지 최적화 (next/image)
- 레이지 로딩
- CSS 번들 최적화
- 애니메이션 GPU 가속

## 구현 순서

1. **tailwind.config.ts** 업데이트 - 새 색상, 타이포그래피, spacing
2. **globals.css** 업데이트 - CSS 변수, 기본 스타일
3. **컴포넌트 재구성** - Button, Card, Header
4. **레이아웃 컴포넌트** - Section, Container, Stack
5. **페이지 업데이트** - 각 페이지 스타일 적용
6. **마이크로 인터랙션** - hover, focus, active 상태
7. **다크모드 테스트** - 모든 페이지에서 동작 확인
8. **접근성 감시** - ARIA, 키보드 네비게이션
9. **반응형 테스트** - 모든 브레이크포인트에서 테스트
10. **성능 최적화** - 빌드 분석, 이미지 최적화

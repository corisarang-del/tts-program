# 한글 인코딩 문제 수정 가이드

**작성일**: 2025-12-25

## 문제점

JSON 파일(`data/intents.json`, `data/situations.json`)에서 한글이 깨져서 `??`로 표시되는 현상 발생.

## 원인

- JSON 파일이 UTF-8이 아닌 다른 인코딩으로 저장됨
- 파일 저장 시 인코딩 설정 문제

## 해결 방법

### 1. 수정된 파일

- `app/layout.tsx`: UTF-8 메타 태그 추가
- `next.config.js`: Webpack 설정 추가
- `data/intents.json`: 주요 깨진 부분 수정 중

### 2. 남은 작업

`data/intents.json` 파일에 약 301개의 깨진 한글 부분이 있습니다. 다음 intent들에서 한글이 깨져 있습니다:

- `intent_032` ~ `intent_054` (일부)

### 3. 수정 방법

#### 방법 1: 에디터에서 직접 수정
1. VS Code나 다른 에디터에서 `data/intents.json` 파일 열기
2. 파일을 UTF-8로 저장 (File → Save with Encoding → UTF-8)
3. 깨진 한글 부분을 영어 번역을 참고하여 수정

#### 방법 2: 스크립트 사용
```powershell
# scripts/fix-encoding.ps1 실행
.\scripts\fix-encoding.ps1
```

### 4. 주요 깨진 부분 목록

- `intent_032`: 입국 목적 답변 (수정 완료)
- `intent_033`: 게이트/시간 문의 (수정 완료)
- `intent_034`: 수하물 문제 (수정 완료)
- `intent_035`: 체크인/예약 확인 (수정 완료)
- `intent_036`: 시간 변경 요청 (수정 완료)
- `intent_037`: 객실 문제/요청 (수정 완료)
- `intent_041`: 연박 요청 (수정 완료)
- `intent_042`: 소음/청소 요청 (수정 완료)
- `intent_038` ~ `intent_054`: 수정 필요

### 5. 예방 방법

1. **에디터 설정**: VS Code에서 기본 인코딩을 UTF-8로 설정
2. **파일 저장 시**: 항상 UTF-8로 저장 확인
3. **Git 설정**: `.gitattributes` 파일에 인코딩 명시

### 6. .gitattributes 추가 (권장)

```gitattributes
*.json text eol=lf charset=utf-8
*.ts text eol=lf charset=utf-8
*.tsx text eol=lf charset=utf-8
```

## 참고

- 영어 번역을 참고하여 한글을 복원할 수 있습니다.
- 일본어/중국어 번역도 함께 수정이 필요할 수 있습니다.


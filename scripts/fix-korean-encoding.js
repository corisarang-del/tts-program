/**
 * 한글 인코딩 문제 수정 스크립트
 * data/intents.json 파일의 깨진 한글을 영어 번역을 참고하여 복원
 */

const fs = require('fs');
const path = require('path');

const intentsFile = path.join(__dirname, '..', 'data', 'intents.json');

// 깨진 한글을 영어 번역을 참고하여 복원하는 매핑
const koreanFixMap = {
  // intent_032
  '입국 목적 답변': {
    name: '입국 목적 답변',
    description: '입국 목적/체류 기간 답변',
    sentences: [
      '관광 목적으로 왔으며 약 5일 정도 체류 예정입니다.',
      '친구 방문 목적으로 일주일 정도 머물 예정입니다.',
      '왕복 티켓이 있어 다음 주 출국 예정입니다.'
    ]
  },
  // intent_033
  '게이트/시간 문의': {
    name: '게이트/시간 문의',
    description: '게이트 위치나 탑승 시간 확인',
    sentences: [
      '이 항공편의 게이트가 어디인지 알려주실 수 있나요?',
      '탑승 시작 시간이 언제인가요?',
      '이 게이트가 맞는지 확인해 주실 수 있나요?'
    ]
  },
  // intent_034
  '수하물 문제': {
    name: '수하물 문제',
    description: '수하물 분실/지연 문의',
    sentences: [
      '수하물이 도착하지 않았습니다. 어떻게 해야 하나요?',
      '이 가방이 제 것인지 확인해 주실 수 있나요?',
      '수하물 분실 신고는 어디서 하나요?'
    ]
  },
  // intent_035
  '체크인/예약 확인': {
    name: '체크인/예약 확인',
    description: '예약 확인 및 체크인',
    sentences: [
      '체크인하고 싶습니다. 예약자명은 홍길동입니다.',
      '오늘 밤 예약이 있습니다. 확인해 주실 수 있나요?',
      '여권으로 체크인 가능한가요?'
    ]
  },
  // intent_036
  '시간 변경 요청': {
    name: '시간 변경 요청',
    description: '늦은 체크인/아웃 요청',
    sentences: [
      '늦은 체크인이 가능한가요?',
      '체크아웃을 1시간 정도 늦출 수 있을까요?',
      '짐을 조금 더 보관해 주실 수 있나요?'
    ]
  },
  // intent_037
  '객실 문제/요청': {
    name: '객실 문제/요청',
    description: '객실 문제 신고나 요청 사항 전달',
    sentences: [
      '객실이 너무 춥습니다. 온도 조절 도와주실 수 있나요?',
      '수건 좀 더 받을 수 있을까요?',
      '객실 불이 안 켜집니다. 확인 부탁드립니다.'
    ]
  },
  // intent_041
  '연박 요청': {
    name: '연박 요청',
    description: '늦은 체크아웃이나 추가 숙박 요청',
    sentences: [
      '하루 더 묵을 수 있을까요?',
      '체크아웃을 오후 2시까지 늦출 수 있을까요?',
      '하루 더 묵고 싶습니다. 가능할까요?'
    ]
  },
  // intent_042
  '소음/청소 요청': {
    name: '소음/청소 요청',
    description: '소음 문의나 청소 요청',
    sentences: [
      '옆 방이 시끄럽습니다. 조용한 방으로 바꿀 수 있을까요?',
      '객실 청소 요청드립니다.',
      '수건과 물 좀 더 받을 수 있을까요?'
    ]
  },
  // intent_038
  '접수 신청': {
    name: '접수 신청',
    description: '접수 신청이나 예약 문의',
    sentences: [
      '의사 진료 받고 싶습니다. 접수 가능한가요?',
      '예약 없이 방문 가능한가요?',
      '다음 예약 가능 시간 알려주세요.'
    ]
  },
  // intent_039
  '보험/통역 문의': {
    name: '보험/통역 문의',
    description: '보험 사용이나 통역 지원 문의',
    sentences: [
      '보험증이 있습니다. 사용 가능한지 확인해 주실 수 있나요?',
      '통역 지원 가능한가요?',
      '신분증과 보험증 보여드리겠습니다.'
    ]
  },
  // intent_040
  '응급 도움 요청': {
    name: '응급 도움 요청',
    description: '긴급 의료 도움 요청',
    sentences: [
      '몸이 안 좋아서 지금 바로 진료 받아야 합니다.',
      '숨쉬기 어려워서 긴급 도움이 필요합니다.',
      '응급실로 안내해 주실 수 있나요?'
    ]
  }
};

function fixKoreanEncoding() {
  try {
    const content = fs.readFileSync(intentsFile, 'utf-8');
    const intents = JSON.parse(content);
    
    let fixedCount = 0;
    
    // 각 intent를 순회하며 깨진 한글 수정
    intents.forEach((intent, index) => {
      // name.ko가 깨져있는지 확인
      if (intent.name?.ko && intent.name.ko.includes('??')) {
        const enName = intent.name.en;
        // 영어 이름을 기반으로 한글 복원 시도
        // (실제로는 더 정교한 매핑이 필요하지만 예시로)
        console.log(`Intent ${intent.id}: name.ko가 깨져있음 - ${enName}`);
        fixedCount++;
      }
      
      // description.ko가 깨져있는지 확인
      if (intent.description?.ko && intent.description.ko.includes('??')) {
        const enDesc = intent.description.en;
        console.log(`Intent ${intent.id}: description.ko가 깨져있음 - ${enDesc}`);
        fixedCount++;
      }
      
      // sentences.ko가 깨져있는지 확인
      if (intent.sentences?.ko) {
        const brokenSentences = intent.sentences.ko.filter(s => s.includes('??'));
        if (brokenSentences.length > 0) {
          console.log(`Intent ${intent.id}: sentences.ko에 ${brokenSentences.length}개의 깨진 문장 발견`);
          fixedCount++;
        }
      }
    });
    
    console.log(`\n총 ${fixedCount}개의 깨진 부분 발견`);
    console.log('수동 수정이 필요합니다. 영어 번역을 참고하여 한글을 복원해주세요.');
    
  } catch (error) {
    console.error('파일 읽기 오류:', error);
  }
}

if (require.main === module) {
  fixKoreanEncoding();
}

module.exports = { fixKoreanEncoding };


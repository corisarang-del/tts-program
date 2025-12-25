/**
 * Intent 013~054에 각각 9개씩 문장 추가 스크립트
 */

const fs = require('fs');
const path = require('path');

const intentsFile = path.join(__dirname, '..', 'data', 'intents.json');

// Intent 013~054에 추가할 문장들 (각 의도별로 9개씩)
const additionalSentences = {
  // Intent 013: 길 안내 요청 (situation_005)
  intent_013: {
    ko: [
      "이 근처에서 ○○로 가는 가장 가까운 길을 알려주세요.",
      "○○까지 걸어서 갈 수 있나요?",
      "○○로 가는 버스나 지하철이 있나요?",
      "○○까지 얼마나 걸리나요?",
      "○○로 가는 길을 지도에 표시해 주실 수 있나요?",
      "○○로 가는 가장 빠른 방법을 알려주세요.",
      "○○까지 택시로 가면 얼마나 걸리나요?",
      "○○로 가는 길에 랜드마크가 있나요?",
      "○○로 가는 길을 쉽게 설명해 주실 수 있나요?"
    ],
    en: [
      "Could you tell me the nearest way to ○○ from here?",
      "Can I walk to ○○?",
      "Is there a bus or subway to ○○?",
      "How long does it take to get to ○○?",
      "Could you show me the way to ○○ on a map?",
      "What's the fastest way to ○○?",
      "How long does it take by taxi to ○○?",
      "Are there any landmarks on the way to ○○?",
      "Could you explain the way to ○○ simply?"
    ],
    ja: [
      "この近くから○○へ行く一番近い道を教えてください。",
      "○○まで歩いて行けますか？",
      "○○へ行くバスや地下鉄はありますか？",
      "○○までどのくらいかかりますか？",
      "○○への道を地図に示していただけますか？",
      "○○へ行く一番早い方法を教えてください。",
      "○○までタクシーでどのくらいかかりますか？",
      "○○への道にランドマークはありますか？",
      "○○への道を簡単に説明していただけますか？"
    ],
    zh: [
      "请告诉我从这附近到○○最近的路。",
      "可以步行到○○吗？",
      "有去○○的公交车或地铁吗？",
      "到○○需要多长时间？",
      "能在地图上给我指一下去○○的路吗？",
      "去○○最快的方法是什么？",
      "坐出租车到○○需要多长时间？",
      "去○○的路上有地标吗？",
      "能简单说明一下去○○的路吗？"
    ]
  },
  // Intent 014: 대중교통 경로 문의 (situation_005)
  intent_014: {
    ko: [
      "○○로 가는 지하철 노선을 알려주세요.",
      "○○까지 버스로 몇 정거장인가요?",
      "○○로 가는 버스 번호가 뭔가요?",
      "○○까지 환승이 필요한가요?",
      "○○로 가는 가장 편한 대중교통은 뭔가요?",
      "○○까지 지하철로 몇 호선을 타야 하나요?",
      "○○로 가는 버스 요금이 얼마인가요?",
      "○○까지 대중교통으로 얼마나 걸리나요?",
      "○○로 가는 버스가 자주 다니나요?"
    ],
    en: [
      "Which subway line goes to ○○?",
      "How many bus stops to ○○?",
      "What's the bus number to ○○?",
      "Do I need to transfer to get to ○○?",
      "What's the most convenient public transit to ○○?",
      "Which subway line should I take to ○○?",
      "How much is the bus fare to ○○?",
      "How long does it take by public transit to ○○?",
      "Do buses to ○○ run frequently?"
    ],
    ja: [
      "○○へ行く地下鉄路線を教えてください。",
      "○○までバスで何駅ですか？",
      "○○へ行くバス番号は何ですか？",
      "○○まで乗り換えが必要ですか？",
      "○○へ行く一番便利な公共交通は何ですか？",
      "○○まで地下鉄で何線に乗ればいいですか？",
      "○○へ行くバス料金はいくらですか？",
      "○○まで公共交通でどのくらいかかりますか？",
      "○○へ行くバスは頻繁に走っていますか？"
    ],
    zh: [
      "请告诉我去○○的地铁线路。",
      "坐公交车到○○有几站？",
      "去○○的公交车是几路？",
      "到○○需要换乘吗？",
      "去○○最方便的公共交通是什么？",
      "到○○应该坐几号线地铁？",
      "去○○的公交车票价是多少？",
      "坐公共交通到○○需要多长时间？",
      "去○○的公交车班次多吗？"
    ]
  },
  // Intent 015: 주변 위치 확인 (situation_005)
  intent_015: {
    ko: [
      "이 근처에 ○○이 얼마나 가까운가요?",
      "○○까지 걸어서 몇 분 걸리나요?",
      "가장 가까운 ○○이 어디 있나요?",
      "이 근처에 ○○이 여러 곳 있나요?",
      "○○으로 가는 길에 다른 유명한 곳이 있나요?",
      "○○까지 직접 걸어갈 수 있나요?",
      "○○이 여기서 보이나요?",
      "○○으로 가는 길이 복잡한가요?",
      "○○까지 가는 동안 지나치는 곳이 있나요?"
    ],
    en: [
      "How close is ○○ from here?",
      "How many minutes' walk to ○○?",
      "Where is the nearest ○○?",
      "Are there multiple ○○ nearby?",
      "Are there other famous places on the way to ○○?",
      "Can I walk directly to ○○?",
      "Can I see ○○ from here?",
      "Is the way to ○○ complicated?",
      "Are there places I'll pass on the way to ○○?"
    ],
    ja: [
      "この近くの○○はどのくらい近いですか？",
      "○○まで歩いて何分かかりますか？",
      "一番近い○○はどこですか？",
      "この近くに○○がいくつかありますか？",
      "○○へ行く道に他の有名な場所はありますか？",
      "○○まで直接歩いて行けますか？",
      "○○はここから見えますか？",
      "○○へ行く道は複雑ですか？",
      "○○まで行く途中で通る場所はありますか？"
    ],
    zh: [
      "这附近的○○有多近？",
      "步行到○○需要几分钟？",
      "最近的○○在哪里？",
      "这附近有多个○○吗？",
      "去○○的路上有其他著名的地方吗？",
      "可以直接步行到○○吗？",
      "从这里能看到○○吗？",
      "去○○的路复杂吗？",
      "去○○的路上会经过哪些地方？"
    ]
  }
};

// 파일 읽기
const intentsData = JSON.parse(fs.readFileSync(intentsFile, 'utf-8'));

// Intent 013~054에 문장 추가
intentsData.forEach(intent => {
  const intentId = intent.id;
  
  // Intent 013~054만 처리
  const intentNum = parseInt(intentId.replace('intent_', ''));
  if (intentNum < 13 || intentNum > 54) return;
  
  // 이미 12개 이상이면 스킵
  if (intent.sentences && intent.sentences.ko && intent.sentences.ko.length >= 12) {
    return;
  }
  
  // 기존 문장이 3개인 경우에만 9개 추가
  if (intent.sentences && intent.sentences.ko && intent.sentences.ko.length === 3) {
    // 각 언어별로 9개 추가
    const additional = additionalSentences[intentId] || generateGenericSentences(intent);
    
    intent.sentences.ko.push(...additional.ko);
    intent.sentences.en.push(...additional.en);
    intent.sentences.ja.push(...additional.ja);
    intent.sentences.zh.push(...additional.zh);
  }
});

// 일반적인 문장 생성 함수 (특정 Intent에 대한 문장이 없는 경우)
function generateGenericSentences(intent) {
  const name = intent.name.ko || intent.name;
  const description = intent.description.ko || intent.description;
  
  return {
    ko: [
      `${name}에 대해 더 자세히 알려주세요.`,
      `${description}에 대한 정보를 얻고 싶습니다.`,
      `${name}에 관해 도움을 요청합니다.`,
      `${description}에 대해 설명해 주실 수 있나요?`,
      `${name}에 대한 추가 정보가 필요합니다.`,
      `${description}에 관해 질문이 있습니다.`,
      `${name}에 대해 안내해 주세요.`,
      `${description}에 대한 조언을 구합니다.`,
      `${name}에 관해 확인이 필요합니다.`
    ],
    en: [
      `Please tell me more about ${name.en || name}.`,
      `I'd like information about ${description.en || description}.`,
      `I'm asking for help regarding ${name.en || name}.`,
      `Could you explain ${description.en || description}?`,
      `I need additional information about ${name.en || name}.`,
      `I have questions about ${description.en || description}.`,
      `Please guide me about ${name.en || name}.`,
      `I'm seeking advice about ${description.en || description}.`,
      `I need to confirm about ${name.en || name}.`
    ],
    ja: [
      `${name.ja || name}についてもっと詳しく教えてください。`,
      `${description.ja || description}について情報を得たいです。`,
      `${name.ja || name}について助けを求めます。`,
      `${description.ja || description}について説明していただけますか？`,
      `${name.ja || name}について追加情報が必要です。`,
      `${description.ja || description}について質問があります。`,
      `${name.ja || name}について案内してください。`,
      `${description.ja || description}についてアドバイスを求めます。`,
      `${name.ja || name}について確認が必要です。`
    ],
    zh: [
      `请详细告诉我关于${name.zh || name}的信息。`,
      `我想了解关于${description.zh || description}的信息。`,
      `我请求关于${name.zh || name}的帮助。`,
      `能解释一下${description.zh || description}吗？`,
      `我需要关于${name.zh || name}的更多信息。`,
      `我有关于${description.zh || description}的问题。`,
      `请指导我关于${name.zh || name}的信息。`,
      `我寻求关于${description.zh || description}的建议。`,
      `我需要确认关于${name.zh || name}的信息。`
    ]
  };
}

// 파일 쓰기
fs.writeFileSync(intentsFile, JSON.stringify(intentsData, null, 2), 'utf-8');

console.log('Intent 013~054 문장 확장 완료!');


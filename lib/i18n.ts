import { LocalizedSentences, LocalizedText, Locale } from '@/types';

export const LOCALES: Locale[] = ['ko', 'en', 'ja', 'zh'];

export const LOCALE_LABELS: Record<Locale, string> = {
  ko: '한국어',
  en: 'English',
  ja: '日本語',
  zh: '中文',
};

type UITextKey = 'copy' | 'play' | 'pause' | 'regenerate' | 'next' | 'back' | 'generatedSentences' | 'noSentences' | 'backToIntent' | 'whichIntention' | 'retry' | 'whichSituation' | 'wasItHelpful' | 'rateHelpfulness' | 'solved' | 'okay' | 'notHelpful' | 'skip' | 'usageComplete' | 'usageCompleted' | 'tryAnotherSituation' | 'goToHome' | 'homeMainTitle' | 'homeStartButton' | 'homeFeatureMinimalClicks' | 'homeFeatureInstantResults' | 'homeFeatureVoiceSupport' | 'feedbackMessage' | 'reuseMessage' | 'landingHeroTag' | 'landingHeroTitlePart1' | 'landingHeroTitlePart2' | 'landingHeroDescription' | 'landingInteractivePreview' | 'landingFeaturesTag' | 'landingFeaturesTitle' | 'landingFeaturesSubtitle' | 'landingFeatureMinimalClicksTitle' | 'landingFeatureMinimalClicksDesc' | 'landingFeatureInstantResultsTitle' | 'landingFeatureInstantResultsDesc' | 'landingFeatureVoiceSupportTitle' | 'landingFeatureVoiceSupportDesc' | 'landingHowToTag' | 'landingHowToTitle' | 'landingHowToSubtitle' | 'landingHowToStep1Title' | 'landingHowToStep1Desc' | 'landingHowToStep2Title' | 'landingHowToStep2Desc' | 'landingHowToStep3Title' | 'landingHowToStep3Desc' | 'landingSocialProofTitle' | 'landingSocialProofDesc' | 'landingCtaTitle' | 'landingCtaSubtitle' | 'landingCtaButton' | 'landingCtaDisclaimer';

const UI_TEXTS: Record<UITextKey, Record<Locale, string>> = {
  copy: {
    ko: '복사',
    en: 'Copy',
    ja: 'コピー',
    zh: '复制',
  },
  play: {
    ko: '🔊 듣기',
    en: '🔊 Listen',
    ja: '🔊 再生',
    zh: '🔊 播放',
  },
  pause: {
    ko: '일시정지',
    en: 'Pause',
    ja: '一時停止',
    zh: '暂停',
  },
  regenerate: {
    ko: '다시 생성',
    en: 'Regenerate',
    ja: '再生成',
    zh: '重新生成',
  },
  next: {
    ko: '다음',
    en: 'Next',
    ja: '次',
    zh: '下一步',
  },
  back: {
    ko: '돌아가기',
    en: 'Back',
    ja: '戻る',
    zh: '返回',
  },
  generatedSentences: {
    ko: '생성된 문장',
    en: 'Generated Sentences',
    ja: '生成された文',
    zh: '生成的句子',
  },
  noSentences: {
    ko: '생성된 문장이 없습니다.',
    en: 'No generated sentences.',
    ja: '生成された文がありません。',
    zh: '没有生成的句子。',
  },
  backToIntent: {
    ko: '의도 선택으로 돌아가기',
    en: 'Back to Intent Selection',
    ja: '意図選択に戻る',
    zh: '返回意图选择',
  },
  whichIntention: {
    ko: '어떤 의도인가요?',
    en: 'What is your intention?',
    ja: 'どの意図ですか?',
    zh: '你的意图是什么?',
  },
  retry: {
    ko: '다시 시도',
    en: 'Retry',
    ja: '再試行',
    zh: '重试',
  },
  whichSituation: {
    ko: '어떤 상황인가요?',
    en: 'What situation are you in?',
    ja: 'どんな状況ですか?',
    zh: '你的情况是什么?',
  },
  wasItHelpful: {
    ko: '도움이 되셨나요?',
    en: 'Was this helpful?',
    ja: '役に立ちました?',
    zh: '有帮助吗?',
  },
  rateHelpfulness: {
    ko: '생성된 문장이 도움이 되었는지 평가해주세요',
    en: 'Please rate if the generated sentences were helpful',
    ja: '生成された文が役に立ったかを評価してください',
    zh: '请评价生成的句子是否有帮助',
  },
  solved: {
    ko: '해결됨 😊',
    en: 'Solved 😊',
    ja: '解決 😊',
    zh: '已解决 😊',
  },
  okay: {
    ko: '보통 😐',
    en: 'Okay 😐',
    ja: '普通 😐',
    zh: '一般 😐',
  },
  notHelpful: {
    ko: '도움 안됨 😞',
    en: 'Not helpful 😞',
    ja: '役に立たなかった 😞',
    zh: '没有帮助 😞',
  },
  skip: {
    ko: '건너뛰기',
    en: 'Skip',
    ja: 'スキップ',
    zh: '跳过',
  },
  usageComplete: {
    ko: '사용 완료',
    en: 'Usage complete',
    ja: '使用完了',
    zh: '使用完成',
  },
  usageCompleted: {
    ko: '사용이 완료되었습니다',
    en: 'Usage completed',
    ja: '使用完了しました',
    zh: '使用已完成',
  },
  tryAnotherSituation: {
    ko: '다른 상황 선택',
    en: 'Try another situation',
    ja: '別の状況を選択',
    zh: '选择另一种情况',
  },
  goToHome: {
    ko: '처음으로',
    en: 'Go to home',
    ja: 'ホームへ',
    zh: '返回首页',
  },
  homeMainTitle: {
    ko: '상황만 선택하면',
    en: 'Select a situation',
    ja: '状況を選ぶだけで',
    zh: '只需选择情况',
  },
  homeStartButton: {
    ko: '지금 시작하기 →',
    en: 'Start now →',
    ja: '今すぐ始める →',
    zh: '立即开始 →',
  },
  homeFeatureMinimalClicks: {
    ko: '최소 클릭',
    en: 'Minimal clicks',
    ja: '最小限のクリック',
    zh: '最少点击次数',
  },
  homeFeatureInstantResults: {
    ko: '즉시 제공',
    en: 'Instant results',
    ja: '即座に提供',
    zh: '立即提供',
  },
  homeFeatureVoiceSupport: {
    ko: '음성 지원',
    en: 'Voice support',
    ja: '音声サポート',
    zh: '语音支持',
  },
  feedbackMessage: {
    ko: '당신의 한 번의 클릭이 서비스를 더 똑똑하게 만듭니다',
    en: 'Your one click makes the service smarter',
    ja: 'あなたの1回のクリックがサービスをより賢くします',
    zh: '您的一次点击使服务更智能',
  },
  reuseMessage: {
    ko: '다음에도 필요하면 언제든 다시 사용하세요',
    en: 'Feel free to use it again whenever you need it',
    ja: '次回も必要であればいつでもまたご利用ください',
    zh: '如果下次需要，随时可以再次使用',
  },
  landingHeroTag: {
    ko: '🎯 상황맞춤 문장 생성',
    en: '🎯 Context-based Sentence Generation',
    ja: '🎯 状況に合わせた文章生成',
    zh: '🎯 情境定制句子生成',
  },
  landingHeroTitlePart1: {
    ko: '상황만 선택하면',
    en: 'Just select a situation',
    ja: '状況を選ぶだけで',
    zh: '只需选择情况',
  },
  landingHeroTitlePart2: {
    ko: '바로 쓸 수 있는 문장',
    en: 'and get ready-to-use sentences',
    ja: 'すぐに使える文章',
    zh: '即可使用的句子',
  },
  landingHeroDescription: {
    ko: '어색한 상황에서 말이 막힐 때 주저하지 말고 QuickTalk을 사용해보세요. 준비된 문장으로 자신있게 말해보세요.',
    en: 'When words fail you in awkward situations, don\'t hesitate to use QuickTalk. Speak confidently with prepared sentences.',
    ja: '気まずい状況で言葉に詰まった時、ためらわずにQuickTalkを使ってみてください。準備された文章で自信を持って話しましょう。',
    zh: '在尴尬的情况下说不出话时，不要犹豫，使用QuickTalk。用准备好的句子自信地说话。',
  },
  landingInteractivePreview: {
    ko: 'Interactive Preview',
    en: 'Interactive Preview',
    ja: 'インタラクティブプレビュー',
    zh: '交互式预览',
  },
  landingFeaturesTag: {
    ko: '주요 특징',
    en: 'Key Features',
    ja: '主な特徴',
    zh: '主要特点',
  },
  landingFeaturesTitle: {
    ko: 'QuickTalk의 강점',
    en: 'QuickTalk\'s Strengths',
    ja: 'QuickTalkの強み',
    zh: 'QuickTalk的优势',
  },
  landingFeaturesSubtitle: {
    ko: '최대한 간단하고, 빠르고, 자연스러운 경험입니다.',
    en: 'The simplest, fastest, and most natural experience.',
    ja: 'できるだけシンプルで、速く、自然な体験です。',
    zh: '最简单、最快、最自然的体验。',
  },
  landingFeatureMinimalClicksTitle: {
    ko: '최소 클릭',
    en: 'Minimal Clicks',
    ja: '最小限のクリック',
    zh: '最少点击',
  },
  landingFeatureMinimalClicksDesc: {
    ko: '2~3번의 선택만으로 생성된 문장을 바로 써보세요',
    en: 'Use generated sentences right away with just 2-3 selections',
    ja: '2〜3回の選択だけで生成された文章をすぐに使ってみてください',
    zh: '只需2-3次选择即可使用生成的句子',
  },
  landingFeatureInstantResultsTitle: {
    ko: '즉시 제공',
    en: 'Instant Results',
    ja: '即座に提供',
    zh: '即时提供',
  },
  landingFeatureInstantResultsDesc: {
    ko: '선택하는 순간 결과가 나옵니다. 기다릴 필요가 없습니다.',
    en: 'Results appear the moment you select. No waiting required.',
    ja: '選択した瞬間に結果が出ます。待つ必要はありません。',
    zh: '选择时立即显示结果。无需等待。',
  },
  landingFeatureVoiceSupportTitle: {
    ko: '음성 지원',
    en: 'Voice Support',
    ja: '音声サポート',
    zh: '语音支持',
  },
  landingFeatureVoiceSupportDesc: {
    ko: 'TTS로 들으면서 다양한 발음을 확인할 수 있습니다.',
    en: 'Listen with TTS and check various pronunciations.',
    ja: 'TTSで聞きながら様々な発音を確認できます。',
    zh: '可以通过TTS听取并确认各种发音。',
  },
  landingHowToTag: {
    ko: '단 3단계 사용법',
    en: 'Just 3 Simple Steps',
    ja: 'わずか3ステップの使い方',
    zh: '只需3个简单步骤',
  },
  landingHowToTitle: {
    ko: '너무 간단하니?',
    en: 'Too Simple?',
    ja: '簡単すぎますか？',
    zh: '太简单了？',
  },
  landingHowToSubtitle: {
    ko: '복잡한 절차는 없습니다. 3번의 클릭만으로 완벽한 문장을 만들 수 있습니다.',
    en: 'No complicated procedures. Create perfect sentences with just 3 clicks.',
    ja: '複雑な手順はありません。3回のクリックだけで完璧な文章を作成できます。',
    zh: '没有复杂的程序。只需3次点击即可创建完美的句子。',
  },
  landingHowToStep1Title: {
    ko: '상황 선택',
    en: 'Select Situation',
    ja: '状況選択',
    zh: '选择情况',
  },
  landingHowToStep1Desc: {
    ko: '지금 처한 상황을 선택하세요',
    en: 'Select your current situation',
    ja: '今の状況を選択してください',
    zh: '选择您当前的情况',
  },
  landingHowToStep2Title: {
    ko: '의도 선택',
    en: 'Select Intent',
    ja: '意図選択',
    zh: '选择意图',
  },
  landingHowToStep2Desc: {
    ko: '어떤 의도로 말할지 선택하세요',
    en: 'Select what you want to say',
    ja: '何を言いたいか選択してください',
    zh: '选择您想说的话',
  },
  landingHowToStep3Title: {
    ko: '문장 사용',
    en: 'Use Sentence',
    ja: '文章使用',
    zh: '使用句子',
  },
  landingHowToStep3Desc: {
    ko: '생성된 문장을 복사하거나 듣기',
    en: 'Copy or listen to the generated sentence',
    ja: '生成された文章をコピーまたは聞く',
    zh: '复制或听取生成的句子',
  },
  landingSocialProofTitle: {
    ko: '많은 사람들이 사용 중입니다',
    en: 'Many People Are Using It',
    ja: '多くの人が使用中です',
    zh: '许多人正在使用',
  },
  landingSocialProofDesc: {
    ko: '어색한 상황에서도 자신있게 말할 수 있도록 준비된 문장을 제공합니다. 지금 바로 시작해보세요!',
    en: 'We provide prepared sentences so you can speak confidently even in awkward situations. Start now!',
    ja: '気まずい状況でも自信を持って話せるよう、準備された文章を提供します。今すぐ始めてみてください！',
    zh: '我们提供准备好的句子，让您即使在尴尬的情况下也能自信地说话。立即开始！',
  },
  landingCtaTitle: {
    ko: '준비되셨나요?',
    en: 'Ready?',
    ja: '準備はできましたか？',
    zh: '准备好了吗？',
  },
  landingCtaSubtitle: {
    ko: '지금 바로 시작해서 자신있게 말해보세요.',
    en: 'Start now and speak confidently.',
    ja: '今すぐ始めて自信を持って話してみてください。',
    zh: '立即开始，自信地说话。',
  },
  landingCtaButton: {
    ko: 'QuickTalk 시작하기 ✨',
    en: 'Start QuickTalk ✨',
    ja: 'QuickTalkを始める ✨',
    zh: '开始QuickTalk ✨',
  },
  landingCtaDisclaimer: {
    ko: '가입이나 로그인이 필요 없습니다. 바로 시작하세요!',
    en: 'No sign-up or login required. Start right away!',
    ja: '登録やログインは不要です。すぐに始められます！',
    zh: '无需注册或登录。立即开始！',
  },
};

export function getUIText(key: UITextKey, locale: Locale): string {
  return UI_TEXTS[key]?.[locale] || UI_TEXTS[key]?.['ko'] || '';
}

export function getLocalizedText(text: LocalizedText, locale: Locale): string {
  if (text?.[locale]) {
    return text[locale];
  }
  if (text?.ko) {
    return text.ko;
  }
  const fallback = Object.values(text || {}).find(value => value);
  return fallback || '';
}

export function getLocalizedSentences(
  sentences: LocalizedSentences | undefined,
  locale: Locale
): string[] | undefined {
  if (!sentences) {
    return undefined;
  }
  if (sentences[locale] && sentences[locale]?.length) {
    return sentences[locale];
  }
  if (sentences.ko && sentences.ko.length) {
    return sentences.ko;
  }
  return Object.values(sentences).find(list => list && list.length);
}

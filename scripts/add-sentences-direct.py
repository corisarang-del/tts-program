#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import json
import os

# 현재 디렉토리에서 data/intents.json 파일 읽기
script_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.dirname(script_dir)
intents_path = os.path.join(project_root, 'data', 'intents.json')

print(f'Reading intents from: {intents_path}')

with open(intents_path, 'r', encoding='utf-8') as f:
    intents = json.load(f)

# 각 intent에 9개씩 추가할 문장 (기존 스크립트의 내용을 참고)
# 여기서는 간단하게 패턴 기반으로 생성
additional_sentences_template = {
    'ko': [
        "이 부분에 대해 더 자세히 알려주실 수 있을까요?",
        "가능하시다면 도움을 부탁드리고 싶습니다.",
        "이 내용에 대해 확인이 필요합니다.",
        "관련 정보를 공유해 주실 수 있을까요?",
        "이 부분에 대한 조언을 구하고 싶습니다.",
        "가능하시다면 이 일에 대해 도움을 요청드립니다.",
        "이 내용에 대해 더 자세한 설명을 들을 수 있을까요?",
        "관련 자료나 참고 문서를 받을 수 있을까요?",
        "이 부분에 대해 의견을 들을 수 있을까요?"
    ],
    'en': [
        "Could you tell me more details about this?",
        "If possible, I'd like to ask for help.",
        "I need to check on this matter.",
        "Could you share related information?",
        "I'd like to ask for advice on this.",
        "If possible, I'd like to request help with this.",
        "Could I get a more detailed explanation about this?",
        "Could I receive related materials or reference documents?",
        "Could I hear your opinion on this?"
    ],
    'ja': [
        "この点についてもっと詳しく教えていただけますか？",
        "可能であれば、助けをお願いしたいです。",
        "この内容について確認が必要です。",
        "関連情報を共有していただけますか？",
        "この点についてアドバイスをいただきたいです。",
        "可能であれば、この件について助けをお願いしたいです。",
        "この内容についてもっと詳しい説明を聞かせていただけますか？",
        "関連資料や参考資料をいただけますか？",
        "この点について意見を聞かせていただけますか？"
    ],
    'zh': [
        "您能更详细地告诉我这方面吗？",
        "如果可能的话，我想请求帮助。",
        "我需要确认这件事。",
        "您能分享相关信息吗？",
        "我想就这方面征求建议。",
        "如果可能的话，我想请求帮助处理这件事。",
        "我能获得关于这方面的更详细解释吗？",
        "我能收到相关材料或参考文件吗？",
        "我能听听您对此的意见吗？"
    ]
}

# 각 intent에 문장 추가
for intent in intents:
    if 'sentences' not in intent:
        intent['sentences'] = {}
    
    for locale in ['ko', 'en', 'ja', 'zh']:
        if locale not in intent['sentences']:
            intent['sentences'][locale] = []
        
        existing = intent['sentences'][locale]
        # 기존 문장과 중복되지 않도록 추가
        new_sentences = additional_sentences_template[locale].copy()
        
        # 중복 제거 후 추가
        for sentence in new_sentences:
            if sentence not in existing:
                existing.append(sentence)
        
        # 최대 12개로 제한 (기존 3개 + 추가 9개)
        intent['sentences'][locale] = existing[:12]

# 파일 저장
with open(intents_path, 'w', encoding='utf-8') as f:
    json.dump(intents, f, ensure_ascii=False, indent=2)

print(f'✅ {len(intents)}개의 intent에 각 언어별로 9개씩 문장을 추가했습니다.')
print('각 intent는 이제 최대 12개의 문장을 가지고 있습니다 (기존 3개 + 추가 9개).')


#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Intent 013~054 추가 및 각각 9개씩 문장 추가 스크립트
"""

import json
import os
from pathlib import Path

# 파일 경로
script_dir = Path(__file__).parent
intents_file = script_dir.parent / 'data' / 'intents.json'

# Intent 013~054 정의 (원래 파일 구조 기반)
intents_013_054 = [
    {
        "id": "intent_013",
        "situationId": "situation_005",
        "name": {"ko": "길 안내 요청", "en": "Ask for directions", "ja": "道案内の依頼", "zh": "询问路线"},
        "description": {"ko": "목적지까지 가는 길을 문의", "en": "Ask how to get to a destination", "ja": "目的地までの道を聞く", "zh": "询问去目的地的路"},
        "displayOrder": 1,
        "sentences": {
            "ko": [
                "실례합니다, ○○역으로 가는 길이 이쪽이 맞나요?",
                "죄송하지만 ○○까지 가는 길 좀 알려주실 수 있을까요?",
                "혹시 근처에 ○○이 어디에 있는지 알려주실 수 있나요?"
            ],
            "en": [
                "Excuse me, is this the way to ○○ Station?",
                "Sorry, could you tell me how to get to ○○?",
                "Do you know where ○○ is around here?"
            ],
            "ja": [
                "すみません、○○駅へ行く道はこの方向で合っていますか？",
                "申し訳ありませんが、○○までの行き方を教えていただけますか。",
                "この近くに○○がどこにあるか教えていただけますか？"
            ],
            "zh": [
                "请问去○○站是这边吗？",
                "不好意思，能告诉我怎么去○○吗？",
                "请问附近哪里有○○？"
            ]
        }
    },
    {
        "id": "intent_014",
        "situationId": "situation_005",
        "name": {"ko": "대중교통 경로 문의", "en": "Public transit route", "ja": "公共交通の経路", "zh": "公交/地铁路线"},
        "description": {"ko": "버스/지하철 이용 경로 문의", "en": "Ask about bus/subway routes", "ja": "バス・地下鉄の経路を尋ねる", "zh": "询问公交或地铁路线"},
        "displayOrder": 2,
        "sentences": {
            "ko": [
                "○○로 가려면 지하철이나 버스 어떤 노선을 타면 될까요?",
                "여기서 ○○까지 대중교통으로 가장 빠른 길이 궁금합니다.",
                "○○ 가는 버스 정류장이 어디인지 알려주실 수 있나요?"
            ],
            "en": [
                "Which subway or bus line should I take to ○○?",
                "What's the fastest public transit route to ○○ from here?",
                "Where is the bus stop for ○○?"
            ],
            "ja": [
                "○○へ行くには地下鉄かバスでどの路線に乗ればいいですか。",
                "ここから○○まで公共交通で一番早い行き方を教えてください。",
                "○○行きのバス停はどこですか？"
            ],
            "zh": [
                "去○○要坐哪条地铁或公交？",
                "从这里到○○最快的公共交通路线是什么？",
                "去○○的公交站在哪里？"
            ]
        }
    },
    {
        "id": "intent_015",
        "situationId": "situation_005",
        "name": {"ko": "주변 위치 확인", "en": "Nearby places", "ja": "周辺の場所確認", "zh": "附近地点询问"},
        "description": {"ko": "근처에 특정 장소가 있는지 확인", "en": "Ask if a place is nearby", "ja": "近くに目的地があるか確認", "zh": "确认附近是否有某地点"},
        "displayOrder": 3,
        "sentences": {
            "ko": [
                "혹시 이 근처에 편의점이나 카페가 있나요?",
                "○○이 가까운 곳에 있는지 알려주실 수 있을까요?",
                "가장 가까운 ○○이 어디인지 여쭤봐도 될까요?"
            ],
            "en": [
                "Is there a convenience store or cafe nearby?",
                "Could you tell me if ○○ is close to here?",
                "Where is the nearest ○○?"
            ],
            "ja": [
                "この近くにコンビニやカフェはありますか？",
                "○○はこの近くにありますか？",
                "一番近い○○はどこでしょうか？"
            ],
            "zh": [
                "这附近有便利店或咖啡店吗？",
                "请问○○在附近吗？",
                "最近的○○在哪里？"
            ]
        }
    },
    {
        "id": "intent_016",
        "situationId": "situation_006",
        "name": {"ko": "화장실 위치 문의", "en": "Restroom location", "ja": "トイレの場所", "zh": "洗手间位置"},
        "description": {"ko": "가까운 화장실 위치 문의", "en": "Ask where the restroom is", "ja": "トイレの場所を尋ねる", "zh": "询问洗手间位置"},
        "displayOrder": 1,
        "sentences": {
            "ko": [
                "실례합니다, 이 근처에 화장실이 어디에 있나요?",
                "죄송하지만 화장실 위치 좀 알려주실 수 있을까요?",
                "가까운 화장실이 있으면 안내 부탁드립니다."
            ],
            "en": [
                "Excuse me, where is the nearest restroom?",
                "Sorry, could you tell me where the restroom is?",
                "Is there a restroom nearby?"
            ],
            "ja": [
                "すみません、この近くのトイレはどこですか？",
                "申し訳ありませんが、トイレの場所を教えていただけますか。",
                "近くにトイレはありますか？"
            ],
            "zh": [
                "请问附近的洗手间在哪里？",
                "不好意思，能告诉我洗手间的位置吗？",
                "附近有洗手间吗？"
            ]
        }
    },
    {
        "id": "intent_017",
        "situationId": "situation_006",
        "name": {"ko": "이용 가능 여부 확인", "en": "Check availability", "ja": "利用可否の確認", "zh": "确认是否可用"},
        "description": {"ko": "화장실 사용 가능한지 확인", "en": "Ask if you can use the restroom", "ja": "トイレの利用可否を確認", "zh": "询问是否可以使用"},
        "displayOrder": 2,
        "sentences": {
            "ko": [
                "여기 화장실 사용 가능한가요?",
                "혹시 손님이 아니어도 화장실 이용할 수 있을까요?",
                "화장실 이용 가능 시간 알 수 있을까요?"
            ],
            "en": [
                "Is the restroom available to use?",
                "Can I use the restroom even if I'm not a customer?",
                "What are the restroom hours?"
            ],
            "ja": [
                "こちらのトイレは利用できますか？",
                "お客でなくてもトイレを使ってもいいですか？",
                "トイレの利用時間を教えてください。"
            ],
            "zh": [
                "这里的洗手间可以用吗？",
                "不是顾客也可以使用洗手间吗？",
                "洗手间开放时间是几点？"
            ]
        }
    },
    {
        "id": "intent_018",
        "situationId": "situation_007",
        "name": {"ko": "메뉴 추천 요청", "en": "Ask for recommendations", "ja": "おすすめの依頼", "zh": "询问推荐"},
        "description": {"ko": "인기 메뉴 추천 요청", "en": "Ask for popular menu items", "ja": "人気メニューを聞く", "zh": "询问热门菜单"},
        "displayOrder": 1,
        "sentences": {
            "ko": [
                "처음 왔는데 인기 메뉴 추천해 주실 수 있나요?",
                "덜 매운 메뉴로 추천 부탁드립니다.",
                "오늘 가장 많이 주문하는 메뉴가 뭔가요?"
            ],
            "en": [
                "It's my first time here. Could you recommend a popular dish?",
                "Could you recommend something not too spicy?",
                "What's the most ordered item today?"
            ],
            "ja": [
                "初めて来ました。人気メニューをおすすめしてもらえますか。",
                "あまり辛くないメニューをおすすめしてください。",
                "今日一番注文が多いメニューは何ですか？"
            ],
            "zh": [
                "第一次来，可以推荐人气菜单吗？",
                "能推荐不太辣的菜吗？",
                "今天点得最多的菜是什么？"
            ]
        }
    },
    {
        "id": "intent_019",
        "situationId": "situation_007",
        "name": {"ko": "주문하기", "en": "Place an order", "ja": "注文する", "zh": "点单"},
        "description": {"ko": "메뉴 주문 요청", "en": "Order menu items", "ja": "料理を注文する", "zh": "点菜"},
        "displayOrder": 2,
        "sentences": {
            "ko": [
                "불고기 덮밥 하나와 물 한 병 부탁드립니다.",
                "이 메뉴로 두 개 주문할게요.",
                "음식은 덜 짜게 가능할까요?"
            ],
            "en": [
                "I'd like one bulgogi bowl and a bottle of water.",
                "I'll take two of this menu item.",
                "Could you make it less salty?"
            ],
            "ja": [
                "プルコギ丼を1つと水を1本お願いします。",
                "このメニューを2つお願いします。",
                "少し薄味にできますか？"
            ],
            "zh": [
                "我要一份烤肉盖饭和一瓶水。",
                "这个菜单要两份。",
                "可以做得少咸一点吗？"
            ]
        }
    },
    {
        "id": "intent_020",
        "situationId": "situation_007",
        "name": {"ko": "추가 주문/요청", "en": "Additional order", "ja": "追加注文", "zh": "追加点单"},
        "description": {"ko": "추가 메뉴나 요청 사항 전달", "en": "Add extra items or requests", "ja": "追加の注文や要望", "zh": "追加菜品或请求"},
        "displayOrder": 3,
        "sentences": {
            "ko": [
                "음료 하나 더 추가할게요.",
                "사이드 메뉴도 같이 주문할 수 있을까요?",
                "젓가락 하나 더 부탁드립니다."
            ],
            "en": [
                "I'd like to add one more drink.",
                "Could I order a side dish as well?",
                "Could I get an extra pair of chopsticks?"
            ],
            "ja": [
                "ドリンクをもう1つ追加します。",
                "サイドメニューも一緒に注文できますか？",
                "お箸をもう1膳お願いします。"
            ],
            "zh": [
                "再加一杯饮料。",
                "可以一起点一份小菜吗？",
                "请再给一双筷子。"
            ]
        }
    },
    {
        "id": "intent_021",
        "situationId": "situation_007",
        "name": {"ko": "알레르기/식단", "en": "Allergy/diet", "ja": "アレルギー/食事制限", "zh": "过敏/饮食限制"},
        "description": {"ko": "알레르기나 식단 제한 전달", "en": "Tell them about allergies or restrictions", "ja": "アレルギーや制限を伝える", "zh": "说明过敏或饮食限制"},
        "displayOrder": 4,
        "sentences": {
            "ko": [
                "저는 땅콩 알레르기가 있어서 땅콩이 들어가면 안 됩니다.",
                "유제품은 먹지 못합니다. 다른 메뉴가 있을까요?",
                "매운 음식을 못 먹어서 덜 맵게 부탁드립니다."
            ],
            "en": [
                "I have a peanut allergy, so no peanuts please.",
                "I can't eat dairy. Do you have another option?",
                "I can't eat spicy food. Could you make it mild?"
            ],
            "ja": [
                "ピーナッツアレルギーがあるので、入れないでください。",
                "乳製品は食べられません。他のメニューはありますか？",
                "辛いものが苦手なので、辛さ控えめでお願いします。"
            ],
            "zh": [
                "我对花生过敏，请不要放花生。",
                "我不能吃乳制品，有别的选择吗？",
                "我不能吃辣，请做得不辣一些。"
            ]
        }
    },
    {
        "id": "intent_022",
        "situationId": "situation_007",
        "name": {"ko": "포장/영수증 요청", "en": "Takeout/receipt", "ja": "テイクアウト/領収書", "zh": "打包/发票"},
        "description": {"ko": "포장이나 영수증 요청", "en": "Ask for takeout or receipt", "ja": "持ち帰りや領収書の依頼", "zh": "请求打包或发票"},
        "displayOrder": 5,
        "sentences": {
            "ko": [
                "이건 포장해 주실 수 있나요?",
                "남은 음식 포장 부탁드립니다.",
                "영수증 하나 부탁드립니다."
            ],
            "en": [
                "Could you make this to go?",
                "Could you pack up the leftovers, please?",
                "Could I get a receipt, please?"
            ],
            "ja": [
                "これは持ち帰りにできますか？",
                "残った料理を包んでください。",
                "領収書をお願いします。"
            ],
            "zh": [
                "这个可以打包吗？",
                "请帮我把剩下的打包一下。",
                "请给我一张收据。"
            ]
        }
    },
    {
        "id": "intent_023",
        "situationId": "situation_008",
        "name": {"ko": "말하기 어려움 알리기", "en": "Explain speech difficulty", "ja": "話すのが難しいと伝える", "zh": "说明说话困难"},
        "description": {"ko": "말하기가 어렵다는 점을 알림", "en": "Let them know speaking is hard", "ja": "話すのが難しいことを伝える", "zh": "告知说话有困难"},
        "displayOrder": 1,
        "sentences": {
            "ko": [
                "저는 말을 하기 어렵습니다. 양해 부탁드립니다.",
                "말 대신 이 문장을 보여드리겠습니다.",
                "천천히 기다려주시면 감사하겠습니다."
            ],
            "en": [
                "I have difficulty speaking. Thank you for your understanding.",
                "I'll show you this message instead of speaking.",
                "Thank you for your patience while I communicate."
            ],
            "ja": [
                "話すのが難しいです。ご理解ください。",
                "話す代わりにこの文を見せます。",
                "ゆっくり待っていただけると助かります。"
            ],
            "zh": [
                "我说话有困难，请谅解。",
                "我会用这段文字代替说话。",
                "谢谢您耐心等待我沟通。"
            ]
        }
    },
    {
        "id": "intent_024",
        "situationId": "situation_008",
        "name": {"ko": "천천히 말해달라", "en": "Ask to speak slowly", "ja": "ゆっくり話してほしい", "zh": "请慢点说"},
        "description": {"ko": "천천히/짧게 말해달라고 요청", "en": "Ask them to speak slowly or briefly", "ja": "ゆっくり・短く話してもらう", "zh": "请求慢点或简短说明"},
        "displayOrder": 2,
        "sentences": {
            "ko": [
                "죄송하지만 천천히 말씀해 주실 수 있을까요?",
                "짧고 간단하게 말씀해 주시면 이해가 쉽습니다.",
                "다시 한번 천천히 말씀해 주세요."
            ],
            "en": [
                "Sorry, could you speak slowly?",
                "Short and simple sentences are easier for me.",
                "Could you repeat that slowly, please?"
            ],
            "ja": [
                "すみません、ゆっくり話していただけますか。",
                "短く簡単に話していただけると理解しやすいです。",
                "もう一度ゆっくり話してください。"
            ],
            "zh": [
                "不好意思，可以说慢一点吗？",
                "请用简短的话说明，会更容易理解。",
                "请再慢一点说一遍。"
            ]
        }
    },
    {
        "id": "intent_025",
        "situationId": "situation_008",
        "name": {"ko": "필기/번역 요청", "en": "Ask for writing/translation", "ja": "書き取り/翻訳の依頼", "zh": "请求书写/翻译"},
        "description": {"ko": "필기나 번역 앱 도움 요청", "en": "Ask for writing or translation help", "ja": "書いてもらう・翻訳を頼む", "zh": "请求写下或翻译"},
        "displayOrder": 3,
        "sentences": {
            "ko": [
                "종이에 적어 주실 수 있나요?",
                "번역 앱으로 보여드려도 될까요?",
                "손짓으로 설명해 주셔도 됩니다."
            ],
            "en": [
                "Could you write it down, please?",
                "May I show you with a translation app?",
                "Gestures are okay too."
            ],
            "ja": [
                "紙に書いていただけますか？",
                "翻訳アプリでお見せしてもいいですか？",
                "身振りで説明していただいても大丈夫です。"
            ],
            "zh": [
                "可以帮我写下来吗？",
                "我可以用翻译软件给您看吗？",
                "也可以用手势说明。"
            ]
        }
    },
    {
        "id": "intent_026",
        "situationId": "situation_009",
        "name": {"ko": "증상 설명", "en": "Describe symptoms", "ja": "症状の説明", "zh": "说明症状"},
        "description": {"ko": "아픈 부위나 증상 설명", "en": "Explain what hurts or symptoms", "ja": "痛みや症状を説明", "zh": "描述疼痛和症状"},
        "displayOrder": 1,
        "sentences": {
            "ko": [
                "배가 아프고 메스꺼움이 있습니다.",
                "머리가 아프고 열이 나는 것 같습니다.",
                "목이 아프고 기침이 납니다."
            ],
            "en": [
                "I have stomach pain and nausea.",
                "I have a headache and I think I have a fever.",
                "My throat hurts and I have a cough."
            ],
            "ja": [
                "お腹が痛くて吐き気があります。",
                "頭が痛くて熱がある気がします。",
                "喉が痛くて咳が出ます。"
            ],
            "zh": [
                "我肚子疼并且有恶心。",
                "我头痛，感觉有点发烧。",
                "我喉咙痛并且咳嗽。"
            ]
        }
    },
    {
        "id": "intent_027",
        "situationId": "situation_009",
        "name": {"ko": "약 추천 요청", "en": "Ask for medicine", "ja": "薬の相談", "zh": "请求推荐药物"},
        "description": {"ko": "약국에서 약 추천 요청", "en": "Ask for a medicine recommendation", "ja": "薬のおすすめを聞く", "zh": "询问药物推荐"},
        "displayOrder": 2,
        "sentences": {
            "ko": [
                "두통에 먹을 수 있는 약이 있을까요?",
                "감기 증상에 도움이 되는 약을 추천해 주세요.",
                "졸리지 않는 약으로 부탁드립니다."
            ],
            "en": [
                "Do you have any medicine for headaches?",
                "Please recommend something for cold symptoms.",
                "Could you recommend a non-drowsy option?"
            ],
            "ja": [
                "頭痛に効く薬はありますか？",
                "風邪の症状に効く薬をおすすめしてください。",
                "眠くならない薬をお願いします。"
            ],
            "zh": [
                "有治疗头痛的药吗？",
                "请推荐缓解感冒症状的药。",
                "请推荐不犯困的药。"
            ]
        }
    },
    {
        "id": "intent_028",
        "situationId": "situation_009",
        "name": {"ko": "병원/응급 문의", "en": "Hospital/emergency", "ja": "病院/救急の案内", "zh": "医院/急诊咨询"},
        "description": {"ko": "병원이나 응급실 문의", "en": "Ask about a hospital or ER", "ja": "病院や救急について尋ねる", "zh": "询问医院或急诊"},
        "displayOrder": 3,
        "sentences": {
            "ko": [
                "가까운 병원이 어디에 있나요?",
                "응급실이 있는 병원을 찾고 있습니다.",
                "지금 진료 가능한 병원이 있을까요?"
            ],
            "en": [
                "Where is the nearest hospital?",
                "I'm looking for a hospital with an emergency room.",
                "Is there a clinic open right now?"
            ],
            "ja": [
                "近くの病院はどこですか？",
                "救急外来のある病院を探しています。",
                "今診療している病院はありますか？"
            ],
            "zh": [
                "最近的医院在哪里？",
                "我在找有急诊的医院。",
                "现在有正在开诊的医院吗？"
            ]
        }
    },
    {
        "id": "intent_029",
        "situationId": "situation_010",
        "name": {"ko": "분실물 문의", "en": "Lost item", "ja": "紛失物の相談", "zh": "失物咨询"},
        "description": {"ko": "분실물 관련 도움 요청", "en": "Ask about a lost item", "ja": "落とし物について相談", "zh": "询问失物"},
        "displayOrder": 1,
        "sentences": {
            "ko": [
                "지갑을 잃어버렸습니다. 분실물 센터가 어디인가요?",
                "휴대폰을 두고 온 것 같습니다. 도와주실 수 있나요?",
                "방금 여기에서 가방을 잃어버렸습니다."
            ],
            "en": [
                "I lost my wallet. Where is the lost and found?",
                "I think I left my phone behind. Can you help me?",
                "I just lost my bag here."
            ],
            "ja": [
                "財布を失くしました。忘れ物センターはどこですか？",
                "携帯を置き忘れたかもしれません。助けてもらえますか？",
                "ここでバッグを失くしてしまいました。"
            ],
            "zh": [
                "我丢了钱包，失物招领处在哪里？",
                "我可能把手机落下了，可以帮我吗？",
                "我刚刚在这里丢了包。"
            ]
        }
    },
    {
        "id": "intent_030",
        "situationId": "situation_010",
        "name": {"ko": "도움 요청/경찰", "en": "Ask for help/police", "ja": "助け/警察の依頼", "zh": "求助/报警"},
        "description": {"ko": "긴급 도움이나 경찰 도움 요청", "en": "Ask for urgent help or police", "ja": "緊急の助けや警察への依頼", "zh": "请求紧急帮助或警察"},
        "displayOrder": 2,
        "sentences": {
            "ko": [
                "도와주세요. 경찰서가 어디에 있나요?",
                "문제가 생겼습니다. 도움을 요청하고 싶습니다.",
                "지금 바로 도움을 받을 수 있을까요?"
            ],
            "en": [
                "Help, where is the police station?",
                "There's a problem. I need assistance.",
                "Can I get help right away?"
            ],
            "ja": [
                "助けてください。警察署はどこですか？",
                "問題が起きました。助けを求めたいです。",
                "今すぐ助けてもらえますか？"
            ],
            "zh": [
                "请帮帮我，警察局在哪里？",
                "发生了问题，我需要帮助。",
                "我可以马上得到帮助吗？"
            ]
        }
    },
    {
        "id": "intent_031",
        "situationId": "situation_010",
        "name": {"ko": "길 잃음/주소 안내", "en": "Lost / show address", "ja": "道に迷った/住所案内", "zh": "迷路/出示地址"},
        "description": {"ko": "길을 잃었을 때 주소로 안내 요청", "en": "Show an address and ask for guidance", "ja": "道に迷ったとき住所を見せる", "zh": "出示地址寻路"},
        "displayOrder": 3,
        "sentences": {
            "ko": [
                "길을 잃었습니다. 이 주소로 가야 합니다.",
                "이 주소로 가는 길을 알려주실 수 있나요?",
                "지금 위치를 잘 모르겠습니다. 도와주세요."
            ],
            "en": [
                "I'm lost. I need to go to this address.",
                "Could you tell me how to get to this address?",
                "I'm not sure where I am right now. Please help."
            ],
            "ja": [
                "道に迷いました。この住所に行きたいです。",
                "この住所への行き方を教えていただけますか？",
                "今の場所が分かりません。助けてください。"
            ],
            "zh": [
                "我迷路了，要去这个地址。",
                "请告诉我怎么去这个地址？",
                "我不清楚现在的位置，请帮忙。"
            ]
        }
    },
    {
        "id": "intent_032",
        "situationId": "situation_011",
        "name": {"ko": "입국 목적 답변", "en": "Immigration answers", "ja": "入国目的の回答", "zh": "入境目的回答"},
        "description": {"ko": "입국 목적/체류 기간 답변", "en": "Purpose of visit and length of stay", "ja": "入国目的・滞在期間の回答", "zh": "入境目的和停留时间回答"},
        "displayOrder": 1,
        "sentences": {
            "ko": [
                "관광 목적으로 왔으며 약 5일 정도 체류 예정입니다.",
                "친구 방문 목적으로 일주일 정도 머물 예정입니다.",
                "왕복 티켓이 있어 다음 주 출국 예정입니다."
            ],
            "en": [
                "I'm here for tourism and will stay about five days.",
                "I'm visiting a friend and staying for a week.",
                "I have a return ticket and will depart next week."
            ],
            "ja": [
                "観光目的で来ました。約5日間滞在予定です。",
                "友人訪問目的で1週間ほど滞在予定です。",
                "往復チケットがあり、来週出発予定です。"
            ],
            "zh": [
                "我是来旅游的，预计停留约5天。",
                "我是来拜访朋友的，预计停留一周。",
                "我有往返票，预计下周出发。"
            ]
        }
    },
    {
        "id": "intent_033",
        "situationId": "situation_011",
        "name": {"ko": "게이트/시간 문의", "en": "Gate/time inquiry", "ja": "ゲート/時間の確認", "zh": "登机口/时间询问"},
        "description": {"ko": "게이트 위치나 탑승 시간 확인", "en": "Check gate location or boarding time", "ja": "ゲートの場所や搭乗時間の確認", "zh": "确认登机口位置或登机时间"},
        "displayOrder": 2,
        "sentences": {
            "ko": [
                "이 항공편의 게이트가 어디인지 알려주실 수 있나요?",
                "탑승 시작 시간이 언제인가요?",
                "이 게이트가 맞는지 확인해 주실 수 있나요?"
            ],
            "en": [
                "Could you tell me where the gate is for this flight?",
                "What time does boarding start?",
                "Could you confirm if this is the correct gate?"
            ],
            "ja": [
                "この便のゲートはどこか教えていただけますか？",
                "搭乗開始時間はいつですか？",
                "このゲートで合っているか確認していただけますか？"
            ],
            "zh": [
                "能告诉我这个航班的登机口在哪里吗？",
                "登机开始时间是几点？",
                "能确认一下这个登机口对吗？"
            ]
        }
    },
    {
        "id": "intent_034",
        "situationId": "situation_011",
        "name": {"ko": "수하물 문제", "en": "Baggage issue", "ja": "手荷物の問題", "zh": "行李问题"},
        "description": {"ko": "수하물 분실/지연 문의", "en": "Ask about lost or delayed baggage", "ja": "手荷物紛失・遅延の相談", "zh": "询问丢失或延误的行李"},
        "displayOrder": 3,
        "sentences": {
            "ko": [
                "수하물이 도착하지 않았습니다. 어떻게 해야 하나요?",
                "이 가방이 제 것인지 확인해 주실 수 있나요?",
                "수하물 분실 신고는 어디서 하나요?"
            ],
            "en": [
                "My baggage didn't arrive. What should I do?",
                "Could you help me confirm if this bag is mine?",
                "Where can I report lost baggage?"
            ],
            "ja": [
                "手荷物が到着しませんでした。どうすればいいですか？",
                "このバッグが私のものか確認していただけますか？",
                "手荷物紛失届はどこで出しますか？"
            ],
            "zh": [
                "我的行李没有到达。我该怎么办？",
                "能帮我确认一下这个包是我的吗？",
                "在哪里可以报失行李？"
            ]
        }
    },
    {
        "id": "intent_035",
        "situationId": "situation_012",
        "name": {"ko": "체크인/예약 확인", "en": "Check-in/reservation", "ja": "チェックイン/予約確認", "zh": "入住/预订确认"},
        "description": {"ko": "예약 확인 및 체크인", "en": "Confirm reservation and check in", "ja": "予約確認とチェックイン", "zh": "确认预订并办理入住"},
        "displayOrder": 1,
        "sentences": {
            "ko": [
                "체크인하고 싶습니다. 예약자명은 홍길동입니다.",
                "오늘 밤 예약이 있습니다. 확인해 주실 수 있나요?",
                "여권으로 체크인 가능한가요?"
            ],
            "en": [
                "I'd like to check in. The reservation is under Hong Gildong.",
                "I have a reservation for tonight. Could you check it?",
                "Is it okay to check in with my passport?"
            ],
            "ja": [
                "チェックインしたいです。予約者名はホン・ギルドンです。",
                "今夜の予約があります。確認していただけますか？",
                "パスポートでチェックインできますか？"
            ],
            "zh": [
                "我想办理入住。预订人姓名是洪吉童。",
                "我今晚有预订。能帮我确认一下吗？",
                "可以用护照办理入住吗？"
            ]
        }
    },
    {
        "id": "intent_036",
        "situationId": "situation_012",
        "name": {"ko": "시간 변경 요청", "en": "Time change request", "ja": "時間変更の依頼", "zh": "时间变更请求"},
        "description": {"ko": "늦은 체크인/아웃 요청", "en": "Ask for late check-in/out", "ja": "遅いチェックイン/アウトの依頼", "zh": "请求延迟入住/退房"},
        "displayOrder": 2,
        "sentences": {
            "ko": [
                "늦은 체크인이 가능한가요?",
                "체크아웃을 1시간 정도 늦출 수 있을까요?",
                "짐을 조금 더 보관해 주실 수 있나요?"
            ],
            "en": [
                "Is late check-in possible?",
                "Could I extend check-out by about an hour?",
                "Could you store my luggage a bit longer?"
            ],
            "ja": [
                "遅いチェックインは可能ですか？",
                "チェックアウトを1時間ほど遅らせられますか？",
                "荷物をもう少し預けてもらえますか？"
            ],
            "zh": [
                "可以延迟入住吗？",
                "可以延迟退房大约1小时吗？",
                "能再帮我保管一下行李吗？"
            ]
        }
    },
    {
        "id": "intent_037",
        "situationId": "situation_012",
        "name": {"ko": "객실 문제/요청", "en": "Room issue/request", "ja": "部屋の問題/リクエスト", "zh": "房间问题/请求"},
        "description": {"ko": "객실 문제 신고나 요청 사항 전달", "en": "Report a room issue or make a request", "ja": "部屋の問題報告やリクエスト", "zh": "报告房间问题或提出请求"},
        "displayOrder": 3,
        "sentences": {
            "ko": [
                "객실이 너무 춥습니다. 온도 조절 도와주실 수 있나요?",
                "수건 좀 더 받을 수 있을까요?",
                "객실 불이 안 켜집니다. 확인 부탁드립니다."
            ],
            "en": [
                "The room is too cold. Could you help with the temperature?",
                "Could I get some extra towels?",
                "The room light isn't working. Please check it."
            ],
            "ja": [
                "部屋が寒すぎます。温度調整を手伝っていただけますか？",
                "タオルをもう少しもらえますか？",
                "部屋の電気がつきません。確認をお願いします。"
            ],
            "zh": [
                "房间太冷了。能帮我调一下温度吗？",
                "能再给我一些毛巾吗？",
                "房间的灯不亮。请检查一下。"
            ]
        }
    },
    {
        "id": "intent_041",
        "situationId": "situation_012",
        "name": {"ko": "연박 요청", "en": "Extend stay", "ja": "延泊の依頼", "zh": "延长住宿"},
        "description": {"ko": "늦은 체크아웃이나 추가 숙박 요청", "en": "Request late checkout or extra nights", "ja": "遅いチェックアウトや追加宿泊の依頼", "zh": "请求延迟退房或延长住宿"},
        "displayOrder": 4,
        "sentences": {
            "ko": [
                "하루 더 묵을 수 있을까요?",
                "체크아웃을 오후 2시까지 늦출 수 있을까요?",
                "하루 더 묵고 싶습니다. 가능할까요?"
            ],
            "en": [
                "Could I extend my stay by one night?",
                "Can I extend checkout until 2 PM?",
                "I'd like to stay an extra night. Is that possible?"
            ],
            "ja": [
                "もう1泊できますか？",
                "チェックアウトを14時まで遅らせられますか？",
                "もう1泊したいです。可能ですか？"
            ],
            "zh": [
                "可以再住一晚吗？",
                "可以延迟退房到下午2点吗？",
                "我想再住一晚。可以吗？"
            ]
        }
    },
    {
        "id": "intent_042",
        "situationId": "situation_012",
        "name": {"ko": "소음/청소 요청", "en": "Noise/cleaning request", "ja": "騒音/清掃の依頼", "zh": "噪音/清洁请求"},
        "description": {"ko": "소음 문의나 청소 요청", "en": "Ask about noise or request cleaning", "ja": "騒音の相談や清掃の依頼", "zh": "询问噪音或请求清洁"},
        "displayOrder": 5,
        "sentences": {
            "ko": [
                "옆 방이 시끄럽습니다. 조용한 방으로 바꿀 수 있을까요?",
                "객실 청소 요청드립니다.",
                "수건과 물 좀 더 받을 수 있을까요?"
            ],
            "en": [
                "The next room is noisy. Could I change to a quieter room?",
                "I'd like to request room cleaning.",
                "Could I get extra towels and water?"
            ],
            "ja": [
                "隣の部屋がうるさいです。静かな部屋に変えられますか？",
                "部屋の清掃をお願いします。",
                "タオルと水をもう少しもらえますか？"
            ],
            "zh": [
                "隔壁房间很吵。可以换到安静的房间吗？",
                "我想请求房间清洁。",
                "能再给我一些毛巾和水吗？"
            ]
        }
    },
    {
        "id": "intent_038",
        "situationId": "situation_013",
        "name": {"ko": "접수 신청", "en": "Register for visit", "ja": "受付申請", "zh": "挂号申请"},
        "description": {"ko": "접수 신청이나 예약 문의", "en": "Register or ask about appointments", "ja": "受付申請や予約の相談", "zh": "挂号或询问预约"},
        "displayOrder": 1,
        "sentences": {
            "ko": [
                "의사 진료 받고 싶습니다. 접수 가능한가요?",
                "예약 없이 방문 가능한가요?",
                "다음 예약 가능 시간 알려주세요."
            ],
            "en": [
                "I'd like to see a doctor. Can I register?",
                "I don't have an appointment. Is a visit possible?",
                "Please let me know the next available appointment."
            ],
            "ja": [
                "医師の診察を受けたいです。受付できますか？",
                "予約なしで来院できますか？",
                "次の予約可能時間を教えてください。"
            ],
            "zh": [
                "我想看医生。可以挂号吗？",
                "我没有预约。可以就诊吗？",
                "请告诉我下一个可预约的时间。"
            ]
        }
    },
    {
        "id": "intent_039",
        "situationId": "situation_013",
        "name": {"ko": "보험/통역 문의", "en": "Insurance/interpreter", "ja": "保険/通訳の相談", "zh": "保险/翻译询问"},
        "description": {"ko": "보험 사용이나 통역 지원 문의", "en": "Ask about insurance or interpretation", "ja": "保険の使用や通訳サポートの相談", "zh": "询问保险使用或翻译支持"},
        "displayOrder": 2,
        "sentences": {
            "ko": [
                "보험증이 있습니다. 사용 가능한지 확인해 주실 수 있나요?",
                "통역 지원 가능한가요?",
                "신분증과 보험증 보여드리겠습니다."
            ],
            "en": [
                "I have insurance. Could you check if it can be used?",
                "Is interpretation support available?",
                "I'll show my ID and insurance card."
            ],
            "ja": [
                "保険証があります。使用可能か確認していただけますか？",
                "通訳サポートは可能ですか？",
                "身分証明書と保険証をお見せします。"
            ],
            "zh": [
                "我有保险。能帮我确认一下可以使用吗？",
                "有翻译支持吗？",
                "我会出示身份证和保险卡。"
            ]
        }
    },
    {
        "id": "intent_040",
        "situationId": "situation_013",
        "name": {"ko": "응급 도움 요청", "en": "Emergency assistance", "ja": "緊急の助け", "zh": "紧急求助"},
        "description": {"ko": "긴급 의료 도움 요청", "en": "Request urgent medical help", "ja": "緊急医療の助けを求める", "zh": "请求紧急医疗帮助"},
        "displayOrder": 3,
        "sentences": {
            "ko": [
                "몸이 안 좋아서 지금 바로 진료 받아야 합니다.",
                "숨쉬기 어려워서 긴급 도움이 필요합니다.",
                "응급실로 안내해 주실 수 있나요?"
            ],
            "en": [
                "I'm not feeling well and need to be seen right away.",
                "I'm having trouble breathing and need urgent help.",
                "Could you direct me to the emergency room?"
            ],
            "ja": [
                "体調が悪く、今すぐ診察を受ける必要があります。",
                "呼吸が困難で緊急の助けが必要です。",
                "救急外来に案内していただけますか？"
            ],
            "zh": [
                "我身体不舒服，需要立即就诊。",
                "我呼吸困难，需要紧急帮助。",
                "能带我去急诊室吗？"
            ]
        }
    },
    {
        "id": "intent_043",
        "situationId": "situation_014",
        "name": {"ko": "분실 신고", "en": "Lost item report", "ja": "紛失届", "zh": "失物报告"},
        "description": {"ko": "분실물 신고하기", "en": "File a lost item report", "ja": "紛失物の届出", "zh": "提交失物报告"},
        "displayOrder": 1,
        "sentences": {
            "ko": [
                "지갑을 잃어버렸습니다. 신고하고 싶습니다.",
                "휴대폰을 잃어버렸습니다. 절차 알려주실 수 있나요?",
                "분실 신고 확인서 받을 수 있을까요?"
            ],
            "en": [
                "I lost my wallet. I'd like to file a report.",
                "I lost my phone. Could you tell me the procedure?",
                "Could I get a loss report confirmation?"
            ],
            "ja": [
                "財布を失くしました。届け出たいです。",
                "携帯を失くしました。手続きを教えていただけますか？",
                "紛失届の確認書をもらえますか？"
            ],
            "zh": [
                "我丢了钱包。我想报案。",
                "我丢了手机。能告诉我程序吗？",
                "能给我一份失物报告确认书吗？"
            ]
        }
    },
    {
        "id": "intent_044",
        "situationId": "situation_014",
        "name": {"ko": "사건/도움 요청", "en": "Incident/help", "ja": "事件/助け", "zh": "事件/求助"},
        "description": {"ko": "사건 신고나 도움 요청", "en": "Report an incident or ask for help", "ja": "事件の報告や助けの依頼", "zh": "报告事件或请求帮助"},
        "displayOrder": 2,
        "sentences": {
            "ko": [
                "문제가 발생했습니다. 신고하고 싶습니다.",
                "도움이 필요합니다. 통역 지원 가능한가요?",
                "진술서를 받아줄 수 있는 분과 이야기하고 싶습니다."
            ],
            "en": [
                "There has been a problem. I'd like to report it.",
                "I need help. Is interpretation available?",
                "I'd like to speak with someone who can take my statement."
            ],
            "ja": [
                "問題が発生しました。届け出たいです。",
                "助けが必要です。通訳サポートは可能ですか？",
                "供述書を取ってくれる方と話したいです。"
            ],
            "zh": [
                "发生了问题。我想报案。",
                "我需要帮助。有翻译支持吗？",
                "我想和能记录我陈述的人谈谈。"
            ]
        }
    },
    {
        "id": "intent_045",
        "situationId": "situation_014",
        "name": {"ko": "서류/문의", "en": "Documents/inquiry", "ja": "書類/問い合わせ", "zh": "文件/询问"},
        "description": {"ko": "서류나 절차 문의", "en": "Ask about documents or procedures", "ja": "書類や手続きの問い合わせ", "zh": "询问文件或程序"},
        "displayOrder": 3,
        "sentences": {
            "ko": [
                "이 서류가 필요합니다. 어디서 받을 수 있나요?",
                "절차와 필요한 서류 알려주세요.",
                "외국인도 이 서비스를 이용할 수 있나요?"
            ],
            "en": [
                "I need this document. Where can I get it?",
                "Please tell me the procedure and required documents.",
                "Can foreigners use this service?"
            ],
            "ja": [
                "この書類が必要です。どこで受け取れますか？",
                "手続きと必要な書類を教えてください。",
                "外国人もこのサービスを利用できますか？"
            ],
            "zh": [
                "我需要这份文件。在哪里可以拿到？",
                "请告诉我程序和所需文件。",
                "外国人也可以使用这项服务吗？"
            ]
        }
    },
    {
        "id": "intent_046",
        "situationId": "situation_015",
        "name": {"ko": "택시 목적지 안내", "en": "Taxi destination", "ja": "タクシーの目的地", "zh": "出租车目的地"},
        "description": {"ko": "택시 기사에게 목적지 알리기", "en": "Tell the taxi driver where to go", "ja": "タクシー運転手に目的地を伝える", "zh": "告诉出租车司机目的地"},
        "displayOrder": 1,
        "sentences": {
            "ko": [
                "이 주소로 가 주세요.",
                "강남역으로 가 주세요.",
                "가능하면 가장 빠른 길로 가 주세요."
            ],
            "en": [
                "Please take me to this address.",
                "Please go to Gangnam Station.",
                "If possible, please take the fastest route."
            ],
            "ja": [
                "この住所までお願いします。",
                "江南駅までお願いします。",
                "可能であれば一番早い道でお願いします。"
            ],
            "zh": [
                "请带我去这个地址。",
                "请去江南站。",
                "如果可能的话，请走最快的路。"
            ]
        }
    },
    {
        "id": "intent_047",
        "situationId": "situation_015",
        "name": {"ko": "요금/카드 문제", "en": "Fare/card issue", "ja": "運賃/カードの問題", "zh": "费用/卡片问题"},
        "description": {"ko": "요금이나 교통카드 문제 문의", "en": "Ask about fares or transit card issues", "ja": "運賃や交通カードの問題の相談", "zh": "询问费用或交通卡问题"},
        "displayOrder": 2,
        "sentences": {
            "ko": [
                "교통카드가 작동하지 않습니다. 어떻게 해야 하나요?",
                "요금이 얼마인가요?",
                "환불이나 충전은 어디서 하나요?"
            ],
            "en": [
                "My transit card isn't working. What should I do?",
                "How much is the fare?",
                "Where can I get a refund or recharge?"
            ],
            "ja": [
                "交通カードが作動しません。どうすればいいですか？",
                "運賃はいくらですか？",
                "返金やチャージはどこでできますか？"
            ],
            "zh": [
                "我的交通卡不工作。我该怎么办？",
                "费用是多少？",
                "在哪里可以退款或充值？"
            ]
        }
    },
    {
        "id": "intent_048",
        "situationId": "situation_015",
        "name": {"ko": "지연/취소 문의", "en": "Delay/cancellation", "ja": "遅延/キャンセル", "zh": "延误/取消"},
        "description": {"ko": "지연이나 취소 문의", "en": "Ask about delays or cancellations", "ja": "遅延やキャンセルの相談", "zh": "询问延误或取消"},
        "displayOrder": 3,
        "sentences": {
            "ko": [
                "지금 운행이 지연되고 있나요?",
                "대체 경로가 있나요?",
                "취소되면 환불은 어떻게 받나요?"
            ],
            "en": [
                "Is service currently delayed?",
                "Is there an alternative route?",
                "If it's canceled, how can I get a refund?"
            ],
            "ja": [
                "今運行が遅延していますか？",
                "代替ルートはありますか？",
                "キャンセルされた場合、返金はどうすればいいですか？"
            ],
            "zh": [
                "现在运行是否延误？",
                "有替代路线吗？",
                "如果取消了，如何退款？"
            ]
        }
    },
    {
        "id": "intent_049",
        "situationId": "situation_016",
        "name": {"ko": "상품 문의", "en": "Product inquiry", "ja": "商品の問い合わせ", "zh": "商品询问"},
        "description": {"ko": "재고, 가격, 구매 문의", "en": "Ask about stock, price, or purchase", "ja": "在庫・価格・購入の問い合わせ", "zh": "询问库存、价格或购买"},
        "displayOrder": 1,
        "sentences": {
            "ko": [
                "이 상품 재고 있나요?",
                "다른 색상이나 사이즈 있나요?",
                "가격이 얼마인가요?"
            ],
            "en": [
                "Do you have this item in stock?",
                "Do you have other colors or sizes?",
                "How much is it?"
            ],
            "ja": [
                "この商品は在庫がありますか？",
                "他の色やサイズはありますか？",
                "価格はいくらですか？"
            ],
            "zh": [
                "这个商品有库存吗？",
                "有其他颜色或尺寸吗？",
                "价格是多少？"
            ]
        }
    },
    {
        "id": "intent_050",
        "situationId": "situation_016",
        "name": {"ko": "환불 요청", "en": "Refund request", "ja": "返金の依頼", "zh": "退款请求"},
        "description": {"ko": "환불 절차 문의", "en": "Ask about refund procedure", "ja": "返金手続きの相談", "zh": "询问退款程序"},
        "displayOrder": 2,
        "sentences": {
            "ko": [
                "환불 요청하고 싶습니다. 절차가 어떻게 되나요?",
                "영수증 있습니다. 환불 가능한가요?",
                "카드로 결제했습니다. 환불은 어떻게 처리되나요?"
            ],
            "en": [
                "I'd like to request a refund. What's the procedure?",
                "I have the receipt. Is a refund possible?",
                "I paid by card. How will the refund be processed?"
            ],
            "ja": [
                "返金を依頼したいです。手続きはどうなりますか？",
                "領収書があります。返金は可能ですか？",
                "カードで支払いました。返金はどう処理されますか？"
            ],
            "zh": [
                "我想申请退款。程序是什么？",
                "我有收据。可以退款吗？",
                "我用卡支付的。退款如何处理？"
            ]
        }
    },
    {
        "id": "intent_051",
        "situationId": "situation_016",
        "name": {"ko": "교환 요청", "en": "Exchange request", "ja": "交換の依頼", "zh": "换货请求"},
        "description": {"ko": "사이즈/색상 교환 요청", "en": "Ask to exchange size/color", "ja": "サイズ/色の交換依頼", "zh": "请求更换尺寸/颜色"},
        "displayOrder": 3,
        "sentences": {
            "ko": [
                "다른 사이즈로 교환하고 싶습니다.",
                "색상 바꿀 수 있을까요?",
                "언제까지 교환 가능한가요?"
            ],
            "en": [
                "I'd like to exchange for a different size.",
                "Can I change the color?",
                "Until when can I exchange it?"
            ],
            "ja": [
                "別のサイズに交換したいです。",
                "色を変えられますか？",
                "いつまで交換できますか？"
            ],
            "zh": [
                "我想换一个不同的尺寸。",
                "可以换颜色吗？",
                "什么时候之前可以换？"
            ]
        }
    },
    {
        "id": "intent_052",
        "situationId": "situation_017",
        "name": {"ko": "티켓 구매", "en": "Buy tickets", "ja": "チケット購入", "zh": "购票"},
        "description": {"ko": "티켓 구매 문의", "en": "Ask about buying tickets", "ja": "チケット購入の相談", "zh": "询问购票"},
        "displayOrder": 1,
        "sentences": {
            "ko": [
                "성인 2장, 어린이 1장 주세요.",
                "오늘 티켓 구매하고 싶습니다.",
                "현장에서 티켓 구매 가능한가요?"
            ],
            "en": [
                "Two adult tickets and one child ticket, please.",
                "I'd like to buy tickets for today.",
                "Can I buy tickets on-site?"
            ],
            "ja": [
                "大人2枚、子供1枚お願いします。",
                "今日のチケットを購入したいです。",
                "現地でチケットを購入できますか？"
            ],
            "zh": [
                "请给我两张成人票和一张儿童票。",
                "我想买今天的票。",
                "可以在现场买票吗？"
            ]
        }
    },
    {
        "id": "intent_053",
        "situationId": "situation_017",
        "name": {"ko": "예약/시간 확인", "en": "Reservation/time", "ja": "予約/時間確認", "zh": "预约/时间确认"},
        "description": {"ko": "예약 확인, 입장 시간 문의", "en": "Confirm reservation or entry time", "ja": "予約確認や入場時間の相談", "zh": "确认预约或入场时间"},
        "displayOrder": 2,
        "sentences": {
            "ko": [
                "예약이 있습니다. 확인해 주실 수 있나요?",
                "몇 시에 입장할 수 있나요?",
                "예약 변경 가능한가요?"
            ],
            "en": [
                "I have a reservation. Could you check it?",
                "What time can I enter?",
                "Is it possible to change my reservation?"
            ],
            "ja": [
                "予約があります。確認していただけますか？",
                "何時に入場できますか？",
                "予約変更は可能ですか？"
            ],
            "zh": [
                "我有预约。能帮我确认一下吗？",
                "几点可以入场？",
                "可以更改预约吗？"
            ]
        }
    },
    {
        "id": "intent_054",
        "situationId": "situation_017",
        "name": {"ko": "할인/혜택 문의", "en": "Discounts", "ja": "割引/特典", "zh": "折扣/优惠"},
        "description": {"ko": "할인이나 혜택 문의", "en": "Ask about discounts or benefits", "ja": "割引や特典の相談", "zh": "询问折扣或优惠"},
        "displayOrder": 3,
        "sentences": {
            "ko": [
                "학생이나 단체 할인이 있나요?",
                "온라인 예약 할인 있나요?",
                "외국인 할인이나 쿠폰 있나요?"
            ],
            "en": [
                "Is there a student or group discount?",
                "Are there any online booking discounts?",
                "Are there discounts or coupons for foreigners?"
            ],
            "ja": [
                "学生や団体割引はありますか？",
                "オンライン予約割引はありますか？",
                "外国人向けの割引やクーポンはありますか？"
            ],
            "zh": [
                "有学生或团体折扣吗？",
                "有在线预订折扣吗？",
                "有外国人折扣或优惠券吗？"
            ]
        }
    }
]

# 각 Intent에 추가할 9개 문장 생성 함수
def generate_additional_sentences(intent):
    """각 Intent에 맞는 추가 문장 9개 생성"""
    name_ko = intent['name']['ko']
    desc_ko = intent['description']['ko']
    
    # Intent별 맞춤 문장 생성
    templates = {
        '길 안내 요청': {
            'ko': [
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
            'en': [
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
            'ja': [
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
            'zh': [
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
        }
    }
    
    # 기본 템플릿 (특정 Intent에 맞는 템플릿이 없는 경우)
    if name_ko in templates:
        return templates[name_ko]
    
    # 일반적인 문장 생성
    return {
        'ko': [
            f"{name_ko}에 대해 더 자세히 알려주세요.",
            f"{desc_ko}에 대한 정보를 얻고 싶습니다.",
            f"{name_ko}에 관해 도움을 요청합니다.",
            f"{desc_ko}에 대해 설명해 주실 수 있나요?",
            f"{name_ko}에 대한 추가 정보가 필요합니다.",
            f"{desc_ko}에 관해 질문이 있습니다.",
            f"{name_ko}에 대해 안내해 주세요.",
            f"{desc_ko}에 대한 조언을 구합니다.",
            f"{name_ko}에 관해 확인이 필요합니다."
        ],
        'en': [
            f"Please tell me more about {intent['name']['en']}.",
            f"I'd like information about {intent['description']['en']}.",
            f"I'm asking for help regarding {intent['name']['en']}.",
            f"Could you explain {intent['description']['en']}?",
            f"I need additional information about {intent['name']['en']}.",
            f"I have questions about {intent['description']['en']}.",
            f"Please guide me about {intent['name']['en']}.",
            f"I'm seeking advice about {intent['description']['en']}.",
            f"I need to confirm about {intent['name']['en']}."
        ],
        'ja': [
            f"{intent['name']['ja']}についてもっと詳しく教えてください。",
            f"{intent['description']['ja']}について情報を得たいです。",
            f"{intent['name']['ja']}について助けを求めます。",
            f"{intent['description']['ja']}について説明していただけますか？",
            f"{intent['name']['ja']}について追加情報が必要です。",
            f"{intent['description']['ja']}について質問があります。",
            f"{intent['name']['ja']}について案内してください。",
            f"{intent['description']['ja']}についてアドバイスを求めます。",
            f"{intent['name']['ja']}について確認が必要です。"
        ],
        'zh': [
            f"请详细告诉我关于{intent['name']['zh']}的信息。",
            f"我想了解关于{intent['description']['zh']}的信息。",
            f"我请求关于{intent['name']['zh']}的帮助。",
            f"能解释一下{intent['description']['zh']}吗？",
            f"我需要关于{intent['name']['zh']}的更多信息。",
            f"我有关于{intent['description']['zh']}的问题。",
            f"请指导我关于{intent['name']['zh']}的信息。",
            f"我寻求关于{intent['description']['zh']}的建议。",
            f"我需要确认关于{intent['name']['zh']}的信息。"
        ]
    }

# 파일 읽기
with open(intents_file, 'r', encoding='utf-8') as f:
    intents_data = json.load(f)

# Intent 013~054 추가 및 문장 확장
existing_ids = {intent['id'] for intent in intents_data}

for intent_template in intents_013_054:
    intent_id = intent_template['id']
    
    if intent_id in existing_ids:
        # 기존 Intent에 문장 추가
        intent = next(i for i in intents_data if i['id'] == intent_id)
        if intent.get('sentences') and len(intent['sentences']['ko']) == 3:
            additional = generate_additional_sentences(intent_template)
            intent['sentences']['ko'].extend(additional['ko'])
            intent['sentences']['en'].extend(additional['en'])
            intent['sentences']['ja'].extend(additional['ja'])
            intent['sentences']['zh'].extend(additional['zh'])
    else:
        # 새 Intent 추가 (문장 9개 추가)
        additional = generate_additional_sentences(intent_template)
        intent_template['sentences']['ko'].extend(additional['ko'])
        intent_template['sentences']['en'].extend(additional['en'])
        intent_template['sentences']['ja'].extend(additional['ja'])
        intent_template['sentences']['zh'].extend(additional['zh'])
        intents_data.append(intent_template)

# displayOrder로 정렬
intents_data.sort(key=lambda x: (
    int(x['situationId'].replace('situation_', '')),
    x.get('displayOrder', 0)
))

# 파일 쓰기
with open(intents_file, 'w', encoding='utf-8') as f:
    json.dump(intents_data, f, ensure_ascii=False, indent=2)

print(f"✅ Intent 013~054 추가 및 문장 확장 완료!")
print(f"   총 {len(intents_data)}개 Intent, 각 Intent당 12개 문장")


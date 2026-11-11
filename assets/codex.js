/* 《影之刃零 · 武典》首领录 — 游戏内 BOSS 战绩 75 条
 * 口径：按血条称号计条目，对应小黑盒「BOSS战绩 全部难度 X/75」。
 * 名单来源：phantombladezero.th.gl《All Bosses by Chapter》（直接取自游戏数据，74 条）
 *          + All Things How《All 74 Bosses in Order》单列的挑战裂隙「异相三面人偶」。
 * 两站各 74 条、各缺其一：th.gl 单列「断魂山 ·「组织」冥主：左殇（银发）」，ATH 单列「三张脸的诡异魔偶」，
 * 并集恰为 75 条，与游戏内战绩数一致。
 * 等级 / 残尘取自 th.gl；HP 为 PATHBREAKER（破局者）难度，取自 All Things How。
 * link 为本页「按遭遇」视图的 61 场编号，可一键跳到对应配装详解。
 * 「形态」类为同一场战斗的额外血条标题，非独立遭遇；中文称号部分为暂译，以游戏内为准。
 */
(function () {
  "use strict";
  const D = window.PBZ;
  if (!D) return;
  D.codex = [
  {
    "no": 1,
    "ch": "序章",
    "name": "少年左殇",
    "en": "Zuo Shang",
    "lv": "",
    "hp": "2900",
    "dust": "",
    "drop": "无（教学战）",
    "cat": "剧情战",
    "link": [
      1
    ],
    "note": "序章教学战，HP 未打空即过场，不计奖励。"
  },
  {
    "no": 2,
    "ch": "序章",
    "name": "「组织」冥主：左殇",
    "en": "Zuo Shang, the Order's Shadow Sovereign",
    "lv": "",
    "hp": "8000",
    "dust": "",
    "drop": "无（剧情战）",
    "cat": "剧情战",
    "link": [
      1
    ],
    "note": "序章对决，血条打空前进入过场；与断魂山的「左殇（银发）」条目分属两处血条称号。"
  },
  {
    "no": 3,
    "ch": "序章",
    "name": "「组织」猎杀者：追命",
    "en": "The Hunt, Hunter of the Order",
    "lv": "",
    "hp": "8000",
    "dust": "",
    "drop": "无（剧情战）",
    "cat": "剧情战",
    "link": [
      2
    ],
    "note": "马车上的初战，过场结束；大瀑布的第二战另计一条。"
  },
  {
    "no": 4,
    "ch": "悲泣溪谷",
    "name": "痴狂暴徒：残钢",
    "en": "Jagged Steel, the Frenzied Brute",
    "lv": "2 / 18",
    "hp": "8280 / 69768",
    "dust": "6600",
    "drop": "残钢刃 · 榕树之心",
    "cat": "主线",
    "link": [
      3
    ],
    "note": "两种等级对应初见与后期复见。"
  },
  {
    "no": 5,
    "ch": "悲泣溪谷",
    "name": "斧老大：彭猛",
    "en": "Peng Meng, the Axemaster",
    "lv": "3",
    "hp": "18720",
    "dust": "9000",
    "drop": "巨凶斧 · 「四斧」案卷",
    "cat": "主线",
    "link": [
      5
    ],
    "note": "巨凶斧用于开铁链门。"
  },
  {
    "no": 6,
    "ch": "悲泣溪谷",
    "name": "追命：六绝凶镰",
    "en": "The Hunt, Sixfold Scythe",
    "lv": "4",
    "hp": "20645",
    "dust": "20000",
    "drop": "追命锁镰",
    "cat": "主线",
    "link": [
      7
    ],
    "note": "大瀑布决战，第二形态与序章初战分计两条战绩。"
  },
  {
    "no": 7,
    "ch": "悲泣溪谷",
    "name": "新娘阿花",
    "en": "Hua, Deadly Betrothed",
    "lv": "3",
    "hp": "21060",
    "dust": "9000",
    "drop": "红妆鬼斩 · 血肉花",
    "cat": "隐藏",
    "link": [
      6
    ],
    "note": "第一座杀气塔下的隐藏首领。"
  },
  {
    "no": 8,
    "ch": "悲泣溪谷",
    "name": "活人偶清道夫",
    "en": "The Puppet Scavenger",
    "lv": "23",
    "hp": "155200",
    "dust": "150000",
    "drop": "合金镰刃 · 水晶人偶眼（阳）",
    "cat": "隐藏",
    "link": [
      51
    ],
    "note": "与寒岁同场；遭遇视图合为一场，战绩分两条。"
  },
  {
    "no": 9,
    "ch": "悲泣溪谷",
    "name": "灭法之法：寒岁",
    "en": "Acolyte Hansui",
    "lv": "23",
    "hp": "62080",
    "dust": "90000",
    "drop": "寒岁霜面具",
    "cat": "隐藏",
    "link": [
      51
    ],
    "note": "面具为幻术琵琶／湖心秘密链部件。"
  },
  {
    "no": 10,
    "ch": "悲泣溪谷",
    "name": "金面人（龙柱试炼）",
    "en": "The Gold-Masked One",
    "lv": "10",
    "hp": "48560",
    "dust": "28000",
    "drop": "反击护腕 · 神奇刀鞘 · 烈焰握 · 混沌铁片 I",
    "cat": "可选",
    "link": [
      8,
      12,
      42,
      52
    ],
    "note": "五次龙柱试炼共用同一血条称号，战绩只计 1 条；按遭遇则拆为 4 场。"
  },
  {
    "no": 11,
    "ch": "悲泣溪谷",
    "name": "暗魔天堡之主：魔渊",
    "en": "Mó Yuan, Leader of the Bastion of Mó",
    "lv": "26",
    "hp": "223200",
    "dust": "",
    "drop": "暗魔天堡堡主面具",
    "cat": "隐藏",
    "link": [
      56
    ],
    "note": "第五次龙柱试炼终局；早期媒体误记为最终 Boss。"
  },
  {
    "no": 12,
    "ch": "挑战裂隙",
    "name": "三张脸的诡异魔偶",
    "en": "Aberrant Three-Faced Puppet",
    "lv": "15",
    "hp": "88830",
    "dust": "",
    "drop": "三头人偶",
    "cat": "隐藏",
    "link": [
      4
    ],
    "note": "All Things How 单列此条；th.gl 以「卅四号扭曲人偶 · 玉琮」记同一掉落，两站 74 条清单各缺其一，并集恰为 75 条。与玉琮是否同一场双标题存疑，以游戏内血条标题为准。"
  },
  {
    "no": 13,
    "ch": "血色森林",
    "name": "剑痴：花千笑",
    "en": "Hua Qianxiao, the Sword Fanatic",
    "lv": "5",
    "hp": "27288",
    "dust": "13800",
    "drop": "痴者残剑",
    "cat": "主线",
    "link": [
      9
    ],
    "note": ""
  },
  {
    "no": 14,
    "ch": "血色森林",
    "name": "拳痴：铁狂",
    "en": "Stone Hand Iron Fever",
    "lv": "6 / 11",
    "hp": "33062 / 56610",
    "dust": "14400",
    "drop": "铁拳套 · 榕树之心",
    "cat": "主线",
    "link": [
      11
    ],
    "note": ""
  },
  {
    "no": 15,
    "ch": "血色森林",
    "name": "亡命徒：荆野",
    "en": "Jing Ye, the Outlaw",
    "lv": "6",
    "hp": "44083",
    "dust": "14400",
    "drop": "亡命斩马刀 · 榕树之心",
    "cat": "主线",
    "link": [
      10
    ],
    "note": "「见习医师」异闻需在开打前完成。"
  },
  {
    "no": 16,
    "ch": "血色森林",
    "name": "双蛇夫人：白赤练",
    "en": "Bai Chilian, Lady of the Twin Serpents",
    "lv": "6",
    "hp": "29389",
    "dust": "",
    "drop": "无",
    "cat": "主线",
    "link": [
      13
    ],
    "note": "第一血条；两条称号各计 1 条战绩。"
  },
  {
    "no": 17,
    "ch": "血色森林",
    "name": "白赤练：献祭之蛇",
    "en": "Bai Chilian, the Sacrificial Serpent",
    "lv": "6",
    "hp": "33062",
    "dust": "24000",
    "drop": "白蟒赤练 · 共鸣符 · 破碎幻术琵琶",
    "cat": "形态",
    "link": [
      13
    ],
    "note": "同一场战斗的第二血条标题。"
  },
  {
    "no": 18,
    "ch": "血色森林",
    "name": "卅四号·混沌魔偶：「玉琮」",
    "en": "Yucong, No. 34 Twisted Puppet",
    "lv": "25",
    "hp": "185100",
    "dust": "",
    "drop": "刺骨混沌 · 三头人偶",
    "cat": "隐藏",
    "link": [
      14
    ],
    "note": "四玉偶之一；与三个属性形态各占一条战绩。"
  },
  {
    "no": 19,
    "ch": "血色森林",
    "name": "「玉琮」：钢刃",
    "en": "Steel Yucong",
    "lv": "25",
    "hp": "111060",
    "dust": "",
    "drop": "刺骨混沌 · 混沌铁片 II",
    "cat": "形态",
    "link": [
      14
    ],
    "note": "需雪天返回缚丝巨树触发。"
  },
  {
    "no": 20,
    "ch": "血色森林",
    "name": "「玉琮」：寒冰",
    "en": "Frost Yucong",
    "lv": "25",
    "hp": "111060",
    "dust": "",
    "drop": "刺骨混沌 · 混沌铁片 II",
    "cat": "形态",
    "link": [
      14
    ],
    "note": "与钢／混沌形态共用一个奖励池。"
  },
  {
    "no": 21,
    "ch": "血色森林",
    "name": "「玉琮」：混沌",
    "en": "Chaos Yucong",
    "lv": "25",
    "hp": "111060",
    "dust": "",
    "drop": "刺骨混沌 · 混沌铁片 II",
    "cat": "形态",
    "link": [
      14
    ],
    "note": "与钢／霜形态共用一个奖励池。"
  },
  {
    "no": 22,
    "ch": "陆家村",
    "name": "守门人拙壁",
    "en": "Zhuo Bi, the Gatekeeper",
    "lv": "7",
    "hp": "41800",
    "dust": "15000",
    "drop": "拙壁盾",
    "cat": "主线",
    "link": [
      15
    ],
    "note": ""
  },
  {
    "no": 23,
    "ch": "陆家村",
    "name": "苦叶寺：碧海大师残躯",
    "en": "Master Bi Hai of Kuye Temple",
    "lv": "8",
    "hp": "37520",
    "dust": "15600",
    "drop": "苦叶寺珠串",
    "cat": "主线",
    "link": [
      17
    ],
    "note": ""
  },
  {
    "no": 24,
    "ch": "陆家村",
    "name": "天玄派：毕远掌门残躯",
    "en": "Master Bi Yuan of the Tianxuan Sect",
    "lv": "7 / 11",
    "hp": "41800 / 62900",
    "dust": "15000",
    "drop": "天玄青铜剑 · 榕树之心",
    "cat": "主线",
    "link": [
      16
    ],
    "note": ""
  },
  {
    "no": 25,
    "ch": "陆家村",
    "name": "三号·乐师偶：「玉瓒」",
    "en": "Yuzan, No. 3 Musician Puppet",
    "lv": "9",
    "hp": "52100",
    "dust": "16200",
    "drop": "催心琵琶",
    "cat": "主线",
    "link": [
      20
    ],
    "note": "幻术琵琶部件链之一。"
  },
  {
    "no": 26,
    "ch": "陆家村",
    "name": "灭法之法：炎茹",
    "en": "Acolyte Yanru",
    "lv": "8",
    "hp": "42210",
    "dust": "15600",
    "drop": "炎茹烈焰面具",
    "cat": "可选",
    "link": [
      19
    ],
    "note": "稻草人召唤的四护法之一。"
  },
  {
    "no": 27,
    "ch": "陆家村",
    "name": "操偶师：荡秽",
    "en": "Dusk, the Puppeteer",
    "lv": "9",
    "hp": "62520",
    "dust": "16200",
    "drop": "操偶铃铛 · 幻术琵琶琴头",
    "cat": "可选",
    "link": [
      18
    ],
    "note": "需集齐蓝萤火记忆之花解除结界。"
  },
  {
    "no": 28,
    "ch": "陆家村",
    "name": "「组织」少主：沐小葵",
    "en": "Mu Xiaokui, Young Mistress of the Order",
    "lv": "9",
    "hp": "46890",
    "dust": "",
    "drop": "无",
    "cat": "主线",
    "link": [
      21
    ],
    "note": "少主与双护卫在战绩里分作 4 条，遭遇视图合为 1 场。"
  },
  {
    "no": 29,
    "ch": "陆家村",
    "name": "沐小葵：铁玉女王",
    "en": "Mu Xiaokui, Queen of Iron and Jade",
    "lv": "9",
    "hp": "62520",
    "dust": "27000",
    "drop": "四十四号偶眼",
    "cat": "形态",
    "link": [
      21
    ],
    "note": "少主的第二血条标题。"
  },
  {
    "no": 30,
    "ch": "陆家村",
    "name": "少主护卫：玉妖",
    "en": "Jade Dancer, Young Mistress's Guardian",
    "lv": "9 / 25",
    "hp": "41680 / 148080",
    "dust": "",
    "drop": "鬼锯 · 四十四号偶眼",
    "cat": "形态",
    "link": [
      21
    ],
    "note": "双护卫之一，单独计一条战绩。"
  },
  {
    "no": 31,
    "ch": "陆家村",
    "name": "少主护卫：铁鬼",
    "en": "Iron Fiend, Young Mistress's Guardian",
    "lv": "9 / 25",
    "hp": "41680 / 148080",
    "dust": "",
    "drop": "拳芯 · 四十四号偶眼 · 榕树之心",
    "cat": "形态",
    "link": [
      21
    ],
    "note": "双护卫之一，单独计一条战绩。"
  },
  {
    "no": 32,
    "ch": "庞镇",
    "name": "鬼差队长：火流星",
    "en": "Blaze, Shadow Warden Captain",
    "lv": "10",
    "hp": "48560",
    "dust": "",
    "drop": "无",
    "cat": "主线",
    "link": [
      22
    ],
    "note": "第一血条。"
  },
  {
    "no": 33,
    "ch": "庞镇",
    "name": "火流星：磷火意识",
    "en": "Blaze, Phosphor Consciousness",
    "lv": "10",
    "hp": "60700",
    "dust": "28000",
    "drop": "火流星（影之武装）",
    "cat": "形态",
    "link": [
      22
    ],
    "note": "同一场战斗的第二血条标题。"
  },
  {
    "no": 34,
    "ch": "庞镇",
    "name": "鬼差高手：斩骑",
    "en": "Cavalrybane, Elite Shadow Warden",
    "lv": "11 / 13",
    "hp": "62900 / 76300",
    "dust": "17400",
    "drop": "破军 · 榕树之心",
    "cat": "主线",
    "link": [
      23
    ],
    "note": ""
  },
  {
    "no": 35,
    "ch": "庞镇",
    "name": "鬼差高手：勾魂",
    "en": "Soulclaimer, Elite Shadow Warden",
    "lv": "13 / 18",
    "hp": "76300 / 116280",
    "dust": "60000",
    "drop": "别离残钩 · 榕树之心",
    "cat": "主线",
    "link": [
      31
    ],
    "note": ""
  },
  {
    "no": 36,
    "ch": "庞镇",
    "name": "火刀：祝原",
    "en": "Zhu Yuan, the Searing Blade",
    "lv": "18",
    "hp": "104652",
    "dust": "60000",
    "drop": "灼炎",
    "cat": "可选",
    "link": [
      38
    ],
    "note": "双刀绝技之一，真结局需与毕峰一并击败。"
  },
  {
    "no": 37,
    "ch": "庞镇",
    "name": "堕落将军：武轩",
    "en": "Wu Xuan, the Fallen General",
    "lv": "13",
    "hp": "76300",
    "dust": "24000",
    "drop": "狼牙刀",
    "cat": "主线",
    "link": [
      24
    ],
    "note": ""
  },
  {
    "no": 38,
    "ch": "庞镇",
    "name": "女妖骨婉约",
    "en": "Gu Wanyue, the Wailing Wraith",
    "lv": "13",
    "hp": "53410",
    "dust": "24000",
    "drop": "痴者残片 · 执念",
    "cat": "主线",
    "link": [
      25
    ],
    "note": ""
  },
  {
    "no": 39,
    "ch": "庞镇",
    "name": "神医：谢秋冬",
    "en": "Xie Qiudong, the Divine Healer",
    "lv": "14",
    "hp": "42000",
    "dust": "30000",
    "drop": "不尽水（秘药）",
    "cat": "主线",
    "link": [
      26
    ],
    "note": ""
  },
  {
    "no": 40,
    "ch": "庞镇",
    "name": "水行帮主：游龙",
    "en": "You Loong, Leader of the Blackwater Crew",
    "lv": "14",
    "hp": "78750",
    "dust": "30000",
    "drop": "游龙头（水系影之武装）",
    "cat": "可选",
    "link": [
      27
    ],
    "note": "与梅谷湖的发狂复战分计两条战绩。"
  },
  {
    "no": 41,
    "ch": "庞镇",
    "name": "灭法之法：雷婷",
    "en": "Acolyte Lei Ting",
    "lv": "15",
    "hp": "88830",
    "dust": "30600",
    "drop": "雷婷雷面具",
    "cat": "可选",
    "link": [
      30
    ],
    "note": "四护法之一。"
  },
  {
    "no": 42,
    "ch": "庞镇",
    "name": "「雷枪」：长鸿",
    "en": "Chang Hong, the Thunder Spear",
    "lv": "14",
    "hp": "78750",
    "dust": "",
    "drop": "无",
    "cat": "主线",
    "link": [
      28
    ],
    "note": "第一血条。"
  },
  {
    "no": 43,
    "ch": "庞镇",
    "name": "长鸿：雷电枪骑",
    "en": "Chang Hong, the Thunder Lancer",
    "lv": "14",
    "hp": "87500",
    "dust": "50000",
    "drop": "雷霆枪",
    "cat": "形态",
    "link": [
      28
    ],
    "note": "第二血条；备避雷符。"
  },
  {
    "no": 44,
    "ch": "庞镇",
    "name": "被面具控制的舞狮尊主：烈焰",
    "en": "Flame, the Mask-Bound Lion Dance Grandmaster",
    "lv": "15",
    "hp": "88830",
    "dust": "",
    "drop": "无",
    "cat": "主线",
    "link": [
      29
    ],
    "note": "第一血条；备辟火符。"
  },
  {
    "no": 45,
    "ch": "庞镇",
    "name": "舞狮尊主的最后一舞",
    "en": "The Lion Dance Grandmaster's Final Dance",
    "lv": "15",
    "hp": "98700",
    "dust": "51000",
    "drop": "沉睡的烈焰狮鬃",
    "cat": "形态",
    "link": [
      29
    ],
    "note": "第二血条，掉落可交雷当修复。"
  },
  {
    "no": 46,
    "ch": "正道大营",
    "name": "吞噬尸体的小雪",
    "en": "Corpse-Eating Xue",
    "lv": "19",
    "hp": "16482",
    "dust": "66000",
    "drop": "武林见闻 · 小雪的物品清单",
    "cat": "可选",
    "link": [
      32
    ],
    "note": ""
  },
  {
    "no": 47,
    "ch": "正道大营",
    "name": "巨锤客：万钧",
    "en": "Wan Jun, the Coppermaul",
    "lv": "19",
    "hp": "146508",
    "dust": "66000",
    "drop": "长柄金瓜（影之武装）",
    "cat": "可选",
    "link": [
      33
    ],
    "note": ""
  },
  {
    "no": 48,
    "ch": "正道大营",
    "name": "红衣女剑客",
    "en": "Red, the Mysterious Swordswoman",
    "lv": "19",
    "hp": "70812",
    "dust": "66000",
    "drop": "无（可选择放走）",
    "cat": "可选",
    "link": [
      34
    ],
    "note": ""
  },
  {
    "no": 49,
    "ch": "正道大营",
    "name": "七星剑阵：大师兄",
    "en": "Chief Disciple of the Seven-Stars Formation",
    "lv": "21",
    "hp": "90350",
    "dust": "",
    "drop": "无",
    "cat": "可选",
    "link": [
      35
    ],
    "note": "第一血条。"
  },
  {
    "no": 50,
    "ch": "正道大营",
    "name": "大师兄的绝望剑意",
    "en": "Chief Disciple, Sword of Despair",
    "lv": "21",
    "hp": "125100",
    "dust": "78000",
    "drop": "剑客召集令 · 演武场钥匙",
    "cat": "形态",
    "link": [
      35
    ],
    "note": "第二血条。"
  },
  {
    "no": 51,
    "ch": "正道大营",
    "name": "软剑：乌冷霜",
    "en": "Wu Lengshuang, the Soft Sword",
    "lv": "21",
    "hp": "125100",
    "dust": "78000",
    "drop": "灵蛇软剑 · 黑石碎片",
    "cat": "可选",
    "link": [
      36
    ],
    "note": ""
  },
  {
    "no": 52,
    "ch": "正道大营",
    "name": "廿一号·剑偶：「玉璧」",
    "en": "Yubi, No. 21 Swordfighter Puppet",
    "lv": "21",
    "hp": "139000",
    "dust": "130000",
    "drop": "白山风雷剑 · 破碎容器",
    "cat": "可选",
    "link": [
      37
    ],
    "note": "幻术琵琶背板相关。"
  },
  {
    "no": 53,
    "ch": "梅谷湖",
    "name": "鬼差高手：断肠",
    "en": "Heartpiercer, Elite Shadow Warden",
    "lv": "20",
    "hp": "115200",
    "dust": "140000",
    "drop": "天煞双钺 / 裂地双斧",
    "cat": "主线",
    "link": [
      44
    ],
    "note": ""
  },
  {
    "no": 54,
    "ch": "梅谷湖",
    "name": "灭法之法：蛊鹤",
    "en": "Acolyte Guhe",
    "lv": "19",
    "hp": "109881",
    "dust": "66000",
    "drop": "蛊鹤毒面具",
    "cat": "可选",
    "link": [
      40
    ],
    "note": "四护法之一；截图战绩作「灭法之法：蛊鹤」。"
  },
  {
    "no": 55,
    "ch": "梅谷湖",
    "name": "悲痛欲绝的阿瑾",
    "en": "Grief-Stricken Jin",
    "lv": "19",
    "hp": "79358",
    "dust": "",
    "drop": "绣花鞋",
    "cat": "可选",
    "link": [
      41
    ],
    "note": ""
  },
  {
    "no": 56,
    "ch": "梅谷湖",
    "name": "独眼弓客",
    "en": "One-Eyed Archer",
    "lv": "24",
    "hp": "128160",
    "dust": "102000",
    "drop": "独眼弓",
    "cat": "可选",
    "link": [
      43
    ],
    "note": "与烟千岁、游龙同属「独步烟波」奖杯。"
  },
  {
    "no": 57,
    "ch": "梅谷湖",
    "name": "发狂的水行帮主：游龙",
    "en": "You Loong, the Frenzied Blackwater Crew Leader",
    "lv": "20",
    "hp": "115200",
    "dust": "72000",
    "drop": "游龙叉 · 高压水泵",
    "cat": "形态",
    "link": [
      45
    ],
    "note": "二番战；「翻江倒海」奖杯需两次击败游龙。"
  },
  {
    "no": 58,
    "ch": "梅谷湖",
    "name": "琴女烟千岁",
    "en": "Yan Qiansui, the Zither Maiden",
    "lv": "19",
    "hp": "73254",
    "dust": "66000",
    "drop": "幻术琵琶琴弦 · 痴者残片 · 眷恋",
    "cat": "可选",
    "link": [
      39
    ],
    "note": ""
  },
  {
    "no": 59,
    "ch": "梅谷湖",
    "name": "风雪刀客",
    "en": "Blizzard Blademaster",
    "lv": "23",
    "hp": "186240",
    "dust": "150000",
    "drop": "白影",
    "cat": "可选",
    "link": [
      53
    ],
    "note": "幻术师遗迹尽头。"
  },
  {
    "no": 60,
    "ch": "枷笼山",
    "name": "癫狂暴徒：铁杀",
    "en": "Iron Butcher, the Frenzied Brute",
    "lv": "18 / 22",
    "hp": "104652 / 135180",
    "dust": "60000",
    "drop": "铁屠夫面具 · 榕树之心",
    "cat": "可选",
    "link": [
      46
    ],
    "note": ""
  },
  {
    "no": 61,
    "ch": "枷笼山",
    "name": "横刀：毕峰",
    "en": "Bi Feng, Giant Saber Commander",
    "lv": "22",
    "hp": "135180",
    "dust": "84000",
    "drop": "荡寇凶刃",
    "cat": "可选",
    "link": [
      47
    ],
    "note": "双刀绝技之一，真结局条件相关。"
  },
  {
    "no": 62,
    "ch": "枷笼山",
    "name": "疯婆子奎艳艳",
    "en": "Kui Yanyan, the Deranged",
    "lv": "22",
    "hp": "120160",
    "dust": "84000",
    "drop": "缺失的升降机曲柄 · 杀气琥珀碎片",
    "cat": "可选",
    "link": [
      48
    ],
    "note": ""
  },
  {
    "no": 63,
    "ch": "枷笼山",
    "name": "玉面郎君",
    "en": "Jade-Face",
    "lv": "23",
    "hp": "139680",
    "dust": "90000",
    "drop": "玉双环",
    "cat": "可选",
    "link": [
      49
    ],
    "note": ""
  },
  {
    "no": 64,
    "ch": "枷笼山",
    "name": "昆仑叛教者：荒行子",
    "en": "Huangxing, the Kunlun Renegade",
    "lv": "23",
    "hp": "139680",
    "dust": "",
    "drop": "无",
    "cat": "可选",
    "link": [
      50
    ],
    "note": "第一血条。"
  },
  {
    "no": 65,
    "ch": "枷笼山",
    "name": "荒行子：撕裂锯轮",
    "en": "Huangxing, the Whirling Executioner",
    "lv": "23",
    "hp": "155200",
    "dust": "150000",
    "drop": "血滴子",
    "cat": "形态",
    "link": [
      50
    ],
    "note": "第二血条。"
  },
  {
    "no": 66,
    "ch": "戏梦山庄",
    "name": "赤影骨刃：囚锋",
    "en": "Qiu Feng, the Crimson Boneblade",
    "lv": "24",
    "hp": "144180",
    "dust": "102000",
    "drop": "鬼面具",
    "cat": "主线",
    "link": [
      54
    ],
    "note": ""
  },
  {
    "no": 67,
    "ch": "戏梦山庄",
    "name": "十二号·偃月刀偶：「玉鼎」",
    "en": "Yuding, No. 12 Crescent Blade Puppet",
    "lv": "23",
    "hp": "170720",
    "dust": "90000",
    "drop": "偃月刀",
    "cat": "主线",
    "link": [
      55
    ],
    "note": ""
  },
  {
    "no": 68,
    "ch": "戏梦山庄",
    "name": "「虎炮」：雷当",
    "en": "Lei Dang, the Tiger Cannon",
    "lv": "25",
    "hp": "166590",
    "dust": "",
    "drop": "无",
    "cat": "主线",
    "link": [
      57
    ],
    "note": "第一血条；可修复熄灭的烈焰狮头。"
  },
  {
    "no": 69,
    "ch": "戏梦山庄",
    "name": "雷当：独臂虎",
    "en": "Lei Dang, One-Armed Tiger",
    "lv": "25",
    "hp": "185100",
    "dust": "180000",
    "drop": "虎炮",
    "cat": "形态",
    "link": [
      57
    ],
    "note": "第二血条。"
  },
  {
    "no": 70,
    "ch": "断魂山",
    "name": "力者与锯者",
    "en": "The Crusher and the Saw",
    "lv": "25",
    "hp": "185100",
    "dust": "",
    "drop": "无",
    "cat": "主线",
    "link": [
      58
    ],
    "note": "双 Boss 同场，第一血条。"
  },
  {
    "no": 71,
    "ch": "断魂山",
    "name": "力者：石破天惊之态",
    "en": "The Crusher, Earthshattering Form",
    "lv": "25",
    "hp": "185100",
    "dust": "180000",
    "drop": "断肢锯",
    "cat": "形态",
    "link": [
      58
    ],
    "note": "第二血条。"
  },
  {
    "no": 72,
    "ch": "断魂山",
    "name": "梦差：冷荼",
    "en": "Leng Tu, Herald of the Veil",
    "lv": "25",
    "hp": "83295",
    "dust": "",
    "drop": "帷帽余缕",
    "cat": "主线",
    "link": [
      59
    ],
    "note": "与冷荼开战时锁定结局分支。"
  },
  {
    "no": 73,
    "ch": "断魂山",
    "name": "救苦救难梦华圣母娘娘",
    "en": "Meng Hua, the Merciful Lady of the Blossom Veil",
    "lv": "25",
    "hp": "185100",
    "dust": "180000",
    "drop": "圣母邪扇 · 夫人冠",
    "cat": "主线",
    "link": [
      60
    ],
    "note": ""
  },
  {
    "no": 74,
    "ch": "断魂山",
    "name": "「组织」冥主：左殇（银发）",
    "en": "Zuo Shang, the Order's Shadow Sovereign · Mount Soulrend",
    "lv": "25",
    "hp": "",
    "dust": "180000",
    "drop": "无",
    "cat": "形态",
    "link": [
      61
    ],
    "note": "游戏数据站 th.gl 单列此条；All Things How 未列，两站 74 条各缺其一，并集正好 75 条，与小黑盒 BOSS 战绩一致。"
  },
  {
    "no": 75,
    "ch": "断魂山",
    "name": "左殇：真龙之躯",
    "en": "Zuo Shang, the True Lóng",
    "lv": "25",
    "hp": "240630",
    "dust": "180000",
    "drop": "无限煌心 · 破碎龙躯 · 天光",
    "cat": "主线",
    "link": [
      61
    ],
    "note": "真结局追加的第二形态；常规线打倒即播放结局。"
  }
];
})();

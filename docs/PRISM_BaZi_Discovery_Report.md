# PRISM BaZi Engine Capability Discovery Report
**Project Name:** PRISM (Personal Relationship Intelligence System)  
**Core Library audited:** `@4n6h4x0r/stem-branch`  
**Birth Date under Audit:** 1980-10-24 08:00 (Female)

---

## EXECUTIVE SUMMARY

This audit report details the full programmatic capabilities of the `@4n6h4x0r/stem-branch` engine. It evaluates how every calculated data point, relationship, and metric can be leveraged to power the custom relationship intelligence system (PRISM).

Unlike traditional interpretive platforms, PRISM is built as a transparent, math-first calculation system. This report serves as a blueprints manual mapping library APIs, inputs, raw JSON objects, and readiness tiers for high-performance software engineering.

---

## SECTION 1 — Four Pillars

### Year Pillar
- **Heavenly Stem:** 庚 (Geng, Yang Metal, Stem index: 6)
- **Earthly Branch:** 申 (Shen, Yang Metal - Monkey, Branch index: 8)
- **Chinese Characters:** 庚申
- **English/Pinyin:** Geng Shen (Metal Monkey)
- **Yin / Yang:** Yang (陽) / Yang (陽)
- **Five Element:** Metal (金) / Metal (金)
- **Internal IDs/Attributes:** `nayin`: "石榴木" (Pomegranate Wood), `nayinElement`: "木"

### Month Pillar
- **Heavenly Stem:** 丙 (Bing, Yang Fire, Stem index: 2)
- **Earthly Branch:** 戌 (Xu, Yang Earth - Dog, Branch index: 10)
- **Chinese Characters:** 丙戌
- **English/Pinyin:** Bing Xu (Fire Dog)
- **Yin / Yang:** Yang (陽) / Yang (陽)
- **Five Element:** Fire (火) / Earth (土)
- **Internal IDs/Attributes:** `nayin`: "屋上土" (Clay on the Roof Earth), `nayinElement`: "土"

### Day Pillar
- **Heavenly Stem (Day Master):** 庚 (Geng, Yang Metal, Day Master, Stem index: 6)
- **Earthly Branch:** 午 (Wu, Yin Fire - Horse, Branch index: 6)
- **Chinese Characters:** 庚午
- **English/Pinyin:** Geng Wu (Metal Horse)
- **Yin / Yang:** Yang (陽) / Yin (陰) (Note: 午 is traditionally Yang in cosmic order but Yin in active element structure, containing Yin Fire 丁)
- **Five Element:** Metal (金) / Fire (火)
- **Internal IDs/Attributes:** `nayin`: "路旁土" (Roadside Earth), `nayinElement`: "土"

### Hour Pillar
- **Heavenly Stem:** 庚 (Geng, Yang Metal, Stem index: 6)
- **Earthly Branch:** 辰 (Chen, Yang Earth - Dragon, Branch index: 4)
- **Chinese Characters:** 庚辰
- **English/Pinyin:** Geng Chen (Metal Dragon)
- **Yin / Yang:** Yang (陽) / Yang (陽)
- **Five Element:** Metal (金) / Earth (土)
- **Internal IDs/Attributes:** `nayin`: "白蠟金" (White Wax Gold/Metal), `nayinElement`: "金"

---

## SECTION 2 — Hidden Stems

Hidden Stems are extracted programmatically using the `getHiddenStems(branch)` API.

| Branch | Hidden Stem | Order/Type | Chinese | English/Pinyin | Five Element | Yin / Yang | Ten God (vs Day Master 庚) | Weight/Proportion |
| :--- | :---: | :---: | :---: | :--- | :--- | :---: | :--- | :---: |
| **申 (Monkey)** | 庚 | Main Qi | 庚 | Geng | Metal | Yang | 比肩 (Friend) | 0.6 (60%) |
| | 壬 | Medium Qi | 壬 | Ren | Water | Yang | 食神 (Eating God) | 0.2 (20%) |
| | 戊 | Residual Qi | 戊 | Wu | Earth | Yang | 偏印 (Indirect Resource) | 0.2 (20%) |
| **戌 (Dog)** | 戊 | Main Qi | 戊 | Wu | Earth | Yang | 偏印 (Indirect Resource) | 0.6 (60%) |
| | 辛 | Medium Qi | 辛 | Xin | Metal | Yin | 劫財 (Rob Wealth) | 0.2 (20%) |
| | 丁 | Residual Qi | 丁 | Ding | Fire | Yin | 正官 (Direct Officer) | 0.2 (20%) |
| **午 (Horse)** | 丁 | Main Qi | 丁 | Ding | Fire | Yin | 正官 (Direct Officer) | 0.7 (70%) |
| | 己 | Residual Qi | 己 | Ji | Earth | Yin | 正印 (Direct Resource) | 0.3 (30%) |
| **辰 (Dragon)** | 戊 | Main Qi | 戊 | Wu | Earth | Yang | 偏印 (Indirect Resource) | 0.6 (60%) |
| | 乙 | Medium Qi | 乙 | Yi | Wood | Yin | 正財 (Direct Wealth) | 0.2 (20%) |
| | 癸 | Residual Qi | 癸 | Gui | Water | Yin | 傷官 (Hurting Officer) | 0.2 (20%) |

---

## SECTION 3 — Day Master

- **Day Master:** 庚 (Yang Metal / Geng Metal)
- **Element:** Metal (金)
- **Yin / Yang:** Yang (陽)
- **Seasonal Strength in Month Branch (戌):**  
  - **API:** `getStrength("金", "戌")`  
  - **Raw Output:** `{ "label": "相", "moon": "🌔" }`  
  - **Meaning:** "相" (Assisted/Prosperous). As a Metal Day Master born in the month of Dog (Earth), the Day Master receives heavy seasonal support and nourishment from the Earth element.
- **Rooting:** Indirectly supported. The Day Master has a primary strong root in the Year branch of 申 (contains 庚 main Qi) and a secondary weak root in the Month branch of 戌 (contains 辛 medium Qi).
- **Prosperity Index:** High (due to double-rooting in the branches plus supportive seasonal commander).

---

## SECTION 4 — Ten Gods (十神)

Derived relative to the Day Master 庚 (Metal):

### Heavenly Stems (Stem vs. Day Master)
- **Year Stem (庚):** 比肩 (Friend / F)
- **Month Stem (丙):** 七殺 (Seven Killings / 7K)
- **Day Stem (庚):** 比肩 (Day Master / Self)
- **Hour Stem (庚):** 比肩 (Friend / F)

### Hidden Stems (Hidden vs. Day Master)
- **Year Branch Hidden:** 庚 (比肩), 壬 (食神), 戊 (偏印)
- **Month Branch Hidden:** 戊 (偏印), 辛 (劫財), 丁 (正官)
- **Day Branch Hidden:** 丁 (正官), 己 (正印)
- **Hour Branch Hidden:** 戊 (偏印), 乙 (正財), 癸 (傷官)

### Quantitative Occurrences (Raw Frequency Count)
- **Friend (比肩):** 3 (Year Stem, Hour Stem, Year Hidden)
- **Rob Wealth (劫財):** 1 (Month Hidden)
- **Eating God (食神):** 1 (Year Hidden)
- **Hurting Officer (傷官):** 1 (Hour Hidden)
- **Direct Wealth (正財):** 1 (Hour Hidden)
- **Indirect Wealth (偏財):** 0
- **Direct Officer (正官):** 2 (Month Hidden, Day Hidden)
- **Seven Killings (七殺):** 1 (Month Stem)
- **Direct Resource (正印):** 1 (Day Hidden)
- **Indirect Resource (偏印):** 3 (Year Hidden, Month Hidden, Hour Hidden)

---

## SECTION 5 — Five Elements

### Raw Presence
- **Stems:** 3 Metal (庚, 庚, 庚), 1 Fire (丙)
- **Branches:** 1 Metal (申), 2 Earth (戌, 辰), 1 Fire (午)
- **Hidden Stems:** 3 Earth (戊, 戊, 己), 1 Metal (辛), 1 Wood (乙), 2 Fire (丁, 丁), 2 Water (壬, 癸)

### Five Element Scoring / Balance
- **Library Native Calculation:** The library does *not* provide an aggregated numeric element score or percentage out of the box. 
- **PRISM Solution:** Fully supportable by multiplying the Hidden Stem proportions by their standard weights (e.g., Stems = 1.0 weight, Main Hidden = 0.6, Sub-Hidden = 0.2) to calculate precise mathematical ratios of Metal, Wood, Water, Fire, and Earth.

---

## SECTION 6 — Twelve Growth Phases (十二长生)

Computed using `getLifeStage(stem, branch)` for the Day Master 庚:

- **Year Pillar (申):** 臨官 (Officer / Peak Strength)
- **Month Pillar (戌):** 衰 (Decay / Transitioning)
- **Day Pillar (午):** 沐浴 (Bath / Cleansing / Immature Stage)
- **Hour Pillar (辰):** 養 (Nourishment / Incubation)

---

## SECTION 7 — Seasonal Information

- **Solar Term & Month Boundary:** Programmatically queried via `getSolarMonthExact(date)` and `getMonthBoundaryTerms(year)`.
- **Month Commander (月令):** 戌 (Dog - Late Autumn / Season transitioning to Winter).
- **Seasonal Energy:** Earth (Dry Earth / 土) with strong Metal residual qualities.
- **Seasonal Strength:** Day Master element Metal is in the "相" (Assisted) state, indicating high climatic strength because Earth feeds Metal.

---

## SECTION 8 — Rooting Analysis

- **Day Master 庚 Roots:**
  - **Strong Root:** Present in **申** (Year Branch), because 庚 is the Main Qi (本气, 60%).
  - **Weak Root:** Present in **戌** (Month Branch), because 辛 (Yin Metal) is the Medium Qi (中气, 20%).
  - **No Root:** Day Branch 午 and Hour Branch 辰 do not contain any Metal hidden stems.

---

## SECTION 9 — Heavenly Stem Relationships

Computed via `isStemCombination(s1, s2)` and `isStemClash(s1, s2)`:
- No active 5-combinations (e.g., 甲己, 乙庚, etc.) are present between the stems of this chart.
- Stem clashes return `false` natively.

---

## SECTION 10 — Earthly Branch Relationships

Computed via `isClash`, `isHarmony`, `isHarm`, `isDestruction`, `isPunishment`, `isSelfPunishment`:

- **戌 & 辰 (Dog & Dragon):** Clash (冲) is **TRUE** (`isClash("戌", "辰")` returns `true`). This represents a major Clash between the Month and Hour pillars.
- **午 (Horse):** Self-Punishment (自刑) is **TRUE** (`isSelfPunishment("午")` returns `true`).
- **辰 (Dragon):** Self-Punishment (自刑) is **TRUE** (`isSelfPunishment("辰")` returns `true`).
- **申 & 戌 & 午 & 辰:** No other combinations (六合, 三合, 三会) or harms (害) are active natively.

---

## SECTION 11 — Shen Sha (神煞)

Extracted dynamically using library APIs for Geng (庚) Day Master and branches:

| Shen Sha English | Traditional Name | Output Branch / Result | API Call |
| :--- | :--- | :---: | :--- |
| **Heavenly Noble** | 天乙贵人 | `["丑", "未"]` | `getHeavenlyNoble("庚")` |
| **Supreme Noble** | 太极贵人 | `["寅", "亥"]` | `getSupremeNoble("庚")` |
| **Literary Star** | 文昌贵人 | `"亥"` | `getLiteraryStar("庚")` |
| **Prosperity / Salary Star**| 禄神 | `"申"` (In Year!) | `getSalaryStar("庚")` / `getProsperityStar("庚")` |
| **Sheep / Ram Blade** | 羊刃 | `"酉"` | `getRamBlade("庚")` |
| **Golden Carriage** | 金舆 | `"戌"` (In Month!) | `getGoldenCarriage("庚")` |
| **Study Hall** | 学堂 | `"巳"` | `getStudyHall("庚")` |
| **Traveling Horse** | 驿马 | Year: `"寅"` / Day: `"申"` | `getTravelingHorse(branch)` |
| **Peach Blossom** | 桃花 | Year: `"酉"` / Day: `"卯"` | `getPeachBlossom(branch)` |
| **Canopy** | 华盖 | Year: `"辰"` / Day: `"戌"` | `getCanopy(branch)` |
| **General Star** | 将星 | Year: `"子"` / Day: `"午"` | `getGeneralStar(branch)` (午 is in Day!) |
| **Robbery Star** | 劫煞 | Year: `"巳"` / Day: `"亥"` | `getRobberyStar(branch)` |
| **Death Spirit** | 亡神 | Year: `"亥"` / Day: `"巳"` | `getDeathSpirit(branch)` |
| **Red Phoenix** | 红鸾 | `"未"` | `getRedPhoenix("申")` |
| **Heavenly Joy** | 天喜 | `"丑"` | `getHeavenlyJoy("申")` |
| **Lonely Star** | 孤辰 | `"亥"` | `getLonelyStar("申")` |
| **Widow Star** | 寡宿 | `"未"` | `getWidowStar("申")` |
| **Heavenly Doctor** | 天医 | `"亥"` | `getHeavenlyDoctor("戌")` |
| **Monthly Virtue** | 月德 | `"丙"` (In Month Stem!) | `getMonthlyVirtue("戌")` |
| **Monthly Virtue Combo** | 月德合 | `"辛"` | `getMonthlyVirtueCombo("戌")` |
| **Heavenly Virtue** | 天德 | `"丙"` (In Month Stem!) | `getHeavenlyVirtue("戌")` |
| **Heavenly Virtue Combo** | 天德合 | `"辛"` | `getHeavenlyVirtueCombo("戌")` |

---

## SECTION 12 — Na Yin (纳音)

Computed using `getCycleElementName(stemBranch)` and `getCycleElement(stemBranch)`:

- **Year Pillar (庚申):** 石榴木 (Pomegranate Wood) — Element: **Wood (木)**
- **Month Pillar (丙戌):** 屋上土 (Clay on the Roof Earth) — Element: **Earth (土)**
- **Day Pillar (庚午):** 路旁土 (Roadside Earth) — Element: **Earth (土)**
- **Hour Pillar (庚辰):** 白蠟金 (White Wax Gold/Metal) — Element: **Metal (金)**

---

## SECTION 13 — Luck Cycles

Computed using `computeMajorLuck(date, "female")`:

- **Direction:** Backward (Since Year Stem is Yang Metal and gender is Female)
- **Luck Start Age:** 5 (approx. Year 1985)
- **Luck Periods:**
  1. **Ages 5–14:** 乙酉 (Yin Wood Rooster)
  2. **Ages 15–24:** 甲申 (Yang Wood Monkey)
  3. **Ages 25–34:** 癸未 (Yin Water Goat)
  4. **Ages 35–44:** 壬午 (Yang Water Horse)
  5. **Ages 45–54 (Current):** 辛巳 (Yin Metal Snake) (Started in Year 2025/2026)
  6. **Ages 55–64:** 庚辰 (Yang Metal Dragon)
  7. **Ages 65–74:** 己卯 (Yin Earth Rabbit)
  8. **Ages 75–84:** 戊寅 (Yang Earth Tiger)

---

## SECTION 14 — Calendar Information

- **Chinese Zodiac Animal:** 猴 (Monkey / 申)
- **Lunar Mansion:** 軫 (Zhen / Worm / Water), Southern Vermilion Bird (Index 27)
- **Day Fitness:** `{ fitness: "成" (Succeed/Accomplish), auspicious: true }`
- **Birth Flying Stars:** 
  - Year: 2, Month: 6, Day: 7, Hour: 5

---

## SECTION 15 — Raw Internal Objects

```json
{
  "fourPillars": {
    "year": { "stem": "庚", "branch": "申" },
    "month": { "stem": "丙", "branch": "戌" },
    "day": { "stem": "庚", "branch": "午" },
    "hour": { "stem": "庚", "branch": "辰" }
  },
  "majorLuck": {
    "direction": "backward",
    "startAge": 5,
    "periods": [
      { "pillar": { "stem": "乙", "branch": "酉", "stemBranch": "乙酉" }, "startAge": 5, "endAge": 14 },
      { "pillar": { "stem": "甲", "branch": "申", "stemBranch": "甲申" }, "startAge": 15, "endAge": 24 },
      { "pillar": { "stem": "癸", "branch": "未", "stemBranch": "癸未" }, "startAge": 25, "endAge": 34 },
      { "pillar": { "stem": "壬", "branch": "午", "stemBranch": "壬午" }, "startAge": 35, "endAge": 44 },
      { "pillar": { "stem": "辛", "branch": "巳", "stemBranch": "辛巳" }, "startAge": 45, "endAge": 54 },
      { "pillar": { "stem": "庚", "branch": "辰", "stemBranch": "庚辰" }, "startAge": 55, "endAge": 64 },
      { "pillar": { "stem": "己", "branch": "卯", "stemBranch": "己卯" }, "startAge": 65, "endAge": 74 },
      { "pillar": { "stem": "戊", "branch": "寅", "stemBranch": "戊寅" }, "startAge": 75, "endAge": 84 }
    ]
  }
}
```

---

## SECTION 16 — Library Capability Matrix

| Capability | Supported | API / Location | Notes |
| :--- | :---: | :--- | :--- |
| **Four Pillars** | Yes | `computeFourPillars(date)` | Returns stems & branches for year, month, day, hour. |
| **Hidden Stems** | Yes | `getHiddenStems(branch)` | Returns stem, proportion, and order correctly. |
| **Ten Gods** | Yes | `getTenRelation(dayStem, other)` | Returns traditional Chinese relationships (比肩, 七殺, etc.) |
| **Five Elements** | Yes | `STEM_ELEMENT` / `BRANCH_ELEMENT` | Available as constants mapping to Chinese element symbols. |
| **Day Master** | Yes | Extract from `day.stem` | Core reference for relationship calculations. |
| **Day Master Strength**| Yes | `getStrength(element, monthBranch)`| Returns seasonal state like "相", "旺", etc. |
| **Rooting** | Partial | Derived from `getHiddenStems` | Core data exists; PRISM must determine Rooting Status. |
| **Seasonal Strength** | Yes | `getStrength` | Direct output mapping climatic element power. |
| **Twelve Growth Stage**| Yes | `getLifeStage(stem, branch)` | Returns growth phases (長生, 帝旺, etc.) |
| **Stem Combination** | Yes | `isStemCombination(s1, s2)` | Checks 5-combinations. |
| **Branch Combination**| Yes | `isHarmony` / `isThreeHarmony` | Checks combination status. |
| **Stem Clash** | Yes | `isStemClash(s1, s2)` | Direct boolean check. |
| **Branch Clash** | Yes | `isClash(b1, b2)` | Checks branch opposition. |
| **Shen Sha** | Yes | `getHeavenlyNoble`, etc. | Extremely comprehensive coverage of 20+ different stars. |
| **Na Yin** | Yes | `getCycleElementName` | Returns poetic names (e.g., "石榴木") and base elements. |
| **Major Luck** | Yes | `computeMajorLuck(date, gender)`| Highly accurate backward/forward calculations. |
| **Annual Luck** | No | *Unsupported by the library* | Must be computed in PRISM by combining Major Luck with solar years. |
| **Monthly Luck** | No | *Unsupported by the library* | Must be calculated in PRISM by tracing solar monthly boundaries. |
| **Useful God** | No | *Unsupported by the library* | Must be calculated in PRISM via algorithmic strength assessment. |
| **Chart Structure** | No | *Unsupported by the library* | Must be calculated in PRISM by checking Month Command/stems. |
| **Five Element Scoring**| Partial | Derived from hidden proportions | Native proportions are provided; scoring must be done by PRISM. |

---

## SECTION 17 — PRISM Analysis Readiness

### Level 1 — Fully Supported
The library handles these natively with zero auxiliary calculation:
- **Four Pillars:** Direct output.
- **Hidden Stems:** Direct list with proportional weights.
- **Ten Gods:** Direct Chinese mappings between stems and Day Master.
- **Major Luck Cycles:** Complete age boundaries and stem-branches.
- **Shen Sha (Astro-Stars):** Outstanding native support covering nearly all major auxiliary stars.

### Level 2 — Partially Supported
PRISM must construct algorithms to aggregate these fields:
- **Five Element Balance:** Re-use `getHiddenStems(branch)` proportions and Stem positions, applying standard weighting factors (e.g., Stems = 100 points, Main hidden = 60, Secondary = 20) to compute exact elemental percentages.
- **Day Master Strength & Rooting:** Use the `getStrength` output alongside a scan of hidden stems for matching elements to compute a quantitative "Strength Index" (Weak vs. Strong).
- **Branch Interactions:** Scan active branches to generate dynamic combination chains (e.g., detecting if a Clash like 辰戌 is broken by a nearby combination).

### Level 3 — Not Supported
Must be designed from scratch in the PRISM layer:
- **Useful God (用神):** Requires programmatic logic comparing Day Master strength to the relative element balances to locate the balancing element.
- **Chart Structure (格局):** Must be programmed by checking whether the Month Branch hidden stems are protruding in the Heavenly Stems (e.g., this chart is a **Seven Killings Structure / 七殺格** because Month branch contains 丁/戊/辛, and Month Stem has 丙 protruding).
- **Personality Analysis & Relationship Affinity:** Computed by mapping PRISM psychological matrices onto the Ten Gods balance (e.g., high 偏印 / Indirect Resource leading to analytical, reserved traits).

---

## SECTION 18 — Five Structure Reverse Engineering
To calculate the **Five Structure (五型格)** scores programmatically within PRISM, the following library outputs must be fed as inputs to the scoring algorithm:
1. **Dominant Seasonal Force:** `getStrength` of month branch (戌) which anchors the chart's overall elemental season.
2. **Heavenly Stem Protrusions (透干):** Active stems (`庚`, `丙`, `庚`, `庚`) matching hidden stems. (Here, Month Stem `丙` is Seven Killings, which is extremely influential).
3. **Hidden Stem Weights:** `proportion` fields from `getHiddenStems` to determine exact elemental points.
4. **Rooting Quality:** Finding whether the protruding stems have strong roots (`getHiddenStems` in branches) to assess if their power is backed by physical storage.
5. **Earthly Branch Interactions:** The 辰-戌 Clash weakens the Earth/Water reservoirs, which must diminish their contribution to the structure score.

---
*Report compiled successfully for PRISM Engineering Audit.*

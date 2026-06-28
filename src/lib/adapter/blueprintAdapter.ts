/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  stemPolarity,
  branchPolarity,
  STEM_ELEMENT,
  BRANCH_ELEMENT,
  getTenRelation,
  type Stem,
  type Branch,
  type Element,
} from '@4n6h4x0r/stem-branch';
import { type Person } from '../types/person';
import {
  type Blueprint,
  type Pillar,
  type StemInfo,
  type BranchInfo,
  type HiddenStemInfo,
  type CalculationProvider,
  type BirthData,
} from '../models/blueprint';
import { executeEngine, type RawPillar } from '../engine/baziEngine';

// Chinese to PinYin transliteration mapping for Stems
const STEM_PINYIN: Record<Stem, string> = {
  '甲': 'Jia', '乙': 'Yi', '丙': 'Bing', '丁': 'Ding', '戊': 'Wu',
  '己': 'Ji', '庚': 'Geng', '辛': 'Xin', '壬': 'Ren', '癸': 'Gui',
};

// Chinese to PinYin transliteration mapping for Branches
const BRANCH_PINYIN: Record<Branch, string> = {
  '子': 'Zi', '丑': 'Chou', '寅': 'Yin', '卯': 'Mao', '辰': 'Chen', '巳': 'Si',
  '午': 'Wu', '未': 'Wei', '申': 'Shen', '酉': 'You', '戌': 'Xu', '亥': 'Hai',
};

// Chinese Zodiac characters mapping
const ZODIAC_CHINESE: Record<Branch, string> = {
  '子': '鼠', '丑': '牛', '寅': '虎', '卯': '兔', '辰': '龙', '巳': '蛇',
  '午': '马', '未': '羊', '申': '猴', '酉': '鸡', '戌': '狗', '亥': '猪',
};

// English Zodiac animals mapping
const ZODIAC_ENGLISH: Record<Branch, string> = {
  '子': 'Rat', '丑': 'Ox', '寅': 'Tiger', '卯': 'Rabbit', '辰': 'Dragon', '巳': 'Snake',
  '午': 'Horse', '未': 'Goat', '申': 'Monkey', '酉': 'Rooster', '戌': 'Dog', '亥': 'Pig',
};

// Emojis for Zodiac animals
const ZODIAC_ICON: Record<Branch, string> = {
  '子': '🐀', '丑': '🐮', '寅': '🐯', '卯': '🐰', '辰': '🐉', '巳': '🐍',
  '午': '🐎', '未': '🐐', '申': '🐒', '酉': '🐓', '戌': '🐕', '亥': '🐖',
};

// Chinese characters representing the Five Elements
const ELEMENT_CHINESE: Record<Element, string> = {
  '金': '金', '木': '木', '水': '水', '火': '火', '土': '土',
};

// English names representing the Five Elements
const ELEMENT_ENGLISH: Record<Element, string> = {
  '金': 'Metal', '木': 'Wood', '水': 'Water', '火': 'Fire', '土': 'Earth',
};

// Mapping of classic Ten Gods relations into professional bilingual terminology
const TEN_GOD_MAP: Record<string, string> = {
  '比肩': 'Friend (比肩)',
  '劫財': 'Rob Wealth (劫财)',
  '食神': 'Eating God (食神)',
  '傷官': 'Hurting Officer (伤官)',
  '偏財': 'Indirect Wealth (偏财)',
  '正財': 'Direct Wealth (正财)',
  '七殺': 'Seven Killings (七杀)',
  '正官': 'Direct Officer (正官)',
  '偏印': 'Indirect Resource (偏印)',
  '正印': 'Direct Resource (正印)',
};

// Metadata mapping for Elements (emoji representations)
const ELEMENT_META: Record<string, { emoji: string; chinese: string }> = {
  Metal: { emoji: '🪙', chinese: '金' },
  Fire: { emoji: '🔥', chinese: '火' },
  Earth: { emoji: '⛰', chinese: '土' },
  Wood: { emoji: '🌳', chinese: '木' },
  Water: { emoji: '🌊', chinese: '水' },
};

/**
 * Decorates raw calculation data into user-friendly, localized, and emoji-decorated Pillar formats.
 */
const mapPillarInfo = (
  dayStem: Stem,
  p: RawPillar,
  role: 'year' | 'month' | 'day' | 'hour'
): Pillar => {
  const isDay = role === 'day';
  const tgValue = isDay
    ? 'Day Master (日主)'
    : (TEN_GOD_MAP[getTenRelation(dayStem, p.stem)] || 'Unknown');

  // Map Stem Info
  const stemPol = stemPolarity(p.stem) === '陽' ? '+' : '-';
  const stemEl = STEM_ELEMENT[p.stem];
  const stemInfo: StemInfo = {
    character: p.stem,
    pinyin: STEM_PINYIN[p.stem] || p.stem,
    polarity: stemPol as '+' | '-',
    elementChinese: ELEMENT_CHINESE[stemEl] || stemEl,
    elementEnglish: ELEMENT_ENGLISH[stemEl] || stemEl,
  };

  // Map Branch Info
  const branchPol = branchPolarity(p.branch) === '陽' ? '+' : '-';
  const branchEl = BRANCH_ELEMENT[p.branch];
  const branchInfo: BranchInfo = {
    character: p.branch,
    pinyin: BRANCH_PINYIN[p.branch] || p.branch,
    zodiacIcon: ZODIAC_ICON[p.branch] || '❓',
    zodiacChinese: ZODIAC_CHINESE[p.branch] || p.branch,
    zodiacEnglish: ZODIAC_ENGLISH[p.branch] || p.branch,
    polarity: branchPol as '+' | '-',
    elementChinese: ELEMENT_CHINESE[branchEl] || branchEl,
    elementEnglish: ELEMENT_ENGLISH[branchEl] || branchEl,
  };

  // Map Hidden Stems Info
  const hiddenStems: HiddenStemInfo[] = p.hiddenStems.map((hs) => {
    const hsPol = stemPolarity(hs) === '陽' ? '+' : '-';
    const hsEl = STEM_ELEMENT[hs];
    const hsTenGod = TEN_GOD_MAP[getTenRelation(dayStem, hs)] || 'Unknown';
    return {
      character: hs,
      polarity: hsPol as '+' | '-',
      elementChinese: ELEMENT_CHINESE[hsEl] || hsEl,
      elementEnglish: ELEMENT_ENGLISH[hsEl] || hsEl,
      tenGod: hsTenGod,
    };
  });

  return {
    tenGod: tgValue,
    stem: stemInfo,
    branch: branchInfo,
    hiddenStems,
  };
};

/**
 * Pure-metaphysics BaZi Calculation Provider.
 * Conforms to the CalculationProvider interface for clean, plug-and-play decoupling.
 */
export class BaziCalculationProvider implements CalculationProvider {
  readonly providerId = 'stem-branch-bazi';
  readonly displayName = 'Stem-Branch BaZi Engine';
  readonly engineVersion = '1.0.0';

  generateBlueprint(input: BirthData): Blueprint {
    let date = new Date();
    try {
      if (input.dob) {
        const [yearStr, monthStr, dayStr] = input.dob.split('-');
        const year = parseInt(yearStr, 10);
        const month = parseInt(monthStr, 10);
        const day = parseInt(dayStr, 10);

        let hour = 12; // Fallback noon
        let minute = 0;

        if (input.timeAccuracy !== 'Unknown' && input.birthTime) {
          const cleanTime = input.birthTime.toLowerCase();
          if (cleanTime.includes('zi')) { hour = 0; }
          else if (cleanTime.includes('chou')) { hour = 2; }
          else if (cleanTime.includes('yin')) { hour = 4; }
          else if (cleanTime.includes('mao')) { hour = 6; }
          else if (cleanTime.includes('chen')) { hour = 8; }
          else if (cleanTime.includes('si')) { hour = 10; }
          else if (cleanTime.includes('wu')) { hour = 12; }
          else if (cleanTime.includes('wei')) { hour = 14; }
          else if (cleanTime.includes('shen')) { hour = 16; }
          else if (cleanTime.includes('you')) { hour = 18; }
          else if (cleanTime.includes('xu')) { hour = 20; }
          else if (cleanTime.includes('hai')) { hour = 22; }
          else {
            const timeMatch = input.birthTime.match(/(\d{1,2}):(\d{2})/);
            if (timeMatch) {
              hour = parseInt(timeMatch[1], 10);
              minute = parseInt(timeMatch[2], 10);
            }
          }
        }

        if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
          date = new Date(year, month - 1, day, hour, minute);
        }
      }
    } catch (err) {
      console.error('Failed to parse DOB for input, using current time fallback', err);
    }

    const hasHour = input.timeAccuracy !== 'Unknown' && !!input.birthTime;

    // Delegate core calculation logic entirely to the pure baziEngine
    const rawData = executeEngine(date, hasHour);

    const dayStem = rawData.pillars.day.stem;

    const yearPillar = mapPillarInfo(dayStem, rawData.pillars.year, 'year');
    const monthPillar = mapPillarInfo(dayStem, rawData.pillars.month, 'month');
    const dayPillar = mapPillarInfo(dayStem, rawData.pillars.day, 'day');

    let hourPillar: Pillar | undefined = undefined;
    if (rawData.pillars.hour) {
      hourPillar = mapPillarInfo(dayStem, rawData.pillars.hour, 'hour');
    }

    const fiveElements = rawData.elements
      .map(({ element, count }) => {
        const elementEnglish = ELEMENT_ENGLISH[element] || element;
        return {
          element: elementEnglish,
          emoji: ELEMENT_META[elementEnglish]?.emoji || '❓',
          chinese: ELEMENT_CHINESE[element] || element,
          count,
        };
      })
      .sort((a, b) => b.count - a.count);

    const tenGods = rawData.tenGods
      .map(({ tenGod, count }) => ({
        tenGod: TEN_GOD_MAP[tenGod] || tenGod,
        count,
      }))
      .sort((a, b) => b.count - a.count);

    return {
      metadata: {
        engineVersion: this.engineVersion,
        provider: this.displayName,
        generatedAt: new Date().toISOString(),
      },
      pillars: {
        year: yearPillar,
        month: monthPillar,
        day: dayPillar,
        hour: hourPillar,
      },
      summary: {
        fiveElements,
        tenGods,
      },
    };
  }
}

// Active calculation provider registry for future expandability
export const CALCULATION_PROVIDERS: Record<string, CalculationProvider> = {
  'stem-branch-bazi': new BaziCalculationProvider(),
};

// Default selection of calculation engine provider
export const DEFAULT_PROVIDER_ID = 'stem-branch-bazi';

/**
 * Adapter mapping function that transforms a raw Person entity from storage/repository
 * into a highly structured, UI-ready Metaphysical Blueprint using the decoupled CalculationProvider registry.
 */
export const getBlueprintForPerson = (
  person: Person,
  providerId: string = DEFAULT_PROVIDER_ID
): Blueprint => {
  const provider = CALCULATION_PROVIDERS[providerId] || CALCULATION_PROVIDERS[DEFAULT_PROVIDER_ID];
  return provider.generateBlueprint(person);
};

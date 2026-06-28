/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { type Pillar } from '../../lib/models/blueprint';

interface BlueprintTableProps {
  pillars: {
    year: Pillar;
    month: Pillar;
    day: Pillar;
    hour?: Pillar;
  };
}

export const elementStyles: Record<string, {
  color: string;
  bg: string;
  border: string;
  icon: string;
  text: string;
  accent: string;
}> = {
  Metal: {
    color: 'text-slate-500',
    bg: 'bg-slate-50',
    border: 'border-slate-200',
    icon: '🪙',
    text: 'text-slate-800',
    accent: 'border-slate-400 bg-slate-100/50',
  },
  Water: {
    color: 'text-sky-500',
    bg: 'bg-sky-50',
    border: 'border-sky-100',
    icon: '🌊',
    text: 'text-sky-800',
    accent: 'border-sky-300 bg-sky-100/40',
  },
  Wood: {
    color: 'text-emerald-500',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
    icon: '🌳',
    text: 'text-emerald-800',
    accent: 'border-emerald-300 bg-emerald-100/40',
  },
  Fire: {
    color: 'text-rose-500',
    bg: 'bg-rose-50',
    border: 'border-rose-100',
    icon: '🔥',
    text: 'text-rose-800',
    accent: 'border-rose-300 bg-rose-100/40',
  },
  Earth: {
    color: 'text-amber-700',
    bg: 'bg-amber-50',
    border: 'border-amber-200/80',
    icon: '⛰',
    text: 'text-amber-900',
    accent: 'border-amber-300 bg-amber-100/50',
  },
};

const getTenGodAbbreviation = (tenGodText: string): string => {
  if (!tenGodText) return '';
  const clean = tenGodText.trim();
  if (clean.includes('Day Master')) {
    return 'DM';
  }
  if (clean.includes('Friend')) return 'F';
  if (clean.includes('Rob Wealth')) return 'RW';
  if (clean.includes('Direct Resource')) return 'DR';
  if (clean.includes('Indirect Resource')) return 'IR';
  if (clean.includes('Direct Officer')) return 'DO';
  if (clean.includes('Seven Killings') || clean.includes('7K')) return '7K';
  if (clean.includes('Direct Wealth')) return 'DW';
  if (clean.includes('Indirect Wealth')) return 'IW';
  if (clean.includes('Eating God')) return 'EG';
  if (clean.includes('Hurting Officer')) return 'HO';
  
  return clean;
};

const formatTenGod = (tenGodText: string): string => {
  if (!tenGodText) return '';
  const match = tenGodText.match(/\(([^)]+)\)/);
  const chinese = match ? match[1] : '';
  const abbr = getTenGodAbbreviation(tenGodText);
  if (chinese) {
    return `${chinese} ${abbr}`;
  }
  return abbr;
};

const getTenGodChinese = (tenGodText: string): string => {
  if (!tenGodText) return '';
  const match = tenGodText.match(/\(([^)]+)\)/);
  return match ? match[1] : '';
};

const stemPinyinMap: Record<string, string> = {
  '甲': 'Jia',
  '乙': 'Yi',
  '丙': 'Bing',
  '丁': 'Ding',
  '戊': 'Wu',
  '己': 'Ji',
  '庚': 'Geng',
  '辛': 'Xin',
  '壬': 'Ren',
  '癸': 'Gui',
};

const branchQiMap: Record<string, { main: string; medium?: string; residual?: string }> = {
  '子': { main: '癸' },
  '丑': { main: '己', medium: '辛', residual: '癸' },
  '寅': { main: '甲', medium: '丙', residual: '戊' },
  '卯': { main: '乙' },
  '辰': { main: '戊', medium: '癸', residual: '乙' },
  '巳': { main: '丙', medium: '庚', residual: '戊' },
  '午': { main: '丁', medium: '己' },
  '未': { main: '己', medium: '乙', residual: '丁' },
  '申': { main: '庚', medium: '壬', residual: '戊' },
  '酉': { main: '辛' },
  '戌': { main: '戊', medium: '丁', residual: '辛' },
  '亥': { main: '壬', medium: '甲' },
};

export const BlueprintTable: React.FC<BlueprintTableProps> = ({ pillars }) => {
  const showHour = !!pillars.hour;
  const columnKeys: ('year' | 'month' | 'day' | 'hour')[] = showHour
    ? ['hour', 'day', 'month', 'year']
    : ['day', 'month', 'year'];

  const labels = {
    year: '年 Year',
    month: '月 Month',
    day: '日 Day',
    hour: '時 Hour',
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-xs select-none">
      <div className="overflow-x-auto">
        <div className="w-full min-w-[340px] flex flex-col text-slate-800 text-xs">
          
          {/* Header Row */}
          <div className="flex flex-row bg-slate-50/70 border-b border-slate-100 items-stretch">
            {columnKeys.map((col) => (
              <div 
                key={col} 
                className="flex-1 py-2 px-1 text-center font-black text-slate-700 text-sm border-r border-slate-100 flex items-center justify-center"
              >
                {labels[col]}
              </div>
            ))}
            {/* Extremely compact row header space on the right (w-8 = 32px) */}
            <div className="flex-none w-8 bg-slate-50/25" />
          </div>

          {/* Row 1: Ten Gods */}
          <div className="flex flex-row border-b border-slate-100/70 items-stretch">
            {columnKeys.map((col) => {
              const p = pillars[col];
              if (!p) return null;
              const isDayMaster = p.tenGod.includes('Day Master');
              const formattedTenGod = formatTenGod(p.tenGod);
              return (
                <div 
                  key={col} 
                  className="flex-1 py-1.5 px-1 text-center font-semibold border-r border-slate-100 flex items-center justify-center"
                >
                  <span className={`inline-block px-1.5 py-0.5 rounded-full text-[10px] ${
                    isDayMaster 
                      ? 'bg-slate-900 text-white font-bold' 
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {formattedTenGod}
                  </span>
                </div>
              );
            })}
            <div className="flex-none w-8 p-0.5 text-center bg-slate-50/25 border-l border-slate-100 flex flex-col items-center justify-center">
              <span className="text-[10px] font-bold text-slate-600 leading-tight">十</span>
              <span className="text-[10px] font-bold text-slate-600 leading-tight">神</span>
            </div>
          </div>

          {/* Row 2: Heavenly Stem */}
          <div className="flex flex-row border-b border-slate-100/70 items-stretch">
            {columnKeys.map((col) => {
              const p = pillars[col];
              if (!p) return null;
              const estyle = elementStyles[p.stem.elementEnglish] || elementStyles.Metal;
              const isYin = p.stem.polarity === '-';
              return (
                <div 
                  key={col} 
                  className={`flex-1 py-2.5 px-1 text-center transition-colors border-r border-slate-100 ${estyle.bg}/30 flex flex-col items-center justify-center`}
                >
                  <div className="flex flex-col items-center gap-0.5">
                    {/* Chinese character largest */}
                    <span className={`text-3xl font-black font-display tracking-normal ${estyle.color}`}>
                      {p.stem.character}
                    </span>
                    {/* English name smaller */}
                    <span className="text-[11px] font-bold text-slate-500 mb-0.5">
                      {p.stem.pinyin}
                    </span>
                    {/* Element detail row 1: Polarity icon and Chinese element text */}
                    <span className={`flex items-center gap-0.5 text-[10px] font-bold ${estyle.text}`}>
                      <span>{isYin ? '−' : '+'}</span>
                      <span className="text-xs leading-none">{estyle.icon}</span>
                      <span>{p.stem.elementChinese}</span>
                    </span>
                    {/* Element detail row 2: Polarity and English element text */}
                    <span className="text-slate-500 text-[8px] font-medium leading-none mt-0.5">
                      {p.stem.polarity === '+' ? 'Yang' : 'Yin'} {p.stem.elementEnglish}
                    </span>
                  </div>
                </div>
              );
            })}
            <div className="flex-none w-8 p-0.5 text-center bg-slate-50/25 border-l border-slate-100 flex flex-col items-center justify-center py-2">
              <span className="text-[10px] font-bold text-slate-600 leading-tight">天</span>
              <span className="text-[10px] font-bold text-slate-600 leading-tight mb-1">干</span>
              <span 
                className="text-[7.5px] font-black text-slate-400 uppercase tracking-wider whitespace-nowrap select-none"
                style={{ writingMode: 'vertical-rl' }}
              >
                Heaven Stem
              </span>
            </div>
          </div>

          {/* Row 3: Earthly Branch */}
          <div className="flex flex-row border-b border-slate-100/70 items-stretch">
            {columnKeys.map((col) => {
              const p = pillars[col];
              if (!p) return null;
              const estyle = elementStyles[p.branch.elementEnglish] || elementStyles.Metal;
              const isYin = p.branch.polarity === '-';
              return (
                <div 
                  key={col} 
                  className={`flex-1 py-2.5 px-1 text-center transition-colors border-r border-slate-100 ${estyle.bg}/30 flex flex-col items-center justify-center`}
                >
                  <div className="flex flex-col items-center gap-0.5">
                    {/* Chinese character */}
                    <span className={`text-2xl font-black font-display ${estyle.color}`}>
                      {p.branch.character}
                    </span>
                    {/* Pinyin */}
                    <span className="text-[11px] font-bold text-slate-500 mb-0.5">
                      {p.branch.pinyin}
                    </span>
                    {/* Zodiac Icon & English text */}
                    <div className="flex items-center justify-center gap-0.5 text-[10px] font-bold text-slate-600 bg-slate-100/70 px-1 py-0.5 rounded whitespace-nowrap mb-1">
                      <span>{p.branch.zodiacIcon} {p.branch.zodiacEnglish}</span>
                    </div>
                    {/* Element detail row 1: Polarity icon and Chinese element text */}
                    <span className={`flex items-center gap-0.5 text-[10px] font-bold ${estyle.text}`}>
                      <span>{isYin ? '−' : '+'}</span>
                      <span className="text-xs leading-none">{estyle.icon}</span>
                      <span>{p.branch.elementChinese}</span>
                    </span>
                    {/* Element detail row 2: Polarity and English element text */}
                    <span className="text-slate-500 text-[8px] font-medium leading-none mt-0.5">
                      {p.branch.polarity === '+' ? 'Yang' : 'Yin'} {p.branch.elementEnglish}
                    </span>
                  </div>
                </div>
              );
            })}
            <div className="flex-none w-8 p-0.5 text-center bg-slate-50/25 border-l border-slate-100 flex flex-col items-center justify-center py-2">
              <span className="text-[10px] font-bold text-slate-600 leading-tight">地</span>
              <span className="text-[10px] font-bold text-slate-600 leading-tight mb-1">支</span>
              <span 
                className="text-[7.5px] font-black text-slate-400 uppercase tracking-wider whitespace-nowrap select-none"
                style={{ writingMode: 'vertical-rl' }}
              >
                Earth Branch
              </span>
            </div>
          </div>

          {/* Row 4: Hidden Stems */}
          <div className="flex flex-row items-stretch">
            {columnKeys.map((col) => {
              const p = pillars[col];
              if (!p) return null;
              const hiddenList = p.hiddenStems || [];
              
              const branchChar = p.branch.character;
              const qiConfig: { main: string; medium?: string; residual?: string } = branchQiMap[branchChar] || { main: branchChar };
              
              const slots: (typeof hiddenList[number] | null)[] = [null, null, null];
              
              // Map the hidden stems to their respective slots:
              // Slot 0 (left) = Residual Qi (余气)
              // Slot 1 (center) = Main Qi (本气)
              // Slot 2 (right) = Medium Qi (中气)
              hiddenList.forEach((hs) => {
                if (hs.character === qiConfig.main) {
                  slots[1] = hs;
                } else if (qiConfig.residual && hs.character === qiConfig.residual) {
                  slots[0] = hs;
                } else if (qiConfig.medium && hs.character === qiConfig.medium) {
                  slots[2] = hs;
                } else {
                  // Fallback in case of unmatched elements to avoid losing data
                  if (!slots[0]) {
                    slots[0] = hs;
                  } else if (!slots[2]) {
                    slots[2] = hs;
                  }
                }
              });

              return (
                <div key={col} className="flex-1 py-2 px-0.5 text-center border-r border-slate-100 flex items-stretch justify-center">
                  <div className="flex items-start justify-center gap-1.5 w-full">
                    {slots.map((hs, slotIdx) => {
                      if (!hs) {
                        return <div key={slotIdx} className="flex-1" />;
                      }

                      const isMain = slotIdx === 1; // Center slot is always the main element (本气)
                      const hStyle = elementStyles[hs.elementEnglish] || elementStyles.Metal;
                      const pinyin = stemPinyinMap[hs.character] || '';
                      const abbr = getTenGodAbbreviation(hs.tenGod);
                      const chineseTenGod = getTenGodChinese(hs.tenGod);

                      return (
                        <div
                          key={slotIdx}
                          className="flex flex-col items-center flex-1 py-0.5"
                        >
                          {/* Qi Label (余 / 本 / 中) */}
                          <span className={`text-[8px] font-black px-1 py-px rounded-sm tracking-wider mb-0.5 ${
                            isMain 
                              ? 'bg-slate-900/10 text-slate-800' 
                              : 'text-slate-400 font-bold'
                          }`}>
                            {slotIdx === 0 ? '余' : slotIdx === 1 ? '本' : '中'}
                          </span>

                          {/* Chinese character: slightly bigger for the main element */}
                          <span className={`font-black ${
                            isMain ? 'text-[17px] ' + hStyle.color : 'text-[12px] ' + hStyle.color
                          }`}>
                            {hs.character}
                          </span>
                          
                          {/* Stem English */}
                          <span className="text-[9px] font-bold text-slate-500 leading-tight">
                            {pinyin}
                          </span>

                          {/* Polarity icon representing the element */}
                          <span className="text-[9px] font-bold text-slate-500 flex items-center gap-0.5 my-0.5">
                            <span>{hs.polarity === '-' ? '−' : hs.polarity}</span>
                            <span className="text-xs leading-none">{hStyle.icon}</span>
                          </span>

                          {/* Ten God Abbreviation */}
                          <span className={`text-[9px] font-extrabold leading-tight text-center whitespace-nowrap ${
                            isMain ? 'text-slate-800' : 'text-slate-400 font-medium'
                          }`}>
                            {abbr}
                          </span>

                          {/* Ten God Chinese text directly below */}
                          {chineseTenGod && (
                            <span className={`text-[8px] leading-none mt-0.5 ${
                              isMain ? 'font-medium text-slate-500' : 'font-normal text-slate-400'
                            }`}>
                              {chineseTenGod}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
            <div className="flex-none w-8 p-0.5 text-center bg-slate-50/25 border-l border-slate-100 flex flex-col items-center justify-center py-2">
              <span className="text-[10px] font-bold text-slate-600 leading-tight">藏</span>
              <span className="text-[10px] font-bold text-slate-600 leading-tight mb-1">干</span>
              <span 
                className="text-[7.5px] font-black text-slate-400 uppercase tracking-wider whitespace-nowrap select-none"
                style={{ writingMode: 'vertical-rl' }}
              >
                Hidden Stems
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

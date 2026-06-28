/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Represents read-only localized information about a Heavenly Stem.
 * Strictly computed view-model data. Do not persist.
 */
export interface StemInfo {
  readonly character: string;
  readonly pinyin: string;
  readonly polarity: '+' | '-';
  readonly elementChinese: string;
  readonly elementEnglish: string;
}

/**
 * Represents read-only localized information about an Earthly Branch.
 * Strictly computed view-model data. Do not persist.
 */
export interface BranchInfo {
  readonly character: string;
  readonly pinyin: string;
  readonly zodiacIcon: string;
  readonly zodiacChinese: string;
  readonly zodiacEnglish: string;
  readonly polarity: '+' | '-';
  readonly elementChinese: string;
  readonly elementEnglish: string;
}

/**
 * Represents read-only localized information about a Hidden Heavenly Stem inside an Earthly Branch.
 * Strictly computed view-model data. Do not persist.
 */
export interface HiddenStemInfo {
  readonly character: string;
  readonly polarity: '+' | '-';
  readonly elementChinese: string;
  readonly elementEnglish: string;
  readonly tenGod: string;
}

/**
 * Represents a single Pillar (Year, Month, Day, or Hour) containing computed stems and branches.
 * Strictly computed view-model data. Do not persist.
 */
export interface Pillar {
  readonly tenGod: string;
  readonly stem: StemInfo;
  readonly branch: BranchInfo;
  readonly hiddenStems: readonly HiddenStemInfo[];
}

/**
 * Summary totals of the Five Elements distribution.
 * Strictly computed view-model data. Do not persist.
 */
export interface FiveElementSummaryItem {
  readonly element: string;
  readonly emoji: string;
  readonly chinese: string;
  readonly count: number;
}

/**
 * Distribution summary of the calculated Ten Gods.
 * Strictly computed view-model data. Do not persist.
 */
export interface TenGodSummaryItem {
  readonly tenGod: string;
  readonly count: number;
}

/**
 * VIEW-MODEL ONLY: Represents the computed Metaphysical Blueprint for a Person.
 * 
 * CRITICAL ARCHITECTURAL RULES:
 * 1. This is a computed/derived output only.
 * 2. This structure MUST NEVER be stored in IndexedDB or any other persistent storage.
 * 3. This structure MUST NEVER be mutated after creation (enforced by readonly modifiers).
 * 4. Contains NO raw birth data, NO persistence fields, and NO domain entity references.
 * 5. Intended purely as a read-only representation for UI/rendering layers.
 */
export interface BlueprintMetadata {
  readonly engineVersion: string;
  readonly provider: string;
  readonly generatedAt: string; // ISO String timestamp
}

export interface BirthData {
  readonly dob: string; // YYYY-MM-DD
  readonly birthTime?: string;
  readonly timeAccuracy: 'Exact' | 'ShiChen' | 'Unknown';
}

export interface CalculationProvider {
  readonly providerId: string;
  readonly displayName: string;
  readonly engineVersion: string;
  generateBlueprint(input: BirthData): Blueprint;
}

export interface Blueprint {
  readonly metadata: BlueprintMetadata;
  readonly pillars: {
    readonly year: Pillar;
    readonly month: Pillar;
    readonly day: Pillar;
    readonly hour?: Pillar;
  };
  readonly summary: {
    readonly fiveElements: readonly FiveElementSummaryItem[];
    readonly tenGods: readonly TenGodSummaryItem[];
  };
}


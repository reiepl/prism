/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  computeFourPillars,
  getHiddenStems,
  getTenRelation,
  stemPolarity,
  branchPolarity,
  STEM_ELEMENT,
  BRANCH_ELEMENT,
  type Stem,
  type Branch,
  type Element,
} from '@4n6h4x0r/stem-branch';

// New imports for orchestration
import { AnalyzerManager } from './AnalyzerManager';
import { getBlueprintForPerson } from '../adapter/blueprintAdapter';
import { type Person } from '../types/person';
import { type Blueprint } from '../models/blueprint';
import { type AnalysisContext } from '../../analyzers/common/AnalysisContext';
import { type AnalysisReport } from '../models/AnalysisReport';

// Existing engine exports
export interface RawPillar {
  stem: Stem;
  branch: Branch;
  hiddenStems: Stem[];
}

export interface RawFourPillars {
  year: RawPillar;
  month: RawPillar;
  day: RawPillar;
  hour?: RawPillar;
}

export interface RawElementCount {
  element: Element;
  count: number;
}

export interface RawTenGodCount {
  tenGod: string;
  count: number;
}

export interface RawEngineOutput {
  pillars: RawFourPillars;
  elements: RawElementCount[];
  tenGods: RawTenGodCount[];
}

/**
 * Computes raw pillars, stems, branches, and hidden stems for a given date.
 */
export function computeRawPillars(date: Date, hasHour: boolean): RawFourPillars {
  const calculated = computeFourPillars(date);

  const mapRawPillar = (p: { stem: Stem; branch: Branch }): RawPillar => {
    return {
      stem: p.stem,
      branch: p.branch,
      hiddenStems: getHiddenStems(p.branch).map((hs) => hs.stem),
    };
  };

  const pillars: RawFourPillars = {
    year: mapRawPillar(calculated.year),
    month: mapRawPillar(calculated.month),
    day: mapRawPillar(calculated.day),
  };

  if (hasHour && calculated.hour) {
    pillars.hour = mapRawPillar(calculated.hour);
  }

  return pillars;
}

/**
 * Computes the raw occurrence counts of each of the Five Elements in the active pillars.
 */
export function computeRawElementCounts(pillars: RawFourPillars): RawElementCount[] {
  const counts: Record<Element, number> = {
    '金': 0,
    '木': 0,
    '水': 0,
    '火': 0,
    '土': 0,
  };

  const addStem = (stem: Stem) => {
    const el = STEM_ELEMENT[stem];
    if (el) counts[el]++;
  };

  const addBranch = (branch: Branch) => {
    const el = BRANCH_ELEMENT[branch];
    if (el) counts[el]++;
  };

  const active = [pillars.year, pillars.month, pillars.day];
  if (pillars.hour) {
    active.push(pillars.hour);
  }

  active.forEach((p) => {
    addStem(p.stem);
    addBranch(p.branch);
    p.hiddenStems.forEach((hs) => addStem(hs));
  });

  return Object.entries(counts).map(([element, count]) => ({
    element: element as Element,
    count,
  }));
}

/**
 * Computes the raw occurrence counts of Ten Gods relationships relative to the Day Master stem.
 */
export function computeRawTenGodCounts(pillars: RawFourPillars): RawTenGodCount[] {
  const counts: Record<string, number> = {};
  const dayStem = pillars.day.stem;

  const addRelation = (stem: Stem) => {
    const rel = getTenRelation(dayStem, stem);
    if (rel) {
      counts[rel] = (counts[rel] || 0) + 1;
    }
  };

  // Stems other than the Day Master itself
  addRelation(pillars.year.stem);
  addRelation(pillars.month.stem);
  if (pillars.hour) {
    addRelation(pillars.hour.stem);
  }

  // Hidden stems in all active branches
  const active = [pillars.year, pillars.month, pillars.day];
  if (pillars.hour) {
    active.push(pillars.hour);
  }

  active.forEach((p) => {
    p.hiddenStems.forEach((hs) => addRelation(hs));
  });

  return Object.entries(counts).map(([tenGod, count]) => ({
    tenGod,
    count,
  }));
}

/**
 * Comprehensive engine pipeline for computing all raw metaphysical attributes.
 * Highly decoupled, purely mathematical/astronomical computations.
 */
export function executeEngine(date: Date, hasHour: boolean): RawEngineOutput {
  const pillars = computeRawPillars(date, hasHour);
  const elements = computeRawElementCounts(pillars);
  const tenGods = computeRawTenGodCounts(pillars);

  return {
    pillars,
    elements,
    tenGods,
  };
}

/**
 * Orchestration layer for the PRISM analysis engine.
 */
export class BaZiEngine {
  private readonly analyzerManager: AnalyzerManager;

  constructor() {
    this.analyzerManager = new AnalyzerManager();
  }

  /**
   * Orchestrates the analysis pipeline for a given person.
   */
  public analyze(person: Person): AnalysisReport {
    // 1. Generate the Blueprint
    const blueprint = getBlueprintForPerson(person);

    // 2. Create the AnalysisContext
    const context: AnalysisContext = {
      blueprint,
    };

    // 3. Return the AnalysisReport (Analyzers are not executed in Sprint 2)
    return {
      blueprint,
      analyses: [],
    };
  }
}
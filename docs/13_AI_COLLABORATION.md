Title: AI Collaboration Workflow & Architecture
Document ID: COLL-001
Version: 1.0.0
Status: Active
Last Updated: 2026-06-27

# AI Collaboration & Context Package for PRISM

This document serves as the high-fidelity **AI Context Package** designed for next-frontier AI coding agents and LLM-assisted development environments. It contains the complete architectural blueprints, data flow pipelines, constraints, and coding standards required to work securely and effectively within the PRISM codebase.

---

## 1. Core Architectural Paradigm: PRISM (Data Flow)

PRISM stands for **Personal Relationship Intelligence & Systematic Metaphysics**. To keep the application highly performant, modular, and private, it strictly separates **Facts (User Entries)** from **Knowledge (Astrological Calculations)**.

```text
                  [User Interface Layer]
                            │
                            ▼ (Requests Person Entity)
                 [Repository Layer (Dexie)]
                            │
                            ▼ (Retrieves raw Person facts)
              [Adapter / Translation Boundary]
                            │
                            ▼ (Cleanses time data & calls Engine)
                 [Pure Calculation Engine]
                            │
                            ▼ (Deterministic raw BaZi arrays)
              [Adapter / Translation Boundary]
                            │
                            ▼ (Decorates with localized strings, Pinyin, & Emojis)
                  [User Interface Layer]
                            │
                            ▼ (Renders read-only, immutable Blueprint)
```

### Architectural Gold Rules
1. **Facts are permanent**: The local database (Dexie/IndexedDB) and the `Person` domain entity *must only* store raw, clean facts entered by the user. They are never polluted with calculated data (e.g., element scores, Ten Gods, zodiac signs).
2. **Knowledge is reproducible**: All metaphysical classifications, BaZi pillars, hidden stems, and element ratios are computed on the fly by pure functions.
3. **Strict Boundary Isolations**:
   - The UI **MUST NOT** perform calculations or call the pure engine directly.
   - The Database and Repository **MUST NOT** contain or store calculated/derived fields.
   - The Adapter **MUST NOT** store state or leak domain business rules—it is purely a data mapping boundary.
   - The Engine **MUST** be pure mathematical code with absolutely zero side effects, UI references, or persistence bindings.

---

## 2. Directory Structure and Responsibilities

Any coding agent working on PRISM must maintain this strict separation of directories:

```text
src/
├── app/                  # Route layouts and main view templates
├── components/           # UI Presentation layer
│   └── profile/          # Modular PersonProfile view components
├── lib/
│   ├── types/            # Domain structures & pure facts (e.g., person.ts)
│   ├── db/               # IndexedDB configuration & Dexie store declarations
│   ├── repository/       # Repository interfaces for local persistence
│   ├── engine/           # Pure, stateless mathematical calculation engines (e.g., baziEngine.ts)
│   ├── adapter/          # Multi-language translation, decoration & mapping (e.g., blueprintAdapter.ts)
│   └── models/           # Read-only domain models for presenting computed charts (blueprint.ts)
```

---

## 3. Layer Interfaces & Strict Types

### A. Core Facts Entity (Non-Persistent / Raw Only)
Defined in `/src/lib/types/person.ts`:
```typescript
export interface Person {
  id: string;                      // Stable UUID
  isSelf: boolean;                 // Identifies primary profile owner
  name: string;                    // Formal display name
  nickname?: string;               // Optional shorter nickname
  dob: string;                     // Raw birthdate string: YYYY-MM-DD
  birthTime?: string;              // Raw time string (e.g., HH:MM) or ShiChen label
  timeAccuracy: 'Exact' | 'ShiChen' | 'Unknown';
  relationshipType: string;        // Relationship role to owner (e.g., Friend, Spouse, etc.)
  photo?: string;                  // Raw avatar Data URL or placeholder reference
  createdAt: Date;
  updatedAt: Date;
}
```

### B. Pure Calculation Engine Types & Engine API
Defined in `/src/lib/engine/baziEngine.ts`:
```typescript
import { type Stem, type Branch, type Element } from '@4n6h4x0r/stem-branch';

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
  tenGod: string; // Core Chinese relations representation
  count: number;
}

export interface RawEngineOutput {
  pillars: RawFourPillars;
  elements: RawElementCount[];
  tenGods: RawTenGodCount[];
}

// Stateless, pure mathematical calculations
export function computeRawPillars(date: Date, hasHour: boolean): RawFourPillars;
export function computeRawElementCounts(pillars: RawFourPillars): RawElementCount[];
export function computeRawTenGodCounts(pillars: RawFourPillars): RawTenGodCount[];
export function executeEngine(date: Date, hasHour: boolean): RawEngineOutput;
```

### C. Decorating & Translating Adapter
Defined in `/src/lib/adapter/blueprintAdapter.ts`:
- Formats input times, invokes the pure `baziEngine` calculation logic.
- Implements the generic `CalculationProvider` interface for standard pluggability.
- Maps Chinese characters to localized Pinyin, English, and emojis.
- Exposes a central provider registry `CALCULATION_PROVIDERS`.

```typescript
export interface BirthData {
  readonly dob: string;
  readonly birthTime?: string;
  readonly timeAccuracy: 'Exact' | 'ShiChen' | 'Unknown';
}

export interface CalculationProvider {
  readonly providerId: string;
  readonly displayName: string;
  readonly engineVersion: string;
  generateBlueprint(input: BirthData): Blueprint;
}

export const CALCULATION_PROVIDERS: Record<string, CalculationProvider>;
export const getBlueprintForPerson = (person: Person, providerId?: string): Blueprint;
```

### D. Computed Read-Only View-Model (Blueprint)
Defined in `/src/lib/models/blueprint.ts`:
- All properties are declared `readonly` to enforce immutability.
- No database primary key details, no domain references, purely optimized for rendering.
- Includes vital `metadata` indicating engine provider and version to safely handle model version migrations.

```typescript
export interface BlueprintMetadata {
  readonly engineVersion: string;
  readonly provider: string;
  readonly generatedAt: string; // ISO String timestamp
}

export interface StemInfo {
  readonly character: string;
  readonly pinyin: string;
  readonly polarity: '+' | '-';
  readonly elementChinese: string;
  readonly elementEnglish: string;
}

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

export interface HiddenStemInfo {
  readonly character: string;
  readonly polarity: '+' | '-';
  readonly elementChinese: string;
  readonly elementEnglish: string;
  readonly tenGod: string;
}

export interface Pillar {
  readonly tenGod: string;
  readonly stem: StemInfo;
  readonly branch: BranchInfo;
  readonly hiddenStems: readonly HiddenStemInfo[];
}

export interface FiveElementSummaryItem {
  readonly element: string;
  readonly emoji: string;
  readonly chinese: string;
  readonly count: number;
}

export interface TenGodSummaryItem {
  readonly tenGod: string;
  readonly count: number;
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
```

---

## 4. UI presentation Design System Standards

When building or modifying components:
- **Zero-computation in UI**: UI components (such as `PersonProfile.tsx` or `BlueprintTable.tsx`) simply take the immutable computed structures and map them to standard presentation blocks.
- **High-contrast Minimalist Design**: Maintain deep slate/charcoal gray scales, soft off-whites, balanced negative space, and elegant typography.
- **Strictly No UI Key Forms**: Never display text fields requesting API keys unless explicitly asked.
- **No System-Larping / Telemetry**: Do not clutter outer card margins or headers with developer tags like `"PORT: 3000"`, `"ONLINE"`, or debug logs. Keep the visual appearance incredibly clean, human, and professional.

---

## 5. Development Playbook for AI Agents

When implementing features or refactoring modules:
1. **Always read types and repository first**: Understand the domain fields before writing operations.
2. **Execute incremental compilation**: Run `npm run lint` (`tsc --noEmit`) and `npm run build` incrementally to catch syntax mistakes instantly.
3. **Respect database schema versioning**: If modifying master tables in `db.ts`, make sure to handle schema version migrations via Dexie's migration mechanism, preserving user data.
4. **Prefer dedicated tools**: Avoid generic commands when standard workspace actions (`edit_file`, `create_file`, `view_file`) are available.

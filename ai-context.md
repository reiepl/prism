# PRISM AI Developer & Agent Context Package

Welcome, AI Coding Agent. This file is the global **AI Context Package** for PRISM (Personal Relationship Intelligence & Systematic Metaphysics). It provides the exact architectural specs, data schemas, isolation rules, and design philosophies of this codebase. 

---

## 🚀 1. The Core Paradigm: PRISM (Facts vs. Knowledge)

PRISM operates on a strict **offline-first, privacy-first** architecture. To prevent database bloating and state sync conflicts, the system is designed around one fundamental rule:
> **Store Facts, Generate Knowledge.**

1. **Facts (Master Data)** are raw, immutable inputs entered by the user (DOB, raw birth time, nickname). They are persistent and stored locally in IndexedDB via Dexie.js.
2. **Knowledge (Generated Data)** is computed dynamically on-the-fly from Master Data using deterministic metaphysical engines. It is never persisted, never mutated, and strictly read-only.

---

## 📐 2. The Isolation Boundary Flow (No Leakage)

PRISM enforces a unidirectional, highly decoupled layers architecture. High-level layers must never directly access low-level implementations.

```text
  ┌────────────────────────────────────────────────────────┐
  │                 User Interface (UI)                    │  <-- No BaZi calculation, no direct DB calls.
  └──────────┬──────────────────────────────────▲──────────┘      Renders immutable read-only view-models.
             │                                  │
             ▼ (Requests raw facts)             │ (Returns decorated view-model)
  ┌─────────────────────────────────────────────┴──────────┐
  │              IndexedDB Store & Repositories            │  <-- Stores raw Person. No derived fields.
  └──────────┬─────────────────────────────────────────────┘
             │
             ▼ (Passes clean facts)
  ┌────────────────────────────────────────────────────────┐
  │         Adapter & Boundary Translation Layer           │  <-- Formats dates, translates Chinese characters
  └──────────┬──────────────────────────────────▲──────────┘      to Pinyin & English, adds custom emojis.
             │                                  │
             ▼ (Sends Date + hasHour)           │ (Returns raw numerical datasets)
  ┌─────────────────────────────────────────────┴──────────┐
  │          Pure Mathematical BaZi Engine                 │  <-- Pure stateless algorithms. No UI bindings,
  └────────────────────────────────────────────────────────┘      no localization, zero side-effects.
```

---

## 🗃️ 3. Core Technical Schemas

### Database Schema (Dexie.js / IndexedDB)
Located in `/src/lib/db/db.ts`:
- **Table**: `people`
- **Primary Key**: `id` (stable UUID)
- **Indices**: `isSelf, name, relationshipType, dob, createdAt, updatedAt`
- **Fields**: Must contain raw, clean demographic/birth data only.

### Pure Domain Types (Facts)
Located in `/src/lib/types/person.ts`:
- **Strict Separation**: Contains zero derived variables (e.g. element scores, zodiac, Ten Gods labels).
- Contains metadata fields (`createdAt`, `updatedAt`, `id`).

### Stateless BaZi Engine Pipeline
Located in `/src/lib/engine/baziEngine.ts`:
- Uses the `@4n6h4x0r/stem-branch` underlying library for raw stem-branch computations.
- Exposes pure functions:
  - `computeRawPillars(date: Date, hasHour: boolean): RawFourPillars`
  - `computeRawElementCounts(pillars: RawFourPillars): RawElementCount[]`
  - `computeRawTenGodCounts(pillars: RawFourPillars): RawTenGodCount[]`
  - `executeEngine(date: Date, hasHour: boolean): RawEngineOutput`

### Localization & Mapping Adapter
Located in `/src/lib/adapter/blueprintAdapter.ts`:
- Converts user profile demographics into computational parameters, executes `baziEngine`, and maps outputs to `Blueprint` UI View-Models.
- Implements the pluggable `CalculationProvider` interface and registers implementations inside `CALCULATION_PROVIDERS`.
- Holds PINYIN mapping dictionary, Zodiac icon dictionary, and Ten Gods bilingual nomenclature mapping.

### Read-Only View-Model (Blueprint)
Located in `/src/lib/models/blueprint.ts`:
- Standardized, immutable (`readonly` properties) types representing computed charts for UI components.
- Includes `metadata` fields (engineVersion, provider, generatedAt) representing computed metrics and version signatures.

---

## 🎨 4. Presentation & Interaction Principles

1. **No Logic in UI**: React screens and widgets must only display the fields provided in the decorated `Blueprint`. They do not run any math or logic on top of it.
2. **Minimalist Style**: Ensure the UI utilizes high-contrast typography ("Space Grotesk" matched with "Inter" or "JetBrains Mono"), generous margins, and subtle state transitions.
3. **No Slop or Clutter**: Refrain from creating technical noise (like mock logging lines, port numbers, or "system online" indicators) in visual panels.

---

## 📖 5. Deep-Dive Documentation Index

For complete step-by-step guides, refer to the local files:
- `/docs/03_SYSTEM_ARCHITECTURE.md` - High-level layers structure & domain definitions.
- `/docs/05_DATABASE_SCHEMA.md` - In-depth database modeling and storage logic.
- `/docs/13_AI_COLLABORATION.md` - Active AI collaboration guides and integration checklist.
- `/docs/INDEX.md` - Master documentation roadmap.

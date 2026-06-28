# PRISM_SCORING_SPEC_v1.md

**Document:** PRISM Scoring Engine Specification
**Version:** 1.0.0 (Draft)
**Status:** Sprint 1 Complete (Architecture Frozen)
**Project:** PRISM – Personal Relationship Intelligence System
**Owner:** Elaine Poh

---

# Revision History

| Version | Date | Author     | Description                                       |
| ------- | ---- | ---------- | ------------------------------------------------- |
| 1.0.0   | 2026 | Elaine Poh | Initial architecture specification after Sprint 1 |

---

# Table of Contents

1. Introduction
2. Goals
3. Non-Goals
4. Design Principles
5. Architecture Decision Records (ADR)
6. Overall Architecture
7. Analyzer Framework
8. Rule Framework
9. Configuration Framework
10. Scoring Pipeline
11. Analyzer Specifications
12. Explanation Framework
13. Versioning Strategy
14. Validation Strategy
15. Future Work
16. Appendix A – Terminology
17. Appendix B – Rule Registry
18. Appendix C – Configuration Structure

---

# 1. Introduction

## Purpose

PRISM is a modular BaZi analysis engine designed for transparency, explainability, and long-term extensibility.

Unlike traditional BaZi software, PRISM separates the analysis process into independent layers:

```
Computation
        ↓
Scoring
        ↓
Interpretation
        ↓
Application
```

The deterministic BaZi computation is delegated to the `@4n6h4x0r/stem-branch` library.

PRISM is responsible only for transforming raw BaZi data into structured, explainable scores.

---

# 2. Goals

The scoring engine shall be:

## G1 — Transparent

Every score can be explained.

---

## G2 — Explainable

Every score can be traced back to its contributing evidence.

---

## G3 — Configurable

Weights and modifiers are configuration-driven.

No magic numbers are embedded in code.

---

## G4 — Testable

Every analyzer can be independently unit tested.

---

## G5 — Extensible

New analyzers can be added without modifying existing analyzers.

---

# 3. Non-Goals

This specification does **not** define:

* Personality analysis
* Fortune prediction
* Career interpretation
* Relationship advice
* AI-generated insights
* UI/UX implementation
* Database design

These belong to higher architectural layers.

---

# 4. Design Principles

## P1 – Library First

`@4n6h4x0r/stem-branch` is the single source of truth for deterministic BaZi calculations.

---

## P2 – Transparent

No hidden calculations.

Every score must be reproducible.

---

## P3 – Deterministic

Same input always produces the same output.

---

## P4 – Modular

Every analyzer has a single responsibility.

---

## P5 – Explainable

Every score must include supporting evidence.

---

## P6 – Configurable

Rules and weights are externalized into configuration files.

---

## P7 – School Neutral

PRISM separates calculation from interpretation, allowing different BaZi schools to coexist through configurable rules.

---

## P8 – Evidence Over Opinion

Every conclusion must be supported by evidence.

No interpretation is accepted without traceable calculations.

---

# 5. Architecture Decision Records

## ADR-001 — Raw Score First

Analyzers produce raw scores only.

Normalization belongs to the presentation layer.

---

## ADR-002 — Standard Analyzer Output

Every analyzer returns:

* Result
* Explanation
* Metadata

---

## ADR-003 — Immutable Intermediate Results

Analyzer outputs are immutable.

Analyzers may read previous outputs but never modify them.

---

## ADR-004 — Evidence Layer Architecture

Evidence is classified into:

### Primary Evidence

* Seasonal Strength (月令)
* Rooting (通根)

### Secondary Evidence

* Five Elements
* Friend
* Rob Wealth
* Direct Resource
* Indirect Resource

### Tertiary Evidence

* Output
* Wealth
* Officer
* Interactions
* Combinations
* Clashes

The hierarchy defines evaluation order, not fixed weights.

---

# 6. Overall Architecture

```
Birth Data
        │
        ▼
@4n6h4x0r/stem-branch
        │
        ▼
Raw BaZi Blueprint
        │
        ▼
PRISM Scoring Engine
        │
        ├── Element Analyzer
        ├── Ten God Analyzer
        ├── Day Master Strength Analyzer
        └── Future Analyzers
        │
        ▼
Interpretation Layer (Future)
        │
        ▼
Application Layer
```

---

# 7. Analyzer Framework

Every analyzer follows the same lifecycle.

```
Validate Input
        ↓
Collect Evidence
        ↓
Apply Rules
        ↓
Calculate Raw Score
        ↓
Generate Explanation
        ↓
Attach Metadata
```

---

## Analyzer Contract

Each analyzer shall expose:

* id
* name
* version
* validate()
* analyze()
* explain()

---

## Output Contract

```
{
    result,

    explanation,

    metadata
}
```

---

# 8. Rule Framework

Rules are uniquely identified.

Example:

```
ELM-001
TG-001
DMS-001
```

Each rule consists of:

* Rule ID
* Description
* Evidence Required
* Configuration
* Output

---

# 9. Configuration Framework

Configuration hierarchy:

```
Global
      ↓
Analyzer
      ↓
Rule
```

Example directory:

```
config/

global.yaml

element.yaml

tengod.yaml

strength.yaml
```

---

# 10. Scoring Pipeline

```
Birth Data
        ↓
Library
        ↓
Raw Chart
        ↓
Analyzer
        ↓
Raw Score
        ↓
Explanation
        ↓
Application
```

---

# 11. Analyzer Specifications

---

## 11.1 Element Analyzer

### Purpose

Calculate the raw distribution of the Five Elements within the natal chart.

### Inputs

* Heavenly Stems
* Earthly Branches
* Hidden Stems
* Hidden Stem Ratios
* Seasonal State
* Twelve Growth Stage
* Root Information

### Output

```
Wood

Fire

Earth

Metal

Water
```

Raw scores only.

### Pipeline

```
Base Contribution
        ↓
Season Adjustment
        ↓
Growth Adjustment
        ↓
Root Adjustment
        ↓
Interaction Adjustment (Reserved)
        ↓
Raw Element Score
```

### Notes

Normalization is explicitly excluded.

---

## 11.2 Ten God Analyzer

### Purpose

Calculate the raw distribution of the Ten Gods.

### Inputs

* Day Master
* Ten God Mapping
* Hidden Stem Ratios

### Output

* Friend
* Rob Wealth
* Eating God
* Hurting Officer
* Direct Wealth
* Indirect Wealth
* Direct Officer
* Seven Killings
* Direct Resource
* Indirect Resource

### Pipeline

```
Visible Stem Contribution
        ↓
Hidden Stem Contribution
        ↓
Aggregate
        ↓
Raw Ten God Scores
```

No interpretation.

---

## 11.3 Day Master Strength Analyzer

### Purpose

Evaluate the support received by the Day Master.

### Inputs

Raw Chart

Element Analyzer Output

Ten God Analyzer Output

### Evidence Layers

Primary

* Season
* Root

Secondary

* Element Support
* Friend
* Rob Wealth
* Resources

Tertiary

* Output
* Wealth
* Officer
* Interactions

### Conceptual Formula

```
Strength

=

Season

+

Root

+

Element Support

+

Companion

+

Resource

-

Output

-

Wealth

-

Officer

+

Interaction
```

Weights remain configurable.

### Output

```
Strength Index

Category

Confidence
```

---

# 12. Explanation Framework

Every analyzer shall provide four explanation levels.

---

## Level 1

Summary

Human-readable result.

---

## Level 2

Breakdown

Major contributing factors.

---

## Level 3

Evidence

Every individual contribution.

---

## Level 4

Audit Trail

Complete calculation history including:

* Rules
* Configuration
* Intermediate results
* Versions

---

# 13. Versioning Strategy

Every execution records:

```
Engine Version

Analyzer Version

Algorithm Version

Configuration Version

Library Version
```

This guarantees reproducibility.

---

# 14. Validation Strategy

Each analyzer shall support:

## Level 1

Unit Tests

---

## Level 2

Reference Chart Validation

Comparison against curated charts from books and trusted practitioners.

---

## Level 3

Regression Tests

Verify that future changes do not unintentionally alter validated outputs.

---

# 15. Future Work

Future analyzers include:

* Useful God Analyzer (用神)
* Chart Structure Analyzer (格局)
* Shen Sha Analyzer (神煞)
* Luck Pillar Analyzer (大运)
* Annual Luck Analyzer (流年)
* Relationship Affinity Analyzer
* Compatibility Analyzer
* Personality Analyzer
* AI Insight Generator

These are outside the scope of Version 1.0.

---

# 16. Appendix A – Terminology

| Term          | Definition                                          |
| ------------- | --------------------------------------------------- |
| Raw Score     | Numeric value before any presentation normalization |
| Analyzer      | Independent scoring component                       |
| Evidence      | Data used to support a score                        |
| Rule          | Configurable calculation logic                      |
| Modifier      | Adjustment applied to a rule                        |
| Configuration | External parameters controlling analyzer behavior   |

---

# 17. Appendix B – Rule Registry

| Rule ID | Description                        |
| ------- | ---------------------------------- |
| ELM-001 | Visible Heavenly Stem contribution |
| ELM-002 | Hidden Stem contribution           |
| ELM-003 | Seasonal adjustment                |
| ELM-004 | Growth stage adjustment            |
| TG-001  | Visible Ten God contribution       |
| TG-002  | Hidden Ten God contribution        |
| DMS-001 | Seasonal evidence                  |
| DMS-002 | Root evidence                      |

---

# 18. Appendix C – Configuration Structure

```
config/

global.yaml

element.yaml

tengod.yaml

strength.yaml

rules.yaml
```

Future analyzers shall introduce new configuration files without modifying existing ones.

## Analyzer Contract

Every analyzer shall implement:

- id
- name
- version
- analyze(context)

---

# Sprint 1 Completion Summary

## Completed

* Analysis Principles
* Element Analyzer Specification
* Ten God Analyzer Specification
* Day Master Strength Analyzer Specification
* Explanation Framework
* Analyzer Framework

## Architecture Decisions

* ADR-001 Raw Score First
* ADR-002 Standard Analyzer Output
* ADR-003 Immutable Intermediate Results
* ADR-004 Evidence Layer Architecture

## Sprint Status

**Sprint 1 Complete**

The PRISM Scoring Engine architecture is now frozen at **Version 1.0.0 (Draft)**.

Future architectural changes shall be introduced through new Architecture Decision Records (ADRs) and version updates rather than modifying the frozen specification directly.


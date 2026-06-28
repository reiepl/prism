# 09_FEATURE_REGISTRY

---

## Document Information

**Title:** Feature Registry
**Document ID:** FEATURE-001
**Version:** 1.0.0
**Status:** Active
**Last Updated:** 2026-06-27

---

# Purpose

This document maintains the master inventory of all features within PRISM.

It provides a high-level overview of each feature, its purpose, implementation status, and relationship to other parts of the system.

Detailed functional and UI specifications are documented separately.

---

# Scope

This document defines:

* Feature inventory
* Feature categories
* Priorities
* Dependencies
* Development status

This document does not define:

* UI layouts
* Database schema
* Technical implementation
* Detailed workflows

---

# Feature Status

Use the following status values:

* Planned
* In Design
* In Development
* Testing
* Complete
* Deprecated

---

# Core Feature Categories

## Foundation

| ID      | Feature              | Priority | Status   |
| ------- | -------------------- | -------- | -------- |
| FND-001 | Application Setup    | High     | Complete |
| FND-002 | Settings             | Medium   | Planned  |
| FND-003 | Data Import / Export | High     | Planned  |

---

## People

| ID      | Feature          | Priority | Status         |
| ------- | ---------------- | -------- | -------------- |
| PPL-001 | People Directory | High     | In Development |
| PPL-002 | Person Profile   | High     | Planned        |
| PPL-003 | Person Search    | High     | Planned        |
| PPL-004 | Tags             | Medium   | Planned        |
| PPL-005 | Notes            | Medium   | Planned        |

---

## Blueprint

| ID     | Feature            | Priority | Status  |
| ------ | ------------------ | -------- | ------- |
| BP-001 | Blueprint Overview | High     | Planned |
| BP-002 | Four Pillars       | High     | Planned |
| BP-003 | Five Elements      | High     | Planned |
| BP-004 | Ten Gods           | High     | Planned |
| BP-005 | Hidden Stems       | High     | Planned |
| BP-006 | Luck Pillars       | High     | Planned |

---

## Relationship

| ID      | Feature                | Priority | Status  |
| ------- | ---------------------- | -------- | ------- |
| REL-001 | Relationship Graph     | Medium   | Planned |
| REL-002 | Compatibility Analysis | High     | Planned |
| REL-003 | Relationship Timeline  | Medium   | Planned |

---

## Tong Shu

| ID     | Feature           | Priority | Status  |
| ------ | ----------------- | -------- | ------- |
| TS-001 | Daily Tong Shu    | High     | Planned |
| TS-002 | Activity Analysis | High     | Planned |
| TS-003 | Date Selection    | High     | Planned |
| TS-004 | Calendar View     | Medium   | Planned |

---

## Timeline

| ID     | Feature              | Priority | Status  |
| ------ | -------------------- | -------- | ------- |
| TL-001 | Personal Timeline    | Medium   | Planned |
| TL-002 | Luck Pillar Timeline | High     | Planned |
| TL-003 | Event Correlation    | Medium   | Planned |

---

## AI

| ID     | Feature                 | Priority | Status |
| ------ | ----------------------- | -------- | ------ |
| AI-001 | Insight Generation      | Medium   | Future |
| AI-002 | Relationship Summary    | Future   | Future |
| AI-003 | Natural Language Search | Future   | Future |

---

# Feature Dependencies

Examples:

* Blueprint depends on Person.
* Relationship Analysis depends on Blueprint.
* Timeline depends on Events.
* Tong Shu depends on Calendar Engine.
* AI Insights depend on Generated Data.

---

# Future Feature Specifications

Each major feature should eventually have its own specification document.

Example structure:

```text
docs/
└── features/
    ├── people/
    │   ├── PEOPLE_SPEC.md
    │   ├── PEOPLE_UI.md
    │   └── PEOPLE_WORKFLOW.md
    ├── blueprint/
    ├── relationship/
    └── tongshu/
```

---

# Guiding Statement

The Feature Registry is the single source of truth for what PRISM does.

Every new feature should be added here before implementation begins, ensuring that development remains intentional, traceable, and aligned with the overall product vision.

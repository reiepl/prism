# 20_BLUEPRINT_OVERVIEW

---

## Document Information

**Title:** Blueprint Overview
**Document ID:** ARCH-020
**Version:** 1.0.0
**Status:** Active
**Last Updated:** 2026-06-28

---

# Purpose

This document defines the Blueprint as the core knowledge object within PRISM.

The Blueprint is a structured, generated representation of an individual's birth-based metaphysical profile. It is derived from immutable birth data using a calculation provider and serves as the foundation for all higher-level analytical features.

The Blueprint is a domain model owned by PRISM and is independent of any specific BaZi calculation library.

---

# Scope

This document defines:

* The purpose of the Blueprint
* Its role within PRISM
* High-level contents
* Lifecycle
* Design principles

This document does not define:

* BaZi calculation algorithms
* Third-party library implementations
* TypeScript interfaces
* UI layouts
* Personality interpretations

These are documented separately.

---

# What is a Blueprint?

Within PRISM, a Blueprint is the canonical representation of a person's calculated metaphysical profile.

It transforms immutable birth information into structured knowledge that can be consistently used throughout the application.

A Blueprint is:

* Generated
* Structured
* Reproducible
* Versioned
* Independent of presentation

It is not an interpretation or a prediction.

---

# Blueprint Lifecycle

```text
Person
        │
        ▼
Birth Data
        │
        ▼
Blueprint Service
        │
        ▼
Calculation Provider
        │
        ▼
Blueprint Mapper
        │
        ▼
Blueprint
        │
        ├── Personality
        ├── Work Personality
        ├── Relationship Analysis
        ├── Luck Analysis
        ├── Tong Shu
        └── AI Insights
```

The Blueprint acts as the shared knowledge layer for all analytical modules.

---

# Blueprint Architecture

The Blueprint separates three distinct concerns.

```text
Master Data
        │
        ▼
Calculation
        │
        ▼
Blueprint
        │
        ▼
Analysis
```

### Master Data

Information entered by the user.

Examples:

* Name
* Birth Date
* Birth Time
* Birth Location

Master Data is never generated.

---

### Calculation

A calculation provider transforms Master Data into structured metaphysical information.

Examples include:

* External BaZi libraries
* Future calculation providers
* Alternative calculation engines

The application does not depend directly on any specific provider.

---

### Blueprint

The Blueprint is PRISM's internal representation of calculated knowledge.

It normalizes calculation results into a stable structure that can be consumed by all modules.

---

### Analysis

Higher-level features consume the Blueprint.

Examples include:

* Personality
* Work Personality
* Relationship Compatibility
* Luck Cycle Analysis
* Tong Shu
* AI-generated summaries

These modules never communicate directly with the calculation provider.

---

# High-Level Structure

A Blueprint consists of several logical sections.

```text
Blueprint
│
├── Metadata
├── Source Birth Data
├── Four Pillars
├── Hidden Stems
├── Five Elements
├── Ten Gods
├── Na Yin
├── Twelve Growth Stages
├── Luck Cycles
├── Shen Sha
├── Derived Metrics
└── Engine Metadata
```

The detailed data structure is defined within the application's TypeScript domain model.

---

# Design Principles

The Blueprint follows these principles.

## Library Independent

PRISM owns the Blueprint model.

Third-party libraries supply calculation results but do not define the application's data model.

---

## Deterministic

The same birth information and calculation provider should always generate the same Blueprint.

---

## Reproducible

A Blueprint can always be regenerated from Master Data.

Generated data should never become the only source of truth.

---

## Versioned

Every Blueprint records the calculation provider and engine version used during generation.

This supports future recalculation and data migration.

---

## Structured

The Blueprint stores calculated facts only.

Interpretations belong to higher-level analytical modules.

---

# Relationship with Master Data

PRISM distinguishes between immutable user-entered data and generated knowledge.

```text
Master Data
│
├── Person
├── Birth Data
├── Relationships
├── Events
└── Notes

↓

Generated Data

├── Blueprint
├── Personality
├── Compatibility
├── Luck Cycles
├── Tong Shu
└── AI Insights
```

Only Master Data is directly edited by users.

Generated data is produced by services and may be regenerated at any time.

---

# Relationship with the Calculation Provider

The Blueprint does not expose the structure of any external calculation library.

Instead, PRISM uses an adapter layer to map provider output into its own domain model.

```text
Birth Data
        │
        ▼
Calculation Provider
        │
        ▼
Blueprint Mapper
        │
        ▼
PRISM Blueprint
```

This architecture allows calculation providers to be replaced or upgraded without affecting the rest of the application.

---

# Future Extensions

The Blueprint is designed to support future enhancements without changing its fundamental role.

Potential extensions include:

* Multiple calculation schools
* Additional metaphysical systems
* Advanced statistical metrics
* Engine comparison
* Historical regeneration
* Version migration

These enhancements should remain compatible with the existing Blueprint architecture.

---

# Guiding Principle

The Blueprint is the single source of truth for all calculated metaphysical knowledge within PRISM.

Every analytical feature should consume the Blueprint rather than interacting directly with calculation providers, ensuring consistency, maintainability, and long-term architectural flexibility.

# 06_DOMAIN_MODEL

---

## Document Information

**Title:** Domain Model
**Document ID:** DOMAIN-001
**Version:** 1.0.0
**Status:** Active
**Last Updated:** 2026-06-27

---

# Purpose

This document defines the core domain model of PRISM.

It describes the business concepts, entities, relationships, and value objects that represent both the human and metaphysical aspects of the system.

The Domain Model is independent of user interface, storage, and implementation technologies.

It serves as the conceptual foundation for repositories, calculation engines, and application features.

---

# Scope

This document defines:

* Core business concepts
* Domain entities
* Value objects
* Relationships between entities
* Domain boundaries

This document does not define:

* Database schema
* User interface
* Calculation algorithms
* Technology implementation

---

# Domain Philosophy

PRISM models reality rather than software screens.

The objective is to faithfully represent:

1. Human relationships
2. Chinese metaphysical knowledge
3. Temporal events
4. Calculated insights

The software should adapt to the domain—not the other way around.

---

# Domain Overview

PRISM consists of two interconnected domains.

```text
                 PRISM DOMAIN

        ┌─────────────────────────────┐
        │        Human Domain         │
        └──────────────┬──────────────┘
                       │
                       ▼
        ┌─────────────────────────────┐
        │     Metaphysics Domain      │
        └─────────────────────────────┘
```

The Human Domain provides the facts.

The Metaphysics Domain interprets those facts.

---

# Human Domain

## Person

The primary entity representing an individual.

Responsibilities:

* Identity
* Birth Information
* Relationships
* Events
* Notes
* Tags

---

## Relationship

Represents a connection between two or more people.

Examples:

* Family
* Friendship
* Romantic
* Business
* Mentor
* Client

---

## Event

Represents significant moments in a person's life.

Examples:

* Birth
* Marriage
* Career
* Relocation
* Health
* Education

---

## Note

User observations linked to entities.

---

## Tag

User-defined classification labels.

---

# Metaphysics Domain

## Birth Data

The immutable input for metaphysical calculations.

Contains:

* Birth Date
* Birth Time
* Birth Location
* Calendar System

---

## Calendar

Represents calendrical information required for calculations.

Examples:

* Solar Calendar
* Lunar Calendar
* Solar Terms
* Heavenly Stems
* Earthly Branches

---

## Blueprint

Represents a complete BaZi chart generated from Birth Data.

Composed of:

* Four Pillars
* Hidden Stems
* Ten Gods
* Five Elements
* Na Yin
* Twelve Growth Stages
* Shen Sha
* Useful God

---

## Luck Cycle

Represents the progression of Luck Pillars over time.

---

## Tong Shu

Represents daily calendrical analysis.

Includes:

* Suitable Activities
* Unsuitable Activities
* Day Officer
* Day Stars
* Auspicious and Inauspicious Influences

---

## Analysis

Represents higher-level interpretations derived from calculations.

Examples:

* Relationship Analysis
* Timeline Analysis
* Date Selection
* AI Insights

---

# Domain Relationships

```text
Person
    │
    ▼
Birth Data
    │
    ▼
Blueprint
    │
    ├── Luck Cycle
    ├── Tong Shu
    └── Analysis

Person
    │
    ├── Relationship
    ├── Event
    └── Note
```

---

# Value Objects

Examples of reusable value objects include:

* Heavenly Stem
* Earthly Branch
* Pillar
* Five Element
* Yin Yang
* Ten God
* Na Yin
* Hidden Stem
* Solar Term
* Calendar Date

These objects describe values rather than independent entities.

---

# Aggregate Roots

The principal aggregate roots are:

* Person
* Blueprint
* Relationship

Other objects should generally be accessed through these aggregates.

---

# Domain Boundaries

The Domain Model must remain independent of:

* React
* IndexedDB
* API design
* UI components
* AI implementation

It represents business knowledge only.

---

# Future Expansion

The domain model is designed to accommodate additional systems such as:

* Qi Men Dun Jia
* Zi Wei Dou Shu
* Liu Yao
* I Ching
* Feng Shui

These systems should integrate through the existing domain structure without requiring major redesign.

---

# Guiding Statement

The Domain Model is the conceptual heart of PRISM.

It captures the language, concepts, and relationships of both human life and Chinese metaphysics, providing a stable foundation upon which all technical implementation is built.

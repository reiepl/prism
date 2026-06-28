# 03_SYSTEM_ARCHITECTURE

---

## Document Information

**Title:** System Architecture
**Document ID:** ARCH-001
**Version:** 1.0.0
**Status:** Active
**Last Updated:** 2026-06-27

---

# Purpose

This document defines the overall software architecture of PRISM.

It describes how the application's major components interact, the architectural principles that guide development, and the separation of responsibilities between user interface, business logic, calculation engines, and data storage.

This document serves as the technical blueprint for all future development.

---

# Scope

This document covers:

* Overall system architecture
* Architectural principles
* Software layers
* Data flow
* Module organisation
* Folder organisation
* Future extensibility

This document does **not** describe:

* Database schema
* Individual feature specifications
* UI design
* BaZi or Tong Shu calculation rules

Those are documented separately.

---

# Architecture Goals

PRISM is designed to be:

* Privacy First
* Offline First
* Mobile First
* Modular
* Domain Driven
* Explainable
* Testable
* Extensible
* AI-Friendly

---

# Architectural Principles

## 1. Domain First

The software architecture should reflect the Chinese metaphysics domain rather than the implementation technology.

Business concepts such as Person, Blueprint, Relationship and Tong Shu should remain independent from React components and database implementations.

---

## 2. Separation of Concerns

Each layer has a single responsibility.

* UI presents information.
* Application coordinates workflows.
* Domain models business concepts.
* Engines perform calculations.
* Repository manages persistence.
* Database stores data.

---

## 3. Layer Independence

Higher-level layers must not depend directly on lower-level implementations.

For example:

* UI does not access IndexedDB directly.
* UI does not perform BaZi calculations.
* Engines do not contain React code.
* Database does not contain business logic.

---

## 4. Explainable Computation

Every calculation engine should produce results that can be traced back to the rules and calculations that generated them.

PRISM should favour explainability over opaque algorithms.

---

## 5. Extensibility

New metaphysical systems should be added as independent modules without requiring major architectural changes.

---

# High-Level Architecture

```text
                 User Interface
                        │
                        ▼
               Application Layer
                        │
                        ▼
                 Domain Layer
                        │
                        ▼
             Calculation Engines
                        │
                        ▼
               Repository Layer
                        │
                        ▼
              IndexedDB Storage
```

Each layer communicates only with its immediate neighbouring layer.

---

# Software Layers

## 1. User Interface Layer

Responsible for:

* Pages
* Components
* Dialogs
* Navigation
* User interactions

Technologies:

* React
* TypeScript

The UI never performs business calculations.

---

## 2. Application Layer

Responsible for:

* Coordinating workflows
* Managing application state
* Calling repositories
* Invoking calculation engines

This layer acts as the bridge between the UI and the domain.

---

## 3. Domain Layer

Represents the business concepts of PRISM.

Examples include:

* Person
* Blueprint
* Relationship
* Tong Shu
* Calendar
* Profile

The domain layer contains no UI code.

---

## 4. Calculation Engine Layer

Contains the computational logic of PRISM.

Examples include:

* Calendar Engine
* BaZi Engine
* Tong Shu Engine
* Relationship Engine
* Analysis Engine

Calculation engines should be deterministic, testable and independent of the user interface.

---

## 5. Repository Layer

Responsible for:

* Reading data
* Writing data
* Import
* Export
* Caching

Repositories isolate the application from the underlying database.

---

## 6. Storage Layer

Responsible only for data persistence.

Current implementation:

* IndexedDB

Future implementations may include:

* Cloud Sync
* Local Backup
* External Database

The upper layers should not depend on the storage implementation.

---

# Data Flow

Typical request flow:

```text
User
    │
    ▼
User Interface
    │
    ▼
Application Layer
    │
    ▼
Repository
    │
    ▼
Database
    │
    ▼
Calculation Engine
    │
    ▼
Application Layer
    │
    ▼
User Interface
```

Data always flows through the application layer.

---

# Module Organisation

PRISM is organised into functional modules.

Examples include:

* People
* Blueprint
* Tong Shu
* Relationship
* Calendar
* Settings

Each module should encapsulate:

* User Interface
* Domain Models
* Services
* Calculations
* Tests

Modules should minimise dependencies on one another.

---

# Current Folder Structure

```text
src/
├── app/
├── assets/
├── components/
├── db/
├── lib/
├── repository/
├── types/
├── App.tsx
└── main.tsx
```

As PRISM evolves, additional directories such as `engine/`, `features/`, and `knowledge/` may be introduced to better separate concerns.

---

# Future Architecture

The architecture is designed to support future capabilities without major redesign.

Potential future modules include:

* AI Insight Engine
* Plugin System
* Knowledge Engine
* Cloud Synchronisation
* Import & Export Framework
* Reporting Engine
* Multi-language Support

---

# Architectural Decision Summary

| Decision             | Reason                                                 |
| -------------------- | ------------------------------------------------------ |
| Offline First        | User privacy and reliability                           |
| IndexedDB            | Local browser storage                                  |
| Repository Pattern   | Loose coupling between application and storage         |
| Engine Layer         | Separation of business calculations from UI            |
| Modular Design       | Independent feature development                        |
| Domain-Driven Design | Align software with Chinese metaphysics concepts       |
| Documentation First  | Maintain consistency between design and implementation |

---

# Guiding Statement

PRISM separates domain knowledge from application implementation.

The user interface, storage technology and frameworks may evolve over time, but the underlying domain model and calculation engines should remain stable.

A clear separation between software architecture and metaphysical knowledge ensures that PRISM remains maintainable, extensible and explainable throughout its lifecycle.


# Knowledge Architecture

While this document focuses on the software architecture, PRISM also maintains an independent knowledge architecture.

Traditional Chinese metaphysics knowledge is documented separately from the software implementation.

Examples include:

- BaZi
- Tong Shu
- Heavenly Stems
- Earthly Branches
- Five Elements
- Ten Gods
- Hidden Stems
- Classical References

This knowledge serves as the foundation for future calculation engines but is intentionally kept separate from the software architecture.

The relationship between the software architecture and the knowledge architecture will be documented in a future architecture document.

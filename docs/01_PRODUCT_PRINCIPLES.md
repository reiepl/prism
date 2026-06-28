Title: Product Principles
Document ID: PRD-002

Purpose:
Defines the fundamental principles that guide every product, design and engineering decision within PRISM.

Scope:
Provides decision-making guidelines for future development. These principles should remain stable over time and take precedence over implementation convenience.

# 01A Product Principles

**Version:** 1.0
**Status:** Active

---

# Purpose

This document defines the guiding principles for the design, development, and evolution of PRISM.

These principles take precedence over implementation convenience. Whenever trade-offs arise, decisions should be evaluated against these principles to ensure long-term consistency and maintainability.

---

# Core Philosophy

PRISM is not a fortune-telling application.

PRISM is a **Personal Relationship Intelligence System** that digitises, organises and explains traditional Chinese metaphysics through modern software engineering.

The goal is to help users make informed decisions through structured knowledge, transparent reasoning and explainable analysis.

---

# Product Principles

## 1. Privacy First

Personal information belongs exclusively to the user.

PRISM should operate without requiring user accounts or cloud storage. Sensitive information should remain under the user's control at all times.

### Implications

* Offline storage by default
* No mandatory login
* No unnecessary data collection
* Local database ownership

---

## 2. Offline First

Core functionality must remain available without an Internet connection.

The application should continue to function while travelling, during poor connectivity or when operated in secure environments.

Internet connectivity should enhance the experience, not enable it.

### Implications

* Local database
* Local calculation engines
* Local knowledge base
* Progressive Web App support

---

## 3. Explain Before Recommend

Every recommendation should include a clear explanation.

Users should understand:

* What recommendation is being made
* Why it was made
* Which rules were applied
* Which calculations support it
* The confidence or limitations of the recommendation

PRISM should never produce unexplained conclusions.

---

## 4. Knowledge Before Prediction

PRISM is an educational and analytical platform.

The software should prioritise teaching users how conclusions are reached rather than encouraging blind acceptance.

Understanding creates trust.

---

## 5. Human-Centred Intelligence

PRISM supports human judgement.

The software provides analysis, structure and recommendations, but final decisions always belong to the user.

The objective is to augment decision making, not replace it.

---

## 6. Domain Driven Design

Chinese metaphysics defines the business domain.

Software architecture should model the underlying metaphysical concepts faithfully.

Technical shortcuts should never distort established domain concepts.

Examples include:

* BaZi
* Tong Shu
* Stem-Branch Calendar
* Five Elements
* Ten Gods
* Luck Pillars
* Relationship Analysis

---

## 7. Modular Architecture

Every major knowledge system should be implemented independently.

Examples include:

* Calendar Engine
* BaZi Engine
* Tong Shu Engine
* Relationship Engine
* Analysis Engine

Modules should communicate through clearly defined interfaces.

This allows future expansion without redesigning the application.

---

## 8. Mobile First

The primary experience is designed for mobile devices.

Desktop interfaces should extend the mobile experience rather than define it.

Every screen should remain usable with one-handed interaction.

---

## 9. AI-Assisted, Human-Designed

Artificial Intelligence accelerates development.

Humans define the vision, architecture and domain knowledge.

AI is treated as an engineering partner rather than the product owner.

---

## 10. Consistency Over Complexity

Simple and consistent solutions are preferred over clever implementations.

Every screen, workflow and interaction should feel familiar throughout the application.

Reducing cognitive load improves usability.

---

## 11. Extensibility

PRISM should continue evolving without requiring major redesign.

Future knowledge systems should integrate naturally into the existing architecture.

Potential future modules include:

* Qi Men Dun Jia
* Zi Wei Dou Shu
* Feng Shui
* I Ching
* Traditional Chinese Calendar
* Custom Knowledge Engines

---

## 12. Evidence-Based Implementation

Traditional knowledge should be implemented using verifiable references wherever possible.

Each calculation should be traceable to:

* Classical texts
* Recognised methodologies
* Modern research
* Clearly documented assumptions

When multiple schools of thought exist, PRISM should document the differences instead of presenting a single interpretation as absolute truth.

---

# Engineering Principles

The software should be:

* Reliable
* Maintainable
* Testable
* Explainable
* Modular
* Versioned
* AI-friendly

Documentation should evolve together with the codebase.

---

# Decision Framework

When evaluating new features or architectural changes, ask the following questions:

1. Does this protect user privacy?
2. Can this work offline?
3. Does it improve understanding?
4. Is the reasoning explainable?
5. Does it respect the metaphysical domain?
6. Can it be extended in the future?
7. Does it maintain architectural consistency?
8. Does it improve the overall user experience?

Features that satisfy these principles should generally be prioritised.

---

# Guiding Statement

> PRISM exists to transform centuries of Chinese metaphysical knowledge into a modern, explainable, privacy-first intelligence platform that empowers better understanding of people, relationships and timing.

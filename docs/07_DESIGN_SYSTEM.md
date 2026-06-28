# 07_DESIGN_SYSTEM

---

## Document Information

**Title:** Design System
**Document ID:** DESIGN-001
**Version:** 1.0.0
**Status:** Active
**Last Updated:** 2026-06-27

---

# Purpose

This document defines the design system used throughout PRISM.

The design system establishes the visual language, interaction patterns, reusable components, and design principles that ensure a consistent user experience across the application.

For the MVP, PRISM adopts **Google Material Design 3 (Material You)** as its foundation and extends it with domain-specific components for Chinese metaphysics.

---

# Scope

This document defines:

* Design philosophy
* Design principles
* Material Design adoption
* Design tokens
* Component hierarchy
* Domain-specific components
* Accessibility standards

This document does not define:

* Individual page layouts
* Wireframes
* Feature specifications
* Business logic
* Technical implementation

---

# Design Philosophy

PRISM is an information-centric application.

The interface should help users understand people, relationships, and metaphysical knowledge with minimal cognitive effort.

The design should feel:

* Clear
* Calm
* Consistent
* Trustworthy
* Professional

Visual design should support understanding rather than distract from it.

---

# Design Principles

## 1. Information First

Information is the primary content.

Visual elements exist to improve understanding.

---

## 2. Simplicity

Choose the simplest solution that communicates the required information.

Avoid unnecessary visual complexity.

---

## 3. Consistency

Users should encounter familiar interaction patterns throughout the application.

Reuse components whenever possible.

---

## 4. Progressive Disclosure

Display essential information first.

Allow users to explore deeper levels of information on demand.

---

## 5. Explainability

Generated insights should always be accompanied by supporting information whenever practical.

The interface should help users understand how conclusions were reached.

---

## 6. Mobile First

Every feature should be designed for mobile devices before adapting to larger screens.

---

## 7. Accessibility

Accessibility is a core design requirement.

The application should support:

* readable typography
* sufficient colour contrast
* touch-friendly controls
* responsive layouts
* colour-independent communication

---

# Design Foundation

PRISM adopts **Google Material Design 3 (Material You)** as its baseline design system.

Material Design provides:

* Layout principles
* Typography system
* Colour system
* Component behaviour
* Navigation patterns
* Elevation model
* Motion guidelines
* Accessibility recommendations

Where practical, standard Material Design components should be used instead of creating custom alternatives.

---

# Design Tokens

The design system will maintain a common set of design tokens.

Examples include:

* Colour palette
* Typography scale
* Spacing scale
* Border radius
* Elevation
* Icon size
* Animation duration

These tokens should remain consistent throughout the application.

Specific token values will be documented separately as the visual identity evolves.

---

# Component Hierarchy

PRISM organises UI components into three layers.

```text
Material Design Components
        │
        ▼
PRISM Components
        │
        ▼
Feature Pages
```

---

## Layer 1 — Material Components

Standard Material Design components.

Examples:

* Button
* Card
* Text Field
* Dialog
* Navigation Bar
* Navigation Drawer
* Tabs
* Chip
* Snackbar
* Bottom Sheet

These components should be used whenever they satisfy the product requirements.

---

## Layer 2 — PRISM Components

Reusable components unique to PRISM.

Examples include:

* Person Card
* Blueprint Card
* Four Pillars Display
* Heavenly Stem Badge
* Earthly Branch Badge
* Five Elements Visualisation
* Luck Pillar Timeline
* Tong Shu Day Card
* Relationship Card
* Analysis Panel

These components extend Material Design rather than replace it.

---

## Layer 3 — Feature Pages

Feature pages assemble reusable components into complete user workflows.

Examples:

* Dashboard
* People
* Blueprint
* Relationships
* Tong Shu Planner
* Calendar
* Settings

Pages should contain minimal business logic and maximise component reuse.

---

# Customisation Strategy

Custom UI should only be introduced when Material Design cannot adequately represent domain-specific information.

Typical examples include:

* BaZi visualisations
* Tong Shu displays
* Chinese calendar components
* Relationship diagrams
* Timeline analysis
* Metaphysics charts

Whenever possible, custom components should inherit Material Design interaction patterns.

---

# Responsive Design

PRISM is designed using a mobile-first approach.

Target platforms include:

* Mobile phones
* Tablets
* Desktop browsers

Layouts should adapt gracefully while preserving usability and readability.

---

# Future Visual Identity

The MVP intentionally defers the creation of a unique visual identity.

Future iterations may introduce:

* Brand colours
* Custom typography
* Illustration style
* Iconography
* Motion language
* Theme variants

These enhancements should complement Material Design rather than replace it.

---

# Design Governance

All new components should:

* Follow Material Design principles.
* Reuse existing components whenever possible.
* Maintain consistent spacing and typography.
* Support accessibility requirements.
* Avoid one-off visual patterns.

The design system should evolve gradually alongside the product.

---

# Guiding Statement

The PRISM Design System exists to present complex knowledge in a simple, consistent, and trustworthy manner.

By building upon Google Material Design and extending it only where necessary, PRISM achieves a balance between rapid development, familiar user experiences, and domain-specific functionality.

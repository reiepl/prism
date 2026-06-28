# 08_UI_GUIDELINES

---

## Document Information

**Title:** UI Guidelines
**Document ID:** DESIGN-002
**Version:** 1.0.0
**Status:** Active
**Last Updated:** 2026-06-27

---

# Purpose

This document defines the user interface guidelines for PRISM.

It establishes consistent patterns for page layouts, navigation, interactions, forms, feedback, and information presentation.

These guidelines ensure a predictable, intuitive, and maintainable user experience across the application.

---

# Scope

This document defines:

* Page structure
* Navigation patterns
* Forms
* Lists
* Detail pages
* Dialogs
* Bottom sheets
* Empty states
* Loading states
* Error handling
* User feedback
* Responsive behaviour

This document does not define:

* Visual design
* Design tokens
* Feature requirements
* Business logic

---

# UI Philosophy

PRISM is an information application.

Users spend more time reading, understanding, and exploring than performing repetitive actions.

The interface should therefore prioritise:

* Clarity
* Predictability
* Discoverability
* Low cognitive load

---

# Layout Principles

Every page should follow a consistent structure.

```text
App Bar

↓

Page Header

↓

Primary Content

↓

Secondary Content

↓

Primary Action (if applicable)
```

Pages should avoid unnecessary nesting and excessive scrolling.

---

# Navigation

Use Material Design navigation patterns.

Recommended:

* Bottom Navigation (primary sections)
* Top App Bar
* Back Navigation
* Navigation Drawer (future expansion)

Avoid deep navigation hierarchies whenever possible.

---

# Information Hierarchy

Present information in layers.

Level 1

Essential information.

Example:

* Name
* Birth Date
* Blueprint Summary

↓

Level 2

Supporting information.

Example:

* Four Pillars
* Five Elements
* Relationships

↓

Level 3

Detailed analysis.

Example:

* Hidden Stems
* Shen Sha
* Interpretations
* Historical notes

Users should not be overwhelmed on first view.

---

# Forms

Forms should be:

* Short
* Focused
* Clearly labelled

Guidelines:

* One primary task per form
* Group related fields
* Validate input immediately where appropriate
* Provide helpful error messages

---

# Lists

Lists should:

* Support search
* Support filtering
* Display key information only
* Allow quick navigation to details

Avoid overly dense list items.

---

# Detail Pages

Detail pages should answer:

Who?

What?

When?

Why?

For example, a Person page might include:

* Person Summary
* Blueprint
* Relationships
* Events
* Notes
* Timeline

Information should be grouped into logical sections.

---

# Cards

Cards are the primary container for information.

Cards should:

* Present one topic
* Have a clear title
* Avoid excessive actions
* Support expansion where necessary

---

# Dialogs

Use dialogs for:

* Confirmation
* Small edits
* Important decisions

Avoid placing large forms inside dialogs.

---

# Bottom Sheets

Use bottom sheets for:

* Quick actions
* Selection lists
* Filters
* Mobile-friendly menus

Prefer bottom sheets over dialogs for mobile workflows.

---

# Search

Search should be available wherever the user manages collections.

Examples:

* People
* Events
* Notes
* Relationships

Search should update results in real time where practical.

---

# Empty States

Every empty state should explain:

* Why nothing is displayed
* What the user can do next

Example:

"No people have been added yet."

↓

"Create your first profile to begin."

Avoid blank screens.

---

# Loading States

Loading should:

* Indicate progress
* Preserve layout stability
* Avoid flashing content

Use skeleton placeholders where appropriate.

---

# Error Handling

Errors should be:

* Human-readable
* Actionable
* Specific

Avoid technical error messages.

Instead of:

"Database Error"

Prefer:

"Unable to save this profile. Please try again."

---

# Notifications

Use notifications sparingly.

Examples:

* Save successful
* Import complete
* Export completed

Avoid interrupting users unnecessarily.

---

# Progressive Disclosure

Complex metaphysical information should be revealed gradually.

Example:

Blueprint Summary

↓

Four Pillars

↓

Ten Gods

↓

Hidden Stems

↓

Detailed Interpretation

Users should control how deeply they explore.

---

# Responsive Behaviour

The application should support:

* Mobile
* Tablet
* Desktop

Layouts should expand gracefully without changing interaction patterns.

---

# Accessibility

All interfaces should support:

* Screen readers
* Keyboard navigation (desktop)
* High contrast
* Large touch targets
* Readable typography

Accessibility is a baseline requirement.

---

# UI Consistency Checklist

Before implementing a new screen, verify:

* Uses existing components
* Follows navigation patterns
* Supports responsive layouts
* Handles loading states
* Handles empty states
* Handles error states
* Includes accessibility considerations

---

# Guiding Statement

Every screen in PRISM should help users understand information with confidence.

The interface should remain consistent, predictable, and calm, allowing the knowledge—not the interface—to be the primary focus.

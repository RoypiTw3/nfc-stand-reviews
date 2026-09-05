---
name: scroll-reveal-animations
description: High-performance scroll-triggered entrance animations using IntersectionObserver, staggered cascades, and cubic-bezier easing with zero layout shifts and prefers-reduced-motion support.
---

# Scroll Reveal Animations Skill

## Core Directives
1. **IntersectionObserver Architecture**:
   - Use a single shared `IntersectionObserver` instance with `threshold: 0.1` and `rootMargin: "0px 0px -50px 0px"`.
   - Add `.reveal-ready` and `.revealed` classes to trigger hardware-accelerated CSS transitions (`opacity`, `transform: translateY(20px)` -> `translateY(0)`).
2. **Staggered Delays**:
   - For grid items (steps, product cards, FAQ items), assign progressive CSS delays (e.g. `transition-delay: calc(var(--index, 0) * 80ms)`).
3. **Accessibility & Zero CLS**:
   - When `@media (prefers-reduced-motion: reduce)` is active, immediately reveal all elements without transition or delay.
   - Reserve container dimensions so layout never shifts as elements reveal.

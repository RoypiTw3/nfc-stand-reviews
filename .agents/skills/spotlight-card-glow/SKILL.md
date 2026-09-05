---
name: spotlight-card-glow
description: Creates interactive, hardware-accelerated spotlight and dynamic radial border glows on UI cards that track mouse and touch coordinates seamlessly without performance overhead.
---

# Spotlight Card Glow Skill

## Core Principles
1. **Dynamic Pointer Tracking**: Track pointer coordinates (`--mouse-x`, `--mouse-y`) with a passive listener on card containers or grids.
2. **CSS Radial Gradient Border Glow**:
   - Apply a pseudo-element `::before` or overlay with `background: radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(255, 110, 84, 0.18), transparent 60%)`.
   - Maintain subtle luxury opacity (0 to 1 on hover) rather than blinding or distracting colors.
3. **Hardware Acceleration & Zero Lag**:
   - Use `transform: translate3d(0,0,0)` and `will-change` only where needed.
   - Gracefully fallback on touch devices to a clean static accent border.

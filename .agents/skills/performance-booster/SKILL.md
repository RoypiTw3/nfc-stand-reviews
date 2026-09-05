---
name: performance-booster
description: Mobile web performance booster ensuring sub-1s load times, perfect Core Web Vitals (LCP, CLS, INP), asset compression, zero layout shifts, and battery/data conservation.
---

# Performance Booster Skill

## Mission
Deliver instant, sub-1-second mobile load experiences across all network conditions without sacrificing visual fidelity or design polish.

## Core Directives & Standards

### 1. Zero Render-Blocking Resources
- Inline critical CSS required for above-the-fold content directly in `<style>` tags within `<head>`.
- Preload hero media (LCP candidates) using `<link rel="preload">` with appropriate `as` and `type` attributes.
- Use `loading="lazy"` and `decoding="async"` on all below-the-fold images and iframes.
- Use `fetchpriority="high"` strictly on the single most prominent above-the-fold image or poster.

### 2. Video & Heavy Media Optimization
- Strip audio tracks (`-an`) from background looping videos to reduce size by ~20-30% and guarantee non-blocking autoplay across iOS Safari and Chrome mobile.
- Use `playsinline muted loop autoplay` attributes.
- Provide a lightweight WebP poster thumbnail so visual content is painted before the first video packet arrives.
- Ensure video files are compressed with `H.264 / AAC` compatible baseline profiles for hardware-accelerated playback.

### 3. Font & Typography Loading
- Self-host fonts or load via modern variable fonts with `display=swap` (`font-display: swap;`).
- Preconnect to external font domains (`fonts.googleapis.com`, `fonts.gstatic.com`) with `crossorigin`.
- Subset fonts whenever possible to eliminate unused glyph sets.

### 4. Layout Shift Prevention (CLS = 0)
- Always declare explicit `width`, `height`, or `aspect-ratio` on all media containers, images, and video tags.
- Reserve structural heights for dynamic elements or accordion panels to prevent jumpy layout repaints.
- Use CSS `contain: layout style paint;` or `content-visibility: auto;` on large repeating sections below the fold.

### 5. Mobile Interaction & Touch Responsiveness (INP < 50ms)
- Use standard CSS touch handling (`touch-action: manipulation;`) to eliminate the 300ms mobile tap delay.
- Avoid heavy JavaScript main-thread work during page initialization.
- Keep event listeners passive (`{ passive: true }`) for touch and scroll handlers.

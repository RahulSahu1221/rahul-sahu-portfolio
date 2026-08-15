<div align="center">

# Rahul Sahu - Portfolio
### *Precision Engineering, Presented with Precision.*

A **glassmorphic, multilingual personal portfolio** for an Electrical & Electronics Engineering student - built as a hand-split, dependency-light static site with a floating glass dock, a Cmd/Ctrl+K command palette, a spring-physics adaptive cursor, and full English · Japanese · Hindi language support.

Built entirely in **vanilla HTML, CSS, and JavaScript** - no framework, no build step, no backend.

---

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JAVASCRIPT-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Vanilla JS](https://img.shields.io/badge/NO%20FRAMEWORK-4CAF50?style=for-the-badge)
![Multilingual](https://img.shields.io/badge/EN%20%C2%B7%20JA%20%C2%B7%20HI-5A0FC8?style=for-the-badge)
![Responsive](https://img.shields.io/badge/FULLY%20RESPONSIVE-2196F3?style=for-the-badge)
![Status](https://img.shields.io/badge/STATUS-LIVE-BA7517?style=for-the-badge)
![License](https://img.shields.io/badge/LICENSE-MIT-8BC34A?style=for-the-badge)

---

**If you find this useful as a reference, consider giving it a star!**

</div>

---

## Table of Contents
- [Overview](#overview)
- [Live Demo](#live-demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Repository Structure](#repository-structure)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [Customization Guide](#customization-guide)
- [Performance Notes](#performance-notes)
- [Browser Support](#browser-support)
- [Roadmap](#roadmap)
- [License](#license)
- [Contact](#contact)

---

## Overview

This is the personal portfolio of **Rahul Sahu**, a final-year B.Tech Electrical & Electronics Engineering student targeting core electrical engineering roles with Japanese engineering firms. Rather than a template, it's built as a small design system from scratch: a strict glass depth hierarchy (L1–L3), an iOS-inspired interaction language (spring easing, real material press-states, no gimmick effects), and a translation engine covering English, Japanese, and Hindi with zero runtime dependencies.

## Live Demo

**[rahulsahu1221.github.io/portfolio](https://rahulsahu1221.github.io/portfolio/)** 

## Features

- **Floating glass dock navigation** - macOS-dock-style, with a sliding active-section indicator and scroll-based condense/expand
- **Cmd/Ctrl+K command palette** - fuzzy search with match highlighting, keyboard-navigable, jumps to any section or external link
- **Adaptive spring-physics cursor** - critically-damped trailing ring with velocity-based squash/stretch and context-aware labels
- **Full EN / 日本語 / हिन्दी multilingual support** - English by default, persisted language choice, fonts adapt per script
- **Strict glass depth hierarchy** - L1 (sections) → L2 (cards) → L3 (floating UI), each with its own blur/shadow/border system
- **Metaball & glass-blob backgrounds** - canvas and SVG-turbulence generated, no WebGL dependency
- **Light & dark modes** - with a circular blur-wipe transition instead of a flat crossfade
- **Scroll-linked contact watermark** - parallax + outline-to-gradient-fill sweep
- **Copy-to-clipboard, dynamic favicon, print stylesheet, and Open Graph previews**
- **Device-tier performance scaling** - animation complexity automatically reduces on lower-end hardware; every visual effect runs on one shared, visibility-gated animation loop instead of competing timers
- **Fully responsive** - fluid `clamp()` typography and `auto-fit` grids adapt to any screen size or aspect ratio, not just fixed breakpoints

## Tech Stack

| Layer | Choice |
|---|---|
| Markup | Semantic HTML5 |
| Styling | Modular CSS3 (custom properties, no preprocessor) |
| Behavior | Vanilla JavaScript (ES6+, no framework, no bundler) |
| Fonts | Google Fonts - Cormorant Garamond, Inter, Bebas Neue, Noto Serif/Sans JP & Devanagari |
| Icons | Inline SVG |
| Hosting | GitHub Pages |

## Repository Structure

```
portfolio/
├── index.html
├── css/
│   ├── variables.css        # design tokens - colors, glass, type, motion
│   ├── base.css              # reset, typography, global overlays
│   ├── glass.css              # L1–L3 glass depth system, glass blobs
│   ├── nav.css                 # floating dock navigation
│   ├── cursor.css               # adaptive spring cursor
│   ├── components.css            # buttons, tags, badges, marquee
│   ├── sections.css               # hero, about, experience, contact, etc.
│   ├── cards.css                   # project/cert/experience card system
│   ├── command-palette.css          # Cmd/Ctrl+K palette
│   ├── animations.css                # theme wipe, spatial transitions
│   ├── responsive.css                 # breakpoints, project tabs, modal
│   └── print.css                       # clean print/PDF output
├── js/
│   ├── perf.js                # shared animation ticker + device-tier detection
│   ├── i18n.js                 # translation engine
│   ├── theme.js                  # dark/light toggle + transition
│   ├── cursor.js                  # spring-physics cursor logic
│   ├── nav.js                      # dock scroll-spy, active pill, language menu
│   ├── command-palette.js           # Cmd/Ctrl+K logic
│   ├── scroll-animations.js          # reveals, scroll-glass blur, counters, tilt
│   ├── contact-watermark.js           # parallax + fill sweep
│   ├── canvas-effects.js               # ambient network, sparkle trail, radar
│   ├── metaball.js                      # hero background blob
│   ├── blobs.js                          # decorative glass blobs
│   ├── interactions.js                    # project tabs, cert modal, copy buttons
│   └── main.js                              # small glue logic
├── data/
│   └── translations.js        # EN / JA / HI dictionary
└── assets/
    ├── images/                # certificates, hero photo, OG cover
    └── docs/                  # resume PDF
```

## Getting Started

No build step, no dependencies to install.

1. Clone or download this repository
2. Open `index.html` directly in a browser - that's it

For live-reload while editing, use the **Live Server** extension in VS Code (right-click `index.html` → *Open with Live Server*).

## Deployment

This site is deployed via **GitHub Pages**:

1. Push the repository to GitHub
2. Go to **Settings → Pages**
3. Set Source to *Deploy from a branch*, branch `main`, folder `/ (root)`
4. Save - the live URL appears at the top of the Pages settings within a minute

## Customization Guide

| Want to change... | Edit this file |
|---|---|
| Text / translations | `data/translations.js` |
| Colors, fonts, spacing | `css/variables.css` |
| A project, certificate, or experience entry | `index.html` (matching `<article>` block) + its translation keys |
| Section order or content structure | `index.html` |

## Performance Notes

Every animated effect (ambient network graph, cursor trail, metaball blob, glass-blob drift, parallax, radar chart) subscribes to a single shared ticker in `js/perf.js` instead of running its own loop, and automatically pauses when its element scrolls off-screen. Particle counts, canvas resolution, and blur complexity scale down on lower-core/lower-memory devices via a lightweight device-tier heuristic - no feature is dropped, it just gets lighter.

## Browser Support

Built and tested against current Chrome, Edge, Firefox, and Safari. Uses `backdrop-filter`, CSS custom properties, and `IntersectionObserver` - all have near-universal support; a `@supports` fallback is included for browsers without `backdrop-filter`.

## Roadmap

- [ ] Career timeline view (chronological internships + projects + education)
- [ ] PWA manifest for installability
- [ ] Official certificate verification links alongside issuer images

## License

Released under the **MIT License** - feel free to reference the structure or techniques for your own portfolio; please don't republish the content (name, projects, certificates) as your own.

## Contact

**Rahul Sahu**
Email: [sahurahuloc@gmail.com](mailto:sahurahuloc@gmail.com)
LinkedIn: [rahul-sahu-eee](https://www.linkedin.com/in/rahul-sahu-eee/)
GitHub: [@RahulSahu1221](https://github.com/RahulSahu1221)

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **static landing page** for COZAM Technologies, a Venezuelan AI automation company. It uses vanilla HTML, CSS, and JavaScript — no build system, no package manager, no bundler.

## Running the Project

Open `index.html` directly in a browser, or serve with any static server:

```bash
python3 -m http.server 8080
# or
npx serve .
```

There are no build steps, compilation, or installation required.

## Architecture

Three core files:

- **`index.html`** — Single-page layout with semantic sections: `#inicio`, `#problemas`, `#soluciones`, `#metodo`, `#casos`, `#fundador`, `#calculadora`, `#faq`, `#contacto`. Each section uses `data-nav-theme` to signal the navbar color scheme.
- **`style.css`** — CSS custom properties define the design tokens (colors, spacing, shadows). Primary color is `#0052FF`, secondary `#00C2FF`, dark background `#020617`.
- **`script.js`** — Vanilla JS with no imports. Key systems: particle canvas with mouse repulsion physics, scroll reveal via IntersectionObserver, typing animation, chat demo simulator, ROI calculator slider, and counter animations.

External CDN dependencies (no local install):
- **Lucide Icons** via `unpkg.com/lucide@latest` — initialized with `lucide.createIcons()`
- **Google Fonts** — Inter (weights 300–800)

## Design System

The `design-system/` directory contains MASTER.md files with brand guidelines for colors, typography, spacing tokens, and component specs. These are **reference documents** — use them when making visual changes to maintain brand consistency. The hierarchy is: `design-system/cozam-technologies/MASTER.md` (primary brand) → page-specific overrides.

The `.agent/skills/ui-ux-pro-max/` directory contains a Claude Code skill with design intelligence (50+ styles, 96 palettes, 57 font pairings). Use the skill when making significant design decisions.

## Contact Form

The contact form submits via `fetch()` POST to a webhook URL hardcoded in `script.js`. To change the endpoint, update the `fetch` call in the form submission handler.

## Git Workflow

- Develop on branch `claude/init-project-hase9`
- Push with: `git push -u origin claude/init-project-hase9`
- `design-system/` and `.agent/` are gitignored — do not attempt to commit changes to those directories

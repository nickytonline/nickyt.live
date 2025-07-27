# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Nick Taylor's personal website built with Astro, featuring:

- Server-side rendering with Netlify adapter
- React components for interactive elements
- TailwindCSS for styling
- Content collections for talks/presentations
- TypeScript throughout

## Essential Commands

Development workflow:

```bash
npm run dev          # Start dev server at localhost:4321
npm run build        # Type check and build (runs astro check && astro build)
npm run preview      # Preview production build locally
```

Code quality:

```bash
npx eslint --cache --fix *.{js,jsx,ts,tsx}  # Lint and fix JS/TS files
npx prettier --write *.{js,jsx,ts,tsx,css,md}  # Format files
```

Note: This project uses lint-staged with husky for pre-commit hooks that automatically format and lint staged files.

## Architecture

### Content Management

- **Content Collections**: Talks are managed via Astro's content collections in `src/content/talks/`
- **Schema**: Defined in `src/content/config.ts` with strict typing for talk metadata (title, date, video, venue, tags, etc.)

### Component Structure

- **Astro Components**: Most UI components are Astro files for optimal performance
- **React Components**: Used sparingly for interactive features (EventCalendar.tsx, StreamSchedule.astro)
- **Utilities**: Animation utilities in `src/utils/` including GSAP-based spring animations

### Styling

- **TailwindCSS**: Primary styling framework with base styles disabled in astro.config.mjs
- **Global CSS**: Minimal global styles in `src/styles/global.css`

### Key Directories

- `src/pages/` - File-based routing, includes dynamic talk pages
- `src/components/` - Reusable UI components
- `src/utils/` - Helper functions for dates, animations, coordinates
- `public/assets/` - Static assets including talk thumbnails

## Development Notes

- TypeScript configuration includes strict type checking
- ESLint configured with Astro-specific rules and TypeScript support
- Content is markdown-based with frontmatter for metadata
- Video embeds support YouTube, Vimeo, and custom players

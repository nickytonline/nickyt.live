# Repository Guidelines

## Project Structure & Module Organization

- `src/pages/` holds Astro route entries; each `.astro` file maps to a page.
- `src/components/` and `src/layouts/` host reusable Astro/React pieces; co-locate CSS modules or Tailwind classes with the component.
- `src/content/` stores markdown data (talks, posts) validated by content collections; update accompanying schemas when adding fields.
- Shared utilities live in `src/utils/`; global styles and Tailwind layers are under `src/styles/`.
- Static assets belong in `public/`; keep authored images in `src/images/` to benefit from Astro’s optimizers.
- Deployment config sits in `netlify/` and `netlify.toml`; the built site is emitted to `dist/` by the build pipeline.

## Build, Test, and Development Commands

- Run `npm install` once to pull Node dependencies.
- `npm run dev` (alias `npm start`) boots the Astro dev server with fast refresh at `http://localhost:4321`.
- `npm run build` performs `astro check` type safety and outputs production assets to `dist/`.
- `npm run preview` serves the latest build for smoke-testing before pushing.

## Coding Style & Naming Conventions

- Format code with Prettier (2-space indent, semicolons, single quotes) and lint via the flat `eslint.config.js`; both run through Husky + lint-staged.
- Name React components and Astro layouts with PascalCase (`HeroSection.tsx`), utility modules with camelCase (`date-utils.ts`), and markdown entries with kebab-case.
- Prefer Tailwind utility classes for styling; add shared tokens in `tailwind.config.mjs` or `src/styles/tokens.css`.

## Testing Guidelines

- There is no dedicated test runner yet; at minimum ensure `npm run build` succeeds locally.
- When adding data collections, extend the relevant schemas under `src/content/config.ts` to maintain type safety.
- Provide manual reproduction steps or screenshots in PRs for UI changes, and consider adding integration coverage once the testing stack lands.

## Commit & Pull Request Guidelines

- Follow the Conventional Commits pattern already in history (`feat:`, `fix:`, `chore:`) and keep scopes short.
- Group related changes per commit so Husky hooks stay fast.
- PRs should include a concise summary, linked issue (if any), before/after visuals for UI work, and notes on testing or roll-out impact.
- Request review from a maintainer and wait for Netlify deploy previews to pass before merging.

## Content & Deployment Notes

- Define required environment variables in `.env` and mirror typing in `src/env.d.ts`; never commit secrets.
- Manage configuration through Varlock (`https://varlock.dev`) and update `.env.schema` whenever you add keys; reference variables via `import { ENV } from "varlock/env"` so Netlify-injected values stay typed.
- Netlify functions live under `netlify/functions`; use the Netlify CLI (`netlify dev`) if you need to exercise serverless handlers locally.
- Keep `setup-hooks.sh` executable so collaborators get Husky hooks by running `npm install`.

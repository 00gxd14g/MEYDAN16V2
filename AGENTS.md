# Repository Guidelines

## Project Structure & Module Organization
- `public/` — Static site: `index.html`, `styles/`, `scripts/`, and `assets/`.
- `server.js` — Express server (static hosting, caching, security, routes).
- `scripts/` — One-off utilities (e.g., image helpers).
- See `IMAGE_NAMING_CONVENTION.md` for asset folders and file patterns.

## Build, Test, and Development Commands
- `npm install` — Install dependencies (Node >= 14).
- `npm start` — Start Express server on `http://localhost:3000`.
- `npm run dev` — Dev mode with auto-reload via `nodemon`.
- `npm run lint` — Lint and auto-fix JS in `public/scripts` and `server.js`.
- `npm test` — Placeholder (exits 0). Add tests before using.

## Coding Style & Naming Conventions
- JavaScript: 4-space indent, semicolons required, single quotes preferred, `eqeqeq` enforced, 1TBS brace style. See `.eslintrc.json`.
- Naming: variables/functions `camelCase`, classes `PascalCase`, files `kebab-case`.
- Assets: lowercase, hyphen-separated; follow `IMAGE_NAMING_CONVENTION.md`.
- Avoid `var`; prefer `const`/`let`. Keep functions small and focused.

## Testing Guidelines
- Framework not configured yet. Recommended: Jest for server utilities and pure JS.
- Name tests `*.test.js` or `*.spec.js`. Co-locate near code or create `tests/`.
- Run with `npm test` (update script once Jest is added). Aim for meaningful coverage of navigation logic, form validation, and sliders.

## Commit & Pull Request Guidelines
- Commits: concise, imperative subject. Prefer Conventional Commits (e.g., `feat: add hero CTA`).
- PRs: clear description, linked issues, steps to verify locally, and screenshots for UI changes.
- Quality gate: `npm run lint` must pass; no large unoptimized assets (target 200–500KB; <=2MB max).

## Security & Configuration Tips
- `PORT` is configurable via environment. Security headers via `helmet` (CSP relaxed for inline styles).
- Do not commit secrets or `.env`. Keep third-party scripts minimal and loaded securely.

## Agent-Specific Instructions
- Keep changes minimal and targeted; match existing patterns.
- Do not add bundlers or frameworks without discussion.
- If adding new pages/routes, update `server.js` and `public/` consistently.

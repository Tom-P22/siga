# SIGA Frontend - Agent Context

React + TypeScript + Vite SPA for SIGA (Sistema Integrado de Gestión Aduanera).
This file guides AI agents to build the frontend according to project requirements and technical constraints.

## 1. Project Domain & Scope (SIGA)
You are building a frontend prototype for a Chilean-Argentine border control system. Maintain all mock data in React state or localStorage (No real backend).
- **Security:** Login (RUT/Password), logout, and internal audit log.
- **Autoatención:** Passenger self-service tótems.
- **Control de Aduana:** QR code capture, LPR camera simulation (license plates), 180-day limits for private vehicles / 90 days for diplomats, and mandatory dual physical copy printing layout.
- **Control SAG:** Digital affidavit (Declaración Jurada) validation.
- **Analytics:** Admin dashboards and CSV/Data export.

## 2. Theme & Design (Tailwind CSS v4)
The project uses Tailwind CSS v4. Theme customization is strictly handled inside `src/index.css` via the `@theme` directive. 
- **DO NOT** create or look for `tailwind.config.js` or `postcss.config.js`.
- **Color Palette (Mandatory for Institutional UI):**
  - Main Brand: `bg-aduana` / `text-aduana` (#1e3a8a) - For headers, login cards, primary buttons.
  - Interactive: `hover:bg-aduana-dark` (#172554) - For hover states on primary buttons.
  - Accent/Alerts: `bg-aduana-light` / `text-aduana-light` (#3b82f6) - For badges, active links, focused borders.
- **Layouts:** Must be modern and responsive (`flex`, `grid grid-cols-1 md:grid-cols-2`, `rounded-xl`, `shadow-md`).

## 3. Commands

| Action | Command |
|--------|---------|
| Dev | `npm run dev` |
| Build | `npm run build` (runs `tsc -b` then `vite build`) |
| Lint | `npm run lint` |
| Preview | `npm run preview` |

## 4. Codebase conventions

- **TS strict mode**: `verbatimModuleSyntax` → always use `import type` for type-only imports. `erasableSyntaxOnly` → no enums or namespaces (use union types instead).
- **Components**: Place in `src/components/`, use `React.FC<Props>` with named exports. Strong typing for all props.
- **Views**: Place in `src/views/`, page-level named-export components.
- **Styles**: Tailwind utility classes inline. Global/base styles only in `src/index.css`.
- **Language**: Spanish (UI strings, code comments, git commits).

## 5. Build quirks

- `npm run build` runs `tsc -b` (project references `tsconfig.app.json` + `tsconfig.node.json`) before `vite build`. Any type error or unused variable will fail the build. Keep it clean.
- **No test framework** configured. No CI workflows.

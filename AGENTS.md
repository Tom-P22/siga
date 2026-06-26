# SIGA Frontend

React + TypeScript + Vite SPA for SIGA (Sistema Integrado de Gestión Aduanera).

## Commands

| Action | Command |
|--------|---------|
| Dev | `npm run dev` |
| Build | `npm run build` (runs `tsc -b` then `vite build`) |
| Lint | `npm run lint` |
| Preview | `npm run preview` |

## Codebase conventions

- **TS strict mode**: `verbatimModuleSyntax` → use `import type` for type-only imports. `erasableSyntaxOnly` → no enums or namespaces.
- **Components**: `src/components/`, `React.FC<Props>` with named exports.
- **Views**: `src/views/`, page-level named-export components.
- **Styles**: Tailwind utility classes inline. Global/base styles in `src/index.css`.
- **Language**: Spanish (UI strings, comments, commits).

## Build quirks

- `npm run build` runs `tsc -b` (project references `tsconfig.app.json` + `tsconfig.node.json`) before `vite build`. Type errors fail the build.
- **No test framework** configured. No CI workflows.

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev         # start Vite dev server
npm run build        # tsc -b (project-references typecheck) then vite build
npm run preview       # preview the production build
npm run lint         # eslint .
npm run typecheck      # tsc -b --noEmit
```

There is no test runner configured in this repo yet.

## Architecture

This is a Vite + React 19 + TypeScript SPA (`local-quest-fe`), the frontend for a hackathon app ("로컬퀘스트"). Key structural conventions:

- **Path alias**: `@/*` resolves to `src/*` (configured in both `vite.config.ts` and `tsconfig.app.json`). Always import via `@/...`, not relative paths across folders.
- **Entry chain**: `index.html` → `src/main.tsx` (mounts `<App />` in `StrictMode`) → `src/App.tsx`, which renders `<GlobalStyles />` once and then `<RouterProvider router={router} />`.
- **Routing**: a single `createBrowserRouter` instance lives in `src/router/index.tsx`. New pages are added there as route entries and live under `src/pages/`.
- **Styling**: `@emotion/styled` is the convention — components are built with `styled.div`/`styled.button` etc. inside the page/component file, not the `css` prop (no `jsxImportSource` is configured for that). Global/reset styles live in `src/styles/GlobalStyles.tsx` via `@emotion/react`'s `<Global>` and are injected once in `App.tsx`.
- **State**: global/shared state uses `zustand` stores under `src/store/`, one store per concern (e.g. `useCounterStore.ts`), created with `create<State>((set) => ({...}))`.
- **API calls**: a single shared `axios` instance is exported from `src/api/client.ts` (`apiClient`), with `baseURL` read from `VITE_API_BASE_URL` (falls back to `/api`) and a 10s timeout. New API calls should go through this instance rather than creating new axios instances.
- **TypeScript**: strict mode is on, including `noUnusedLocals`, `noUnusedParameters`, and `noFallthroughCasesInSwitch` — unused imports/vars will fail the build (`tsc -b`), not just lint.

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Aire Comprimido** is a business web application for a compressed air equipment company. It has two distinct sections: a public-facing marketing site and a password-protected admin panel for managing maintenance reports.

## Tech Stack

- **Framework**: Next.js 16 (App Router) with TypeScript
- **Styling**: Tailwind CSS v4
- **Database/Auth**: Supabase (PostgreSQL + Auth)
- **Deployment**: Static export (`output: "export"`) — no server-side rendering

## Commands

```bash
npm run dev    # Start development server (http://localhost:3000)
npm run build  # Build static export to /out
npm run lint   # Run ESLint
```

## Architecture

The app uses Next.js route groups to split public and admin sections:

- `app/(public)/` — Marketing site (home, equipos, mantenimiento, repuestos). No auth required. Static content.
- `app/(admin)/` — Admin panel (reportes, dashboard, generador_qr). Requires Supabase auth. Wraps all routes in `AuthProvider` + `ProtectedRoute`.
- `app/login/` — Login page for admin access.

### Auth Flow

`AuthContext` (`app/_context/AuthContext.tsx`) holds the Supabase session. The admin layout wraps children in `<AuthProvider><ProtectedRoute>`, which redirects to `/login` if no session is found. Auth uses `@supabase/supabase-js` directly (client-side only, since this is a static export).

### Data Layer

All Supabase queries live in custom hooks under `app/hooks/`:

- `useInformes` — paginated, filterable list of maintenance reports (`informes` table). Supports server-side filtering by empresa/area/equipo/year/month and full-text search via `ilike`.
- `useEmpresas`, `useAreas`, `useEquipos` — supporting data for filter dropdowns. Each exposes a `refetch(filters?)` callback to reload with new constraints.
- `useAlert` — lightweight alert state for error/success messages.

Hooks follow a consistent pattern: `{ data, loading, error, refetch }`. The `useInformes` hook additionally exposes pagination state (`page`, `totalPages`, `totalCount`, `pageSize`, `isPaginating`).

### Database Types

All Supabase table types are defined in `app/types/database.ts`: `Informe`, `Empresa`, `Equipo`, `Area`.

### Public Site

The public section is fully static. Equipment catalog data is loaded from `public/equipos.json`. The `(public)/_components/` directory contains shared components (header, footer, slider, contact forms, etc.).

### Static Export Constraint

`next.config.ts` sets `output: "export"` with `images: { unoptimized: true }`. This means:
- No API routes, server actions, or SSR — everything must be client-side or static
- No `next/image` optimization (images are served as-is)
- Supabase is accessed directly from the browser using `NEXT_PUBLIC_*` env vars

## Environment Variables

Required in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

## Key Patterns

- Shared global components (Alert, Spinner, Loader, DataTable) live in `app/_components/`
- Admin-specific components (Aside, Header, NewReportForm, DataList) live in `app/(admin)/_components/`
- The `useDebounce` hook (`app/_hooks/useDebounce.ts`) is used to delay search queries while typing
- Filter interdependency in the Reportes page: selecting a company resets area/device filters and refetches those dropdowns with the company constraint; selecting a device auto-populates company and area

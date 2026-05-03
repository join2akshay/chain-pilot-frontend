# ChainPilot: React + Vite Refactoring Guide

## What Changed

### Previous Architecture
- **Framework**: TanStack Start (full-stack meta-framework with SSR)
- **Routing**: TanStack Router v1 (file-based routing)
- **Deployment**: Cloudflare Workers
- **Build Tool**: Vite + @lovable.dev/vite-tanstack-config
- **HTTP Method**: Server-side rendering + Client-side hydration

### New Architecture
- **Framework**: React 19 + React Router v6
- **Routing**: React Router (BrowserRouter client-side)
- **Deployment**: Standard HTTP servers (Vercel, Netlify, static hosting)
- **Build Tool**: Standard Vite
- **HTTP Method**: Pure client-side SPA (Single Page Application)

---

## File Structure Changes

### Removed/Updated Files
- ✅ **vite.config.ts** - Updated from @lovable.dev config to standard Vite
- ✅ **package.json** - Removed TanStack dependencies, added react-router-dom
- ✅ **index.html** - Created (was not needed before)
- ✅ **src/main.tsx** - Created (new entry point)
- ✅ **src/App.tsx** - Refactored with React Router setup
- ✅ **src/router.tsx** - Marked as deprecated
- ✅ **src/routeTree.gen.ts** - No longer needed
- ✅ **src/routes/__root.tsx** - No longer used
- ✅ **src/routes/index.tsx** - No longer used (landing page in App.tsx)

### Updated Route Files
All route files converted from TanStack syntax to React components:
- `src/routes/app.index.tsx` - Dashboard
- `src/routes/app.wallet.tsx` - Wallet Intelligence
- `src/routes/app.recommendations.tsx` - AI Recommendations
- `src/routes/app.signals.tsx` - Onchain Signals
- `src/routes/app.simulator.tsx` - Portfolio Simulator
- `src/routes/app.feed.tsx` - Transaction Feed

### Component Changes
- ✅ **AppShell.tsx** - Updated to use React Router `useLocation()` instead of TanStack Router
- ✅ **AppContext.tsx** - No changes needed (remains as context provider)
- ✅ **tsconfig.json** - Updated for standard Vite + React

---

## Key Code Changes

### Before: TanStack Router Route Definition
```typescript
export const Route = createFileRoute("/app/wallet")({
  head: () => ({
    meta: [ /* ... */ ],
  }),
  component: WalletPage,
});

function WalletPage() { /* ... */ }
```

### After: React Router Component
```typescript
export default function WalletPage() { 
  /* ... */
}
```

### Before: Navigation with TanStack
```typescript
import { Link, useRouterState } from "@tanstack/react-router";

const path = useRouterState({ select: (r) => r.location.pathname });
<Link to="/app/wallet">Navigate</Link>
```

### After: Navigation with React Router
```typescript
import { Link, useLocation } from "react-router-dom";

const location = useLocation();
const path = location.pathname;
<Link to="/app/wallet">Navigate</Link>
```

### Before: AppShell with TanStack
```typescript
<Outlet />
```

### After: AppShell with React Router
```typescript
<Routes>
  <Route path="/" element={<Dashboard />} />
  <Route path="/wallet" element={<WalletPage />} />
  {/* ... more routes ... */}
</Routes>
```

---

## New Build & Development Commands

### Development
```bash
npm run dev
# Starts Vite dev server at http://localhost:5173
```

### Production Build
```bash
npm run build
# Runs: tsc -b && vite build
# Outputs to: dist/
```

### Preview Production Build
```bash
npm run preview
# Serves the production build locally
```

---

## Dependency Changes

### Removed (TanStack Stack)
- `@tanstack/react-start` (SSR meta-framework)
- `@tanstack/react-router` (file-based routing)
- `@tanstack/router-plugin` (Vite plugin)
- `@lovable.dev/vite-tanstack-config` (custom Vite config)
- `@cloudflare/vite-plugin` (Cloudflare Workers)

### Added (React Router Stack)
- `react-router-dom` ^6.20.0

### Kept (Unchanged)
- React 19, Vite, TailwindCSS, Radix UI
- All Web3 libraries (Reown AppKit, Ethers, Wagmi)
- All form libraries (React Hook Form, Zod)
- All UI components and utilities

---

## Routing Structure

### New Route Hierarchy
```
/
├── / (Landing Page)
│   ├── Navbar
│   ├── Hero
│   ├── Features
│   ├── WalletConnect
│   ├── AIChat
│   ├── Market
│   └── Footer
│
└── /app (Protected App)
    ├── / (Dashboard)
    ├── /wallet (Wallet Intelligence)
    ├── /recommendations (AI Recommendations)
    ├── /signals (Onchain Signals)
    ├── /simulator (Portfolio Simulator)
    └── /feed (Transaction Feed)
```

All routes managed by React Router BrowserRouter at the App component level.

---

## Deployment Notes

### Before (Cloudflare Workers)
```bash
# Deployment via wrangler
wrangler deploy
```

### After (Standard HTTP)
Deploy the `dist/` folder to:
- Vercel: `vercel deploy`
- Netlify: `netlify deploy --prod --dir=dist`
- Static hosting: Upload `dist/` contents
- Self-hosted: Serve `dist/` with any HTTP server

**Important**: Configure your server to redirect all routes to `index.html` for SPA routing.

---

## Testing the New Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Start dev server
```bash
npm run dev
```

### 3. Build for production
```bash
npm run build
```

### 4. Test production build locally
```bash
npm run preview
```

---

## Migration Checklist

- [x] Remove TanStack dependencies from package.json
- [x] Add react-router-dom to dependencies
- [x] Update vite.config.ts to standard Vite + React
- [x] Create index.html entry point
- [x] Create src/main.tsx entry point
- [x] Create src/App.tsx with BrowserRouter setup
- [x] Convert route files to simple components
- [x] Update AppShell to use React Router
- [x] Update tsconfig.json
- [x] Update router.tsx (mark as deprecated)
- [x] Test TypeScript compilation

---

## Benefits of the New Architecture

✅ **Simpler Build Process**: No custom Vite config needed
✅ **Easier Deployment**: Deploy anywhere (Vercel, Netlify, S3, etc.)
✅ **Standard React**: Use ecosystem tools and knowledge
✅ **Smaller Bundle**: No SSR overhead, cleaner dependency tree
✅ **Faster Development**: Familiar React Router ecosystem
✅ **Better IDE Support**: Standard TypeScript + React setup
✅ **Easier Scaling**: Add features without meta-framework complexity

---

## Troubleshooting

### Port 5173 already in use
```bash
npm run dev -- --port 5174
```

### Clean rebuild
```bash
rm -r node_modules dist
npm install
npm run build
```

### TypeScript errors
```bash
tsc --noEmit
```

### Router not working
Ensure BrowserRouter wraps your entire app in src/App.tsx - check index.html routes to /app are using relative Links.

---

## Next Steps

1. Test the dev server: `npm run dev`
2. Verify all routes load correctly
3. Test wallet connection flow
4. Check API integration still works
5. Build for production: `npm run build`
6. Deploy dist/ to your chosen hosting platform

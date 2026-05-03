# 🚀 ChainPilot - Deployment Guide

This guide walks you through deploying **ChainPilot** (a TanStack Start + Vite + React app) to **Netlify** or **Vercel**, step by step.

> The project is built with TanStack Start v1, React 19, Vite 7, and Tailwind CSS v4. The default template targets Cloudflare Workers, but it deploys cleanly to Netlify or Vercel with a small adapter tweak.

---

## 📦 1. Prerequisites

Before you deploy, make sure you have:

- **Node.js ≥ 20** (or **Bun ≥ 1.1**)
- A **GitHub / GitLab / Bitbucket** account with this repo pushed
- A free account on **[Netlify](https://netlify.com)** or **[Vercel](https://vercel.com)**

Install dependencies and verify the build runs locally:

```bash
# install
bun install        # or: npm install

# run dev server
bun run dev        # http://localhost:8080

# production build
bun run build
```

If `bun run build` succeeds locally, you're ready to deploy.

---

## 🔐 2. Environment Variables

If/when you connect Lovable Cloud or any API keys, add them in your hosting provider dashboard.

Common variables:

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Lovable Cloud / Supabase project URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Public anon key (safe to expose) |
| `VITE_SUPABASE_PROJECT_ID` | Project ID |

> ⚠️ Only variables prefixed with `VITE_` are exposed to the client. Never put private/service-role keys in `VITE_` vars.

---

## 🌐 3. Deploy to Vercel

### Option A - One-click via dashboard (recommended)

1. Push your repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new).
3. **Import** your repository.
4. Vercel auto-detects Vite. Confirm the settings:
   - **Framework Preset:** `Vite`
   - **Build Command:** `bun run build` (or `npm run build`)
   - **Output Directory:** `dist`
   - **Install Command:** `bun install` (or `npm install`)
5. Add **Environment Variables** (Settings → Environment Variables) if needed.
6. Click **Deploy**.

### Option B - Vercel CLI

```bash
npm i -g vercel
vercel login
vercel           # preview deploy
vercel --prod    # production deploy
```

### `vercel.json` (optional, for SPA fallback)

Create a `vercel.json` at the repo root if you see 404s on refresh:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

Your app is live at `https://<project>.vercel.app` 🎉

---

## 🟩 4. Deploy to Netlify

### Option A - One-click via dashboard (recommended)

1. Push your repo to GitHub.
2. Go to [app.netlify.com/start](https://app.netlify.com/start).
3. Click **Import from Git** → select your repository.
4. Configure:
   - **Build command:** `bun run build` (or `npm run build`)
   - **Publish directory:** `dist`
5. Add **Environment Variables** under *Site settings → Environment variables*.
6. Click **Deploy site**.

### Option B - Netlify CLI

```bash
npm i -g netlify-cli
netlify login
netlify init     # link the repo
netlify deploy --build              # preview
netlify deploy --build --prod       # production
```

### `netlify.toml` (recommended)

Create `netlify.toml` at the repo root:

```toml
[build]
  command = "bun run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

The redirect rule ensures TanStack Router client-side routes (e.g. `/app`, `/docs`) work on direct visits and refreshes.

Your app is live at `https://<site>.netlify.app` 🎉

---

## 🧭 5. Custom Domain

Both providers offer free custom domain setup:

- **Vercel:** Project → *Settings → Domains → Add*
- **Netlify:** Site → *Domain settings → Add custom domain*

Then point your DNS:
- `A` record → provider IP, **or**
- `CNAME` → `cname.vercel-dns.com` / `<site>.netlify.app`

SSL certificates are issued automatically.

---

## 🧪 6. Verify Your Deployment

After deploying, check:

- ✅ Landing page loads with sakura animation
- ✅ `/app` dashboard renders
- ✅ `/docs` route loads on direct refresh (SPA fallback works)
- ✅ Lighthouse score is healthy (Performance, SEO, Accessibility)

---

## 🛠️ 7. Troubleshooting

| Problem | Fix |
|---------|-----|
| **404 on refresh** | Add the SPA rewrite (`netlify.toml` or `vercel.json` shown above). |
| **Build fails: "Missing env"** | Add `VITE_*` variables in the provider dashboard, then redeploy. |
| **Blank page in production** | Check browser console; usually a missing env var or wrong base URL. |
| **Tailwind styles missing** | Confirm `src/styles.css` is imported in `__root.tsx` (it is, by default). |
| **Large bundle warning** | Safe to ignore for an MVP; consider route-level code splitting later. |

---

## 📚 References

- [TanStack Start Docs](https://tanstack.com/start)
- [Vercel Vite Guide](https://vercel.com/docs/frameworks/vite)
- [Netlify Vite Guide](https://docs.netlify.com/frameworks/vite/)
- [Lovable Cloud Docs](https://docs.lovable.dev/features/cloud)

---

Made with 🌸 by the ChainPilot team.
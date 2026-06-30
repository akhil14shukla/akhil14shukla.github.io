# Deployment Guide

This site builds with Vite (`npm run build → dist/`). Three deployment paths:

---

## Option A — GitHub Actions (original, requires billing)

`.github/workflows/deploy.yml` auto-builds and deploys on every push to `master`.

**Status:** Paused — GitHub Actions requires a paid plan or free-tier minutes. Re-enable by fixing the billing issue under **Settings → Billing**.

Once billing is resolved, go to **Settings → Pages → Source → GitHub Actions** and pushes to `master` will deploy automatically.

---

## Option B — `gh-pages` branch (active, no billing required)

The `gh-pages` orphan branch holds a pre-built copy of `dist/`. GitHub Pages serves it directly — no Actions minutes consumed.

**One-time setup (already done):**
```bash
Settings → Pages → Source → Deploy from a branch → gh-pages / (root)
```

**To publish a new build:**
```bash
npm run build

# In a separate worktree so you don't lose your working tree
git worktree add /tmp/gh-pages gh-pages
cp -r dist/. /tmp/gh-pages/
touch /tmp/gh-pages/.nojekyll
cd /tmp/gh-pages
git add -A
git commit -m "deploy: $(date +%Y-%m-%d)"
git push origin gh-pages
git worktree remove /tmp/gh-pages
```

---

## Option C — Cloudflare Pages / Netlify / Vercel (zero-config)

All three support connecting a GitHub repo with zero configuration:

| Setting | Value |
|---------|-------|
| Build command | `npm run build` |
| Output directory | `dist` |
| Node version | 20 |

**Cloudflare Pages:** Dashboard → Create application → Connect to Git → select repo → fill table above → Save and Deploy.

**Netlify:** New site from Git → select repo → fill table above → Deploy.

**Vercel:** Import project → select repo → framework auto-detected as Vite → Deploy.

All three re-deploy on every push to `master` and provide preview URLs for branches.

---

## Local preview

```bash
npm install
npm run dev      # http://localhost:5173  (hot-reload)
npm run build    # production build → dist/
npm run preview  # serve dist/ locally
```

# akhil14shukla.github.io — Latent Space

An interactive portfolio for **Akhil Shukla** — Data Scientist & AI/ML Engineer.
Hosted at [https://akhil14shukla.github.io/](https://akhil14shukla.github.io/).

The site is shaped like a model: a career rendered as a 3D **embedding galaxy**,
navigated by **querying** the latent space. Clicking a query fires an **attention**
fan to the most relevant cluster and flies the camera there, while a top-right
**activation probe** tracks the forward pass and how much of the space you've explored.

> Nothing here runs or trains a model — the transformer is a **visual metaphor**
> (a few hundred GPU points + shaders). No inference, no weights, no API. It's light.

## Sections / clusters

- **Forecasting & Time-Series** — macro-financial forecasting, crypto LSTM, `forecasting_cpp`
- **Competitive ML & Open-Source** — `ppscore` (PyPI), Kaggle, competitive programming
- **Analytics & Insights** — personalization, loan-default & churn modeling
- **Projects & Tooling** — real GitHub repos (image_renamer, watch sync, dotfiles)

## Stack

- **Vite** + **React 18**
- **three.js** + **@react-three/fiber** + **@react-three/drei** — the embedding galaxy
- **@react-three/postprocessing** — bloom / glow
- **GSAP** — camera choreography · **Lenis** — inertial smooth scroll
- **framer-motion** — UI micro-interactions · **zustand** — shared forward-pass state

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # → dist/
npm run preview
```

## Deploy

Pushing to `master` builds and deploys via GitHub Actions
(`.github/workflows/deploy.yml`). One-time setup:
**Settings → Pages → Source → GitHub Actions**.

The previous vanilla site is preserved under [`legacy/`](./legacy).

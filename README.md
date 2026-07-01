# akhil14shukla.github.io — The Guiding Wind

An interactive portfolio for **Akhil Shukla** — Data Scientist & AI/ML Engineer.
Hosted at [https://akhil14shukla.github.io/](https://akhil14shukla.github.io/).

A **real-time 3D** Japanese field at dusk that you **fly through on scroll**: a
procedural sky (drifting clouds, stars, a moon), a real snow-capped **Mt. Fuji**
(CC0 photo) blended into the horizon over procedural ridges, an **instanced GPU
grass** field lit by the low sun, **fireflies** drifting on the wind, and maple
leaves and sakura petals streaming past. Scrolling scrubs a cinematic camera from
high above the field down into the grass and past each topic "station."
Everything reacts to your cursor — you part the grass and scatter the leaves.

> Nothing here runs or trains a model — it's a real-time WebGL world. The sky,
> ridges, grass, fireflies and leaves are generated in-engine; the distant Mt.
> Fuji is a single CC0 photograph feathered into the horizon.

## Wind + interaction

Modelled on Ghost of Tsushima's "guiding wind": a single global wind vector whose
magnitude is modulated by two octaves of noise, so **gusts roll across the
field**. Tens of thousands of instanced grass blades arc and bend toward the wind
in the vertex shader (with sun lighting + a backlit tip glint); leaf and petal
billboards drift along it. A **world-space cursor** (raycast onto the ground)
**parts the grass** and **repels/swirls the leaves**; clicks fire **gust rings**;
nav chips send a guiding gust. One shared field (`src/three/wind.js`) drives every
layer.

## The journey (scroll)

A tall scroll spacer feeds Lenis; `src/three/CameraJourney.jsx` flies a damped
CatmullRom camera path; `src/components/Stations.jsx` reveals each topic at its
slice of scroll progress. Desktop-first, with a `PerformanceMonitor` that scales
grass/leaf/firefly counts and depth-of-field down on weaker GPUs.

## Sections / topics

- **Forecasting & Time-Series** — macro-financial forecasting, crypto LSTM, `forecasting_cpp`
- **Competitive ML & Open-Source** — `ppscore` (PyPI), Kaggle, competitive programming
- **Analytics & Insights** — personalization, loan-default & churn modeling
- **Projects & Tooling** — real GitHub repos (image_renamer, watch sync, dotfiles)

## Architecture (swap-able)

- **Scenes** are registered in `src/config/scenes.js` against a small contract
  (`{ id, label, backdrop, World }`). `wind-field` is the default; the earlier
  `snow-mountain` scene stays registered as an alternate.
- **Themes** are tokens in `src/config/themes.js` (palette + Japanese fonts);
  `applyTheme` re-skins `:root` at runtime.
- **World layers** live under `src/scenes/windField/` (Sky, Mountains, Ground,
  Grass, Leaves, Fireflies) and share `palette.js` + `wind.js`.
- **Content** is scroll-revealed via `src/components/Stations.jsx`.

## Stack

- **Vite** + **React 18**
- **three.js** + **@react-three/fiber** + **@react-three/drei** + **@react-three/postprocessing**
- **simplex-noise** — wind field · **framer-motion** — UI · **zustand** — shared state

## Imagery / licensing

The scene is procedural except the distant Mt. Fuji, which is a single **CC0**
photograph ("Mount Fuji at sunset" by Romain Guy, via Wikimedia Commons)
feathered into the horizon — documented in [`CREDITS.md`](./CREDITS.md). No Ghost
of Tsushima / Sony / Sucker Punch assets are used.

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # → dist/
npm run preview
```

## Deploy

See [`DEPLOY.md`](./DEPLOY.md). The previous vanilla site is preserved under
[`legacy/`](./legacy).

# akhil14shukla.github.io — The Guiding Wind

An interactive portfolio for **Akhil Shukla** — Data Scientist & AI/ML Engineer.
Hosted at [https://akhil14shukla.github.io/](https://akhil14shukla.github.io/).

A cinematic Japanese landscape — Mt. Fuji at sunset over a windswept **susuki
field**, with maple leaves streaming on a single **guiding wind** (a
Ghost-of-Tsushima-style wind model). The leaves are the "nodes" of a neural
field: **follow a current** (pick a topic) and the wind carries its leaves into a
focal vortex while the content swaps in place. A top-right **activation probe**
tracks the forward pass and how much of the field you've explored.

> Nothing here runs or trains a model — the neural framing is a **visual
> metaphor** (GPU particles + shaders). No inference, no weights, no API.

## Wind (the interactive bit)

Modelled on Ghost of Tsushima's "guiding wind": a single global wind vector whose
magnitude is modulated by two octaves of noise, so **gusts roll across the
field**. The grass photo is UV-displaced by the wind, the leaves are advected
along it, the **pointer parts** the leaves, **clicks fire gust rings**, and
selecting a topic sends a guiding gust toward it. All shared via one wind field
(`src/three/wind.js`).

## Sections / topics

- **Forecasting & Time-Series** — macro-financial forecasting, crypto LSTM, `forecasting_cpp`
- **Competitive ML & Open-Source** — `ppscore` (PyPI), Kaggle, competitive programming
- **Analytics & Insights** — personalization, loan-default & churn modeling
- **Projects & Tooling** — real GitHub repos (image_renamer, watch sync, dotfiles)

## Architecture (swap-able)

- **Scenes** are registered in `src/config/scenes.js` against a small contract
  (`backdrop`, `Particles`, `Foreground`). `fuji-field` is the default; the
  earlier `snow-mountain` scene stays registered as an alternate.
- **Themes** are tokens in `src/config/themes.js` (palette + Japanese fonts);
  `applyTheme` re-skins `:root` at runtime.
- **Content** swaps in place via `ContentPanel` driven by `selectedTopic`.

## Stack

- **Vite** + **React 18**
- **three.js** + **@react-three/fiber** + **@react-three/drei** + **@react-three/postprocessing**
- **simplex-noise** — wind field · **framer-motion** — UI · **zustand** — shared state

## Imagery

All scenery is royalty-free (Wikimedia Commons, CC0 / CC BY-SA) and credited in
[`CREDITS.md`](./CREDITS.md). No game assets are used.

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

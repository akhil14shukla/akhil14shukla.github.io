# Credits

The scene is real-time 3D — procedural sky, instanced grass, fireflies, and
wind-borne leaves rendered in-engine — with a single **real photograph** used for
the distant Mt. Fuji backdrop.

## Photography
- `public/scenery/fuji.jpg` — **"Mount Fuji at sunset, March 2025"** by *Romain
  Guy* — **CC0 1.0 (public domain)** — via Wikimedia Commons:
  https://commons.wikimedia.org/wiki/File:Mount_Fuji_at_sunset,_March_2025.jpg
  Used as a feathered horizon matte behind the real-time field (see
  `src/scenes/windField/Mountains.jsx`). CC0 requires no attribution; credited
  here anyway.

## Original / procedural (this project)
- Sky (dusk gradient, drifting clouds, stars, moon), the 360° ridge band, ground,
  grass, and fireflies are all generated in shaders/geometry.
- `public/scenery/leaf.svg`, `public/scenery/petal.svg` — original silhouettes
  used as textures for the wind-borne leaves / sakura petals.
- `public/scenery/snowflake.svg`, `public/scenery/snow-mountain.svg` — original
  art for the alternate `snow-mountain` scene.

## Technique references (not assets)
Wind model is inspired by the Ghost of Tsushima GDC talks (single global wind
vector + rolling noise gusts); instanced-grass technique follows public WebGL
write-ups (Codrops, et al.). References for *technique only* — all code here is
original. **No Ghost of Tsushima / Sony / Sucker Punch assets are used.**

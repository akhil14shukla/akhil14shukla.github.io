# Credits

The scene is **real-time 3D** — procedural sky, mountains (incl. a snow-capped
Fuji), instanced grass, fireflies, and wind-borne leaves rendered in-engine. The
only external asset is the walking figure (a rigged glTF).

## Original / procedural (this project)
- Sky, Mt. Fuji + ridge backdrop, ground, grass, fireflies and fog are all
  generated in shaders/geometry — no photos.
- `public/scenery/leaf.svg`, `public/scenery/petal.svg` — original silhouettes
  used as textures for the wind-borne leaves / sakura petals.
- `public/scenery/snowflake.svg`, `public/scenery/snow-mountain.svg` — original
  art for the alternate `snow-mountain` scene.

## Third-party assets
- `public/models/samurai.glb` — **the rigged, walk-animated figure**.
  - **The current file is a placeholder** for pipeline development: the
    freely-usable `Soldier.glb` from the three.js examples
    (https://github.com/mrdoob/three.js — MIT). It carries `Idle`/`Walk`/`Run`
    clips.
  - **To use a realistic samurai**, drop a rigged + walk-animated GLB at this
    exact path — the component auto-plays its walk/idle clip and normalises the
    height. Recommended clean-licensed sources: **Sketchfab** (filter
    *Downloadable + Animated*, licence **CC-BY**) or **Mixamo** (free, Adobe
    account; export FBX → convert to GLB). When you swap the file in, replace
    this line with the model's title, author, URL and licence, e.g.:
    > "Samurai Character" by \<author\> — Sketchfab, CC-BY 4.0 — \<url\>

## Technique references (not assets)
Wind model is inspired by the Ghost of Tsushima GDC talks (single global wind
vector + rolling noise gusts); instanced-grass technique follows public WebGL
write-ups (Codrops, et al.). References for *technique only* — all code and art
here are original. **No Ghost of Tsushima / Sony / Sucker Punch assets are used.**

// ─────────────────────────────────────────────────────────────────────────
//  Shared wind field. One module-level state object drives every layer (snow,
//  grass) so motion is coherent. Interaction lives here: the pointer biases the
//  field, clicks/queries inject expanding gust impulses. No React, no store —
//  it's read every frame by the shaders via uniforms (perf).
// ─────────────────────────────────────────────────────────────────────────
import { createNoise2D } from 'simplex-noise';

const noise = createNoise2D();
const MAX_GUSTS = 4;

export const wind = {
  time: 0,
  dirX: 1,
  dirY: 0,
  strength: 0.6,
  pointerX: 0, // world-ish XY (NDC * scene extent)
  pointerY: 0,
  pvX: 0, // pointer velocity
  pvY: 0,
  gusts: [], // { x, y, z, t0 }
};

// A gust is a ring of force expanding from an origin; decays over GUST_LIFE.
const GUST_LIFE = 3.0;
export function spawnGust(x, y, z) {
  wind.gusts.push({ x, y, z, t0: wind.time });
  if (wind.gusts.length > MAX_GUSTS) wind.gusts.shift();
}

export function setPointer(wx, wy) {
  wind.pvX = wx - wind.pointerX;
  wind.pvY = wy - wind.pointerY;
  wind.pointerX = wx;
  wind.pointerY = wy;
}

// Call once per frame before any layer reads the field.
// GoT model: a single global wind vector (mostly constant direction) whose
// magnitude is modulated by time-varying noise — two octaves, so big gusts roll
// across the field with finer detail layered on top.
export function updateWind(elapsed) {
  wind.time = elapsed;
  // base direction drifts slowly (mostly horizontal, blowing "from the west")
  const a = noise(elapsed * 0.015, 0.0) * 0.6; // small angular wander
  const tx = Math.cos(a);
  const ty = Math.sin(a) * 0.35 - 0.12; // slight downward bias
  wind.dirX += (tx - wind.dirX) * 0.02;
  wind.dirY += (ty - wind.dirY) * 0.02;
  // two-octave rolling gusts + a kick from pointer speed
  const gustBig = 0.5 + 0.5 * noise(elapsed * 0.12, 5.0);
  const gustSmall = 0.5 + 0.5 * noise(elapsed * 0.45, 20.0);
  const speed = Math.min(1.5, Math.hypot(wind.pvX, wind.pvY) * 0.6);
  wind.strength = 0.45 + gustBig * 0.7 + gustSmall * 0.25 + speed;
  // drop expired gusts + bleed off pointer velocity
  wind.gusts = wind.gusts.filter((g) => elapsed - g.t0 < GUST_LIFE);
  wind.pvX *= 0.9;
  wind.pvY *= 0.9;
}

// Up to MAX_GUSTS as [x, y, z, age] tuples; age < 0 means the slot is inactive.
export function activeGusts() {
  const out = [];
  for (let i = 0; i < MAX_GUSTS; i++) {
    const g = wind.gusts[i];
    out.push(g ? [g.x, g.y, g.z, wind.time - g.t0] : [0, 0, 0, -1]);
  }
  return out;
}

// ─────────────────────────────────────────────────────────────────────────
//  Shared world state for the real-time scene. One module-level object drives
//  every layer (grass, leaves, camera) so motion is coherent. Interaction lives
//  here: a world-space cursor (raycast onto the ground) parts the grass and
//  scatters leaves; clicks/queries inject gusts; scroll sets the journey
//  progress. Read every frame by shaders via uniforms (perf).
// ─────────────────────────────────────────────────────────────────────────
import { createNoise2D } from 'simplex-noise';

const noise = createNoise2D();
const MAX_GUSTS = 4;
const GUST_LIFE = 3.0;

export const wind = {
  time: 0,
  // global wind vector (mostly constant direction, gusty magnitude — GoT model)
  dirX: 1,
  dirY: 0,
  strength: 0.6,
  // world-space cursor on the ground plane (y≈0)
  cursorX: 0,
  cursorZ: 0,
  cursorVX: 0,
  cursorVZ: 0,
  cursorActive: 0, // 0..1, eased
  // screen pointer in NDC (for camera parallax)
  ndcX: 0,
  ndcY: 0,
  // scroll journey progress 0..1
  progress: 0,
  gusts: [], // { x, z, t0 }
};

export function spawnGust(x, z) {
  wind.gusts.push({ x, z, t0: wind.time });
  if (wind.gusts.length > MAX_GUSTS) wind.gusts.shift();
}

// World cursor position (on the ground). Tracks velocity for momentum effects.
export function setCursorWorld(x, z, active) {
  wind.cursorVX = x - wind.cursorX;
  wind.cursorVZ = z - wind.cursorZ;
  wind.cursorX = x;
  wind.cursorZ = z;
  if (active !== undefined) wind.cursorActive = active ? 1 : wind.cursorActive;
}

export function setNdc(x, y) {
  wind.ndcX = x;
  wind.ndcY = y;
}

export function setProgress(p) {
  wind.progress = Math.min(1, Math.max(0, p));
}

// Call once per frame before any layer reads the field.
export function updateWind(elapsed) {
  wind.time = elapsed;
  // base direction drifts slowly (mostly horizontal, "blowing from the west")
  const a = noise(elapsed * 0.015, 0.0) * 0.6;
  wind.dirX += (Math.cos(a) - wind.dirX) * 0.02;
  wind.dirY += (Math.sin(a) * 0.5 - wind.dirY) * 0.02;
  // two-octave rolling gusts + a kick from cursor speed
  const gustBig = 0.5 + 0.5 * noise(elapsed * 0.12, 5.0);
  const gustSmall = 0.5 + 0.5 * noise(elapsed * 0.45, 20.0);
  const speed = Math.min(1.5, Math.hypot(wind.cursorVX, wind.cursorVZ) * 4.0);
  wind.strength = 0.45 + gustBig * 0.7 + gustSmall * 0.25 + speed * 0.3;
  // decay cursor velocity + activity, drop expired gusts
  wind.cursorVX *= 0.86;
  wind.cursorVZ *= 0.86;
  wind.cursorActive *= 0.94;
  wind.gusts = wind.gusts.filter((g) => elapsed - g.t0 < GUST_LIFE);
}

// Up to MAX_GUSTS as [x, z, age] tuples; age < 0 means inactive.
export function activeGusts() {
  const out = [];
  for (let i = 0; i < MAX_GUSTS; i++) {
    const g = wind.gusts[i];
    out.push(g ? [g.x, g.z, wind.time - g.t0] : [0, 0, -1]);
  }
  return out;
}

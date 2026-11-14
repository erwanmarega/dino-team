<script setup>
import { computed } from 'vue'

// Decorative hanging lianas, flat hand-cut look (same family as RubricDecor).
// Pure inline SVG, no image. Everything is derived from `seed`, so a given
// placement is different from the others but identical on every render.
//
//  - canopy: strip hanging from an edge. Main lianas sag along the top (stretched
//            with the width), thin strands hang from it at fixed pixel sizes so
//            leaves are never distorted.
//  - corner: vine thrown over a top corner (stem along the top edge, then down
//            the side, leaf cluster on the corner). The corner sits at (OX, OY).
//  - drape:  short garland swag between two anchors with a few dangling strands.

const props = defineProps({
  variant: { type: String, default: 'canopy', validator: (v) => ['canopy', 'corner', 'drape'].includes(v) },
  seed: { type: Number, default: 1 },
  side: { type: String, default: 'left', validator: (v) => ['left', 'right'].includes(v) },
  // canopy: longest strand (px); corner: length of the stem down the side;
  // drape: longest dangling strand.
  reach: { type: Number, default: 0 },
  // canopy: depth of the main sag (px)
  sag: { type: Number, default: 12 },
  // canopy: 'edges' = long strands near both ends only, 'even' = spread across `span`
  mode: { type: String, default: 'even', validator: (v) => ['edges', 'even'].includes(v) },
  // canopy 'even': horizontal range (in %) where strands may hang
  span: { type: Array, default: () => [0, 100] },
  // canopy 'even': number of strands
  count: { type: Number, default: 8 },
  // corner: which way the leaves fan out relative to the host element
  lean: { type: String, default: 'mixed', validator: (v) => ['out', 'in', 'mixed'].includes(v) },
  // corner: small strands hanging from the top run
  strands: { type: Number, default: 1 },
  // drape: viewBox/px width
  width: { type: Number, default: 200 },
})

function makeRng(seed) {
  let t = (Math.floor(seed * 7919) + 0x6d2b79f5) >>> 0
  return () => {
    t = (t + 0x6d2b79f5) >>> 0
    let r = Math.imul(t ^ (t >>> 15), 1 | t)
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
}
const f = (n) => Math.round(n * 10) / 10
const between = (r, a, b) => a + (b - a) * r()

// Catmull-Rom through the points, as cubic Beziers.
function smooth(pts) {
  let d = `M${f(pts[0].x)} ${f(pts[0].y)}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[i + 2] || p2
    d += `C${f(p1.x + (p2.x - p0.x) / 6)} ${f(p1.y + (p2.y - p0.y) / 6)} ${f(p2.x - (p3.x - p1.x) / 6)} ${f(p2.y - (p3.y - p1.y) / 6)} ${f(p2.x)} ${f(p2.y)}`
  }
  return d
}

// Mostly the main green, some deep for depth, rare bright highlight.
function tone(r) {
  const v = r()
  return v < 0.3 ? 0 : v < 0.88 ? 1 : 2
}

function leaf(r, x, y, ang, size, forceTone) {
  return {
    t: `translate(${f(x)} ${f(y)}) rotate(${f(ang)}) scale(${f(size)})`,
    c: forceTone ?? tone(r),
    k: r() < 0.65 ? 0 : 1,
  }
}

const tangent = (pts, i) => {
  const a = pts[Math.max(0, i - 1)]
  const b = pts[Math.min(pts.length - 1, i + 1)]
  return (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI
}

// A strand hanging from (0, 0): gentle S-curve, leaves on alternating sides,
// a larger leaf at the tip.
function buildStrand(r, len) {
  const steps = Math.max(2, Math.round(len / 11))
  const amp = between(r, 1.5, 3.5) * (r() < 0.5 ? -1 : 1)
  const pts = []
  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    pts.push({ x: Math.sin(t * Math.PI * 1.6) * amp * t, y: len * t })
  }
  const leaves = []
  let s = r() < 0.5 ? 1 : -1
  for (let i = 1; i < pts.length; i++) {
    const tip = i === pts.length - 1
    const ang = tangent(pts, i) + (tip ? s * between(r, 8, 22) : s * between(r, 38, 70))
    leaves.push(leaf(r, pts[i].x, pts[i].y, ang, tip ? between(r, 11, 15) : between(r, 7, 11)))
    s = -s
  }
  // a short leafless-looking stub of leaf near the top for strands that are long
  return { d: smooth(pts), leaves, len, sway: swayVars(r) }
}

function swayVars(r) {
  return {
    '--dur': `${f(between(r, 5, 9))}s`,
    '--delay': `-${f(between(r, 0, 8))}s`,
    '--amp': `${f(between(r, 1.6, 3.2))}deg`,
  }
}

const model = computed(() => {
  const r = makeRng(props.seed)
  const mirror = props.side === 'right'

  if (props.variant === 'corner') return buildCorner(r, mirror)
  if (props.variant === 'drape') return buildDrape(r)
  return buildCanopy(r)
})

// ---------------------------------------------------------------- corner
const OX = 26
const OY = 16
const CW = 128

function buildCorner(r, mirror) {
  const droop = props.reach || 56
  const H = OY + droop + 26
  const mx = (x) => (mirror ? CW - x : x)
  // Angles are authored for the left corner; mirror them for the right one.
  const ma = (a) => (mirror ? 180 - a : a)
  // Sign of "outward" relative to the travel direction (right to left, then down).
  const outSign = mirror ? -1 : 1

  const raw = []
  const runLen = between(r, props.reach && props.reach < 40 ? 44 : 52, 66)
  const nTop = 6
  for (let i = 0; i <= nTop; i++) {
    const t = i / nTop
    raw.push({ x: OX + runLen * (1 - t) ** 1.05, y: OY - 1 + Math.sin(t * 5 + r()) * 2 })
  }
  const nSide = Math.max(3, Math.round(droop / 13))
  for (let i = 1; i <= nSide; i++) {
    const t = i / nSide
    raw.push({ x: OX - 2 + Math.sin(t * 4 + r() * 2) * 2.4, y: OY + droop * t })
  }
  const pts = raw.map((p) => ({ x: mx(p.x), y: p.y }))

  const leaves = []
  const dirFor = () =>
    props.lean === 'out'
      ? outSign
      : props.lean === 'in'
        ? -outSign
        : r() < 0.7
          ? outSign
          : -outSign
  for (let i = 1; i < pts.length; i++) {
    if (i === nTop || i === nTop + 1) continue // the cluster covers the corner
    const tip = i === pts.length - 1
    const ang = tangent(pts, i) + dirFor() * (tip ? between(r, 10, 25) : between(r, 38, 72))
    leaves.push(leaf(r, pts[i].x, pts[i].y, ang, tip ? between(r, 11, 14) : between(r, 8, 12.5)))
  }
  // Leaf cluster on the corner
  const out = [212, 240, 268, 296]
  const inn = [12, 42, 72, 102]
  const fan = props.lean === 'out' ? out : props.lean === 'in' ? inn : [out[0], inn[1], out[2], inn[3], out[1]]
  fan.forEach((a, i) => {
    leaves.push(leaf(r, mx(OX), OY, ma(a + between(r, -8, 8)), between(r, 15, 20), i === 1 ? 1 : undefined))
  })

  const hang = []
  for (let i = 0; i < props.strands; i++) {
    const ax = OX + between(r, 26, runLen - 10)
    const len = between(r, 14, 26)
    const st = buildStrand(r, len)
    hang.push({ ...st, x: mx(ax), y: OY })
  }

  return {
    w: CW,
    h: H,
    stems: [{ d: smooth(pts), sw: 3.4 }],
    leaves,
    hang,
  }
}

// ----------------------------------------------------------------- drape
function buildDrape(r) {
  const W = props.width
  const reach = props.reach || 34
  const sagDepth = Math.max(6, Math.min(16, reach * 0.4))
  const topY = 5
  const H = topY + sagDepth + reach + 14
  const n = Math.max(4, Math.round(W / 28))
  const pts = []
  for (let i = 0; i <= n; i++) {
    const t = i / n
    pts.push({ x: 8 + (W - 16) * t, y: topY + sagDepth * 4 * t * (1 - t) + (i && i < n ? between(r, -1.2, 1.2) : 0) })
  }
  const leaves = []
  let s = 1
  for (let i = 1; i < pts.length - 1; i++) {
    leaves.push(leaf(r, pts[i].x, pts[i].y, tangent(pts, i) + s * between(r, 40, 75), between(r, 8, 12)))
    s = -s
  }
  // Tufts on both anchors
  for (const [x, flip] of [[pts[0].x, 1], [pts[pts.length - 1].x, -1]]) {
    for (const a of [-70, -20, 40, 100]) {
      leaves.push(leaf(r, x, topY, flip > 0 ? a + between(r, -10, 10) : 180 - a + between(r, -10, 10), between(r, 11, 16)))
    }
  }
  const nStrands = Math.min(4, Math.max(2, Math.round(W / 55)))
  const hang = []
  for (let i = 0; i < nStrands; i++) {
    const idx = Math.round(((i + 0.5 + between(r, -0.2, 0.2)) / nStrands) * (n - 2)) + 1
    const p = pts[Math.min(n - 1, idx)]
    hang.push({ ...buildStrand(r, between(r, reach * 0.4, reach)), x: p.x, y: p.y })
  }
  return { w: W, h: H, stems: [{ d: smooth(pts), sw: 3 }], leaves, hang }
}

// ---------------------------------------------------------------- canopy
const CANOPY_SW = 30

function buildCanopy(r) {
  const sag = props.sag
  const reach = props.reach || 90

  // Main lianas, drawn in a 0..100 wide space (only x is stretched).
  const lianas = []
  const tufts = []
  for (let l = 0; l < 2; l++) {
    const cuts = [0]
    const segs = l === 0 ? 3 + Math.round(r()) : 4 + Math.round(r() * 2)
    for (let i = 1; i < segs; i++) cuts.push((i / segs) * 100 + between(r, -6, 6))
    cuts.push(100)
    let d = `M-2 ${f(l ? 2 : 1)}`
    for (let i = 0; i < segs; i++) {
      const a = cuts[i]
      const b = cuts[i + 1]
      const depth = (l ? sag * 0.55 : sag) * between(r, 0.7, 1.15)
      d += `Q${f((a + b) / 2)} ${f((l ? 2 : 1) + depth * 2)} ${f(b)} ${f(l ? 2 : 1)}`
      if (l === 0 && i < segs - 1) {
        // leaf tuft on the knot between two sags
        tufts.push({ x: b, y: 1, leaves: tuft(r), up: false })
      } else if (l === 0) {
        tufts.push({ x: (a + b) / 2, y: depth, leaves: tuft(r), up: false })
      }
      if (l === 0) {
        tufts.push({ x: a + (b - a) * 0.28, y: 1 + depth * 0.8, leaves: tuft(r).slice(0, 2), up: false })
        tufts.push({ x: a + (b - a) * 0.74, y: 1 + depth * 0.8, leaves: tuft(r).slice(1, 3), up: false })
      }
    }
    lianas.push({ d, sw: l ? 2.2 : 3.6 })
  }

  const strands = []
  const push = (css, len) => {
    const st = buildStrand(r, len)
    strands.push({ ...st, css, h: Math.ceil(len + 12) })
  }
  if (props.mode === 'edges') {
    for (const side of ['left', 'right']) {
      const nEdge = 5
      for (let i = 0; i < nEdge; i++) {
        const x = 6 + i * 20 + between(r, -4, 8)
        const closeness = 1 - x / 110
        const len = Math.max(14, reach * (0.35 + 0.65 * closeness) * between(r, 0.75, 1))
        push({ [side]: `calc(${f(x)}px * var(--k))` }, len)
      }
    }
    const nMid = 7
    for (let i = 0; i < nMid; i++) {
      push({ left: `${f(((i + 0.5) / nMid) * 70 + 15 + between(r, -3, 3))}%` }, between(r, 7, 13))
    }
  } else {
    const [a, b] = props.span
    for (let i = 0; i < props.count; i++) {
      const p = a + ((i + 0.5 + between(r, -0.3, 0.3)) / props.count) * (b - a)
      push({ left: `${f(p)}%` }, between(r, reach * 0.3, reach))
    }
  }
  return { lianas, tufts, strands, h: Math.ceil(sag * 2 + 8) }
}

function tuft(r) {
  const out = []
  for (const a of [-55, 20, 90, 150]) {
    out.push(leaf(r, 0, 0, a + between(r, -14, 14), between(r, 8, 12.5)))
  }
  return out
}

const LEAF = ['M0 0C.25-.48 .8-.52 1 0C.8.52 .25.48 0 0Z', 'M0 0C.3-.3 .72-.34 1 0C.72.34 .3.3 0 0Z']
const VEIN = 'M.04 0L.8 0'
</script>

<template>
  <!-- CANOPY -->
  <div
    v-if="variant === 'canopy'"
    class="vines vines--canopy"
    aria-hidden="true"
    :style="{ '--sag-h': `${model.h}px` }"
  >
    <svg
      class="vines__main"
      preserveAspectRatio="none"
      focusable="false"
      :style="{ height: `${model.h}px` }"
      :viewBox="`0 0 100 ${model.h}`"
    >
      <g v-for="(l, i) in model.lianas" :key="i" fill="none" stroke-linecap="round">
        <path class="stem-shadow" :d="l.d" :stroke-width="l.sw" transform="translate(0 2)" />
        <path class="stem" :d="l.d" :stroke-width="l.sw" />
      </g>
    </svg>
    <svg
      v-for="(tf, i) in model.tufts"
      :key="`t${i}`"
      class="vines__tuft"
      width="40"
      height="40"
      viewBox="-20 -20 40 40"
      focusable="false"
      :style="{ left: `${f(tf.x)}%`, top: `${f(tf.y)}px` }"
    >
      <g v-for="(lf, j) in tf.leaves" :key="j" :transform="lf.t">
        <path :class="['leaf', `t${lf.c}`]" :d="LEAF[lf.k]" />
      </g>
    </svg>
    <svg
      v-for="(st, i) in model.strands"
      :key="`s${i}`"
      class="vines__strand sway-el"
      :viewBox="`-15 0 ${CANOPY_SW} ${st.h}`"
      focusable="false"
      :style="{
        left: st.css.left,
        right: st.css.right,
        '--w': CANOPY_SW,
        '--h': st.h,
        ...st.sway,
      }"
    >
      <path class="stem-shadow" :d="st.d" stroke-width="2" transform="translate(1.5 1.5)" fill="none" stroke-linecap="round" />
      <path class="stem" :d="st.d" stroke-width="2" fill="none" stroke-linecap="round" />
      <g v-for="(lf, j) in st.leaves" :key="j" :transform="lf.t">
        <path :class="['leaf', `t${lf.c}`]" :d="LEAF[lf.k]" />
        <path v-if="lf.k === 0" class="vein" :d="VEIN" />
      </g>
    </svg>
  </div>

  <!-- CORNER and DRAPE share one SVG -->
  <svg
    v-else
    class="vines"
    :class="`vines--${variant}`"
    aria-hidden="true"
    focusable="false"
    :width="model.w"
    :height="model.h"
    :viewBox="`0 0 ${model.w} ${model.h}`"
  >
    <g fill="none" stroke-linecap="round">
      <template v-for="(s, i) in model.stems" :key="i">
        <path class="stem-shadow" :d="s.d" :stroke-width="s.sw" transform="translate(1.5 2)" />
        <path class="stem" :d="s.d" :stroke-width="s.sw" />
      </template>
    </g>
    <g v-for="(h, i) in model.hang" :key="`h${i}`" :transform="`translate(${f(h.x)} ${f(h.y)})`">
      <g class="sway-el" :style="h.sway">
        <path class="stem-shadow" :d="h.d" stroke-width="2" transform="translate(1.5 1.5)" fill="none" stroke-linecap="round" />
        <path class="stem" :d="h.d" stroke-width="2" fill="none" stroke-linecap="round" />
        <g v-for="(lf, j) in h.leaves" :key="j" :transform="lf.t">
          <path :class="['leaf', `t${lf.c}`]" :d="LEAF[lf.k]" />
          <path v-if="lf.k === 0" class="vein" :d="VEIN" />
        </g>
      </g>
    </g>
    <g v-for="(lf, j) in model.leaves" :key="`l${j}`" :transform="lf.t">
      <path :class="['leaf', `t${lf.c}`]" :d="LEAF[lf.k]" />
      <path v-if="lf.k === 0" class="vein" :d="VEIN" />
    </g>
  </svg>
</template>

<style scoped>
/* Defaults in :where() so a placement can override position and size freely. */
:where(.vines) {
  position: absolute;
  pointer-events: none;
  user-select: none;
  overflow: visible;
}
.vines--canopy {
  --k: 1;
  top: -1px;
  left: 0;
  right: 0;
  height: 0;
}
.vines__main {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  overflow: visible;
}
.vines__main path {
  vector-effect: non-scaling-stroke;
}
.vines__tuft {
  position: absolute;
  margin: -20px 0 0 -20px;
  overflow: visible;
}
.vines__strand {
  position: absolute;
  top: 0;
  margin-left: calc(var(--w) * -0.5px * var(--k));
  width: calc(var(--w) * 1px * var(--k));
  height: calc(var(--h) * 1px * var(--k));
  overflow: visible;
}

.stem {
  stroke: var(--accent);
}
.stem-shadow {
  stroke: #000;
  stroke-opacity: 0.55;
}
.leaf {
  stroke: rgba(0, 0, 0, 0.5);
  stroke-width: 0.06;
}
.t0 {
  fill: var(--accent-deep);
  stroke: rgba(111, 220, 140, 0.28);
}
.t1 {
  fill: var(--accent);
}
.t2 {
  fill: var(--accent-bright);
  fill-opacity: 0.85;
}
.vein {
  fill: none;
  stroke: rgba(0, 0, 0, 0.4);
  stroke-width: 0.05;
  stroke-linecap: round;
}

/* Gentle sway around the top anchor, transform only */
.sway-el {
  transform-box: view-box;
  transform-origin: 0 0;
  animation: vine-sway var(--dur, 7s) ease-in-out var(--delay, 0s) infinite alternate;
}
.vines__strand.sway-el {
  transform-box: border-box;
  transform-origin: 50% 0;
}
@keyframes vine-sway {
  from {
    transform: rotate(calc(var(--amp, 2deg) * -1));
  }
  to {
    transform: rotate(var(--amp, 2deg));
  }
}

/* Canopy strands shrink with the viewport: little free margin on small screens */
@media (max-width: 1400px) {
  .vines--canopy {
    --k: 0.75;
  }
}
@media (max-width: 1100px) {
  .vines--canopy {
    --k: 0.5;
  }
}
@media (max-width: 820px) {
  .vines--canopy {
    --k: 0.4;
  }
}

@media (prefers-reduced-motion: reduce) {
  .sway-el {
    animation: none;
  }
}
</style>

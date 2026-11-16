<script setup>
import { computed } from 'vue'
import { CLOSE_MS, HOLD_MS, OPEN_MS, transition } from '../composables/useRouteTransition'

// Transition shown between two rubrics: a descent along a tree trunk through
// hanging lianas. Going deeper (direction "in") the camera sinks, so the bark
// and the lianas travel upwards; coming back ("out") everything runs the other
// way. Pure decor: the label repeats what the router is already doing, so the
// whole overlay is hidden from assistive tech.

const style = computed(() => ({
  '--curtain-close': `${CLOSE_MS}ms`,
  '--curtain-hold': `${HOLD_MS}ms`,
  '--curtain-open': `${OPEN_MS}ms`,
}))

// transition.label is "NN — Rubric name"
const parts = computed(() => {
  const [num = '', ...rest] = transition.label.split(' — ')
  return { num, name: rest.join(' — ') }
})

// Small deterministic generator so the lianas look hand-drawn but never change
// between renders.
function rng(seed) {
  let s = seed
  return () => (s = (s * 16807) % 2147483647) / 2147483647
}

const LEAF = 'M0 0 C12 -15 36 -15 50 0 C36 13 12 13 0 0Z'

function leaf(r, x, y, side, scale) {
  // Leaves point outwards and droop
  const angle = side > 0 ? 15 + r() * 50 : 165 - r() * 50
  return `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${angle.toFixed(0)}) scale(${scale.toFixed(2)})`
}

// One liana in a 120-unit wide strip: a wavy stem hanging from a leafy tuft.
function makeVine({ seed, len, x, scale }) {
  const r = rng(seed)
  const top = 70
  let px = 60
  let py = top
  let d = `M${px} ${py}`
  const leaves = []
  // Tuft hiding the top end of the stem
  for (let i = 0; i < 6; i++) {
    const a = -170 + i * 32 + r() * 14
    leaves.push(`translate(60 ${top}) rotate(${a.toFixed(0)}) scale(${(1.1 + r() * 0.5).toFixed(2)})`)
  }
  let side = r() > 0.5 ? 1 : -1
  while (py < len) {
    const step = 120 + r() * 80
    const nx = 60 + (r() - 0.5) * 64
    const ny = Math.min(len, py + step)
    // Vertical tangents at each node keep the stem smooth
    d += ` C${px.toFixed(1)} ${(py + step * 0.5).toFixed(1)} ${nx.toFixed(1)} ${(ny - step * 0.5).toFixed(1)} ${nx.toFixed(1)} ${ny.toFixed(1)}`
    if (r() > 0.2) leaves.push(leaf(r, nx, ny, side, 0.7 + r() * 0.5))
    if (r() > 0.65) leaves.push(leaf(r, nx, ny - 14, -side, 0.55 + r() * 0.35))
    side = -side
    px = nx
    py = ny
  }
  return { d, leaves, len, x, width: 120 * scale, height: len * scale }
}

// Near lianas stay on the sides so the label in the middle remains readable;
// far ones hang behind the trunk.
const near = [
  { seed: 11, len: 1500, x: 3, scale: 1.25 },
  { seed: 23, len: 1850, x: 13, scale: 1 },
  { seed: 37, len: 1600, x: 24, scale: 1.1 },
  { seed: 41, len: 1700, x: 76, scale: 1.05 },
  { seed: 53, len: 1900, x: 87, scale: 1 },
  { seed: 67, len: 1450, x: 97, scale: 1.3 },
].map(makeVine)

const far = [
  { seed: 71, len: 2300, x: 8, scale: 0.7 },
  { seed: 83, len: 2000, x: 19, scale: 0.6 },
  { seed: 97, len: 2400, x: 32, scale: 0.7 },
  { seed: 101, len: 2200, x: 68, scale: 0.65 },
  { seed: 113, len: 2400, x: 81, scale: 0.7 },
  { seed: 127, len: 2100, x: 92, scale: 0.6 },
].map(makeVine)

const layers = [
  { name: 'far', vines: far },
  { name: 'near', vines: near },
]
</script>

<template>
  <div
    class="curtain"
    :class="[`is-${transition.phase}`, `is-${transition.direction}`]"
    :style="style"
    aria-hidden="true"
  >
    <!-- Inside of the tree: dark backdrop + trunk with scrolling bark -->
    <div class="curtain__tree">
      <div class="curtain__trunk">
        <svg class="curtain__bark" width="100%" height="100%">
          <defs>
            <pattern id="curtain-bark" width="260" height="600" patternUnits="userSpaceOnUse">
              <rect width="260" height="600" fill="oklch(0.21 0.022 120)" />
              <g fill="none" stroke="oklch(0.13 0.015 130)" stroke-width="5" stroke-linecap="round">
                <path d="M30 0 C20 100 44 200 32 300 C22 400 42 500 30 600" />
                <path d="M78 0 C90 120 66 220 80 330 C92 440 70 520 78 600" />
                <path d="M130 0 C118 90 142 210 128 300 C116 410 140 500 130 600" />
                <path d="M176 0 C188 130 164 230 178 320 C190 430 168 520 176 600" />
                <path d="M226 0 C214 110 238 190 224 310 C212 420 236 510 226 600" />
                <ellipse cx="104" cy="170" rx="13" ry="22" />
                <ellipse cx="202" cy="455" rx="10" ry="17" />
              </g>
              <g fill="none" stroke="oklch(0.3 0.03 115)" stroke-width="2" stroke-linecap="round">
                <path d="M40 0 C30 100 54 200 42 300 C32 400 52 500 40 600" />
                <path d="M140 0 C128 90 152 210 138 300 C126 410 150 500 140 600" />
                <path d="M236 0 C224 110 248 190 234 310 C222 420 246 510 236 600" />
              </g>
              <g fill="var(--forest)" opacity="0.35">
                <circle cx="56" cy="520" r="16" />
                <circle cx="70" cy="536" r="10" />
                <circle cx="188" cy="120" r="14" />
                <circle cx="150" cy="380" r="9" />
              </g>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#curtain-bark)" />
        </svg>
      </div>
    </div>

    <!-- Lianas, in two parallax layers -->
    <div
      v-for="layer in layers"
      :key="layer.name"
      class="curtain__vines"
      :class="`curtain__vines--${layer.name}`"
    >
      <svg
        v-for="(v, i) in layer.vines"
        :key="i"
        class="vine"
        :viewBox="`0 0 120 ${v.len}`"
        :width="v.width"
        :height="v.height"
        :style="{ left: `${v.x}%`, marginLeft: `${-v.width / 2}px` }"
      >
        <path class="vine__stem" :d="v.d" />
        <path v-for="(t, j) in v.leaves" :key="j" class="vine__leaf" :d="LEAF" :transform="t" />
      </svg>
    </div>

    <div class="curtain__core"></div>
    <div class="curtain__label">
      <p class="label-mono text-primary">{{ parts.num }}</p>
      <p class="curtain__name">{{ parts.name }}</p>
    </div>
  </div>
</template>

<style scoped>
.curtain {
  position: fixed;
  inset: 0;
  z-index: 60;
  pointer-events: none;
  visibility: hidden;
  overflow: hidden;
}
.curtain:not(.is-idle) {
  visibility: visible;
}

/* ---------- Tree: backdrop + trunk ---------- */
.curtain__tree {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(90% 70% at 50% 50%, oklch(0.2 0.035 155 / 0.9), transparent 100%),
    oklch(0.1 0.01 155);
  opacity: 0;
  /* Opening: the new page shows through while the lianas are still leaving */
  transition: opacity calc(var(--curtain-open) * 0.7) ease-in calc(var(--curtain-open) * 0.1);
}
.curtain.is-closing .curtain__tree,
.curtain.is-closed .curtain__tree {
  opacity: 1;
  transition: opacity calc(var(--curtain-close) * 0.85) ease-out;
}

.curtain__trunk {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: clamp(220px, 38vw, 520px);
  translate: -50% 0;
  overflow: hidden;
}
/* Round the trunk: dark edges, lit centre */
.curtain__trunk::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    oklch(0.08 0.01 155 / 0.95) 0%,
    oklch(0.08 0.01 155 / 0.1) 32%,
    oklch(0.08 0.01 155 / 0) 50%,
    oklch(0.08 0.01 155 / 0.25) 70%,
    oklch(0.08 0.01 155 / 0.95) 100%
  );
}
/* One bark tile (600px) taller than the trunk, looped for a seamless scroll */
.curtain__bark {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  height: calc(100% + 600px);
}
.curtain:not(.is-idle) .curtain__bark {
  animation: bark-scroll 0.42s linear infinite;
}
/* Coming back up: the bark runs downwards */
.curtain.is-out .curtain__bark {
  animation-direction: reverse;
}
@keyframes bark-scroll {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-600px);
  }
}

/* ---------- Lianas ---------- */
.curtain__vines {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  will-change: transform;
}
.vine {
  position: absolute;
  top: 0;
  overflow: visible;
}
.vine__stem {
  fill: none;
  stroke-linecap: round;
}
.curtain__vines--near .vine__stem {
  stroke: oklch(0.24 0.05 145);
  stroke-width: 9;
}
.curtain__vines--near .vine__leaf {
  fill: var(--forest);
}
.curtain__vines--far .vine__stem {
  stroke: oklch(0.18 0.03 150);
  stroke-width: 7;
}
.curtain__vines--far .vine__leaf {
  fill: oklch(0.29 0.055 152);
}

/* Each layer is driven by keyframes (not transitions) so every run starts from
   the right side whatever the previous direction was. "cover" spans the close
   and the hold, slowing down in the thick of it; "exit" speeds away. */
.curtain.is-in.is-closing .curtain__vines--near,
.curtain.is-in.is-closed .curtain__vines--near {
  animation: near-in-cover calc(var(--curtain-close) + var(--curtain-hold))
    cubic-bezier(0.15, 0.7, 0.3, 1) both;
}
.curtain.is-in.is-opening .curtain__vines--near {
  animation: near-in-exit var(--curtain-open) cubic-bezier(0.6, 0, 0.9, 0.5) both;
}
.curtain.is-out.is-closing .curtain__vines--near,
.curtain.is-out.is-closed .curtain__vines--near {
  animation: near-out-cover calc(var(--curtain-close) + var(--curtain-hold))
    cubic-bezier(0.15, 0.7, 0.3, 1) both;
}
.curtain.is-out.is-opening .curtain__vines--near {
  animation: near-out-exit var(--curtain-open) cubic-bezier(0.6, 0, 0.9, 0.5) both;
}

.curtain.is-in.is-closing .curtain__vines--far,
.curtain.is-in.is-closed .curtain__vines--far {
  animation: far-in-cover calc(var(--curtain-close) + var(--curtain-hold))
    cubic-bezier(0.25, 0.6, 0.4, 1) both;
}
.curtain.is-in.is-opening .curtain__vines--far {
  animation: far-in-exit var(--curtain-open) cubic-bezier(0.5, 0, 0.9, 0.6) both;
}
.curtain.is-out.is-closing .curtain__vines--far,
.curtain.is-out.is-closed .curtain__vines--far {
  animation: far-out-cover calc(var(--curtain-close) + var(--curtain-hold))
    cubic-bezier(0.25, 0.6, 0.4, 1) both;
}
.curtain.is-out.is-opening .curtain__vines--far {
  animation: far-out-exit var(--curtain-open) cubic-bezier(0.5, 0, 0.9, 0.6) both;
}

/* Sinking: lianas rise from below, hang across the screen, then fly off the top */
@keyframes near-in-cover {
  from {
    transform: translateY(100vh);
  }
  to {
    transform: translateY(-22vh);
  }
}
@keyframes near-in-exit {
  from {
    transform: translateY(-22vh);
  }
  to {
    transform: translateY(-2500px);
  }
}
@keyframes far-in-cover {
  from {
    transform: translateY(100vh);
  }
  to {
    transform: translateY(-8vh);
  }
}
@keyframes far-in-exit {
  from {
    transform: translateY(-8vh);
  }
  to {
    transform: translateY(-1800px);
  }
}
/* Climbing back: same lianas, the other way round */
@keyframes near-out-cover {
  from {
    transform: translateY(-2500px);
  }
  to {
    transform: translateY(-22vh);
  }
}
@keyframes near-out-exit {
  from {
    transform: translateY(-22vh);
  }
  to {
    transform: translateY(100vh);
  }
}
@keyframes far-out-cover {
  from {
    transform: translateY(-1800px);
  }
  to {
    transform: translateY(-8vh);
  }
}
@keyframes far-out-exit {
  from {
    transform: translateY(-8vh);
  }
  to {
    transform: translateY(100vh);
  }
}

/* ---------- Label ---------- */
/* Soft dark backing so the label stays readable on the bark */
.curtain__core {
  position: absolute;
  top: 50%;
  left: 50%;
  width: min(100vw, 1100px);
  height: min(70vh, 520px);
  translate: -50% -50%;
  background: radial-gradient(
    closest-side,
    oklch(0.1 0.01 155 / 0.92) 45%,
    oklch(0.1 0.01 155 / 0) 100%
  );
  opacity: 0;
  transition: opacity calc(var(--curtain-open) * 0.5) ease;
}
.curtain.is-closing .curtain__core,
.curtain.is-closed .curtain__core {
  opacity: 1;
  transition-duration: var(--curtain-close);
}

/* Centred with flex, not `translate`: the build minifier drops `translate`
   when the same rule also sets `transform`. */
.curtain__label {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 4vw;
  text-align: center;
  text-wrap: balance;
  opacity: 0;
  /* The label follows the camera: it comes from where we are heading */
  transform: translateY(28px);
  transition:
    opacity 0.18s ease,
    transform var(--curtain-open) ease-in;
}
.curtain.is-in.is-opening .curtain__label {
  transform: translateY(-28px);
}
.curtain.is-out .curtain__label {
  transform: translateY(-28px);
}
.curtain.is-out.is-opening .curtain__label {
  transform: translateY(28px);
}
.curtain__name {
  margin-top: 0.5rem;
  font-family: var(--font-display);
  font-size: clamp(3rem, 9vw, 4.5rem);
  font-weight: 800;
  line-height: 1;
  text-transform: uppercase;
  color: var(--foreground);
}
@media (min-width: 768px) {
  .curtain__name {
    font-size: 4.5rem;
  }
}
.curtain.is-closing .curtain__label,
.curtain.is-closed .curtain__label {
  opacity: 1;
  transform: none;
  transition:
    opacity var(--curtain-close) ease,
    transform calc(var(--curtain-close) + var(--curtain-hold)) cubic-bezier(0.15, 0.7, 0.3, 1);
}

@media (prefers-reduced-motion: reduce) {
  .curtain {
    display: none;
  }
}
</style>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { CLOSE_MS, HOLD_MS, OPEN_MS, transition } from '../composables/useRouteTransition'
import forestRails from '../assets/scenes/forest-rails.jpg'
import boutique from '../assets/scenes/boutique-studio.jpg'
import river from '../assets/scenes/river-tent.jpg'
import clearing from '../assets/scenes/clearing.jpg'
import nearLeaves from '../assets/transition/foliage-near.webp'

// "Rail journey" between two rubrics, played over the page while the route swaps.
// - Diving to a rubric: we start on the rails photo and travel towards its
//   vanishing point, then the new rubric's scene opens up from the depth of the
//   jungle.
// - Back to a previous rubric: the exact reverse. The scene we leave shrinks into
//   the vanishing point, we back out along the rails, then the previous scene
//   comes back (or the rails stay, when returning to Coaching).
// Each scene matches the hero background of its page, so the arrival is
// seamless. Pure decor: the label repeats what the router is already doing, so
// the whole overlay is hidden from assistive tech.

// Hero background of each rubric (same image and mirroring as the page)
const scenes = {
  '00': { image: forestRails },
  '01': { image: boutique },
  '02': { image: river, mirror: true },
  '03': { image: clearing },
}

// Vanishing point of the rails in forest-rails.jpg (1920×1088), as a fraction of the image
const RAILS_VP = { x: 0.503, y: 0.602 }
const IMG = { w: 1920, h: 1088 }
// Page backgrounds are slightly zoomed (drift animation), the layers end at the same scale
const PAGE_SCALE = 1.08

const vp = ref({ x: 0, y: 0, cover: 0 })

// Screen position of the vanishing point, with the same "cover" framing as the page background
function measure() {
  const vw = window.innerWidth
  const vh = window.innerHeight
  const s = Math.max(vw / IMG.w, vh / IMG.h) * PAGE_SCALE
  const w = IMG.w * s
  const h = IMG.h * s
  const x = (vw - w) / 2 + RAILS_VP.x * w
  const y = (vh - h) / 2 + RAILS_VP.y * h
  const cover = Math.hypot(Math.max(x, vw - x), Math.max(y, vh - y)) + 40
  vp.value = { x, y, cover }
}

watch(
  () => transition.phase,
  (phase, prev) => {
    if (phase === 'closing' && prev === 'idle') measure()
  },
)

// Preload the scenes so the new rubric appears without a blank frame
onMounted(() => {
  measure()
  for (const s of Object.values(scenes)) new Image().src = s.image
  new Image().src = nearLeaves
})

const back = computed(() => transition.direction === 'out')
const fromScene = computed(() => scenes[transition.from] ?? null)
const toScene = computed(() => scenes[transition.to] ?? null)

const style = computed(() => ({
  '--curtain-close': `${CLOSE_MS}ms`,
  '--curtain-hold': `${HOLD_MS}ms`,
  '--curtain-open': `${OPEN_MS}ms`,
  '--vp-x': `${vp.value.x}px`,
  '--vp-y': `${vp.value.y}px`,
  '--cover': `${vp.value.cover}px`,
}))

// transition.label is "NN — Rubric name"
const parts = computed(() => {
  const [num = '', ...rest] = transition.label.split(' — ')
  return { num, name: rest.join(' — ') }
})
</script>

<template>
  <div
    class="curtain"
    :class="[`is-${transition.phase}`, back ? 'is-back' : 'is-dive']"
    :style="style"
    aria-hidden="true"
  >
    <!-- The rails, always at the heart of the journey -->
    <div class="layer track">
      <img :src="forestRails" alt="" decoding="async" />
      <div class="shade bg-canopy"></div>
      <div class="shade bg-side-fade"></div>
    </div>
    <div class="glow"></div>

    <!-- Leaves brushing past the lens (flying out when diving, back in when backing out) -->
    <div class="layer leaves leaves--a"><img :src="nearLeaves" alt="" decoding="async" /></div>
    <div class="layer leaves leaves--b"><img :src="nearLeaves" alt="" decoding="async" /></div>

    <template v-if="back">
      <!-- The previous scene comes back over the rails (not when returning to Coaching: the rails are its scene) -->
      <div v-if="toScene && transition.to !== '00'" class="layer scene scene--return">
        <img :src="toScene.image" alt="" decoding="async" :class="{ 'is-mirror': toScene.mirror }" />
        <div class="shade bg-canopy"></div>
        <div class="shade bg-side-fade" :class="{ 'is-mirror': toScene.mirror }"></div>
      </div>
      <!-- The scene we leave sinks into the depth of the rails -->
      <div v-if="fromScene" class="layer scene scene--leave">
        <img :src="fromScene.image" alt="" decoding="async" :class="{ 'is-mirror': fromScene.mirror }" />
        <div class="shade bg-canopy"></div>
        <div class="shade bg-side-fade" :class="{ 'is-mirror': fromScene.mirror }"></div>
      </div>
    </template>

    <template v-if="!back">
      <!-- Not leaving Coaching: the current scene fades away to reveal the rails -->
      <div v-if="fromScene && transition.from !== '00'" class="layer scene scene--from">
        <img :src="fromScene.image" alt="" decoding="async" :class="{ 'is-mirror': fromScene.mirror }" />
        <div class="shade bg-canopy"></div>
        <div class="shade bg-side-fade" :class="{ 'is-mirror': fromScene.mirror }"></div>
      </div>
      <!-- The new scene opens up from the vanishing point -->
      <div v-if="toScene" class="layer scene scene--arrive">
        <img :src="toScene.image" alt="" decoding="async" :class="{ 'is-mirror': toScene.mirror }" />
        <div class="shade bg-canopy"></div>
        <div class="shade bg-side-fade" :class="{ 'is-mirror': toScene.mirror }"></div>
      </div>
    </template>

    <div class="core"></div>
    <div class="label">
      <p class="label-mono text-primary">
        {{ back ? (transition.to === '00' ? 'Retour au départ' : 'Retour') : 'Direction' }} ·
        {{ parts.num }}
      </p>
      <p class="label__name">{{ parts.name }}</p>
    </div>
  </div>
</template>

<style scoped>
/*
 * Timeline: closing (CLOSE) → closed (HOLD, may last longer while the page
 * loads) → opening (OPEN) → idle. Animations that span several phases are
 * declared on `:not(.is-idle)` with the same name and duration, so changing
 * phase class does not restart them.
 */
.curtain {
  --total: calc(var(--curtain-close) + var(--curtain-hold) + var(--curtain-open));
  position: fixed;
  inset: 0;
  z-index: 60;
  pointer-events: none;
  visibility: hidden;
  overflow: hidden;
  background: var(--background);
}
.curtain:not(.is-idle) {
  visibility: visible;
}
.curtain.is-closing {
  animation: overlay-in 0.15s ease-out both;
}
/* The arriving scene matches the page background: fade the overlay away at the end */
.curtain.is-opening {
  animation: overlay-out var(--curtain-open) ease-in both;
}
@keyframes overlay-in {
  from {
    opacity: 0;
  }
}
@keyframes overlay-out {
  0%,
  72% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

/* ---------- Layers ---------- */
.layer {
  position: absolute;
  inset: 0;
  overflow: hidden;
  transform-origin: var(--vp-x) var(--vp-y);
  will-change: transform;
}
.layer img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.layer img.is-mirror,
.shade.is-mirror {
  transform: scaleX(-1);
}
.shade {
  position: absolute;
  inset: 0;
}

/* Rails: diving travels into the vanishing point, going back recoils out of it */
.track {
  transform: scale(1.08);
}
.curtain.is-dive:not(.is-idle) .track {
  animation: track-dive var(--total) cubic-bezier(0.55, 0, 0.75, 0.6) both;
}
.curtain.is-back:not(.is-idle) .track {
  animation: track-back var(--total) cubic-bezier(0.2, 0.6, 0.3, 1) both;
}
/* The shading lifts as we move so the rails stay visible */
.curtain:not(.is-idle) .track .shade {
  animation: shade-lift var(--total) ease both;
}
@keyframes track-dive {
  from {
    transform: scale(1.08);
  }
  to {
    transform: scale(3.2);
  }
}
@keyframes track-back {
  0% {
    transform: scale(3.2);
  }
  78%,
  100% {
    transform: scale(1.08);
  }
}
@keyframes shade-lift {
  0%,
  100% {
    opacity: 1;
  }
  45% {
    opacity: 0.55;
  }
}

/* Light at the end of the rails */
.glow {
  position: absolute;
  left: var(--vp-x);
  top: var(--vp-y);
  width: 60vmax;
  height: 60vmax;
  translate: -50% -50%;
  background: radial-gradient(closest-side, oklch(0.86 0.15 132 / 0.28), transparent 70%);
  mix-blend-mode: screen;
  opacity: 0;
}
.curtain:not(.is-idle) .glow {
  animation: glow var(--total) ease-in-out both;
}
@keyframes glow {
  0%,
  100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}

/* Leaves: real out-of-focus foliage flying past from the vanishing point */
.leaves {
  opacity: 0;
  /* Keep the middle clear for the label */
  mask-image: radial-gradient(closest-side, transparent 35%, #000 75%);
}
.leaves--b img {
  transform: rotate(180deg);
}
.curtain:not(.is-idle) .leaves--a {
  animation: leaves-fly calc(var(--curtain-close) + var(--curtain-hold)) cubic-bezier(0.5, 0, 0.9, 0.6)
    both;
}
.curtain:not(.is-idle) .leaves--b {
  animation: leaves-fly calc(var(--curtain-close) + var(--curtain-hold)) cubic-bezier(0.5, 0, 0.9, 0.6)
    calc(var(--curtain-close) * 0.45) both;
}
@keyframes leaves-fly {
  /* Never below scale 1, or the photo's hard side edges show */
  0% {
    opacity: 0;
    transform: scale(1);
  }
  30% {
    opacity: 0.95;
  }
  100% {
    opacity: 0;
    transform: scale(3.2);
  }
}

/* Backing out: the same leaves converge back into the depth */
.curtain.is-back:not(.is-idle) .leaves {
  animation-name: leaves-return;
}
@keyframes leaves-return {
  0% {
    opacity: 0;
    transform: scale(3.2);
  }
  70% {
    opacity: 0.95;
  }
  /* Never below scale 1, or the photo's hard side edges show */
  100% {
    opacity: 0;
    transform: scale(1);
  }
}

/* ---------- Scenes ---------- */
.scene {
  transform: scale(1.08);
}

/* Diving from a rubric other than Coaching: its scene dissolves into the rails */
.curtain:not(.is-idle) .scene--from {
  animation: scene-dissolve calc(var(--curtain-close) * 0.9) ease-in both;
}
@keyframes scene-dissolve {
  from {
    opacity: 1;
    transform: scale(1.08);
  }
  to {
    opacity: 0;
    transform: scale(1.5);
  }
}

/* New scene growing out of the depth of the jungle */
.scene--arrive {
  clip-path: circle(0 at var(--vp-x) var(--vp-y));
}
.curtain.is-opening .scene--arrive {
  animation: scene-arrive var(--curtain-open) cubic-bezier(0.3, 0, 0.2, 1) both;
}
@keyframes scene-arrive {
  0% {
    clip-path: circle(0 at var(--vp-x) var(--vp-y));
    transform: scale(1.6);
  }
  72%,
  100% {
    clip-path: circle(var(--cover) at var(--vp-x) var(--vp-y));
    transform: scale(1.08);
  }
}

/* Backing out to a rubric other than Coaching: its scene re-forms over the
   rails (reverse of scene-dissolve) */
.scene--return {
  opacity: 0;
}
.curtain.is-back.is-opening .scene--return {
  animation: scene-return var(--curtain-open) cubic-bezier(0.2, 0.6, 0.3, 1) both;
}
@keyframes scene-return {
  0% {
    opacity: 0;
    transform: scale(1.5);
  }
  72%,
  100% {
    opacity: 1;
    transform: scale(1.08);
  }
}

/* Backing out: the scene we leave shrinks into the vanishing point */
.scene--leave {
  clip-path: circle(var(--cover) at var(--vp-x) var(--vp-y));
}
.curtain.is-back:not(.is-idle) .scene--leave {
  animation: scene-leave calc(var(--curtain-close) + var(--curtain-hold)) cubic-bezier(0.6, 0, 0.4, 1)
    both;
}
@keyframes scene-leave {
  from {
    clip-path: circle(var(--cover) at var(--vp-x) var(--vp-y));
    transform: scale(1.08);
  }
  to {
    clip-path: circle(0 at var(--vp-x) var(--vp-y));
    transform: scale(0.55);
  }
}

/* ---------- Label ---------- */
/* Soft dark backing so the label stays readable on the photos */
.core {
  position: absolute;
  top: 50%;
  left: 50%;
  width: min(100vw, 1100px);
  height: min(60vh, 460px);
  translate: -50% -50%;
  background: radial-gradient(
    closest-side,
    oklch(0.1 0.01 155 / 0.75) 40%,
    oklch(0.1 0.01 155 / 0) 100%
  );
  opacity: 0;
}
/* Centred with flex, not `translate`: the build minifier drops `translate`
   when the same rule also sets `transform`. */
.label {
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
}
.curtain:not(.is-idle) .core,
.curtain:not(.is-idle) .label {
  animation: label var(--total) ease both;
}
@keyframes label {
  0%,
  8% {
    opacity: 0;
    transform: translateY(12px);
  }
  25%,
  62% {
    opacity: 1;
    transform: none;
  }
  80%,
  100% {
    opacity: 0;
    transform: translateY(-8px);
  }
}
.label__name {
  margin-top: 0.5rem;
  font-family: var(--font-display);
  font-size: clamp(3rem, 9vw, 4.5rem);
  font-weight: 800;
  line-height: 1;
  text-transform: uppercase;
  color: var(--foreground);
}
@media (min-width: 768px) {
  .label__name {
    font-size: 4.5rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .curtain {
    display: none;
  }
}
</style>

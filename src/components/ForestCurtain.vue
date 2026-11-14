<script setup>
import { computed } from 'vue'
import { CLOSE_MS, OPEN_MS, transition } from '../composables/useRouteTransition'

// Foliage curtain shown between two rubrics. Pure decor: the label repeats what
// the router is already doing, so the whole overlay is hidden from assistive tech.

const VIEW_H = 640
const BASE_X = 240

// Leaf-shaped lobes along the inner edge of a panel, from a fixed pattern.
const LENGTHS = [78, 52, 90, 60, 84, 46, 72, 94, 56, 80, 64, 88]

function foliage(base, count, reach) {
  const h = VIEW_H / count
  let d = `M0 0 H${base}`
  for (let i = 0; i < count; i++) {
    const y = i * h
    const len = reach * (LENGTHS[i % LENGTHS.length] / 94)
    const tip = [base + len, y + h * 0.62]
    d += ` Q${base + len * 0.55} ${y - h * 0.05} ${tip[0]} ${tip[1]}`
    d += ` Q${base + len * 0.4} ${y + h * 0.95} ${base} ${y + h}`
  }
  return `${d} H0 Z`
}

const layers = [
  { d: foliage(150, 7, 90), fill: '#04100a' },
  { d: foliage(140, 11, 74), fill: '#08190f' },
  { d: foliage(128, 15, 60), fill: '#0c2918' },
  { d: foliage(112, 19, 46), fill: '#0f3d22' },
]

const style = computed(() => ({
  '--curtain-close': `${CLOSE_MS}ms`,
  '--curtain-open': `${OPEN_MS}ms`,
}))
</script>

<template>
  <div
    class="curtain"
    :class="[`is-${transition.phase}`, `is-${transition.direction}`]"
    :style="style"
    aria-hidden="true"
  >
    <div class="curtain__panel curtain__panel--left">
      <svg viewBox="0 0 240 640" preserveAspectRatio="xMaxYMid slice">
        <path v-for="(l, i) in layers" :key="i" :d="l.d" :fill="l.fill" />
      </svg>
    </div>
    <div class="curtain__panel curtain__panel--right">
      <svg viewBox="0 0 240 640" preserveAspectRatio="xMaxYMid slice">
        <path v-for="(l, i) in layers" :key="i" :d="l.d" :fill="l.fill" />
      </svg>
    </div>
    <div class="curtain__core"></div>
    <p class="curtain__label">{{ transition.label }}</p>
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

.curtain__panel {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 54%;
  transition: transform var(--curtain-open) cubic-bezier(0.6, 0, 0.3, 1);
}
.curtain__panel svg {
  display: block;
  width: 100%;
  height: 100%;
}
.curtain__panel--left {
  left: 0;
  transform: translateX(-104%);
  transform-origin: 0 50%;
}
.curtain__panel--right {
  right: 0;
  transform: translateX(104%);
  transform-origin: 100% 50%;
}
.curtain__panel--right svg {
  transform: scaleX(-1);
}

/* Coming back out: the foliage is "near", so it also shrinks into place. */
.curtain.is-out .curtain__panel--left {
  transform: translateX(-104%) scale(1.12);
}
.curtain.is-out .curtain__panel--right {
  transform: translateX(104%) scale(1.12);
}

.curtain.is-closing .curtain__panel,
.curtain.is-closed .curtain__panel {
  transition-duration: var(--curtain-close);
}
.curtain.is-closing .curtain__panel--left,
.curtain.is-closed .curtain__panel--left,
.curtain.is-closing .curtain__panel--right,
.curtain.is-closed .curtain__panel--right {
  transform: none;
}

/* Soft dark backing so the label never sits on the gaps between leaves */
.curtain__core {
  position: absolute;
  top: 50%;
  left: 50%;
  width: min(100vw, 1100px);
  height: min(70vh, 520px);
  translate: -50% -50%;
  background: radial-gradient(closest-side, rgba(4, 16, 10, 0.96) 55%, rgba(4, 16, 10, 0) 100%);
  opacity: 0;
  transition: opacity var(--curtain-open) ease;
}
.curtain.is-closing .curtain__core,
.curtain.is-closed .curtain__core {
  opacity: 1;
  transition-duration: var(--curtain-close);
}

.curtain__label {
  position: absolute;
  top: 50%;
  left: 50%;
  width: min(92vw, 1000px);
  translate: -50% -50%;
  text-align: center;
  text-wrap: balance;
  font-family: var(--display);
  font-size: clamp(38px, 9vw, 112px);
  line-height: 1;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--text);
  text-shadow: 0 2px 18px #000;
  opacity: 0;
  transform: translateY(10px);
  transition:
    opacity 0.18s ease,
    transform var(--curtain-open) ease;
}
.curtain.is-out .curtain__label {
  transform: translateY(-10px);
}
.curtain.is-closed .curtain__label {
  opacity: 1;
  transform: none;
  transition:
    opacity 0.2s ease,
    transform 0.3s ease;
}
.curtain.is-closing .curtain__label {
  opacity: 0.7;
  transform: none;
  transition:
    opacity var(--curtain-close) ease,
    transform var(--curtain-close) ease;
}

@media (prefers-reduced-motion: reduce) {
  .curtain {
    display: none;
  }
}
</style>

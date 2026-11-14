<script setup>
import { computed } from 'vue'

// Fixed backdrop whose scene follows the current rubric. Flat layered
// silhouettes, very low contrast, kept to the edges so the centre stays clean.
// Pure inline SVG + CSS: no image, no JS animation.

const props = defineProps({
  rubric: { type: String, default: '' },
})

// Unknown rubric (legal pages, 404) falls back to the calm 03 scene.
const active = computed(() => (['00', '01', '02', '03'].includes(props.rubric) ? props.rubric : '03'))

// Rails receding toward a vanishing point at the horizon (scene 00).
const VP = { x: 800, y: 70 }
const BOTTOM = 520
const sleepers = Array.from({ length: 13 }, (_, i) => {
  const t = ((i + 1) / 13) ** 1.9 // 0 = horizon, 1 = bottom of the scene
  const y = VP.y + (BOTTOM - VP.y) * t
  const half = 800 - 239 * t - (12 + 40 * t) // sleepers stick out past the rails
  const thick = 1.5 + 11 * t
  return {
    points: `${half.toFixed(1)},${y.toFixed(1)} ${(1600 - half).toFixed(1)},${y.toFixed(1)} ${(1600 - half).toFixed(1)},${(y + thick).toFixed(1)} ${half.toFixed(1)},${(y + thick).toFixed(1)}`,
    opacity: (0.35 + 0.55 * t).toFixed(2),
  }
})
</script>

<template>
  <div class="decor" aria-hidden="true">
    <!-- Shared silhouettes -->
    <svg class="defs" width="0" height="0" focusable="false">
      <defs>
        <radialGradient id="dt-glow">
          <stop offset="0" stop-color="#e8c26a" stop-opacity="0.5" />
          <stop offset="1" stop-color="#e8c26a" stop-opacity="0" />
        </radialGradient>
        <linearGradient id="dt-river" x1="0" x2="1">
          <stop offset="0" stop-color="#1b3a4a" stop-opacity="0" />
          <stop offset="0.5" stop-color="#1b3a4a" stop-opacity="0.55" />
          <stop offset="1" stop-color="#1b3a4a" stop-opacity="0" />
        </linearGradient>
      </defs>
      <symbol id="dt-conifer" viewBox="0 0 100 200" preserveAspectRatio="none">
        <path
          fill="currentColor"
          d="M50 0 L76 62 H62 L84 112 H66 L98 176 H56 V200 H44 V176 H2 L34 112 H16 L38 62 H24 Z"
        />
      </symbol>
      <symbol id="dt-round" viewBox="0 0 120 200" preserveAspectRatio="none">
        <g fill="currentColor">
          <circle cx="60" cy="56" r="48" />
          <circle cx="30" cy="92" r="32" />
          <circle cx="92" cy="94" r="30" />
          <rect x="54" y="100" width="12" height="100" />
        </g>
      </symbol>
      <symbol id="dt-fern" viewBox="0 0 120 120" preserveAspectRatio="none">
        <g fill="currentColor">
          <path d="M60 120 Q54 60 60 6 Q72 60 60 120Z" />
          <path d="M60 120 Q40 70 8 52 Q46 78 60 120Z" />
          <path d="M60 120 Q34 92 2 94 Q40 98 60 120Z" />
          <path d="M60 120 Q80 70 112 52 Q74 78 60 120Z" />
          <path d="M60 120 Q86 92 118 94 Q80 98 60 120Z" />
        </g>
      </symbol>
      <symbol id="dt-leaf" viewBox="0 0 200 200" preserveAspectRatio="none">
        <path fill="currentColor" d="M6 194 Q10 70 104 24 Q172 4 196 6 Q192 96 128 150 Q76 190 6 194Z" />
        <path d="M10 190 Q92 104 190 10" fill="none" stroke="#0b0b0b" stroke-opacity="0.45" stroke-width="3" />
      </symbol>
      <symbol id="dt-tent" viewBox="0 0 140 90" preserveAspectRatio="none">
        <path fill="currentColor" d="M70 0 L140 90 H0 Z" />
      </symbol>

      <!-- Dense forest edge, anchored bottom-left -->
      <symbol id="dt-edge-a" viewBox="0 0 600 900" preserveAspectRatio="xMinYMax meet">
        <g style="color: #0b1c12">
          <use href="#dt-conifer" x="-30" y="380" width="170" height="520" />
          <use href="#dt-conifer" x="130" y="520" width="120" height="380" />
          <use href="#dt-conifer" x="260" y="610" width="90" height="290" />
        </g>
        <g style="color: #0e2a19">
          <use href="#dt-conifer" x="-70" y="500" width="210" height="400" />
          <use href="#dt-round" x="90" y="560" width="150" height="340" />
          <use href="#dt-conifer" x="210" y="650" width="100" height="250" />
        </g>
        <g style="color: #10301d">
          <use href="#dt-round" x="-30" y="640" width="130" height="260" />
          <use href="#dt-conifer" x="60" y="700" width="90" height="200" />
        </g>
        <g class="sway" style="color: #0f3d22">
          <use href="#dt-fern" x="-20" y="770" width="210" height="130" />
          <use href="#dt-fern" x="150" y="810" width="150" height="90" />
        </g>
        <g class="sway sway--b" style="color: #1f7a3f" opacity="0.28">
          <use href="#dt-fern" x="60" y="826" width="110" height="74" />
          <use href="#dt-fern" x="280" y="846" width="90" height="54" />
        </g>
        <g fill="#6fdc8c" opacity="0.3">
          <circle cx="226" cy="560" r="2" />
          <circle cx="312" cy="640" r="1.6" />
          <circle cx="120" cy="470" r="1.8" />
        </g>
      </symbol>

      <!-- Sparser forest edge, anchored bottom-left -->
      <symbol id="dt-edge-b" viewBox="0 0 600 900" preserveAspectRatio="xMinYMax meet">
        <g style="color: #0b1c12">
          <use href="#dt-conifer" x="20" y="470" width="130" height="430" />
          <use href="#dt-conifer" x="190" y="650" width="80" height="250" />
        </g>
        <g style="color: #0e2a19">
          <use href="#dt-round" x="-40" y="560" width="150" height="340" />
          <use href="#dt-conifer" x="130" y="600" width="110" height="300" />
        </g>
        <g class="sway" style="color: #0f3d22">
          <use href="#dt-fern" x="-10" y="790" width="180" height="110" />
          <use href="#dt-fern" x="160" y="830" width="120" height="70" />
        </g>
      </symbol>

      <!-- Foliage hanging from a top corner -->
      <symbol id="dt-canopy" viewBox="0 0 600 420" preserveAspectRatio="xMinYMin meet">
        <g style="color: #0b1c12">
          <use href="#dt-leaf" x="-60" y="-60" width="300" height="300" />
          <use href="#dt-leaf" x="150" y="-90" width="260" height="260" />
        </g>
        <g class="sway sway--top" style="color: #0e2a19">
          <use href="#dt-leaf" x="-30" y="-40" width="230" height="230" />
          <use href="#dt-leaf" x="210" y="-60" width="170" height="170" />
        </g>
        <g class="sway sway--top sway--b" style="color: #10301d">
          <use href="#dt-leaf" x="-50" y="60" width="150" height="150" />
        </g>
        <circle cx="300" cy="150" r="1.8" fill="#6fdc8c" opacity="0.28" />
      </symbol>
    </svg>

    <!-- 00 Coaching: arrival at the forest edge, track toward the trees -->
    <div class="scene" :class="{ 'is-active': active === '00' }">
      <svg class="edge edge--l edge--big" viewBox="0 0 600 900" preserveAspectRatio="xMinYMax meet">
        <use href="#dt-edge-a" width="600" height="900" />
      </svg>
      <svg class="edge edge--r" viewBox="0 0 600 900" preserveAspectRatio="xMinYMax meet">
        <use href="#dt-edge-b" width="600" height="900" />
      </svg>
      <svg class="floor floor--track" viewBox="0 0 1600 520" preserveAspectRatio="xMidYMax meet">
        <ellipse cx="800" cy="72" rx="150" ry="22" fill="#10301d" opacity="0.5" />
        <g style="color: #0b1c12">
          <use href="#dt-conifer" x="640" y="-30" width="64" height="110" />
          <use href="#dt-conifer" x="716" y="-6" width="52" height="84" />
          <use href="#dt-conifer" x="836" y="-14" width="58" height="94" />
          <use href="#dt-conifer" x="900" y="8" width="44" height="72" />
        </g>
        <g fill="#0f3d22">
          <polygon v-for="(s, i) in sleepers" :key="i" :points="s.points" :opacity="s.opacity" />
        </g>
        <g fill="#1f7a3f" opacity="0.55">
          <polygon :points="`798,${VP.y} 802,${VP.y} 1058,${BOTTOM} 1020,${BOTTOM}`" />
          <polygon :points="`798,${VP.y} 802,${VP.y} 580,${BOTTOM} 542,${BOTTOM}`" />
        </g>
      </svg>
    </div>

    <!-- 01 Boutique: almost plain, one band of large leaves in a corner -->
    <div class="scene" :class="{ 'is-active': active === '01' }">
      <svg class="corner corner--br" viewBox="0 0 700 420" preserveAspectRatio="xMaxYMax meet">
        <g class="sway sway--b" style="color: #0b1c12">
          <use href="#dt-leaf" x="300" y="220" width="260" height="260" transform="rotate(-24 430 350)" />
          <use href="#dt-leaf" x="460" y="150" width="280" height="280" transform="rotate(-40 600 290)" />
        </g>
        <g style="color: #0e2a19">
          <use href="#dt-leaf" x="380" y="270" width="200" height="200" transform="rotate(-10 480 370)" />
          <use href="#dt-leaf" x="560" y="250" width="190" height="190" transform="rotate(-58 655 345)" />
        </g>
        <g style="color: #10301d">
          <use href="#dt-leaf" x="520" y="320" width="150" height="150" transform="rotate(-30 595 395)" />
        </g>
      </svg>
    </div>

    <!-- 02 Collaborations: riverside camp at night -->
    <div class="scene" :class="{ 'is-active': active === '02' }">
      <svg class="edge edge--l" viewBox="0 0 600 900" preserveAspectRatio="xMinYMax meet">
        <use href="#dt-edge-b" width="600" height="900" />
      </svg>
      <svg class="edge edge--r edge--big" viewBox="0 0 600 900" preserveAspectRatio="xMinYMax meet">
        <use href="#dt-edge-a" width="600" height="900" />
      </svg>
      <svg class="floor floor--camp" viewBox="0 0 1600 360" preserveAspectRatio="xMidYMax slice">
        <g fill="#e8c26a" opacity="0.4">
          <circle cx="260" cy="40" r="1.6" />
          <circle cx="520" cy="22" r="1.4" />
          <circle cx="1130" cy="30" r="1.6" />
          <circle cx="1350" cy="64" r="1.4" />
        </g>
        <path
          d="M-40 330 C 200 270 420 300 640 292 C 860 284 1020 330 1260 306 C 1420 290 1520 300 1660 280 L1660 336 C 1500 354 1420 348 1260 360 C 1020 376 860 340 640 346 C 420 352 200 330 -40 360 Z"
          fill="url(#dt-river)"
        />
        <path
          d="M80 322 C 260 292 420 312 640 304 C 860 296 1000 334 1240 322"
          fill="none"
          stroke="#2f5d70"
          stroke-opacity="0.35"
          stroke-width="1.5"
        />
        <g class="tent" transform="translate(40 214)">
          <circle class="tent__glow" cx="70" cy="82" r="150" fill="url(#dt-glow)" />
          <g style="color: #0e2a19">
            <use href="#dt-tent" x="0" y="0" width="140" height="90" />
          </g>
          <path class="tent__door" d="M70 22 L96 90 H44 Z" fill="#e8c26a" />
          <path d="M70 22 V90" stroke="#0b0b0b" stroke-opacity="0.5" stroke-width="2" />
        </g>
        <g style="color: #0b1c12">
          <use href="#dt-conifer" x="196" y="226" width="60" height="110" />
          <use href="#dt-conifer" x="1300" y="236" width="56" height="100" />
        </g>
      </svg>
    </div>

    <!-- 03 FAQ & Réseaux (also used for legal pages and 404): calm canopy -->
    <div class="scene" :class="{ 'is-active': active === '03' }">
      <svg class="canopy canopy--l" viewBox="0 0 600 420" preserveAspectRatio="xMinYMin meet">
        <use href="#dt-canopy" width="600" height="420" />
      </svg>
      <svg class="canopy canopy--r" viewBox="0 0 600 420" preserveAspectRatio="xMinYMin meet">
        <use href="#dt-canopy" width="600" height="420" />
      </svg>
    </div>
  </div>
</template>

<style scoped>
.decor {
  position: fixed;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
}
.defs {
  position: absolute;
  width: 0;
  height: 0;
}

.scene {
  position: absolute;
  inset: 0;
  opacity: 0;
  visibility: hidden;
  transition:
    opacity 0.7s ease,
    visibility 0s linear 0.7s;
}
.scene.is-active {
  opacity: 0.85;
  visibility: visible;
  transition:
    opacity 0.7s ease 0.1s,
    visibility 0s;
}

/* Edge and corner groups are sized by width and anchored to their corner */
.edge {
  position: absolute;
  bottom: 0;
  width: min(36vw, 560px);
  height: 100%;
}
.edge--big {
  width: min(40vw, 640px);
}
.edge--l {
  left: 0;
}
.edge--r {
  right: 0;
  transform: scaleX(-1);
}
.floor {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}
.floor--track {
  height: min(40vh, 460px);
  opacity: 0.75;
}
.floor--camp {
  height: min(34vh, 360px);
}
.corner {
  position: absolute;
  right: 0;
  bottom: 0;
  width: min(56vw, 760px);
  height: min(60vh, 460px);
}
.canopy {
  position: absolute;
  top: 0;
  width: min(42vw, 560px);
  height: min(46vh, 400px);
}
.canopy--l {
  left: 0;
}
.canopy--r {
  right: 0;
  transform: scaleX(-1);
}

/* Subtle life: long, slow, transform-only */
.sway {
  transform-box: fill-box;
  transform-origin: 50% 100%;
  animation: dt-sway 11s ease-in-out infinite alternate;
}
.sway--b {
  animation-duration: 15s;
  animation-delay: -4s;
}
.sway--top {
  transform-origin: 0 0;
}
@keyframes dt-sway {
  from {
    transform: rotate(-1.4deg);
  }
  to {
    transform: rotate(1.4deg);
  }
}

.tent__glow,
.tent__door {
  animation: dt-glow 6s ease-in-out infinite alternate;
  animation-play-state: paused;
}
.tent__door {
  opacity: 0.22;
}
.tent__glow {
  opacity: 0.2;
}
.scene.is-active .tent__glow,
.scene.is-active .tent__door {
  animation-play-state: running;
}
@keyframes dt-glow {
  from {
    opacity: 0.12;
  }
  to {
    opacity: 0.3;
  }
}

@media (max-width: 820px) {
  .edge,
  .edge--big {
    width: 64vw;
  }
  .corner {
    width: 84vw;
  }
  .canopy {
    width: 62vw;
  }
  .floor--track {
    height: 40vh;
  }
}

@media (prefers-reduced-motion: reduce) {
  .scene,
  .scene.is-active {
    transition: opacity 0.3s ease;
  }
  .sway,
  .tent__glow,
  .tent__door {
    animation: none;
  }
}
</style>

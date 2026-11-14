<script setup>
import { computed } from 'vue'
import { site } from '../config/site'

const props = defineProps({
  current: { type: String, required: true },
})

const rubrics = site.rubrics
const index = computed(() => rubrics.findIndex((r) => r.num === props.current))
const prev = computed(() => rubrics[index.value - 1] ?? null)
const next = computed(() => rubrics[index.value + 1] ?? null)

// Green "travelled" part of the rails, up to the centre of the current station.
const travelled = computed(() => ((index.value + 0.5) / rubrics.length) * 100)
</script>

<template>
  <nav class="trail" aria-label="Parcours des rubriques">
    <div class="w trail__inner">
      <RouterLink v-if="prev" :to="prev.to" class="trail__end trail__end--prev" rel="prev">
        <span class="trail__arrow" aria-hidden="true">←</span>
        <span class="trail__end-text">
          <span class="trail__num">{{ prev.num }}</span> {{ prev.label }}
        </span>
      </RouterLink>

      <div class="trail__track">
        <svg class="trail__rails" width="100%" height="40" aria-hidden="true" focusable="false">
          <defs>
            <pattern id="dt-sleepers" width="16" height="40" patternUnits="userSpaceOnUse">
              <rect x="6" y="4" width="4" height="32" rx="1" fill="#2f2f2f" />
            </pattern>
            <pattern id="dt-sleepers-done" width="16" height="40" patternUnits="userSpaceOnUse">
              <rect x="6" y="4" width="4" height="32" rx="1" fill="#0f3d22" />
            </pattern>
          </defs>
          <g class="trail__rails-base">
            <rect width="100%" height="40" fill="url(#dt-sleepers)" />
            <rect y="12" width="100%" height="3" />
            <rect y="25" width="100%" height="3" />
          </g>
          <svg class="trail__rails-done" :width="`${travelled}%`" height="40">
            <rect width="100%" height="40" fill="url(#dt-sleepers-done)" />
            <rect y="12" width="100%" height="3" />
            <rect y="25" width="100%" height="3" />
          </svg>
        </svg>

        <ol class="trail__stations">
          <li v-for="r in rubrics" :key="r.num" class="trail__station">
            <RouterLink
              :to="r.to"
              class="trail__stop"
              :class="{ 'is-current': r.num === current }"
              :aria-current="r.num === current ? 'page' : undefined"
            >
              <span class="trail__badge">{{ r.num }}</span>
              <span class="trail__name">{{ r.label }}</span>
              <span v-if="r.to === '/'" class="trail__sub">Accueil</span>
            </RouterLink>
          </li>
        </ol>
      </div>

      <RouterLink v-if="next" :to="next.to" class="trail__end trail__end--next" rel="next">
        <span class="trail__end-text">
          <span class="trail__num">{{ next.num }}</span> {{ next.label }}
        </span>
        <span class="trail__arrow" aria-hidden="true">→</span>
      </RouterLink>
    </div>
  </nav>
</template>

<style scoped>
.trail {
  padding: 32px 0 36px;
  background: color-mix(in srgb, var(--bg) 70%, transparent);
  border-top: 1px solid var(--line);
}
.trail__inner {
  display: grid;
  grid-template-columns: minmax(150px, 1fr) minmax(0, 3fr) minmax(150px, 1fr);
  grid-template-areas: 'prev track next';
  align-items: center;
  gap: 24px;
}
.trail__track {
  grid-area: track;
  position: relative;
  /* Room for the badge + labels */
  height: 108px;
}
.trail__end--prev {
  grid-area: prev;
  justify-self: start;
}
.trail__end--next {
  grid-area: next;
  justify-self: end;
}

/* Rails */
.trail__rails {
  position: absolute;
  top: 6px;
  left: 0;
  width: 100%;
  height: 40px;
}
.trail__rails-base {
  fill: #2f2f2f;
}
.trail__rails-done {
  fill: var(--accent);
}

/* Stations: four equal columns, each centred on the rails */
.trail__stations {
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin: 0;
  padding: 0;
  list-style: none;
}
.trail__station {
  display: flex;
  justify-content: center;
}
.trail__stop {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  min-width: 44px;
  color: var(--body);
}
.trail__badge {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  margin-top: 4px;
  background: var(--surface);
  border: 2px solid #4a4a4a;
  font-family: var(--display);
  font-size: 24px;
  line-height: 1;
  letter-spacing: 1px;
  color: var(--text);
  transition:
    background-color 0.2s,
    border-color 0.2s;
}
.trail__name {
  font-family: var(--label);
  font-weight: 500;
  font-size: 13px;
  letter-spacing: 1.5px;
  text-align: center;
  text-transform: uppercase;
  color: var(--body);
  /* Opaque pill so the label never sits on the rails or decor */
  padding: 0 6px;
  background: color-mix(in srgb, var(--bg) 85%, transparent);
}
.trail__sub {
  font-family: var(--label);
  font-size: 11px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--muted);
  margin-top: -2px;
}
.trail__stop:hover .trail__badge {
  border-color: var(--accent-bright);
}
.trail__stop:hover .trail__name {
  color: var(--accent-bright);
}
.trail__stop.is-current .trail__badge {
  background: var(--accent);
  border-color: var(--accent-bright);
  color: #fff;
}
.trail__stop.is-current .trail__name {
  color: var(--text);
}

/* Previous / next */
.trail__end {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-height: 44px;
  padding: 6px 4px;
  font-family: var(--label);
  font-weight: 500;
  font-size: 15px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--text);
}
.trail__num {
  color: var(--accent-bright);
}
.trail__arrow {
  font-size: 20px;
  line-height: 1;
  transition: translate 0.2s ease;
}
.trail__end--prev:hover .trail__arrow {
  translate: -4px 0;
}
.trail__end--next:hover .trail__arrow {
  translate: 4px 0;
}

@media (max-width: 820px) {
  .trail {
    padding: 20px 0 24px;
  }
  .trail__inner {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      'track track'
      'prev next';
    gap: 8px 12px;
  }
  .trail__end--next {
    grid-column: 2;
  }
  .trail__end--prev {
    grid-column: 1;
  }
}

@media (max-width: 560px) {
  .trail__track {
    height: 64px;
  }
  .trail__name,
  .trail__sub {
    /* Numbers only on the stations; the name stays available to screen readers */
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }
  .trail__end {
    font-size: 14px;
    letter-spacing: 1px;
    gap: 6px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .trail__arrow,
  .trail__badge {
    transition: none;
  }
  .trail__end--prev:hover .trail__arrow,
  .trail__end--next:hover .trail__arrow {
    translate: none;
  }
}
</style>

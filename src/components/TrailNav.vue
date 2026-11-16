<script setup>
import { computed } from 'vue'
import { site } from '../config/site'

// Previous / next rubric cards at the bottom of each rubric page.
const props = defineProps({
  current: { type: String, required: true },
})

const rubrics = site.rubrics
const index = computed(() => rubrics.findIndex((r) => r.num === props.current))
const prev = computed(() => rubrics[index.value - 1] ?? null)
const next = computed(() => rubrics[index.value + 1] ?? null)
</script>

<template>
  <nav class="trail" aria-label="Parcours des rubriques">
    <RouterLink v-if="prev" :to="prev.to" class="trail__card trail__card--prev" rel="prev">
      <svg class="trail__arrow" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M19 12H5m6-6-6 6 6 6" />
      </svg>
      <span>
        <span class="label-mono trail__kicker">Ressortir · {{ prev.num }}</span>
        <span class="trail__name">{{ prev.label }}</span>
      </span>
    </RouterLink>
    <span v-else></span>

    <RouterLink v-if="next" :to="next.to" class="trail__card trail__card--next" rel="next">
      <span>
        <span class="label-mono trail__kicker">S'enfoncer · {{ next.num }}</span>
        <span class="trail__name">{{ next.label }}</span>
      </span>
      <svg class="trail__arrow" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M5 12h14m-6-6 6 6-6 6" />
      </svg>
    </RouterLink>
  </nav>
</template>

<style scoped>
.trail {
  display: grid;
  gap: 0.75rem;
  max-width: 80rem;
  margin: 0 auto;
  padding: 2.5rem 1.5rem;
}
.trail__card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  transition: border-color 0.2s;
}
.trail__card--next {
  justify-content: flex-end;
  text-align: right;
}
.trail__card:hover {
  border-color: var(--primary);
}
.trail__kicker {
  display: block;
  color: var(--muted-foreground);
}
.trail__name {
  display: block;
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.2;
  text-transform: uppercase;
  color: var(--foreground);
}
.trail__arrow {
  flex: none;
  color: var(--muted-foreground);
  transition:
    transform 0.2s,
    color 0.2s;
}
.trail__card:hover .trail__arrow {
  color: var(--primary);
}
.trail__card--prev:hover .trail__arrow {
  transform: translateX(-0.25rem);
}
.trail__card--next:hover .trail__arrow {
  transform: translateX(0.25rem);
}
@media (min-width: 640px) {
  .trail {
    grid-template-columns: 1fr 1fr;
  }
}
@media (min-width: 768px) {
  .trail {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}
@media (prefers-reduced-motion: reduce) {
  .trail__arrow {
    transition: color 0.2s;
  }
  .trail__card:hover .trail__arrow {
    transform: none;
  }
}
</style>

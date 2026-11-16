<script setup>
import { ref } from 'vue'
import { questions } from '../../data/faq'

// Single-open accordion: index of the open item, or -1
const open = ref(-1)
const toggle = (i) => {
  open.value = open.value === i ? -1 : i
}
</script>

<template>
  <section id="faq" class="faq">
    <p class="label-mono text-muted">Questions fréquentes</p>
    <ul class="faq__list">
      <li v-for="(q, i) in questions" :key="q.q" class="qa">
        <h2 class="qa__h">
          <button
            :id="`faq-q-${i}`"
            type="button"
            class="qa__q"
            :aria-expanded="open === i"
            :aria-controls="`faq-a-${i}`"
            @click="toggle(i)"
          >
            <span class="qa__text">
              <span class="label-mono text-primary qa__num">{{ String(i + 1).padStart(2, '0') }}</span>
              <span>{{ q.q }}</span>
            </span>
            <svg class="qa__chev" :class="{ 'is-open': open === i }" viewBox="0 0 24 24" aria-hidden="true">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
        </h2>
        <div
          :id="`faq-a-${i}`"
          role="region"
          :aria-labelledby="`faq-q-${i}`"
          class="qa__panel"
          :class="{ 'is-open': open === i }"
        >
          <div class="qa__inner">
            <p class="qa__a text-muted">{{ q.a }}</p>
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.faq {
  min-width: 0;
}
.faq__list {
  list-style: none;
  margin: 1rem 0 0;
  padding: 0 1.25rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--card);
}
.qa {
  border-bottom: 1px solid var(--border);
}
.qa:last-child {
  border-bottom: 0;
}
.qa__h {
  margin: 0;
  font: inherit;
  text-transform: none;
}
.qa__q {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 0;
  background: none;
  border: 0;
  color: var(--foreground);
  font-family: var(--font-sans);
  font-size: 1rem;
  font-weight: 600;
  text-align: left;
  cursor: pointer;
  transition: color 0.2s;
}
.qa__q:hover {
  color: var(--primary);
}
.qa__q:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}
.qa__text {
  display: flex;
  gap: 1rem;
  min-width: 0;
}
.qa__num {
  padding-top: 0.25rem;
}
.qa__chev {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: transform 0.25s ease;
}
.qa__chev.is-open {
  transform: rotate(180deg);
}
.qa__panel {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.25s ease;
}
.qa__panel.is-open {
  grid-template-rows: 1fr;
}
.qa__inner {
  overflow: hidden;
}
.qa__a {
  margin: 0;
  padding: 0 0 1rem 2.5rem;
}
.qa__panel:not(.is-open) .qa__inner {
  visibility: hidden;
}
@media (prefers-reduced-motion: reduce) {
  .qa__panel,
  .qa__chev {
    transition: none;
  }
}
</style>

<script setup>
import { questions } from '../../data/faq'
</script>

<template>
  <section id="faq" class="faq">
    <div class="w faq__grid">
      <div v-reveal class="faq__heading">
        <p class="label label--accent">03 — FAQ &amp; Réseaux</p>
        <h1 class="section-title">
          Avant ta<br /><em v-reveal="{ variant: 'wipe', delay: 350 }" class="brush"
            >première séance</em
          >
        </h1>
        <p class="lede">Tout ce qu'on me demande avant de se lancer.</p>
        <a href="#reseaux" class="btn btn--outline-accent">Une autre question ? Écris-moi</a>
      </div>

      <div class="faq__list">
        <details v-for="(q, i) in questions" :key="q.q" v-reveal="i * 80" name="faq" class="qa">
          <summary class="qa__q">
            <span>{{ q.q }}</span>
            <span class="qa__icon" aria-hidden="true"></span>
          </summary>
          <p class="qa__a">{{ q.a }}</p>
        </details>
      </div>
    </div>
  </section>
</template>



<style scoped>
.faq {
  padding: 64px 0;
  background: var(--veil-2);
  border-top: 1px solid var(--line);
}
.faq__grid {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 40px;
  align-items: start;
}
.faq__heading {
  position: sticky;
  top: 120px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.faq__list {
  border-top: 1px solid var(--line);
}
.qa {
  border-bottom: 1px solid var(--line);
}
.qa__q {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  padding: 14px 0;
  cursor: pointer;
  list-style: none;
  font-family: var(--display);
  font-size: 24px;
  line-height: 1.05;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  transition: color 0.2s;
}
.qa__q > span:first-child {
  transition: translate 0.25s ease;
}
@media (hover: hover) and (prefers-reduced-motion: no-preference) {
  .qa__q:hover > span:first-child {
    translate: 10px 0;
  }
}
.qa__q::-webkit-details-marker {
  display: none;
}
.qa__q:hover,
.qa[open] .qa__q {
  color: var(--accent-bright);
}

/* « + » qui devient « − » */
.qa__icon {
  position: relative;
  flex-shrink: 0;
  width: 18px;
  height: 18px;
}
.qa__icon::before,
.qa__icon::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 3px;
  margin-top: -1.5px;
  background: currentColor;
  transition: transform 0.25s ease;
}
.qa__icon::after {
  transform: rotate(90deg);
}
.qa[open] .qa__icon::after {
  transform: rotate(0deg);
}

.qa__a {
  padding: 0 40px 16px 0;
  font-size: 16px;
  color: var(--body);
}
.qa[open] .qa__a {
  animation: qa-open 0.3s ease;
}
@keyframes qa-open {
  from {
    opacity: 0;
    transform: translateY(-6px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .qa[open] .qa__a {
    animation: none;
  }
}
@media (max-width: 820px) {
  .faq__grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .faq__heading {
    position: static;
  }
  .qa__q {
    font-size: 21px;
  }
  .qa__a {
    padding-right: 0;
  }
}
</style>

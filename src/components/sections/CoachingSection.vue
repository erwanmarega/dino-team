<script setup>
import SectionHeading from '../SectionHeading.vue'
import { fiches, options, infos } from '../../data/offers'
</script>

<template>
  <section id="fiches" class="coaching">
    <div class="container">
      <SectionHeading v-reveal kicker="II · Accompagnement">
        <template #title>Des milliers de façons de <span class="text-primary">s'entraîner et d'évoluer</span></template>
        <span class="coaching__lead">
          Chaque accompagnement est différent, et surtout il est adapté à TOI. Et cela commence
          forcément par un premier contact, un bilan et des objectifs fixés.
        </span>
      </SectionHeading>

      <div class="fiches">
        <article
          v-for="(fiche, i) in fiches"
          :id="`fiche-${fiche.num}`"
          :key="fiche.num"
          v-reveal="i * 140"
          class="fiche"
          :class="{
            'fiche--featured shadow-glow': fiche.featured,
            'fiche--upcoming': fiche.upcoming,
          }"
        >
          <div class="fiche__content">
            <div class="fiche__meta label-mono">
              <span class="text-primary">Fiche n°{{ fiche.num }}</span>
              <span class="text-muted">{{ fiche.kind }}</span>
            </div>
            <h3 class="fiche__title">{{ fiche.title }}</h3>
            <p class="text-muted">{{ fiche.text }}</p>
            <dl class="fiche__details">
              <template v-for="[term, value] in fiche.details" :key="term">
                <dt class="label-mono text-muted">{{ term }}</dt>
                <dd>{{ value }}</dd>
              </template>
            </dl>
          </div>
          <span v-if="fiche.upcoming" class="fiche__banner label-mono" aria-hidden="true">À venir</span>
          <span v-if="fiche.upcoming" class="sr-only">Offre à venir, pas encore disponible.</span>
        </article>
      </div>

      <div v-reveal class="options">
        <h3 class="options__title">Prestations &amp; options</h3>
        <ul class="options__list">
          <li v-for="o in options" :key="o.title" class="option">
            <div class="option__main">
              <span class="option__name">{{ o.title }}</span>
              <span class="text-muted option__text">{{ o.text }}</span>
            </div>
            <span class="label-mono text-primary option__tag">{{ o.tag }}</span>
          </li>
        </ul>
        <p class="text-muted options__infos">
          <strong>Infos utiles</strong>
          <template v-for="[term, value] in infos" :key="term">
            · {{ term }} : {{ value }}
          </template>
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.coaching {
  position: relative;
  padding: 6rem 0;
  background: var(--background);
  scroll-margin-top: 4rem;
}
.coaching__lead {
  color: var(--foreground);
}
.fiches {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
  gap: 1rem;
  margin-top: 3rem;
}
.fiche {
  position: relative;
  overflow: hidden;
  padding: 1.5rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--card);
  scroll-margin-top: 100px;
}
.fiche__content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
}
.fiche--upcoming {
  border-color: var(--border);
}
.fiche--upcoming .fiche__content {
  opacity: 0.55;
  filter: grayscale(1);
}
.fiche__banner {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 150%;
  padding: 0.6rem 0;
  font-size: 0.875rem;
  font-weight: 700;
  text-align: center;
  background: var(--primary);
  color: var(--primary-foreground);
  transform: translate(-50%, -50%) rotate(-25deg);
  pointer-events: none;
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}
.fiche--featured {
  border-color: color-mix(in oklab, var(--primary) 60%, transparent);
}
.fiche__meta {
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
}
.fiche__title {
  font-size: 1.875rem;
  font-weight: 700;
}
.fiche__details {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.5rem 1rem;
  margin: auto 0 0;
  padding-top: 1.25rem;
  border-top: 1px solid var(--border);
  font-size: 0.875rem;
}
.fiche__details dd {
  margin: 0;
  font-weight: 500;
}
@media (hover: hover) and (prefers-reduced-motion: no-preference) {
  .fiche:not(.fiche--upcoming):hover {
    translate: 0 -4px;
  }
}
/* Fiche targeted by its anchor (#fiche-01…) */
.fiche:target {
  animation: fiche-ping 1.4s ease-out;
}
@keyframes fiche-ping {
  0%,
  30% {
    box-shadow: 0 0 0 3px var(--primary);
  }
  100% {
    box-shadow: 0 0 0 3px transparent;
  }
}
@media (prefers-reduced-motion: reduce) {
  .fiche:target {
    animation: none;
    box-shadow: 0 0 0 3px var(--primary);
  }
}

.options {
  margin-top: 3rem;
}
.options__title {
  margin-bottom: 1rem;
  font-size: 1.75rem;
  font-weight: 700;
}
.options__list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
  gap: 0.75rem;
  margin: 0;
  padding: 0;
  list-style: none;
}
.option {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--card);
}
.option__main {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}
.option__name {
  font-weight: 600;
}
.option__text {
  font-size: 0.875rem;
}
.option__tag {
  flex-shrink: 0;
}
.options__infos {
  margin-top: 1rem;
  font-size: 0.875rem;
}
.options__infos strong {
  color: var(--foreground);
}
</style>

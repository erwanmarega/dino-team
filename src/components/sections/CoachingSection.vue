<script setup>
import CharacterScene from '../CharacterScene.vue'
import { fiches, options, infos } from '../../data/offers'

</script>

<template>
  <section id="fiches" class="coaching">
    <div class="w coaching__inner">
      <div class="g2">
        <div v-reveal class="coaching__heading">
          <p class="label label--accent">00 — Coaching</p>
          <h2 class="section-title">
            Trois façons de<br /><em v-reveal="{ variant: 'wipe', delay: 350 }" class="brush"
              >s'entraîner ensemble</em
            >
          </h2>
        </div>
        <p v-reveal="150" class="lede">
          Chaque accompagnement commence par un bilan : ton niveau, ton objectif, ton temps
          disponible. Ensuite on construit, séance après séance.
        </p>
      </div>

      <div class="fiches">
        <article
          v-for="(fiche, i) in fiches"
          v-reveal="i * 140"
          :key="fiche.num"
          :id="`fiche-${fiche.num}`"
          class="fiche"
          :class="{ 'fiche--featured': fiche.featured }"
        >
          <div class="fiche__meta">
            <span class="fiche__num">Fiche n°{{ fiche.num }}</span>
            <span class="fiche__kind">{{ fiche.kind }}</span>
          </div>
          <div class="fiche__scene">
            <CharacterScene :name="fiche.scene" />
          </div>
          <h3 class="fiche__title">{{ fiche.title }}</h3>
          <p class="fiche__text">{{ fiche.text }}</p>
          <dl class="fiche__details">
            <template v-for="[term, value] in fiche.details" :key="term">
              <dt>{{ term }}</dt>
              <dd>{{ value }}</dd>
            </template>
          </dl>
        </article>
      </div>

      <div v-reveal class="options">
        <h3 class="options__title">Prestations &amp; options</h3>
        <ul class="options__list">
          <li v-for="o in options" :key="o.title" class="option">
            <div class="option__main">
              <span class="option__name">{{ o.title }}</span>
              <span class="option__text">{{ o.text }}</span>
            </div>
            <span class="option__tag">{{ o.tag }}</span>
          </li>
        </ul>
        <p class="options__infos">
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
  padding: 64px 0;
  background: var(--veil-2);
  border-top: 1px solid var(--line);
}
.coaching__inner {
  display: flex;
  flex-direction: column;
  gap: 36px;
}
.coaching__heading {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.fiches {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}
.fiche {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-top: 4px solid var(--line);
}
.fiche--featured {
  border-color: var(--accent);
}
.fiche {
  scroll-margin-top: 100px;
}
/* Survol : la fiche se soulève et son liseré passe au vert.
   Pas de `transition` ici : elle vient de .reveal (cf. style.css). */
.fiche__title {
  transition: color 0.2s;
}
.fiche:hover {
  border-top-color: var(--accent);
}
.fiche:hover .fiche__title {
  color: var(--accent-bright);
}
@media (hover: hover) and (prefers-reduced-motion: no-preference) {
  .fiche:hover {
    translate: 0 -6px;
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.45);
  }
}
/* Fiche ciblée par son ancre (#fiche-01…) */
.fiche:target {
  border-top-color: var(--accent);
  animation: fiche-ping 1.4s ease-out;
}
@keyframes fiche-ping {
  0%,
  30% {
    box-shadow: 0 0 0 3px var(--accent-bright);
  }
  100% {
    box-shadow: 0 0 0 3px transparent;
  }
}
@media (prefers-reduced-motion: reduce) {
  .fiche:target {
    animation: none;
    box-shadow: 0 0 0 3px var(--accent-bright);
  }
}
.options__title {
  font-family: var(--display);
  font-weight: 400;
  font-size: 32px;
  line-height: 1;
  text-transform: uppercase;
  margin-bottom: 14px;
}
.options__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 12px;
}
.option {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 16px;
  background: var(--surface);
  border: 1px solid var(--line);
}
.option__main {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.option__name {
  font-weight: 600;
}
.option__text {
  font-size: 14px;
  color: var(--body);
}
.option__tag {
  flex-shrink: 0;
  font-family: var(--label);
  font-size: 12px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--accent-bright);
}
.options__infos {
  margin-top: 14px;
  font-size: 14px;
  color: var(--muted);
}
.options__infos strong {
  color: var(--text);
}
.fiche__meta {
  display: flex;
  justify-content: space-between;
  font-family: var(--label);
  font-weight: 500;
  font-size: 13px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}
.fiche__num {
  color: var(--accent-bright);
}
.fiche__kind {
  color: var(--muted);
}
.fiche__scene {
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}
.fiche__title {
  font-family: var(--display);
  font-weight: 400;
  font-size: 40px;
  line-height: 1;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}
.fiche__text {
  color: var(--body);
}
.fiche__details {
  margin: auto 0 0;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 8px 16px;
  font-size: 14px;
  border-top: 1px solid var(--line);
  padding-top: 16px;
}
.fiche__details dt {
  font-family: var(--label);
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--muted);
}
.fiche__details dd {
  margin: 0;
  font-weight: 500;
}
</style>

<script setup>
import SceneSection from '../SceneSection.vue'
import BookingLink from '../BookingLink.vue'

import { site } from '../../config/site'
import coachPhoto from '../../assets/coach/enzo-hero.webp'
import forestRails from '../../assets/scenes/forest-rails.jpg'

const firstName = site.coachFirstName
const fullName = [site.coachFirstName, site.coachLastName].filter(Boolean).join(' ')

const creds = [
  { term: 'Diplôme', value: 'Licence STAPS' },
  { term: 'Carte pro', value: '[N° CARTE PRO]' },
  { term: 'Secteur', value: 'Seine-et-Marne (77)' },
]
const subnav = [
  { href: '#top', n: 'I', label: 'Présentation' },
  { href: '#fiches', n: 'II', label: 'Formules & tarifs' },
  { href: '#temoignages', n: 'III', label: 'Évolutions' },
]
</script>

<template>
  <SceneSection id="top" :image="forestRails" alt="Rails envahis par la jungle" class="hero">
    <div class="container hero__grid">
      <div class="hero__copy animate-rise">
        <p class="label-mono text-primary">Spécimen n°001 — {{ firstName }}, coach sportif</p>
        <h1 class="hero__title">
          Évolue<br /><span class="text-primary">à ton</span> rythme.
        </h1>
        <p class="hero__text">
          Fondateur de DinoTeam, coach diplômé en Seine-et-Marne. Perte de poids, prise de masse ou
          remise en forme : on fait évoluer ton entraînement étape par étape, à domicile ou en
          salle.
        </p>
        <div class="hero__cta">
          <div class="hero__actions">
            <BookingLink class="btn btn--leaf btn--xl">Réserver mon bilan</BookingLink>
            <BookingLink kind="discovery" class="btn btn--trail btn--xl">
              Réserver ma séance découverte
            </BookingLink>
          </div>
          <p class="label-mono text-muted">1er bilan offert</p>
        </div>
        <dl class="hero__creds">
          <div v-for="c in creds" :key="c.term" class="glass cred">
            <dt class="label-mono text-primary">{{ c.term }}</dt>
            <dd>{{ c.value }}</dd>
          </div>
        </dl>
      </div>

      <figure class="hero__photo animate-rise">
        <div class="hero__frame">
          <img
            :src="coachPhoto"
            :alt="`${firstName}, coach sportif DinoTeam, bras fléchis`"
            class="hero__img"
            width="1050"
            height="1400"
            fetchpriority="high"
          />
        </div>
        <figcaption class="specimen glass shadow-card">
          <div class="specimen__head label-mono">
            <span class="text-primary">Spécimen 001</span><span class="text-muted">DT-0001</span>
          </div>
          <div>Nom : {{ fullName }}</div>
          <div>Espèce : coach sportif</div>
          <div>Habitat : Seine-et-Marne (77)</div>
          <div>Statut : <span class="text-primary">● en pleine évolution</span></div>
        </figcaption>
      </figure>
    </div>

    <nav class="subnav glass" aria-label="Sections du coaching">
      <a v-for="s in subnav" :key="s.href" :href="s.href" class="label-mono">
        <span class="text-primary">{{ s.n }}</span> · {{ s.label }}
      </a>
    </nav>
  </SceneSection>
</template>

<style scoped>
.hero {
  min-height: 100svh;
}
.hero__grid {
  display: grid;
  gap: 2.5rem;
  align-items: center;
  min-height: 100svh;
  padding-top: 7rem;
  padding-bottom: 5rem;
}
.hero__title {
  margin-top: 1.25rem;
  font-family: var(--font-display);
  font-weight: 900;
  font-size: clamp(4rem, 17vw, 5.5rem);
  line-height: 1;
  text-transform: uppercase;
}
.hero__text {
  max-width: 28rem;
  margin-top: 1.5rem;
  font-size: 1.0625rem;
  color: var(--muted-foreground);
}
.hero__cta {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}
.hero__creds {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 2.25rem 0 0;
}
.cred {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.75rem;
  border: 1px solid var(--border);
  border-radius: 999px;
  font-size: 0.75rem;
}
.cred dd {
  margin: 0;
}

.hero__photo {
  position: relative;
  width: 100%;
  max-width: 28rem;
  margin: 0 auto;
}
/* Colour-grade the sunny pool photo so it sits in the dark jungle decor:
   muted, green-tinted, vignetted and fading into the scene at the bottom. */
.hero__frame {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  background: var(--forest-deep);
}
.hero__frame::before,
.hero__frame::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
}
/* Green cast over the cyan water and blue sky */
.hero__frame::before {
  background: var(--forest);
  mix-blend-mode: color;
  opacity: 0.45;
}
/* Vignette + bottom fade into the background */
.hero__frame::after {
  background:
    radial-gradient(120% 90% at 50% 35%, transparent 45%, oklch(0.13 0.008 155 / 0.7) 100%),
    linear-gradient(180deg, transparent 50%, oklch(0.13 0.008 155 / 0.9) 100%);
}
.hero__img {
  display: block;
  width: 100%;
  /* The height attribute would otherwise win over aspect-ratio */
  height: auto;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  object-position: 50% 20%;
  filter: saturate(0.7) brightness(0.82) contrast(1.08);
}
.specimen {
  position: relative;
  margin: -6rem 0 0 1.5rem;
  padding: 1rem 1.125rem;
  border: 1px solid color-mix(in oklab, var(--primary) 30%, transparent);
  border-radius: var(--radius);
  font-size: 0.8125rem;
  line-height: 1.7;
}
.specimen__head {
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border);
}

.subnav {
  display: none;
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  translate: -50% 0;
  gap: 0.25rem;
  padding: 0.25rem;
  border: 1px solid var(--border);
  border-radius: 999px;
}
.subnav a {
  padding: 0.375rem 1rem;
  border-radius: 999px;
  color: var(--muted-foreground);
  transition:
    background-color 0.2s,
    color 0.2s;
}
.subnav a:hover {
  background: var(--color-accent);
  color: var(--foreground);
}

@media (min-width: 640px) {
  .hero__title {
    font-size: 6rem;
  }
}
@media (min-width: 768px) {
  .subnav {
    display: flex;
  }
}
@media (min-width: 1024px) {
  .hero__grid {
    grid-template-columns: 1.15fr 1fr;
  }
  .hero__title {
    font-size: 8.5rem;
  }
  .specimen {
    margin-left: -3rem;
  }
}
@media (prefers-reduced-motion: reduce) {
  .hero__copy,
  .hero__photo {
    animation: none;
  }
}
</style>

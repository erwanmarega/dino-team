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
// Goal badges; `icon` selects the inline SVG (dumbbell | flame | jaw)
const goals = [
  { key: 'muscu', label: 'Musculation', icon: 'dumbbell' },
  { key: 'masse', label: 'Prise de masse', icon: 'dumbbell' },
  { key: 'poids', label: 'Perte de poids', icon: 'flame' },
  { key: 'autres', label: "Et bien d'autres", icon: 'jaw' },
]
</script>

<template>
  <SceneSection id="top" :image="forestRails" alt="Rails envahis par la jungle" class="hero">
    <div class="container hero__grid">
      <div class="hero__copy animate-rise">
        <p class="label-mono text-primary">I. Spécimen n°001 — {{ firstName }}, coach sportif</p>
        <h1 class="hero__title">
          Évolue<br /><span class="text-primary">à ton</span> rythme.
        </h1>
        <p class="hero__text">
          Fondateur de DinoTeam, coach diplômé en Seine-et-Marne. Perte de poids, prise de masse ou
          remise en forme : on fait évoluer ton entraînement étape par étape, à domicile ou en
          salle.
        </p>
        <svg class="lifeline" viewBox="0 0 320 40" preserveAspectRatio="none" fill="none" aria-hidden="true">
          <!-- Dim base trace that "breathes", plus a bright pulse sweeping along it
               like a heart-rate monitor. -->
          <path
            class="lifeline__path"
            pathLength="1"
            d="M0 20H80L88 20L94 6L101 34L107 20H140L146 20L152 4L160 36L166 20H320"
          />
          <path
            class="lifeline__pulse"
            pathLength="1"
            d="M0 20H80L88 20L94 6L101 34L107 20H140L146 20L152 4L160 36L166 20H320"
          />
        </svg>
        <ul class="goals" aria-label="Objectifs">
          <li v-for="g in goals" :key="g.key" class="glass goal label-mono">
            <svg
              class="goal__icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <template v-if="g.icon === 'dumbbell'">
                <path d="M6.5 6.5v11M17.5 6.5v11M3.5 9v6M20.5 9v6M6.5 12h11" />
              </template>
              <template v-else-if="g.icon === 'flame'">
                <path d="M12 3c1 3.5 5 5.5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 .3 1.5 1 2 2 2 0-3-1-5 1-8z" />
              </template>
              <template v-else>
                <!-- Open jaw: upper and lower arches with interleaved fangs -->
                <path d="M3 9.5C3 5.5 7 3 12 3s9 2.5 9 6.5H3z" />
                <path d="M5.5 9.5 7 13l1.5-3.5M11 9.5l1 3 1-3M15.5 9.5 17 13l1.5-3.5" />
                <path d="M3 14.5C3 18.5 7 21 12 21s9-2.5 9-6.5H3z" />
                <path d="M8.5 14.5 10 11.5l1.5 3M12.5 14.5l1.5-3 1.5 3" />
              </template>
            </svg>
            {{ g.label }}
          </li>
        </ul>
        <div class="hero__cta">
          <div class="hero__actions">
            <BookingLink class="btn btn--leaf btn--xl">Réserver mon bilan gratuit</BookingLink>
          </div>
          <p class="label-mono text-muted">Sans engagement · 30 min</p>
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
.lifeline {
  display: block;
  width: 100%;
  max-width: 22rem;
  height: 2.5rem;
  margin-top: 1.5rem;
  overflow: visible;
}
.lifeline__path,
.lifeline__pulse {
  stroke: var(--primary);
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  vector-effect: non-scaling-stroke;
}
/* Base trace: draws in once, then slowly breathes (dim <-> bright). */
.lifeline__path {
  filter: drop-shadow(0 0 4px color-mix(in oklab, var(--primary) 70%, transparent));
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  animation:
    lifeline-draw 1.6s 0.5s ease-out forwards,
    lifeline-breathe 2.6s 2.1s ease-in-out infinite;
}
/* Pulse: a short bright segment sweeping left to right, one beat per breath. */
.lifeline__pulse {
  stroke-width: 3;
  filter: drop-shadow(0 0 6px var(--primary)) drop-shadow(0 0 2px var(--primary));
  stroke-dasharray: 0.18 1.2;
  stroke-dashoffset: 0.18;
  opacity: 0;
  animation: lifeline-sweep 2.6s 2.1s cubic-bezier(0.45, 0, 0.55, 1) infinite;
}
@keyframes lifeline-draw {
  to {
    stroke-dashoffset: 0;
  }
}
@keyframes lifeline-breathe {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.35;
  }
}
@keyframes lifeline-sweep {
  0% {
    stroke-dashoffset: 0.18;
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  85% {
    opacity: 1;
  }
  100% {
    stroke-dashoffset: -1;
    opacity: 0;
  }
}
.goals {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1.5rem 0 0;
  padding: 0;
  list-style: none;
}
.goal {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.9rem;
  border: 1px solid color-mix(in oklab, var(--primary) 70%, transparent);
  border-radius: 4px;
  color: var(--foreground);
  letter-spacing: 0.08em;
}
.goal__icon {
  flex: none;
  width: 1.0625rem;
  height: 1.0625rem;
  color: var(--primary);
}
.hero__cta {
  margin-top: 1.5rem;
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
  .lifeline__path {
    animation: none;
    stroke-dashoffset: 0;
  }
  .lifeline__pulse {
    display: none;
  }
}
</style>

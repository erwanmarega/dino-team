<script setup>
import { training } from '../../data/training'

const marqueeItems = [
  'Évolue à ton rythme',
  'Musculation',
  'Prise de masse',
  'Perte de poids',
  "Et bien d'autres",
  'Progression',
]
</script>

<template>
  <section id="entrainement" class="training">
    <!-- Decorative band: same info as the hero goal badges, so hidden from assistive tech -->
    <div class="band" aria-hidden="true">
      <div class="band__track">
        <ul v-for="copy in 2" :key="copy" class="band__list">
          <li v-for="item in marqueeItems" :key="item" class="band__item">
            <span class="band__text">{{ item }}</span>
            <svg
              class="band__icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M6.5 6.5v11M17.5 6.5v11M3.5 9v6M20.5 9v6M6.5 12h11" />
            </svg>
          </li>
        </ul>
      </div>
    </div>

    <div class="container training__grid">
      <div v-reveal class="frame">
        <img
          v-if="training.image"
          class="frame__img"
          :src="training.image"
          :alt="training.imageAlt"
          width="1280"
          height="853"
          loading="lazy"
          decoding="async"
        />
        <div v-else class="frame__ph">
          <svg
            class="frame__ph-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.6"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <circle cx="9" cy="10" r="1.5" />
            <path d="m21 16-5-5-9 9" />
          </svg>
          <span class="label-mono">Photo zone d'entraînement</span>
        </div>
        <span class="glass frame__badge label-mono">
          <svg
            class="frame__badge-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="13.5" r="7" />
            <path d="M12 13.5V10M9.5 3h5M12 3v3.5" />
          </svg>
          Zone d'entraînement
        </span>
      </div>

      <div class="copy">
        <p v-reveal class="label-mono text-primary">I · L'entraînement</p>
        <h2 v-reveal="80" class="copy__title">Ici, on <em>s'entraîne</em>.</h2>

        <div v-reveal="140" class="copy__intro">
          <p v-if="training.intro" class="text-muted">{{ training.intro }}</p>
          <template v-else>
            <p class="label-mono text-primary">Ta façon de coacher — à écrire</p>
            <div class="skeleton" aria-hidden="true">
              <span style="width: 100%"></span>
              <span style="width: 94%"></span>
              <span style="width: 60%"></span>
            </div>
          </template>
        </div>

        <dl v-reveal="200" class="stats">
          <div v-for="s in training.stats" :key="s.label" class="stats__cell">
            <dt class="label-mono text-muted">{{ s.label }}</dt>
            <dd class="stats__value">
              <template v-if="s.value">{{ s.value }}</template>
              <template v-else>
                <span class="stats__bar" aria-hidden="true"></span>
                <span class="stats__chip label-mono">À compléter</span>
              </template>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>

<style scoped>
.training {
  background: var(--background);
  overflow-x: clip;
}

/* Tilted marquee band: wider than the viewport so rotated ends never show a gap */
.band {
  position: relative;
  width: 110vw;
  margin: 3rem 0 2rem -5vw;
  height: 3.5rem;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: var(--primary);
  color: var(--primary-foreground);
  transform: rotate(-2deg);
}
.band__track {
  display: flex;
  width: max-content;
  animation: band-scroll 30s linear infinite;
}
.band:hover .band__track {
  animation-play-state: paused;
}
.band__list {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style: none;
}
.band__item {
  display: flex;
  align-items: center;
  white-space: nowrap;
}
.band__text {
  font-family: var(--font-display);
  font-size: 1.75rem;
  font-weight: 900;
  text-transform: uppercase;
  line-height: 1;
}
.band__icon {
  width: 1.75rem;
  height: 1.75rem;
  margin: 0 1.5rem;
  transform: rotate(-30deg);
}
@keyframes band-scroll {
  to {
    transform: translateX(-50%);
  }
}
@media (min-width: 768px) {
  .band {
    height: 5rem;
  }
  .band__text {
    font-size: 3rem;
  }
  .band__icon {
    margin: 0 2.5rem;
  }
}
@media (prefers-reduced-motion: reduce) {
  .band__track {
    animation: none;
  }
}

.training__grid {
  display: grid;
  gap: 3rem;
  align-items: center;
  /* Block padding only: the .container keeps its horizontal gutters. */
  padding-block: 6rem;
}
@media (min-width: 1024px) {
  .training__grid {
    grid-template-columns: 1.1fr 1fr;
    gap: 4rem;
  }
}

/* Image frame */
.frame {
  position: relative;
  aspect-ratio: 3 / 2;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
}
.frame__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.frame:has(.frame__img)::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgb(0 0 0 / 0.45), transparent 40%);
  pointer-events: none;
}
.frame__ph {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  border: 1px dashed color-mix(in oklab, var(--primary) 35%, transparent);
  border-radius: var(--radius);
  background: repeating-linear-gradient(
    45deg,
    var(--card) 0 14px,
    color-mix(in oklab, var(--card) 94%, white) 14px 28px
  );
  color: color-mix(in oklab, var(--primary) 70%, transparent);
}
.frame__ph-icon {
  width: 2.25rem;
  height: 2.25rem;
}
.frame__badge {
  position: absolute;
  left: 1.25rem;
  bottom: 1.25rem;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid var(--border);
  border-radius: 999px;
  color: var(--foreground);
}
.frame__badge-icon {
  width: 1rem;
  height: 1rem;
  color: var(--primary);
}

/* Copy */
.copy {
  min-width: 0;
}
.copy__title {
  margin: 1rem 0 1.5rem;
  font-family: var(--font-display);
  font-size: clamp(2.75rem, 7vw, 4.75rem);
  font-weight: 900;
  line-height: 1;
  text-transform: uppercase;
}
/* The display font has no italic: slant it by hand. */
.copy__title em {
  display: inline-block;
  color: var(--primary);
  font-style: normal;
  transform: skewX(-10deg);
}
.copy__intro {
  margin-bottom: 2rem;
}
.copy__intro p {
  margin: 0;
}
.skeleton {
  display: grid;
  gap: 0.6rem;
  margin-top: 0.875rem;
}
.skeleton span {
  display: block;
  height: 0.6rem;
  border-radius: 999px;
  background: color-mix(in oklab, var(--foreground) 12%, transparent);
}

/* Stats */
.stats {
  display: grid;
  grid-template-columns: 1fr;
  margin: 0;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--card);
}
.stats__cell {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-width: 0;
  padding: 1.25rem;
}
.stats__cell + .stats__cell {
  border-top: 1px solid var(--border);
}
.stats__value {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  /* Pin values to the bottom so cells line up whatever the label length. */
  margin: auto 0 0;
  font-family: var(--font-display);
  font-size: 3rem;
  line-height: 1;
  color: var(--foreground);
}
.stats__bar {
  width: 2rem;
  height: 0.35rem;
  margin: 1.2rem 0 0.2rem;
  border-radius: 999px;
  background: color-mix(in oklab, var(--foreground) 12%, transparent);
}
.stats__chip {
  padding: 0.2rem 0.5rem;
  border: 1px dashed color-mix(in oklab, var(--primary) 50%, transparent);
  border-radius: 4px;
  background: repeating-linear-gradient(
    45deg,
    var(--card) 0 8px,
    color-mix(in oklab, var(--card) 94%, white) 8px 16px
  );
  color: var(--primary);
  font-size: 0.65rem;
}
@media (min-width: 640px) {
  .stats {
    grid-template-columns: repeat(3, 1fr);
  }
  .stats__cell + .stats__cell {
    border-top: 0;
    border-left: 1px solid var(--border);
  }
}
</style>

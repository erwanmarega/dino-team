<script setup>
import { reactive } from 'vue'
import { site } from '../../config/site'
import { testimonials } from '../../data/testimonials'

const visible = testimonials.filter((t) => !t.draft)

// Long reviews are clamped; the reader can expand them in place.
const LONG_REVIEW = 320
const expanded = reactive(new Set())
const isLong = (t) => (t.citation || '').length > LONG_REVIEW
function toggle(num) {
  if (expanded.has(num)) expanded.delete(num)
  else expanded.add(num)
}
</script>

<template>
  <section id="temoignages" class="fouilles">
    <div class="w fouilles__inner">
      <div class="g2">
        <div v-reveal class="fouilles__heading">
          <p class="label label--accent">Registre des fouilles — Témoignages</p>
          <h2 class="section-title">
            Spécimens<br /><em v-reveal="{ variant: 'wipe', delay: 350 }" class="brush"
              >en pleine évolution</em
            >
          </h2>
        </div>
        <p v-reveal="150" class="lede">
          Ils sont arrivés en reprise ou coincés sur un plateau. Voilà où ils en sont aujourd'hui,
          racontés par eux.
        </p>
      </div>

      <div class="cards">
        <figure
          v-for="(t, i) in visible"
          :key="t.num"
          v-reveal="i * 140"
          class="card"
        >
          <div class="card__meta">
            <span class="card__num">Fouille n°{{ t.num }}</span>
            <span v-if="t.source === 'google'" class="card__source">
              Avis Google<template v-if="t.date"> · {{ t.date }}</template>
            </span>
            <span v-else-if="t.duree" class="card__duree">{{ t.duree }}</span>
          </div>

          <div
            v-if="t.avant && t.apres"
            class="card__strates"
            :aria-label="`Passé de ${t.avant} à ${t.apres}`"
          >
            <span class="strate strate--avant">{{ t.avant }}</span>
            <span class="card__arrow" aria-hidden="true">→</span>
            <span class="strate strate--apres">{{ t.apres }}</span>
          </div>

          <div v-if="t.photoBefore && t.photoAfter" class="card__photos">
            <img :src="t.photoBefore" alt="Avant le coaching" loading="lazy" />
            <img :src="t.photoAfter" alt="Après le coaching" loading="lazy" />
          </div>

          <p
            v-if="t.rating"
            class="card__rating"
            role="img"
            :aria-label="`Note : ${t.rating} sur 5`"
          >
            <span aria-hidden="true">{{ '★'.repeat(t.rating) }}{{ '☆'.repeat(5 - t.rating) }}</span>
          </p>

          <blockquote
            :id="`avis-${t.num}`"
            class="card__quote"
            :class="{ 'card__quote--clamped': isLong(t) && !expanded.has(t.num) }"
          >
            <p>{{ t.citation }}</p>
          </blockquote>
          <button
            v-if="isLong(t)"
            type="button"
            class="card__more"
            :aria-expanded="expanded.has(t.num)"
            :aria-controls="`avis-${t.num}`"
            @click="toggle(t.num)"
          >
            {{ expanded.has(t.num) ? 'Réduire' : 'Lire la suite' }}
          </button>

          <figcaption class="card__who">
            <span class="card__name">{{ t.nom }}</span>
            <span class="card__offre">{{ t.offre }}</span>
          </figcaption>
        </figure>
      </div>

      <div
        v-if="site.googleRating || site.googleReviewsUrl || site.googleWriteReviewUrl"
        class="google"
      >
        <p v-if="site.googleRating" class="google__score">
          <span class="google__note">{{ site.googleRating }}/5</span>
          <span aria-hidden="true" class="google__stars">★★★★★</span>
          <span class="google__count">
            <template v-if="site.googleReviewCount">{{ site.googleReviewCount }} avis </template
            >sur Google
          </span>
        </p>
        <div class="google__actions">
          <a
            v-if="site.googleReviewsUrl"
            :href="site.googleReviewsUrl"
            target="_blank"
            rel="noopener"
            class="btn btn--outline-accent"
            >Voir tous les avis Google</a
          >
          <a
            v-if="site.googleWriteReviewUrl"
            :href="site.googleWriteReviewUrl"
            target="_blank"
            rel="noopener"
            class="btn btn--outline"
            >Laisser un avis</a
          >
        </div>
      </div>
    </div>
  </section>
</template>



<style scoped>
.fouilles {
  padding: 64px 0;
  background: var(--veil-2);
  border-top: 1px solid var(--line);
}
.fouilles__inner {
  display: flex;
  flex-direction: column;
  gap: 36px;
}
.fouilles__heading {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}
.card {
  margin: 0;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-left: 4px solid var(--accent);
}
.card__meta {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  font-family: var(--label);
  font-weight: 500;
  font-size: 13px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}
.card__num {
  color: var(--accent-bright);
}
.card__duree {
  color: var(--muted);
}
.card__source {
  color: var(--body);
}

/* Google rating summary + links (filled by hand in src/config/site.js) */
.google {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px 32px;
}
.google__score {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 6px 12px;
  margin: 0;
}
.google__note {
  font-family: var(--display);
  font-size: 40px;
  line-height: 1;
}
.google__stars {
  color: var(--accent-bright);
  letter-spacing: 2px;
}
.google__count {
  font-family: var(--label);
  font-size: 13px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--muted);
}
.google__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.card__strates {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  padding: 14px 0;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}
.strate {
  padding: 6px 10px;
  font-family: var(--label);
  font-weight: 600;
  font-size: 12px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #fff;
}
.strate--avant {
  background: #0f2216;
}
.strate--apres {
  background: var(--accent);
}
.card__arrow {
  color: var(--muted);
  font-size: 18px;
}

.card__photos {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}
.card__photos img {
  width: 100%;
  aspect-ratio: 3 / 4;
  object-fit: cover;
}
.card__rating {
  margin: 0;
  color: var(--accent-bright);
  letter-spacing: 2px;
}

.card__quote {
  margin: 0;
  position: relative;
  padding-top: 28px;
  font-size: 17px;
  color: var(--text);
}
.card__quote p {
  white-space: pre-line;
}
.card__quote--clamped p {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 7;
  line-clamp: 7;
  overflow: hidden;
}
.card__more {
  align-self: flex-start;
  margin-top: -8px;
  padding: 4px 0;
  background: none;
  border: 0;
  border-bottom: 1px solid currentColor;
  font-family: var(--label);
  font-size: 13px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--accent-bright);
  cursor: pointer;
}
.card__more:hover {
  color: var(--text);
}
.card__quote::before {
  content: '“';
  position: absolute;
  top: -14px;
  left: -4px;
  font-family: var(--display);
  font-size: 72px;
  line-height: 1;
  color: var(--accent);
  transform-origin: left bottom;
  transition: transform 0.4s cubic-bezier(0.2, 1.6, 0.4, 1);
}
/* Survol : la carte se soulève, le guillemet bascule et la strate « après » s'allume */
.strate--apres {
  transition: background-color 0.2s;
}
.card:hover .strate--apres {
  background: var(--accent-bright);
}
@media (hover: hover) and (prefers-reduced-motion: no-preference) {
  .card:hover {
    translate: 0 -6px;
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.45);
  }
  .card:hover .card__quote::before {
    transform: rotate(-10deg) scale(1.2);
  }
}

.card__who {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.card__name {
  font-family: var(--display);
  font-size: 28px;
  line-height: 1;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}
.card__offre {
  font-family: var(--label);
  font-size: 13px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--muted);
}
</style>

<script setup>
import { ref } from 'vue'
import SectionHeading from '../SectionHeading.vue'
import { site } from '../../config/site'
import { testimonials } from '../../data/testimonials'

// Keep the section short: only the most recent reviews, the full list lives on
// Google (buttons below). Entries without `published` go last; the sort is stable.
const MAX_TESTIMONIALS = 3
const visible = testimonials
  .filter((t) => !t.draft)
  .sort((a, b) => (b.published || '').localeCompare(a.published || ''))
  .slice(0, MAX_TESTIMONIALS)

// Long reviews are clamped in the card; the full text opens in a dialog so the
// grid layout never changes.
const LONG_REVIEW = 320
const isLong = (t) => (t.citation || '').length > LONG_REVIEW

const dialog = ref(null)
const opened = ref(null)
let opener = null
function openReview(t, event) {
  opener = event.currentTarget
  opened.value = t
  dialog.value?.showModal()
}
function closeReview() {
  dialog.value?.close()
}
function onDialogClose() {
  opened.value = null
  opener?.focus()
}
// A click on the backdrop targets the dialog element itself
function onDialogClick(event) {
  if (event.target === dialog.value) closeReview()
}
</script>

<template>
  <section id="temoignages" class="fouilles bg-forest-gradient">
    <div class="container fouilles__inner">
      <SectionHeading v-reveal kicker="III · Témoignages">
        <template #title>Spécimens en <span class="text-primary">pleine évolution</span></template>
        Ils sont arrivés en reprise ou coincés sur un plateau. Voilà où ils en sont aujourd'hui,
        racontés par eux.
      </SectionHeading>

      <div class="cards">
        <figure
          v-for="(t, i) in visible"
          :key="t.num"
          v-reveal="i * 140"
          class="tcard"
        >
          <div class="tcard__meta">
            <span class="tcard__num">Fouille n°{{ t.num }}</span>
            <span v-if="t.source === 'google'" class="tcard__source">
              Avis Google<template v-if="t.date"> · {{ t.date }}</template>
            </span>
            <span v-else-if="t.duree" class="tcard__duree">{{ t.duree }}</span>
          </div>

          <div
            v-if="t.avant && t.apres"
            class="tcard__strates"
            :aria-label="`Passé de ${t.avant} à ${t.apres}`"
          >
            <span class="strate strate--avant">{{ t.avant }}</span>
            <span class="tcard__arrow" aria-hidden="true">→</span>
            <span class="strate strate--apres">{{ t.apres }}</span>
          </div>

          <div v-if="t.photoBefore && t.photoAfter" class="tcard__photos">
            <img :src="t.photoBefore" alt="Avant le coaching" loading="lazy" />
            <img :src="t.photoAfter" alt="Après le coaching" loading="lazy" />
          </div>

          <p
            v-if="t.rating"
            class="tcard__rating"
            role="img"
            :aria-label="`Note : ${t.rating} sur 5`"
          >
            <span aria-hidden="true">{{ '★'.repeat(t.rating) }}{{ '☆'.repeat(5 - t.rating) }}</span>
          </p>

          <blockquote class="tcard__quote" :class="{ 'tcard__quote--clamped': isLong(t) }">
            <p>{{ t.citation }}</p>
          </blockquote>
          <button
            v-if="isLong(t)"
            type="button"
            class="tcard__more"
            aria-haspopup="dialog"
            @click="openReview(t, $event)"
          >
            Lire la suite
          </button>

          <figcaption class="tcard__who">
            <span class="tcard__name">{{ t.nom }}</span>
            <span class="tcard__offre">{{ t.offre }}</span>
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
            class="btn btn--trail"
            >Voir tous les avis Google</a
          >
          <a
            v-if="site.googleWriteReviewUrl"
            :href="site.googleWriteReviewUrl"
            target="_blank"
            rel="noopener"
            class="btn btn--trail"
            >Laisser un avis</a
          >
        </div>
      </div>
    </div>

    <dialog
      ref="dialog"
      class="review"
      aria-labelledby="review-title"
      @close="onDialogClose"
      @click="onDialogClick"
    >
      <div v-if="opened" class="review__panel">
        <div class="review__head">
          <p id="review-title" class="review__meta">
            <span class="tcard__num">Fouille n°{{ opened.num }}</span>
            <span v-if="opened.source === 'google'" class="tcard__source">
              Avis Google<template v-if="opened.date"> · {{ opened.date }}</template>
            </span>
          </p>
          <button type="button" class="review__close" aria-label="Fermer" @click="closeReview">
            ✕
          </button>
        </div>
        <p v-if="opened.rating" class="tcard__rating" role="img" :aria-label="`Note : ${opened.rating} sur 5`">
          <span aria-hidden="true">{{ '★'.repeat(opened.rating) }}{{ '☆'.repeat(5 - opened.rating) }}</span>
        </p>
        <blockquote class="review__quote">
          <p>{{ opened.citation }}</p>
        </blockquote>
        <p class="tcard__who">
          <span class="tcard__name">{{ opened.nom }}</span>
          <span class="tcard__offre">{{ opened.offre }}</span>
        </p>
      </div>
    </dialog>
  </section>
</template>




<style scoped>
.fouilles {
  position: relative;
  padding: 6rem 0;
  overflow: hidden;
  scroll-margin-top: 4rem;
}
.fouilles__inner {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
  gap: 1rem;
}
.tcard {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0;
  padding: 1.5rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--card);
}
.tcard__meta,
.review__meta {
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}
.tcard__num {
  color: var(--primary);
}
.tcard__duree,
.tcard__source {
  color: var(--muted-foreground);
}

.tcard__strates {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.625rem;
  padding: 0.875rem 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}
.strate {
  padding: 0.375rem 0.625rem;
  border-radius: var(--radius);
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}
.strate--avant {
  background: var(--color-muted);
  color: var(--foreground);
}
.strate--apres {
  background: var(--primary);
  color: var(--primary-foreground);
}
.tcard__arrow {
  color: var(--muted-foreground);
}
.tcard__photos {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  background: var(--border);
}
.tcard__photos img {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
}
.tcard__rating {
  margin: 0;
  color: var(--primary);
  letter-spacing: 0.15em;
}
.tcard__quote {
  margin: 0;
  font-size: 0.9375rem;
}
.tcard__quote p {
  white-space: pre-line;
}
.tcard__quote--clamped p {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 7;
  line-clamp: 7;
  overflow: hidden;
}
.tcard__more {
  align-self: flex-start;
  margin-top: -0.5rem;
  padding: 0.25rem 0;
  background: none;
  border: 0;
  border-bottom: 1px solid currentColor;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--primary);
  cursor: pointer;
}
.tcard__more:hover {
  color: var(--foreground);
}
.tcard__who {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  margin-top: auto;
}

/* Full review dialog */
.review {
  width: min(40rem, calc(100% - 2rem));
  max-height: calc(100svh - 4rem);
  padding: 0;
  border: 1px solid color-mix(in oklab, var(--primary) 30%, transparent);
  border-radius: var(--radius);
  background: var(--card);
  color: var(--foreground);
  box-shadow: var(--shadow-card);
  overflow: auto;
}
.review::backdrop {
  background: oklch(0.1 0.01 155 / 0.8);
  backdrop-filter: blur(4px);
}
.review__panel {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
}
.review__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}
.review__meta {
  flex-wrap: wrap;
  gap: 0.25rem 1rem;
  margin: 0;
}
.review__close {
  flex: none;
  width: 2.25rem;
  height: 2.25rem;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: none;
  color: var(--foreground);
  cursor: pointer;
}
.review__close:hover {
  border-color: var(--primary);
  color: var(--primary);
}
.review__quote {
  margin: 0;
  font-size: 1rem;
  line-height: 1.65;
}
.review__quote p {
  margin: 0;
  white-space: pre-line;
}
.tcard__name {
  font-weight: 600;
}
.tcard__offre {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--muted-foreground);
}
@media (hover: hover) and (prefers-reduced-motion: no-preference) {
  .tcard {
    transition: translate 0.3s;
  }
  .tcard:hover {
    translate: 0 -4px;
  }
}

/* Google rating summary + links (filled by hand in src/config/site.js) */
.google {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem 2rem;
}
.google__score {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.375rem 0.75rem;
  margin: 0;
}
.google__note {
  font-family: var(--font-display);
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1;
}
.google__stars {
  color: var(--primary);
  letter-spacing: 0.15em;
}
.google__count {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--muted-foreground);
}
.google__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}
</style>

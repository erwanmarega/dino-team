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

// Display label derived from the card position: E-01, E-02...
const specimen = (i) => `E-${String(i + 1).padStart(2, '0')}`
// Second footer chip: follow-up duration, else offer, else review date
const detail = (t) => t.duree || t.offre || t.date

const dialog = ref(null)
const opened = ref(null)
const openedLabel = ref('')
let opener = null
function openReview(t, i, event) {
  opener = event.currentTarget
  opened.value = t
  openedLabel.value = specimen(i)
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
        Avis clients (Google) et évolutions partagées avec autorisation.
      </SectionHeading>

      <div class="cards">
        <figure v-for="(t, i) in visible" :key="t.num" v-reveal="i * 140" class="tcard">
          <div
            class="tcard__photos"
            :aria-label="t.photoBefore && t.photoAfter ? undefined : 'Photos avant / après à venir'"
          >
            <template v-if="t.photoBefore && t.photoAfter">
              <img :src="t.photoBefore" alt="Avant le coaching" loading="lazy" />
              <img :src="t.photoAfter" alt="Après le coaching" loading="lazy" />
            </template>
            <template v-else>
              <div v-for="label in ['Avant', 'Après']" :key="label" class="tcard__ph" aria-hidden="true">
                <svg class="tcard__ph-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                <span class="label-mono">{{ label }}</span>
              </div>
            </template>
          </div>

          <div class="tcard__body">
            <div class="tcard__meta">
              <span class="label-mono tcard__num">Spécimen {{ specimen(i) }}</span>
              <span
                v-if="t.rating"
                class="stars"
                role="img"
                :aria-label="`Note : ${t.rating} sur 5`"
              >
                <svg
              v-for="n in 5"
              :key="n"
              class="stars__icon"
              :class="{ 'stars__icon--on': n <= t.rating }"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3 6.1 20.6l1.3-6.6L2.5 9.4l6.6-.8z" />
            </svg>
              </span>
            </div>

            <svg class="tcard__glyph" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
            </svg>

            <blockquote class="tcard__quote" :class="{ 'tcard__quote--clamped': isLong(t) }">
              <p>{{ t.citation }}</p>
            </blockquote>
            <button
              v-if="isLong(t)"
              type="button"
              class="tcard__more"
              aria-haspopup="dialog"
              @click="openReview(t, i, $event)"
            >
              Lire la suite
            </button>

            <div
              v-if="t.avant && t.apres"
              class="tcard__strates"
              :aria-label="`Passé de ${t.avant} à ${t.apres}`"
            >
              <span class="strate strate--avant">{{ t.avant }}</span>
              <span class="tcard__arrow" aria-hidden="true">→</span>
              <span class="strate strate--apres">{{ t.apres }}</span>
            </div>

            <figcaption class="tcard__foot">
              <span class="chip label-mono">{{ t.nom }}</span>
              <template v-if="detail(t)">
                <span class="tcard__dot" aria-hidden="true">·</span>
                <span class="chip label-mono">{{ detail(t) }}</span>
              </template>
              <span v-if="t.source === 'google'" class="tcard__source label-mono">Avis Google</span>
            </figcaption>
          </div>
        </figure>
      </div>

      <div
        v-if="site.googleRating || site.googleReviewsUrl || site.googleWriteReviewUrl"
        class="google"
      >
        <p v-if="site.googleRating" class="google__score">
          <span class="google__note">{{ site.googleRating }}/5</span>
          <span class="stars" aria-hidden="true">
            <svg
              v-for="n in 5"
              :key="n"
              class="stars__icon"
              :class="{ 'stars__icon--on': n <= Math.round(Number(site.googleRating)) }"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3 6.1 20.6l1.3-6.6L2.5 9.4l6.6-.8z" />
            </svg>
          </span>
          <span class="label-mono google__count">
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
          <p id="review-title" class="review__meta label-mono">
            <span class="tcard__num">Spécimen {{ openedLabel }}</span>
            <span v-if="opened.source === 'google'" class="tcard__source">
              Avis Google<template v-if="opened.date"> · {{ opened.date }}</template>
            </span>
          </p>
          <button type="button" class="review__close" aria-label="Fermer" @click="closeReview">
            ✕
          </button>
        </div>
        <span
          v-if="opened.rating"
          class="stars"
          role="img"
          :aria-label="`Note : ${opened.rating} sur 5`"
        >
          <svg
              v-for="n in 5"
              :key="n"
              class="stars__icon"
              :class="{ 'stars__icon--on': n <= opened.rating }"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3 6.1 20.6l1.3-6.6L2.5 9.4l6.6-.8z" />
            </svg>
        </span>
        <blockquote class="review__quote">
          <p>{{ opened.citation }}</p>
        </blockquote>
        <p class="review__who">
          <span class="chip label-mono">{{ opened.nom }}</span>
          <template v-if="detail(opened)">
            <span class="tcard__dot" aria-hidden="true">·</span>
            <span class="chip label-mono">{{ detail(opened) }}</span>
          </template>
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
  grid-template-columns: 1fr;
  gap: 1rem;
}
@media (min-width: 1024px) {
  .cards {
    grid-template-columns: repeat(3, 1fr);
  }
}
.tcard {
  display: flex;
  flex-direction: column;
  margin: 0;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--card);
  overflow: hidden;
}

/* Before / after pair (photos or placeholders) */
.tcard__photos {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-bottom: 1px solid var(--border);
}
.tcard__photos > :nth-child(2) {
  border-left: 1px dashed var(--border);
}
.tcard__photos img {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
}
.tcard__ph {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-width: 0;
  aspect-ratio: 1;
  border: 1px dashed color-mix(in oklab, var(--primary) 35%, transparent);
  background: repeating-linear-gradient(
    45deg,
    var(--card) 0 14px,
    color-mix(in oklab, var(--card) 94%, white) 14px 28px
  );
  color: color-mix(in oklab, var(--primary) 70%, transparent);
}
.tcard__ph-icon {
  width: 1.75rem;
  height: 1.75rem;
}

.tcard__body {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
}
.tcard__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}
.tcard__num {
  color: var(--muted-foreground);
}
.tcard__source {
  font-size: 0.7rem;
  color: var(--muted-foreground);
}
.stars {
  display: inline-flex;
  gap: 0.125rem;
}
.stars__icon {
  width: 1rem;
  height: 1rem;
  fill: color-mix(in oklab, var(--primary) 25%, transparent);
}
.stars__icon--on {
  fill: var(--primary);
}
.tcard__glyph {
  width: 1.75rem;
  height: 1.75rem;
  fill: color-mix(in oklab, var(--foreground) 55%, transparent);
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
  -webkit-line-clamp: 5;
  line-clamp: 5;
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
.tcard__foot,
.review__who {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
}
.tcard__foot {
  margin-top: auto;
  padding-top: 0.5rem;
}
.chip {
  padding: 0.3rem 0.6rem;
  border: 1px dashed color-mix(in oklab, var(--primary) 50%, transparent);
  border-radius: 2px;
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--primary);
}
.tcard__dot {
  color: var(--muted-foreground);
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
  display: flex;
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
  justify-content: center;
  gap: 1rem 2rem;
  padding: 1.5rem 2rem;
  border: 1px dashed color-mix(in oklab, var(--primary) 50%, transparent);
  border-radius: var(--radius);
  background: repeating-linear-gradient(
    45deg,
    var(--card) 0 14px,
    color-mix(in oklab, var(--card) 94%, white) 14px 28px
  );
}
.google__score {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.375rem 0.75rem;
  margin: 0;
}
.google__note {
  font-family: var(--font-display);
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1;
}
.google__count {
  color: var(--muted-foreground);
}
.google__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
}
</style>

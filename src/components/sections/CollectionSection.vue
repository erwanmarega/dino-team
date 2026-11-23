<script setup>
import { computed } from 'vue'
import SceneSection from '../SceneSection.vue'
import SectionHeading from '../SectionHeading.vue'
import { boutique as boutiqueImg } from '../../assets/scenes'
import { site } from '../../config/site'
import { products } from '../../data/products'

// Unique category labels, in order of first appearance
const productCategories = computed(() => [...new Set(products.map((p) => p.category))])
</script>

<template>
  <div>
    <SceneSection :image="boutiqueImg" alt="Cabane en bois dans la jungle, vêtements DinoTeam suspendus à l'intérieur" class="hero">
      <div class="container hero__inner">
        <div class="hero__content animate-rise">
          <p class="label-mono text-primary">01 — Boutique</p>
          <h1 class="hero__title">La collection <span class="text-primary">DinoTeam</span></h1>
          <p class="hero__lede">
            Sweats, joggings et tapis aux couleurs de la team. Sobres, solides, faits pour durer.
          </p>
          <div class="hero__actions">
            <a
              v-if="site.shopUrl"
              :href="site.shopUrl"
              target="_blank"
              rel="noopener"
              class="btn btn--leaf btn--xl"
              >Ouvrir la boutique</a
            >
            <span v-else class="btn btn--trail btn--xl is-off" aria-disabled="true"
              >Boutique bientôt en ligne</span
            >
            <a href="#collection" class="btn btn--trail btn--xl">Voir la collection</a>
          </div>
        </div>
      </div>
    </SceneSection>

    <section id="collection" class="collection">
      <div class="container">
        <div class="collection__head">
          <SectionHeading kicker="Aperçu" title="Vêtements &amp; accessoires" />
          <ul class="pills" aria-label="Catégories">
            <li v-for="c in productCategories" :key="c" class="pill label-mono">{{ c }}</li>
          </ul>
        </div>

        <div class="items">
          <article v-for="item in products" :key="item.num" v-reveal class="item">
            <div class="item__photo" :class="{ 'placeholder-zone': !item.photo }">
              <img
                v-if="item.photo"
                :src="item.photo"
                :alt="item.name || item.category"
                loading="lazy"
              />
              <span v-else class="item__placeholder label-mono">
                <svg
                  viewBox="0 0 24 24"
                  width="28"
                  height="28"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="9" cy="9" r="2" />
                  <path d="m21 15-5-5L5 21" />
                </svg>
                Photo produit
              </span>
            </div>
            <div class="item__meta">
              <p class="label-mono text-muted">{{ item.category }}</p>
              <span class="item__price">{{ item.price || '—' }} €</span>
            </div>
            <h3 class="item__name label-mono">{{ item.name || 'Nom du produit' }}</h3>
          </article>
        </div>

        <div v-reveal class="cta bg-forest-gradient">
          <div>
            <h2 class="cta__title">Tailles, prix, panier</h2>
            <p class="cta__text text-muted">La boutique complète s'ouvre dans un nouvel onglet.</p>
          </div>
          <a
            v-if="site.shopUrl"
            :href="site.shopUrl"
            target="_blank"
            rel="noopener"
            class="btn btn--leaf btn--xl cta__btn"
          >
            Accéder à la boutique
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M7 17 17 7M8 7h9v9" />
            </svg>
            <span class="sr-only">(nouvel onglet)</span>
          </a>
          <span v-else class="btn btn--trail btn--xl is-off" aria-disabled="true"
            >Boutique bientôt en ligne</span
          >
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero {
  min-height: 88svh;
}
.hero__inner {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 88svh;
  padding-top: 7rem;
  padding-bottom: 4rem;
}
.hero__content {
  max-width: 36rem;
}
.hero__title {
  margin-top: 1.25rem;
  font-size: clamp(3rem, 14vw, 6rem);
  font-weight: 900;
  line-height: 1;
  overflow-wrap: break-word;
}
.hero__lede {
  margin-top: 1.5rem;
  max-width: 28rem;
  font-size: 1.125rem;
  color: color-mix(in oklab, var(--foreground) 90%, transparent);
}
.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 2rem;
}
.is-off {
  cursor: not-allowed;
  opacity: 0.6;
  pointer-events: none;
}

.collection {
  scroll-margin-top: 4rem;
  padding: 5rem 0;
  background: var(--background);
}
.collection__head {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1.5rem;
}
.pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}
.pill {
  padding: 0.375rem 1rem;
  border: 1px solid var(--border);
  border-radius: 999px;
  color: var(--muted-foreground);
}

.items {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 2rem 1rem;
  margin-top: 2.5rem;
}
.item__photo {
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  color: var(--muted-foreground);
  transition: border-color 0.3s ease;
}
/* Empty slot: dashed green striped "to be filled" box. Mirrors the global
   .placeholder-zone, which the scoped .item__photo rule would otherwise override. */
.item__photo.placeholder-zone {
  border: 1px dashed oklch(0.86 0.15 132 / 0.45);
  border-radius: 2px;
  background:
    repeating-linear-gradient(135deg, oklch(0.86 0.15 132 / 0.05) 0 10px, transparent 10px 20px),
    oklch(0.17 0.012 155 / 0.7);
  color: oklch(0.86 0.15 132 / 0.85);
}
.item__placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  text-align: center;
}
.item__photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.item:hover .item__photo {
  border-color: var(--primary);
}
.item:hover .item__photo.placeholder-zone {
  border-color: oklch(0.86 0.15 132 / 0.9);
}
.item__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-top: 1rem;
}
/* Product name as a green dashed tag, same family as the contact chips */
.item__name {
  display: inline-block;
  max-width: 100%;
  margin-top: 0.5rem;
  padding: 0.3rem 0.6rem;
  border: 1px dashed color-mix(in oklab, var(--primary) 50%, transparent);
  border-radius: 2px;
  background: repeating-linear-gradient(
    135deg,
    color-mix(in oklab, var(--primary) 5%, transparent) 0 10px,
    transparent 10px 20px
  );
  color: var(--primary);
  font-weight: 700;
  overflow-wrap: anywhere;
}
.item__price {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 700;
  white-space: nowrap;
}

.cta {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  margin-top: 4rem;
  padding: 2rem 1.5rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  text-align: center;
}
.cta__title {
  font-size: 2.25rem;
  font-weight: 800;
}
.cta__text {
  margin-top: 0.5rem;
  font-size: 1rem;
}
.cta__btn {
  gap: 0.75rem;
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

@media (min-width: 768px) {
  .cta {
    flex-direction: row;
    padding: 3rem;
    text-align: left;
  }
  .cta__title {
    font-size: 2.75rem;
  }
}
@media (min-width: 1024px) {
  .items {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 2rem;
  }
}
</style>

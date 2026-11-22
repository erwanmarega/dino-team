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
    <SceneSection :image="boutiqueImg" alt="Vêtements DinoTeam dans un décor sombre" class="hero">
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
          <SectionHeading kicker="Aperçu" title="Pièces de collection" />
          <ul class="pills" aria-label="Catégories">
            <li v-for="c in productCategories" :key="c" class="pill label-mono">{{ c }}</li>
          </ul>
        </div>

        <div class="items">
          <article v-for="item in products" :key="item.num" v-reveal class="item">
            <div class="item__photo">
              <img v-if="item.photo" :src="item.photo" :alt="item.name" loading="lazy" />
              <span v-else class="label-mono">[PHOTO]</span>
            </div>
            <div class="item__meta">
              <div>
                <p class="label-mono text-muted">{{ item.category }}</p>
                <h3 class="item__name">{{ item.num }} — {{ item.name }}</h3>
              </div>
              <span class="item__price">{{ item.price || '[PRIX]' }} €</span>
            </div>
          </article>
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
  gap: 1rem;
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
.item__photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.item:hover .item__photo {
  border-color: var(--primary);
}
.item__meta {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.5rem;
  margin-top: 0.75rem;
}
.item__name {
  margin-top: 0.25rem;
  font-size: 0.875rem;
  font-weight: 600;
}
.item__price {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 700;
  white-space: nowrap;
}

@media (min-width: 1024px) {
  .items {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
</style>

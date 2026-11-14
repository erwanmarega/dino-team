<script setup>
import CharacterScene from '../CharacterScene.vue'
import { site } from '../../config/site'
import { products } from '../../data/products'
</script>

<template>
  <section id="collection" class="collection">
    <div class="w collection__inner">
      <div class="g2">
        <div v-reveal class="collection__heading">
          <p class="label label--accent">01 — Boutique</p>
          <h1 class="section-title">Pièces de collection</h1>
        </div>
        <div v-reveal="150" class="intro">
          <p class="lede collection__lede">
            Sweats, joggings et tapis aux couleurs de la team. Sobres, solides, faits pour durer.
          </p>
          <CharacterScene name="flex" />
        </div>
      </div>

      <div class="items">
        <article
          v-for="(item, i) in products"
          :key="item.num"
          v-reveal="{ variant: 'slam', delay: i * 140 }"
          class="item"
        >
          <div class="item__photo">
            <img v-if="item.photo" :src="item.photo" :alt="item.name" loading="lazy" />
            <span v-else>[PHOTO]</span>
          </div>
          <div class="item__label">
            <span class="item__name">{{ item.num }} — {{ item.name }}</span>
            <span class="item__meta">{{ item.category }} · {{ item.price || '[PRIX]' }} €</span>
          </div>
        </article>
      </div>

      <div v-reveal class="cta">
        <a
          v-if="site.shopUrl"
          :href="site.shopUrl"
          target="_blank"
          rel="noopener"
          class="btn btn--accent"
          >Ouvrir la boutique</a
        >
        <span v-else class="btn btn--outline cta__off" aria-disabled="true"
          >Boutique bientôt en ligne</span
        >
      </div>
    </div>
  </section>
</template>

<style scoped>
.collection {
  padding: 72px 0 96px;
  background: var(--veil);
  border-top: 1px solid var(--line);
}
.collection__inner {
  display: flex;
  flex-direction: column;
  gap: 40px;
}
.collection__heading {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.collection__lede {
  max-width: 340px;
  flex: 1 1 220px;
}
.intro {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 24px;
}

.items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
}
.item {
  display: flex;
  flex-direction: column;
  background: var(--surface);
  border: 1px solid var(--line);
  overflow: hidden;
  transition:
    translate 0.3s ease,
    border-color 0.3s ease;
}
.item__photo {
  height: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-2);
  font-family: var(--label);
  font-size: 13px;
  letter-spacing: 2px;
  color: var(--muted);
  overflow: hidden;
}
.item__photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.item__label {
  display: flex;
  flex-direction: column;
  gap: 4px;
  border-top: 2px solid var(--accent);
  padding: 14px 16px;
  font-family: var(--label);
  letter-spacing: 1px;
  text-transform: uppercase;
}
.item__name {
  font-size: 15px;
  color: var(--text);
}
.item__meta {
  font-size: 13px;
  color: var(--muted);
}
@media (hover: hover) and (prefers-reduced-motion: no-preference) {
  .item:hover {
    translate: 0 -4px;
    border-color: var(--accent);
  }
}

.cta {
  display: flex;
}
.cta__off {
  cursor: not-allowed;
  opacity: 0.6;
  pointer-events: none;
}
</style>

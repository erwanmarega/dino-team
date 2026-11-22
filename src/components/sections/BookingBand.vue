<script setup>
import BookingLink from '../BookingLink.vue'
import { site } from '../../config/site'
</script>

<template>
  <section class="closing" aria-labelledby="closing-title">
    <div v-reveal class="container closing__inner">
      <p class="label-mono text-primary">Prêt à te lancer ?</p>
      <h2 id="closing-title" class="closing__title">
        Ton premier pas avec <span class="text-primary">{{ site.coachFirstName }}</span>
      </h2>
      <p class="text-muted closing__text">
        Un bilan gratuit pour faire le point sur tes objectifs et construire un plan à ton rythme.
      </p>
      <div class="closing__actions">
        <BookingLink class="btn btn--leaf btn--xl">Réserver mon bilan gratuit</BookingLink>
        <RouterLink to="/faq#contact" class="btn btn--trail btn--xl">Poser une question</RouterLink>
      </div>
      <p class="label-mono text-muted">Sans engagement · 30 min</p>
    </div>
  </section>
</template>

<style scoped>
.closing {
  padding: 5rem 0;
  border-top: 1px solid var(--border);
  background: var(--background);
}
.closing__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  text-align: center;
}
.closing__title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 6vw, 3.25rem);
  font-weight: 800;
  line-height: 1.05;
  text-transform: uppercase;
}
.closing__text {
  max-width: 34rem;
}
.closing__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 0.5rem;
}
</style>

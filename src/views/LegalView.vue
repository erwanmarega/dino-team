<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { legal } from '../data/legal'

const route = useRoute()
const sections = computed(() => legal[route.name] || [])
const heading = computed(() => String(route.meta.title || '').split(' – ')[0])
</script>

<template>
  <section class="legal bg-forest-gradient">
    <div class="container legal__inner">
      <p class="label-mono text-primary">Informations légales</p>
      <h1 class="legal__title">{{ heading }}</h1>
      <p class="legal__notice placeholder-zone">
        Modèle à compléter et à faire valider avant mise en ligne.
      </p>
      <p class="legal__date text-muted">Dernière mise à jour : [DATE]</p>

      <div class="legal__body card">
        <section v-for="s in sections" :key="s.heading" class="legal__block">
          <h2 class="legal__h2 font-display">{{ s.heading }}</h2>
          <p v-for="(p, i) in s.paragraphs" :key="i">{{ p }}</p>
        </section>
      </div>
    </div>
  </section>
</template>

<style scoped>
.legal {
  padding: 8rem 0 6rem;
}
.legal__inner {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
}
.legal__title {
  font-size: clamp(2.5rem, 9vw, 4.5rem);
  font-weight: 900;
  overflow-wrap: anywhere;
}
.legal__notice {
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
}
.legal__date {
  margin: 0;
  font-size: 0.875rem;
}
.legal__body {
  width: 100%;
  max-width: 48rem;
  padding: 1.5rem;
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.legal__block {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  color: var(--muted-foreground);
  line-height: 1.65;
  overflow-wrap: anywhere;
}
.legal__block p {
  margin: 0;
}
.legal__h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--foreground);
}
</style>

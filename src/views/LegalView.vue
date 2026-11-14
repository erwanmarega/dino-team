<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { legal } from '../data/legal'

const route = useRoute()
const sections = computed(() => legal[route.name] || [])
const heading = computed(() => String(route.meta.title || '').split(' – ')[0])
</script>

<template>
  <section class="legal">
    <div class="w legal__inner">
      <p class="label label--accent">Informations légales</p>
      <h1 class="section-title">{{ heading }}</h1>
      <p class="legal__notice">Modèle à compléter et à faire valider avant mise en ligne.</p>
      <p class="legal__date">Dernière mise à jour : [DATE]</p>

      <section v-for="s in sections" :key="s.heading" class="legal__block">
        <h2 class="legal__h2">{{ s.heading }}</h2>
        <p v-for="(p, i) in s.paragraphs" :key="i">{{ p }}</p>
      </section>
    </div>
  </section>
</template>

<style scoped>
.legal {
  padding: 80px 0 120px;
}
.legal__inner {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
}
.legal__notice {
  padding: 8px 12px;
  border: 1px dashed var(--line);
  font-size: 14px;
  color: var(--muted);
}
.legal__date {
  font-size: 14px;
  color: var(--muted);
}
.legal__block {
  max-width: 70ch;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 16px;
  color: var(--body);
  line-height: 1.65;
}
.legal__h2 {
  font-family: var(--display);
  font-weight: 400;
  font-size: 28px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: var(--text);
}
</style>

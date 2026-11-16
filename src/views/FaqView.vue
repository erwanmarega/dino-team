<script setup>
import SceneSection from '../components/SceneSection.vue'
import FaqSection from '../components/sections/FaqSection.vue'
import SocialsSection from '../components/sections/SocialsSection.vue'
import ContactSection from '../components/sections/ContactSection.vue'
import clearing from '../assets/scenes/clearing.jpg'
</script>

<template>
  <div>
    <SceneSection :image="clearing" alt="Clairière dans la jungle" class="hero">
      <div class="container hero__inner">
        <p class="label-mono text-primary">03 — FAQ &amp; Réseaux · La clairière</p>
        <h1 class="hero__title animate-rise">Des questions <span class="text-primary">?</span></h1>
      </div>
    </SceneSection>

    <div class="faq-page">
      <div class="container faq-page__grid">
        <FaqSection />
        <div class="faq-page__side">
          <SocialsSection />
          <ContactSection />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero {
  padding-bottom: 1.5rem;
}
.hero__inner {
  padding-top: 8rem;
  padding-bottom: 2.5rem;
}
.hero__title {
  margin-top: 1.25rem;
  font-size: clamp(3.5rem, 14vw, 6rem);
  font-weight: 900;
  line-height: 1;
  overflow-wrap: anywhere;
}
.faq-page {
  background: var(--background);
  padding-bottom: 4rem;
}
.faq-page__grid {
  display: grid;
  gap: 2.5rem;
}
.faq-page__side {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 0;
}
@media (min-width: 1024px) {
  .faq-page__grid {
    grid-template-columns: 1.3fr 1fr;
  }
}
</style>

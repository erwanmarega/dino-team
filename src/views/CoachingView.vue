<script setup>
import HeroSection from '../components/sections/HeroSection.vue'
import CoachingSection from '../components/sections/CoachingSection.vue'
import TestimonialsSection from '../components/sections/TestimonialsSection.vue'
import TrailSection from '../components/sections/TrailSection.vue'
</script>

<template>
  <div>
    <!-- I: présentation (scene, specimen card, diplômes) -->
    <HeroSection />
    <!-- II: formules et tarifs -->
    <CoachingSection />
    <!-- III: témoignages et évolutions -->
    <TestimonialsSection />
    <!-- Le chemin: cards to the other rubrics -->
    <TrailSection />
    <!-- Habitat (salle privée) retiré temporairement : la salle n'existe pas encore.
         Strates and Archives are also unmounted, pending the client's decision.
         The contact band lives on the FAQ page (/faq#contact). -->
  </div>
</template>

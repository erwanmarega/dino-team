<script setup>
import HeroSection from '../components/sections/HeroSection.vue'
import TrainingSection from '../components/sections/TrainingSection.vue'
import CoachingSection from '../components/sections/CoachingSection.vue'
import TestimonialsSection from '../components/sections/TestimonialsSection.vue'
</script>

<template>
  <div>
    <!-- I: présentation (scene, specimen card, diplômes) -->
    <HeroSection />
    <!-- Marquee band + training zone presentation -->
    <TrainingSection />
    <!-- II: formules et tarifs -->
    <CoachingSection />
    <!-- III: témoignages et évolutions -->
    <TestimonialsSection />
    <!-- Habitat (salle privée) retiré temporairement : la salle n'existe pas encore.
         Strates and Archives are also unmounted, pending the client's decision.
         The contact band lives on the FAQ page (/faq#contact). -->
  </div>
</template>

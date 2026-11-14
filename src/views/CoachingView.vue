<script setup>
import HeroSection from '../components/sections/HeroSection.vue'
import CoachingSection from '../components/sections/CoachingSection.vue'
import TestimonialsSection from '../components/sections/TestimonialsSection.vue'
</script>

<template>
  <div>
    <!-- Section 1: présentation (photo, specimen card, parcours, diplômes) -->
    <HeroSection />
    <!-- Section 2: accompagnements et tarifs -->
    <CoachingSection />
    <!-- Section 3: témoignages et évolutions -->
    <TestimonialsSection />
    <!-- Habitat (salle privée) retiré temporairement : la salle n'existe pas encore.
         Pour le remettre : réimporter HabitatSection et le replacer ici. -->
    <!-- Strates and Archives are also unmounted, pending the client's decision. -->
    <!-- The contact band lives on the FAQ page (/faq#contact). -->
  </div>
</template>

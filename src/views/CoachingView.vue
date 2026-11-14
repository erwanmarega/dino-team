<script setup>
import HeroSection from '../components/sections/HeroSection.vue'
import AboutSection from '../components/sections/AboutSection.vue'
import CoachingSection from '../components/sections/CoachingSection.vue'
import TestimonialsSection from '../components/sections/TestimonialsSection.vue'
import ContactSection from '../components/sections/ContactSection.vue'
</script>

<template>
  <div>
    <!-- Section 1: présentation (hero + compact parcours block) -->
    <HeroSection />
    <AboutSection />
    <!-- Section 2: accompagnements et tarifs -->
    <CoachingSection />
    <!-- Section 3: témoignages et évolutions -->
    <TestimonialsSection />
    <!-- Habitat (salle privée) retiré temporairement : la salle n'existe pas encore.
         Pour le remettre : réimporter HabitatSection et le replacer ici. -->
    <!-- Strates and Archives are also unmounted, pending the client's decision. -->
    <!-- Closing booking band -->
    <ContactSection />
  </div>
</template>

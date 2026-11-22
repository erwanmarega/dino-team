<script setup>
import HeroSection from '../components/sections/HeroSection.vue'
import TrainingSection from '../components/sections/TrainingSection.vue'
import CoachingSection from '../components/sections/CoachingSection.vue'
import TestimonialsSection from '../components/sections/TestimonialsSection.vue'
import BookingBand from '../components/sections/BookingBand.vue'
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
    <!-- Closing call-to-action before the footer (the contact form lives on /faq#contact) -->
    <BookingBand />
  </div>
</template>

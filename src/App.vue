<script setup>
import SiteHeader from './components/SiteHeader.vue'
import HeroSection from './components/sections/HeroSection.vue'
import CoachingSection from './components/sections/CoachingSection.vue'
import StratesSection from './components/sections/StratesSection.vue'
import HabitatSection from './components/sections/HabitatSection.vue'
import ArchivesSection from './components/sections/ArchivesSection.vue'
import CollectionSection from './components/sections/CollectionSection.vue'
import AboutSection from './components/sections/AboutSection.vue'
import ContactSection from './components/sections/ContactSection.vue'
import TestimonialsSection from './components/sections/TestimonialsSection.vue'
import FaqSection from './components/sections/FaqSection.vue'
</script>

<template>
  <SiteHeader />
  <main>
    <HeroSection />
    <CoachingSection />
    <StratesSection />
    <TestimonialsSection />
    <HabitatSection />
    <ArchivesSection />
    <CollectionSection />
    <AboutSection />
    <FaqSection />
    <ContactSection />
  </main>
</template>

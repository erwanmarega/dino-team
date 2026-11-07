<script setup>
import SiteHeader from './components/SiteHeader.vue'
import HeroSection from './components/sections/HeroSection.vue'
import CoachingSection from './components/sections/CoachingSection.vue'
import StratesSection from './components/sections/StratesSection.vue'
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
    <!-- Habitat (salle privée) retiré temporairement : la salle n'existe pas encore.
         Pour le remettre : réimporter HabitatSection, le replacer ici et rajouter
         le lien dans SiteHeader.vue (puis renuméroter Archives et Collection). -->
    <ArchivesSection />
    <CollectionSection />
    <AboutSection />
    <FaqSection />
    <ContactSection />
  </main>
</template>

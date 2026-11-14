<script setup>
import BrushSlashes from '../BrushSlashes.vue'
import BookingLink from '../BookingLink.vue'
import JungleVines from '../JungleVines.vue'
import { site } from '../../config/site'

const hasBooking = Boolean(site.bookingUrl || site.discoveryUrl)
// No booking URL yet: buttons become mailto links, or inert spans without email.
const mailto = site.email ? `mailto:${site.email}` : ''
</script>

<template>
  <section id="contact" class="contact">
    <BrushSlashes corner="top-right" class="contact__slashes" />
    <JungleVines variant="canopy" :seed="41" :reach="38" :sag="8" :count="6" :span="[38, 80]" />
    <div class="w contact__inner">
      <h2 v-reveal="{ variant: 'slam', delay: 150 }" class="contact__title">
        Prêt à <em v-reveal="{ variant: 'wipe', delay: 550 }" class="brush">évoluer ?</em>
      </h2>
      <div v-reveal="300" class="contact__actions">
        <template v-if="hasBooking">
          <BookingLink class="btn btn--accent">Réserver mon bilan</BookingLink>
          <BookingLink kind="discovery" class="btn btn--outline">
            Réserver ma séance découverte
          </BookingLink>
        </template>
        <template v-else-if="mailto">
          <a :href="mailto" class="btn btn--accent">Réserver mon bilan</a>
          <a :href="mailto" class="btn btn--outline">Réserver ma séance découverte</a>
        </template>
        <template v-else>
          <span class="btn btn--accent btn--disabled" aria-disabled="true">Réserver mon bilan</span>
          <span class="btn btn--outline btn--disabled" aria-disabled="true">
            Réserver ma séance découverte
          </span>
        </template>
        <a
          v-if="site.socials.instagram"
          :href="site.socials.instagram"
          target="_blank"
          rel="noopener"
          class="btn btn--outline"
          >M'écrire sur Instagram</a
        >
      </div>
      <p v-if="!hasBooking" class="contact__note">
        Réservation en ligne bientôt disponible — écris-moi en attendant.
      </p>
    </div>
  </section>
</template>

<style scoped>
.contact {
  position: relative;
  padding: 64px 0 40px;
  background: var(--veil);
  border-top: 4px solid var(--accent);
  overflow: hidden;
}
.contact__slashes {
  opacity: 0.55;
}
.contact__inner {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.contact__title {
  font-family: var(--display);
  font-weight: 400;
  font-size: clamp(56px, 9vw, 120px);
  line-height: 0.9;
  letter-spacing: 1px;
  text-transform: uppercase;
}
.contact__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}
.btn--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
.contact__note {
  font-size: 14px;
  color: var(--muted);
}
</style>

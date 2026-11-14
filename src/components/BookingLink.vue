<script setup>
import { computed } from 'vue'
import { site } from '../config/site'

// Booking call-to-action: external booking page when configured, otherwise
// falls back to the contact form on the FAQ page ("/faq#contact").
// kind: 'bilan' (site.bookingUrl) or 'discovery' (site.discoveryUrl, falling
// back to site.bookingUrl when empty).
const props = defineProps({
  fallback: { type: String, default: '/faq#contact' },
  kind: { type: String, default: 'bilan', validator: (v) => ['bilan', 'discovery'].includes(v) },
})

const url = computed(() =>
  props.kind === 'discovery' ? site.discoveryUrl || site.bookingUrl : site.bookingUrl,
)
</script>

<template>
  <a v-if="url" :href="url" target="_blank" rel="noopener">
    <slot />
  </a>
  <RouterLink v-else-if="fallback.startsWith('/')" :to="fallback"><slot /></RouterLink>
  <a v-else :href="fallback"><slot /></a>
</template>

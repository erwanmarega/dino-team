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
  // Leading icon: clipboard-check for the assessment, calendar for the discovery session.
  icon: { type: Boolean, default: true },
})

const url = computed(() =>
  props.kind === 'discovery' ? site.discoveryUrl || site.bookingUrl : site.bookingUrl,
)
</script>

<template>
  <component
    :is="url || !fallback.startsWith('/') ? 'a' : 'RouterLink'"
    v-bind="
      url
        ? { href: url, target: '_blank', rel: 'noopener' }
        : fallback.startsWith('/')
          ? { to: fallback }
          : { href: fallback }
    "
  >
    <svg
      v-if="icon"
      class="booking-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <template v-if="kind === 'bilan'">
        <rect x="5" y="4" width="14" height="17" rx="2" />
        <path d="M9 4V3h6v1" />
        <path d="m9 13 2 2 4-4" />
      </template>
      <template v-else>
        <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
        <path d="M3.5 10h17M8 3v4M16 3v4" />
        <path d="M8 14h.01M12 14h.01M16 14h.01M8 17.5h.01M12 17.5h.01" stroke-width="2.4" />
      </template>
    </svg>
    <slot />
  </component>
</template>

<style scoped>
.booking-icon {
  flex: none;
  width: 1.35em;
  height: 1.35em;
}
</style>

<script setup>
import logo from '../assets/brand/dinoteam-logo-dark.jpg'

defineProps({
  size: { type: Number, default: 40 },
  alt: { type: String, default: 'Logo DinoTeam' },
})
</script>

<template>
  <img
    :src="logo"
    :alt="alt"
    :width="size"
    :height="size"
    class="site-logo"
    :style="{ width: `${size}px`, height: `${size}px` }"
  />
</template>

<style scoped>
.site-logo {
  display: block;
  aspect-ratio: 1;
  border-radius: 50%;
  object-fit: cover;
}
</style>

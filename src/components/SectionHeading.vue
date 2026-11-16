<script setup>
// Kicker + big display title + optional description (default slot).
defineProps({
  kicker: { type: String, default: '' },
  title: { type: String, default: '' },
})
</script>

<template>
  <div class="heading">
    <p v-if="kicker" class="label-mono text-primary">{{ kicker }}</p>
    <h2 class="heading__title"><slot name="title">{{ title }}</slot></h2>
    <div v-if="$slots.default" class="heading__text text-muted"><slot /></div>
  </div>
</template>

<style scoped>
.heading {
  max-width: 42rem;
}
.heading__title {
  margin-top: 0.75rem;
  font-size: 3rem;
  font-weight: 800;
}
.heading__text {
  margin-top: 1rem;
}
@media (min-width: 768px) {
  .heading__title {
    font-size: 3.75rem;
  }
}
</style>

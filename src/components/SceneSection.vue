<script setup>
import { SCENE_SIZES } from '../assets/scenes'

// Full-bleed section with an animated photo background and gradient overlays.
defineProps({
  // Responsive scene from src/assets/scenes: { src, srcset }
  image: { type: Object, required: true },
  alt: { type: String, default: '' },
  // Flip the photo horizontally (useful when its subject hides behind the text)
  mirror: { type: Boolean, default: false },
  // Dark gradient from the left so text stays readable
  side: { type: Boolean, default: true },
})
</script>

<template>
  <section class="scene">
    <div class="scene__bg" :class="{ 'is-mirror': mirror }">
      <img
        :src="image.src"
        :srcset="image.srcset"
        :sizes="SCENE_SIZES"
        :alt="alt"
        width="1920"
        height="1088"
        class="scene__img animate-drift"
      />
      <div class="scene__layer bg-canopy"></div>
      <div v-if="side" class="scene__layer bg-side-fade" :class="{ 'is-mirror': mirror }"></div>
    </div>
    <slot />
  </section>
</template>

<style scoped>
.scene {
  position: relative;
  isolation: isolate;
  overflow: hidden;
}
.scene__bg {
  position: absolute;
  inset: 0;
  z-index: -1;
  overflow: hidden;
}
.is-mirror {
  transform: scaleX(-1);
}
.scene__img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.scene__layer {
  position: absolute;
  inset: 0;
}
</style>

<script setup>
// Coups de griffe rouges des affiches, posés en décor dans un coin.
defineProps({
  corner: {
    type: String,
    default: 'top-right',
    validator: (v) => ['top-right', 'top-left', 'bottom-right', 'bottom-left'].includes(v),
  },
})
</script>

<template>
  <svg
    class="slashes"
    :class="`slashes--${corner}`"
    aria-hidden="true"
    viewBox="0 0 220 220"
    fill="var(--red)"
  >
    <path d="M40 0 L52 0 L4 150 L0 146 Z" opacity="0.9" />
    <path d="M86 0 L104 0 L18 206 L12 200 Z" />
    <path d="M140 0 L152 0 L66 196 L62 190 Z" opacity="0.75" />
    <path d="M184 6 L198 2 L122 170 L118 164 Z" opacity="0.9" />
    <path d="M214 30 L220 32 L170 140 L166 136 Z" opacity="0.6" />
  </svg>
</template>

<style scoped>
.slashes {
  position: absolute;
  width: clamp(120px, 18vw, 220px);
  height: auto;
  pointer-events: none;
}
.slashes--top-right {
  top: 0;
  right: 0;
}
.slashes--top-left {
  top: 0;
  left: 0;
  transform: scaleX(-1);
}
.slashes--bottom-right {
  bottom: 0;
  right: 0;
  transform: scaleY(-1);
}
.slashes--bottom-left {
  bottom: 0;
  left: 0;
  transform: scale(-1, -1);
}
</style>

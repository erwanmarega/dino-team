<script setup>
defineProps({
  size: { type: Number, default: 52 },
})
</script>

<template>
  <!-- Badge rond DinoTeam, d'après le logo des affiches -->
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 100 100"
    role="img"
    aria-label="Logo DinoTeam"
    class="dt-logo"
  >
    <circle cx="50" cy="50" r="49" fill="#fff" />
    <circle cx="50" cy="50" r="43" fill="none" stroke="#0b0b0b" stroke-width="3.5" />
    <text
      x="50"
      y="62"
      text-anchor="middle"
      font-family="Bebas Neue, Impact, sans-serif"
      font-size="44"
      fill="#0b0b0b"
    >
      DT
    </text>
    <path d="M17 48 l1.6 3.4 3.7 .4 -2.8 2.5 .8 3.6 -3.3 -1.9 -3.3 1.9 .8 -3.6 -2.8 -2.5 3.7 -.4z" fill="#0b0b0b" />
    <path d="M83 48 l1.6 3.4 3.7 .4 -2.8 2.5 .8 3.6 -3.3 -1.9 -3.3 1.9 .8 -3.6 -2.8 -2.5 3.7 -.4z" fill="#0b0b0b" />
    <text
      x="50"
      y="78"
      text-anchor="middle"
      font-family="Oswald, Arial Narrow, sans-serif"
      font-weight="600"
      font-size="8"
      letter-spacing="1"
      fill="#0b0b0b"
    >
      DINO TEAM
    </text>
  </svg>
</template>

<style scoped>
.dt-logo {
  flex-shrink: 0;
  display: block;
}
</style>

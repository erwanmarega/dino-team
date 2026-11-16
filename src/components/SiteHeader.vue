<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import SiteLogo from './SiteLogo.vue'
import MenuOverlay from './MenuOverlay.vue'
import { site } from '../config/site'

const route = useRoute()
const open = ref(false)
const scrolled = ref(false)

// Rubric matching the active route; legal pages get a neutral label, the 404 none.
const current = computed(() => {
  const rubric = site.rubrics.find((r) => r.num === route.meta.rubric)
  if (rubric) return rubric
  if (route.meta.noindex && route.name !== 'not-found') return { num: '—', label: 'Infos légales' }
  return null
})

function onScroll() {
  scrolled.value = window.scrollY > 40
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

// Close on navigation (focus stays on the new page content).
watch(
  () => route.fullPath,
  () => {
    open.value = false
  },
)
</script>

<template>
  <header class="header" :class="{ 'is-scrolled': scrolled }">
    <div class="header__inner">
      <div class="header__left">
        <button
          type="button"
          class="burger"
          aria-label="Ouvrir le menu"
          aria-haspopup="dialog"
          :aria-expanded="open"
          @click="open = true"
        >
          <span class="burger__line"></span>
          <span class="burger__line"></span>
          <span class="burger__line"></span>
        </button>
        <p v-if="current" class="pill pill--rubric glass" aria-label="Rubrique actuelle">
          <span class="label-mono text-primary">{{ current.num }}</span>
          <span class="pill__sep"></span>
          <span class="label-mono">{{ current.label }}</span>
        </p>
      </div>

      <RouterLink to="/" class="header__logo" aria-label="Accueil DinoTeam">
        <SiteLogo :size="40" alt="" />
      </RouterLink>

      <div class="header__right">
        <span v-if="current" class="pill pill--num glass label-mono">{{ current.num }}</span>
        <RouterLink to="/faq#contact" class="pill pill--contact glass label-mono">Contact</RouterLink>
      </div>
    </div>
  </header>

  <MenuOverlay :open="open" :current="route.meta.rubric ?? ''" @close="open = false" />
</template>

<style scoped>
.header {
  position: fixed;
  inset: 0 0 auto;
  z-index: 50;
  border-bottom: 1px solid transparent;
  transition:
    background-color 0.3s,
    border-color 0.3s,
    backdrop-filter 0.3s;
}
.header.is-scrolled {
  background: oklch(0.13 0.008 155 / 0.6);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom-color: var(--border);
}
.header__inner {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
  padding: 0 1rem;
}
.header__left,
.header__right {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.header__right {
  gap: 0.5rem;
}

.burger {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 5px;
  width: 2.5rem;
  height: 2.5rem;
  padding: 0 0 0 0.625rem;
  border: 0;
  border-radius: 50%;
  background: none;
  color: var(--foreground);
  cursor: pointer;
}
.burger__line {
  display: block;
  height: 1px;
  background: currentColor;
  transition:
    width 0.2s,
    background-color 0.2s;
}
.burger__line:nth-child(1) {
  width: 1.5rem;
}
.burger__line:nth-child(2) {
  width: 1rem;
}
.burger__line:nth-child(3) {
  width: 1.25rem;
}
.burger:hover .burger__line {
  background: var(--primary);
}
.burger:hover .burger__line:nth-child(1) {
  width: 1.25rem;
}
.burger:hover .burger__line:nth-child(2) {
  width: 1.5rem;
}
.burger:hover .burger__line:nth-child(3) {
  width: 0.75rem;
}

.pill {
  margin: 0;
  border: 1px solid var(--border);
  border-radius: 999px;
}
.pill--rubric {
  display: none;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.75rem;
}
.pill__sep {
  width: 1px;
  height: 0.75rem;
  background: var(--border);
}
.pill--num {
  padding: 0.375rem 0.75rem;
}
.pill--contact {
  display: none;
  padding: 0.5rem 1rem;
  transition:
    border-color 0.2s,
    color 0.2s;
}
.pill--contact:hover {
  border-color: var(--primary);
  color: var(--primary);
}

.header__logo {
  position: absolute;
  left: 50%;
  translate: -50% 0;
}
.header__logo :deep(.site-logo) {
  box-shadow: 0 0 0 1px var(--border);
  transition: transform 0.2s;
}
.header__logo:hover :deep(.site-logo) {
  transform: scale(1.05);
}

@media (min-width: 640px) {
  .pill--rubric {
    display: flex;
  }
  .pill--num {
    display: none;
  }
}
@media (min-width: 768px) {
  .header__inner {
    padding: 0 2rem;
  }
  .pill--contact {
    display: inline-flex;
  }
}
</style>

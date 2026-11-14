<script setup>
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import DtLogo from './DtLogo.vue'
import BookingLink from './BookingLink.vue'
import JungleVines from './JungleVines.vue'
import { site } from '../config/site'

const route = useRoute()
const open = ref(false)
const burger = ref(null)
const panel = ref(null)

// Rubric matching the active route (legal and 404 pages have none).
const current = computed(() => site.rubrics.find((r) => r.num === route.meta.rubric) ?? null)

function setLock(locked) {
  document.body.style.overflow = locked ? 'hidden' : ''
}

async function openMenu() {
  open.value = true
  setLock(true)
  await nextTick()
  panel.value?.querySelector('a')?.focus()
}

function closeMenu({ restoreFocus = true } = {}) {
  if (!open.value) return
  open.value = false
  setLock(false)
  if (restoreFocus) burger.value?.focus()
}

function toggle() {
  if (open.value) closeMenu()
  else openMenu()
}

// While the menu is open, Tab cycles between the burger and the panel links.
function onKeydown(e) {
  if (e.key === 'Escape') {
    closeMenu()
    return
  }
  if (e.key !== 'Tab' || !panel.value) return
  const items = [burger.value, ...panel.value.querySelectorAll('a[href]')]
  const first = items[0]
  const last = items[items.length - 1]
  const active = document.activeElement
  if (!items.includes(active)) {
    e.preventDefault()
    ;(e.shiftKey ? last : items[1] ?? first).focus()
  } else if (e.shiftKey && active === first) {
    e.preventDefault()
    last.focus()
  } else if (!e.shiftKey && active === last) {
    e.preventDefault()
    first.focus()
  }
}

watch(open, (isOpen) => {
  if (isOpen) document.addEventListener('keydown', onKeydown)
  else document.removeEventListener('keydown', onKeydown)
})

// Close on navigation (focus stays on the new page content).
watch(
  () => route.fullPath,
  () => closeMenu({ restoreFocus: false }),
)

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown)
  setLock(false)
})
</script>

<template>
  <header class="header">
    <div class="header__inner">
      <button
        ref="burger"
        type="button"
        class="burger"
        :class="{ 'is-open': open }"
        :aria-expanded="open"
        aria-controls="site-menu"
        :aria-label="open ? 'Fermer le menu' : 'Ouvrir le menu'"
        @click="toggle"
      >
        <span class="burger__line"></span>
        <span class="burger__line"></span>
        <span class="burger__line"></span>
      </button>

      <RouterLink to="/" class="brand">
        <DtLogo :size="34" />
        <span class="brand__name">DinoTeam</span>
      </RouterLink>

      <p v-if="current" class="here" aria-label="Rubrique actuelle">
        <span class="here__num">{{ current.num }}</span> {{ current.label }}
      </p>

      <BookingLink fallback="/faq#contact" class="btn btn--accent cta">Réserver</BookingLink>
    </div>
  </header>

  <!-- Lianas hang from the header's bottom edge. Kept out of the header itself
       (z-index 50) so the open menu (40) and the curtain (60) cover them. -->
  <div class="header-vines" aria-hidden="true">
    <JungleVines variant="canopy" :seed="7" mode="edges" :reach="92" :sag="11" />
  </div>

  <Transition name="menu">
    <div v-if="open" class="menu">
      <div class="menu__backdrop" @click="closeMenu()"></div>
      <nav id="site-menu" ref="panel" class="menu__panel" aria-label="Navigation principale">
        <p v-if="current" class="menu__here">
          Tu es ici : <span class="menu__here-num">{{ current.num }}</span> {{ current.label }}
        </p>
        <RouterLink
          v-for="r in site.rubrics"
          :key="r.num"
          :to="r.to"
          class="menu__link"
          :class="{ 'is-active': r.num === route.meta.rubric }"
          :aria-current="r.num === route.meta.rubric ? 'page' : undefined"
        >
          <span class="menu__num">{{ r.num }}</span>
          <span>{{ r.label }}</span>
        </RouterLink>
      </nav>
    </div>
  </Transition>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(11, 11, 11, 0.92);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--line);
}
.header__inner {
  display: flex;
  align-items: center;
  gap: 16px;
  height: 56px;
  padding: 0 16px;
}

/* Sticky 0-height anchor right under the 57px header (56 + border) */
.header-vines {
  position: sticky;
  top: 57px;
  z-index: 35;
  height: 0;
  pointer-events: none;
}

/* Burger: three thin lines, always at the far left */
.burger {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 44px;
  height: 44px;
  padding: 0 10px;
  margin-left: -10px;
  background: none;
  border: 0;
  color: var(--text);
  cursor: pointer;
}
.burger__line {
  display: block;
  height: 2px;
  background: currentColor;
  transition:
    transform 0.25s ease,
    opacity 0.2s ease;
}
.burger:hover {
  color: var(--accent-bright);
}
.burger.is-open .burger__line:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}
.burger.is-open .burger__line:nth-child(2) {
  opacity: 0;
}
.burger.is-open .burger__line:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
}
.brand:hover {
  color: inherit;
}
.brand__name {
  font-family: var(--display);
  font-size: 24px;
  line-height: 1;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}
/* The badge turns at once, like a stamp */
.brand .dt-logo {
  transition: transform 0.45s cubic-bezier(0.2, 1.6, 0.4, 1);
}
.brand:hover .dt-logo {
  transform: rotate(-14deg) scale(1.06);
}

.here {
  padding-left: 16px;
  border-left: 1px solid var(--line);
  font-family: var(--label);
  font-weight: 500;
  font-size: 14px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--body);
  white-space: nowrap;
}
.here__num {
  color: var(--accent-bright);
}

.cta {
  margin-left: auto;
  min-height: 36px;
  padding: 6px 16px;
  font-size: 14px;
}

/* Menu panel */
.menu {
  position: fixed;
  inset: 0;
  z-index: 40;
}
.menu__backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
}
.menu__panel {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: min(420px, 88vw);
  padding: 88px 28px 32px;
  overflow-y: auto;
  background: var(--bg-2);
  border-right: 1px solid var(--line);
}
.menu__here {
  margin-bottom: 8px;
  font-family: var(--label);
  font-weight: 500;
  font-size: 13px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--muted);
}
.menu__here-num {
  color: var(--accent-bright);
}
.menu__link {
  display: flex;
  align-items: baseline;
  gap: 16px;
  padding: 10px 0;
  font-family: var(--display);
  font-size: clamp(40px, 9vw, 56px);
  line-height: 1;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--text);
}
.menu__num {
  font-family: var(--label);
  font-size: 16px;
  letter-spacing: 2px;
  color: var(--muted);
}
.menu__link:hover,
.menu__link.is-active {
  color: var(--accent-bright);
}
.menu__link.is-active .menu__num {
  color: var(--accent-bright);
}

.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.25s ease;
}
.menu-enter-active .menu__panel,
.menu-leave-active .menu__panel {
  transition: transform 0.3s cubic-bezier(0.2, 0.7, 0.2, 1);
}
.menu-enter-from,
.menu-leave-to {
  opacity: 0;
}
.menu-enter-from .menu__panel,
.menu-leave-to .menu__panel {
  transform: translateX(-100%);
}

@media (prefers-reduced-motion: reduce) {
  .burger__line,
  .brand .dt-logo,
  .menu-enter-active,
  .menu-leave-active,
  .menu-enter-active .menu__panel,
  .menu-leave-active .menu__panel {
    transition: none;
  }
}

@media (max-width: 480px) {
  .header__inner {
    gap: 10px;
    padding: 0 12px;
  }
  .brand__name {
    display: none;
  }
  .here {
    padding-left: 10px;
    font-size: 13px;
    letter-spacing: 1px;
  }
  .cta {
    padding: 6px 12px;
  }
}
</style>

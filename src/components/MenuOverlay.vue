<script setup>
import { nextTick, onBeforeUnmount, ref, watch } from 'vue'
import SiteLogo from './SiteLogo.vue'
import forestRails from '../assets/scenes/forest-rails.jpg'
import boutique from '../assets/scenes/boutique-studio.jpg'
import river from '../assets/scenes/river-tent.jpg'
import clearing from '../assets/scenes/clearing.jpg'
import { site } from '../config/site'

const props = defineProps({
  open: { type: Boolean, default: false },
  // Rubric number of the current page ('' on legal / 404 pages)
  current: { type: String, default: '' },
})
const emit = defineEmits(['close'])

// Scene photo and blurb per rubric number
const scenes = { '00': forestRails, '01': boutique, '02': river, '03': clearing }
const blurbs = {
  '00': "L'entrée dans l'univers DinoTeam : coaching, formules et évolutions.",
  '01': 'Vêtements et accessoires de la collection DinoTeam.',
  '02': 'Le réseau de professionnels qui partagent nos valeurs.',
  '03': 'Questions fréquentes, réseaux sociaux et contact.',
}

const hover = ref(props.current || '00')
const closeBtn = ref(null)
const root = ref(null)
let opener = null
let restoreFocus = true

function onKeydown(e) {
  if (e.key === 'Escape') {
    emit('close')
    return
  }
  if (e.key !== 'Tab' || !root.value) return
  const items = [...root.value.querySelectorAll('button, a[href]')].filter(
    (el) => el.offsetParent !== null,
  )
  if (!items.length) return
  const first = items[0]
  const last = items[items.length - 1]
  if (!items.includes(document.activeElement)) {
    e.preventDefault()
    first.focus()
  } else if (e.shiftKey && document.activeElement === first) {
    e.preventDefault()
    last.focus()
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault()
    first.focus()
  }
}

function release() {
  document.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
}

// A link click navigates away: focus stays with the new page, not the burger.
function onLink() {
  restoreFocus = false
  emit('close')
}

watch(
  () => props.open,
  async (isOpen) => {
    if (isOpen) {
      opener = document.activeElement
      restoreFocus = true
      hover.value = props.current || '00'
      document.addEventListener('keydown', onKeydown)
      document.body.style.overflow = 'hidden'
      await nextTick()
      closeBtn.value?.focus()
    } else {
      release()
      if (restoreFocus && opener instanceof HTMLElement) opener.focus()
      opener = null
    }
  },
)

onBeforeUnmount(release)
</script>

<template>
  <!-- Dims the page left visible beside the panel on wide screens; click closes. -->
  <div class="menu-backdrop" :class="{ 'is-open': open }" aria-hidden="true" @click="emit('close')"></div>
  <div
    ref="root"
    class="menu"
    :class="{ 'is-open': open }"
    role="dialog"
    aria-modal="true"
    aria-label="Menu principal"
    :inert="!open"
  >
    <div class="menu__main">
      <div class="menu__top">
        <button
          ref="closeBtn"
          type="button"
          class="menu__close"
          aria-label="Fermer le menu"
          @click="emit('close')"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
            <path d="M5 5l14 14M19 5L5 19" />
          </svg>
        </button>
        <span class="label-mono text-muted">Menu · DinoTeam</span>
      </div>

      <nav class="menu__nav" aria-label="Navigation principale">
        <ul class="menu__list">
          <li
            v-for="(r, i) in site.rubrics"
            :key="r.num"
            class="menu__item"
            :style="{ transitionDelay: open ? `${120 + i * 70}ms` : '0ms' }"
          >
            <RouterLink
              :to="r.to"
              class="menu__link"
              :class="{ 'is-current': r.num === current }"
              :aria-current="r.num === current ? 'page' : undefined"
              @click="onLink"
              @mouseenter="hover = r.num"
              @focus="hover = r.num"
            >
              <span class="menu__num label-mono">{{ r.num }}</span>
              <span class="menu__text">
                <span class="menu__label">{{ r.label }}</span>
                <span class="menu__blurb">{{ blurbs[r.num] }}</span>
              </span>
              <svg class="menu__arrow" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M7 17L17 7M8 7h9v9" />
              </svg>
            </RouterLink>
          </li>
        </ul>
      </nav>

      <div class="menu__foot">
        <SiteLogo :size="32" />
        <span>
          Tu es ici :
          {{ site.rubrics.find((r) => r.num === current)?.label ?? 'Infos légales' }}
        </span>
      </div>
    </div>

    <div class="menu__side" aria-hidden="true">
      <img
        v-for="r in site.rubrics"
        :key="r.num"
        :src="scenes[r.num]"
        alt=""
        loading="lazy"
        width="1920"
        height="1088"
        class="menu__img"
        :class="{ 'is-active': hover === r.num }"
      />
      <div class="menu__fade bg-side-fade"></div>
    </div>
  </div>
</template>

<style scoped>
.menu-backdrop {
  position: fixed;
  inset: 0;
  z-index: 69;
  background: color-mix(in oklab, var(--background) 60%, transparent);
  visibility: hidden;
  opacity: 0;
  transition:
    opacity 0.5s ease,
    visibility 0.5s;
}
.menu-backdrop.is-open {
  visibility: visible;
  opacity: 1;
}
.menu {
  position: fixed;
  inset: 0;
  z-index: 70;
  display: grid;
  background: var(--background);
  visibility: hidden;
  opacity: 0;
  transition:
    opacity 0.5s ease,
    visibility 0.5s;
}
.menu.is-open {
  visibility: visible;
  opacity: 1;
}
.menu__main {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 0;
  padding: 1.25rem 1.5rem 2rem;
  overflow-y: auto;
}
.menu__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.menu__close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border: 1px solid var(--border);
  border-radius: 50%;
  background: none;
  color: inherit;
  cursor: pointer;
  transition:
    border-color 0.2s,
    color 0.2s;
}
.menu__close:hover {
  border-color: var(--primary);
  color: var(--primary);
}
.menu__nav {
  margin: auto 0;
  padding: 2.5rem 0;
}
.menu__list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 0.5rem;
}
.menu__item {
  opacity: 0;
  transform: translateX(-1.5rem);
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
}
.menu.is-open .menu__item {
  opacity: 1;
  transform: none;
}
.menu__link {
  display: flex;
  align-items: baseline;
  gap: 1.25rem;
  padding: 1rem 0;
  border-bottom: 1px solid var(--border);
}
.menu__num {
  color: var(--muted-foreground);
}
.menu__text {
  flex: 1;
}
.menu__label {
  display: block;
  font-family: var(--font-display);
  font-size: 3rem;
  font-weight: 800;
  line-height: 1;
  text-transform: uppercase;
  transition: color 0.2s;
}
.menu__blurb {
  display: block;
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: var(--muted-foreground);
}
.menu__arrow {
  align-self: center;
  color: var(--muted-foreground);
  transition:
    transform 0.2s,
    color 0.2s;
}
.menu__link:hover .menu__label,
.menu__link.is-current .menu__label,
.menu__link.is-current .menu__num {
  color: var(--primary);
}
.menu__link:hover .menu__arrow {
  transform: translate(0.25rem, -0.25rem);
  color: var(--primary);
}
.menu__foot {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.75rem;
  color: var(--muted-foreground);
}
.menu__side {
  position: relative;
  display: none;
  overflow: hidden;
}
.menu__img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transform: scale(1.1);
  transition:
    opacity 0.7s ease,
    transform 0.7s ease;
}
.menu__img.is-active {
  opacity: 1;
  transform: none;
}
.menu__fade {
  position: absolute;
  inset: 0;
}

@media (min-width: 768px) {
  /* Side panel about 30% narrower than the viewport, anchored under the burger. */
  .menu {
    right: auto;
    width: 70vw;
    grid-template-columns: 1.1fr 1fr;
    border-right: 1px solid var(--border);
  }
  .menu__main {
    padding: 1.25rem 2.5rem 2rem;
  }
  .menu__label {
    font-size: 3.25rem;
  }
  .menu__side {
    display: block;
  }
}

@media (prefers-reduced-motion: reduce) {
  .menu-backdrop,
  .menu,
  .menu__item,
  .menu__img {
    transition: none;
  }
}
</style>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
import ForestCurtain from './components/ForestCurtain.vue'
import TrailNav from './components/TrailNav.vue'
import { markSwapped, transition } from './composables/useRouteTransition'

const route = useRoute()
const main = ref(null)

// Rubric of the page actually on screen: it only changes once the new view is
// mounted, so the trail switches while the curtain is closed.
const shownRubric = ref(route.meta.rubric ?? '')

// Keep the page height while the old view leaves so the footer does not jump.
function onBeforeLeave(el) {
  if (main.value) main.value.style.minHeight = `${el.offsetHeight}px`
}
function onBeforeEnter() {
  shownRubric.value = route.meta.rubric ?? ''
}
function onEnter() {
  if (main.value) main.value.style.minHeight = ''
  markSwapped()
}
</script>

<template>
  <SiteHeader />
  <main ref="main">
    <RouterView v-slot="{ Component }">
      <Transition
        :name="transition.kind === 'curtain' ? `page-${transition.direction}` : 'page-fade'"
        mode="out-in"
        @before-leave="onBeforeLeave"
        @before-enter="onBeforeEnter"
        @enter="onEnter"
      >
        <component :is="Component" :key="route.path" />
      </Transition>
    </RouterView>
  </main>
  <!-- The coaching page ends with its own TrailSection, so prev/next would duplicate it. -->
  <TrailNav v-if="shownRubric && shownRubric !== '00'" :current="shownRubric" />
  <SiteFooter />
  <ForestCurtain />
</template>

<style>
/* Plain fade: legal pages, 404, reduced motion */
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.18s ease;
}
.page-fade-enter-from,
.page-fade-leave-to {
  opacity: 0;
}

/* Between rubrics: the old view leaves behind the rail journey overlay; the new
   one only fades in, since the overlay ends on the same scene as its hero. */
.page-in-leave-active,
.page-out-leave-active {
  transition: none;
}
.page-in-enter-active,
.page-out-enter-active {
  transition: opacity 0.3s ease;
}
.page-in-enter-from,
.page-out-enter-from {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .page-in-enter-active,
  .page-out-enter-active {
    transition: opacity 0.18s ease;
  }
  .page-in-enter-from,
  .page-out-enter-from {
    transform: none;
  }
}
</style>

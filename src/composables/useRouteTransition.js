import { reactive } from 'vue'
import { NavigationFailureType, isNavigationFailure } from 'vue-router'
import { site } from '../config/site'

// Direction-aware page transition shared by the router guards, App.vue and
// ForestCurtain.vue. Between two rubrics a "rail journey" covers the screen
// (diving along the jungle rails, or backing out of them to the start), the
// route swaps underneath, then the new rubric's scene opens up. Anything else is a plain fade.

export const CLOSE_MS = 600
export const HOLD_MS = 200
export const OPEN_MS = 750
const WATCHDOG_MS = 3000

export const transition = reactive({
  phase: 'idle', // idle | closing | closed | opening
  kind: 'fade', // curtain | fade
  direction: 'in', // in = diving deeper (next rubric), out = backing out (previous rubric)
  from: '', // rubric number we leave
  to: '', // rubric number we reach
  label: '',
})

let closePromise = null
let openTimer = 0
let idleTimer = 0
let watchdog = 0

let swapPending = false
let swapTimer = 0
let swapWaiters = []

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
const rubricIndex = (route) => site.rubrics.findIndex((r) => r.num === route.meta.rubric)

function closeCurtain() {
  clearTimeout(openTimer)
  clearTimeout(idleTimer)
  if (transition.phase === 'closed') return Promise.resolve()
  if (transition.phase === 'closing' && closePromise) return closePromise
  transition.phase = 'closing'
  closePromise = new Promise((resolve) => {
    setTimeout(() => {
      transition.phase = 'closed'
      closePromise = null
      // Safety net: never leave the page hidden if a navigation never completes.
      watchdog = setTimeout(openCurtain, WATCHDOG_MS)
      resolve()
    }, CLOSE_MS)
  })
  return closePromise
}

function openCurtain() {
  clearTimeout(watchdog)
  if (transition.phase === 'idle' || transition.phase === 'opening') return
  const wait = HOLD_MS + (transition.phase === 'closing' ? CLOSE_MS : 0)
  clearTimeout(openTimer)
  openTimer = setTimeout(() => {
    transition.phase = 'opening'
    idleTimer = setTimeout(() => {
      transition.phase = 'idle'
    }, OPEN_MS)
  }, wait)
}

function releaseSwap() {
  clearTimeout(swapTimer)
  swapPending = false
  swapWaiters.splice(0).forEach((resolve) => resolve())
}

/** Router `beforeResolve` guard: lazy chunks are already loaded when this runs. */
export async function beforeSwap(to, from) {
  // First navigation, or same page (hash / query change): nothing to animate.
  if (!from.name || to.path === from.path) return
  swapPending = true
  const a = rubricIndex(from)
  const b = rubricIndex(to)
  if (a < 0 || b < 0 || prefersReducedMotion()) {
    transition.kind = 'fade'
    return
  }
  transition.kind = 'curtain'
  transition.direction = b > a ? 'in' : 'out'
  transition.from = site.rubrics[a].num
  transition.to = site.rubrics[b].num
  transition.label = `${site.rubrics[b].num} — ${site.rubrics[b].label}`
  await closeCurtain()
}

/** Router `afterEach` hook. */
export function afterSwap(failure) {
  if (isNavigationFailure(failure, NavigationFailureType.cancelled)) return
  if (failure) swapPending = false
  openCurtain()
}

/** Called by the page <Transition> once the new view is mounted. */
export function markSwapped() {
  releaseSwap()
}

/** Router `scrollBehavior` waits for the new view (out-in transition) before scrolling. */
export function waitForSwap() {
  if (!swapPending) return Promise.resolve()
  return new Promise((resolve) => {
    swapWaiters.push(resolve)
    clearTimeout(swapTimer)
    swapTimer = setTimeout(releaseSwap, 2000)
  })
}

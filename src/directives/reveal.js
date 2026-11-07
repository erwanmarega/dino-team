/**
 * v-reveal : fait apparaître un élément quand il entre dans l'écran.
 *
 *   v-reveal                       → monte en fondu
 *   v-reveal="200"                 → idem, avec 200 ms de retard
 *   v-reveal="{ variant: 'left', delay: 100 }"
 *
 * Variantes : up (défaut), left, right, fade, slam (gros titres),
 * wipe (bandeaux rouges .brush, peints de gauche à droite).
 * Les styles sont dans style.css (.reveal…). Sans IntersectionObserver,
 * rien n'est masqué.
 */
let observer

function getObserver() {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0, rootMargin: '0px 0px -10% 0px' },
    )
  }
  return observer
}

export const reveal = {
  mounted(el, { value }) {
    if (typeof IntersectionObserver === 'undefined') return
    const opts = typeof value === 'number' ? { delay: value } : value || {}
    el.classList.add('reveal', `reveal--${opts.variant || 'up'}`)
    if (opts.delay) el.style.setProperty('--reveal-delay', `${opts.delay}ms`)
    getObserver().observe(el)
  },
  unmounted(el) {
    observer?.unobserve(el)
  },
}

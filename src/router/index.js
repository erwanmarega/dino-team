import { createRouter, createWebHistory } from 'vue-router'
import { applyPageMeta } from '../composables/usePageMeta'
import { afterSwap, beforeSwap, waitForSwap } from '../composables/useRouteTransition'

const routes = [
  {
    path: '/',
    name: 'coaching',
    component: () => import('../views/CoachingView.vue'),
    meta: {
      title: 'Coach sportif à domicile et en salle – DinoTeam',
      description:
        'DinoTeam : coaching sportif personnalisé à domicile et en salle avec Enzo. Réserve ton bilan ou ta séance découverte et lance-toi à ton rythme.',
      rubric: '00',
    },
  },
  {
    path: '/boutique',
    name: 'boutique',
    component: () => import('../views/BoutiqueView.vue'),
    meta: {
      title: 'Boutique vêtements et accessoires – DinoTeam',
      description:
        'Découvre la collection DinoTeam : sweats, joggings et accessoires sobres et solides aux couleurs de la team, disponibles sur la boutique en ligne.',
      rubric: '01',
    },
  },
  {
    path: '/collaborations',
    name: 'collaborations',
    component: () => import('../views/CollaborationsView.vue'),
    meta: {
      title: 'Collaborations et partenaires – DinoTeam',
      description:
        'Les partenaires et collaborations de DinoTeam : professionnels du sport, du bien-être et marques qui accompagnent la team au quotidien.',
      rubric: '02',
    },
  },
  {
    path: '/faq',
    name: 'faq',
    component: () => import('../views/FaqView.vue'),
    meta: {
      title: 'FAQ coaching sportif et réseaux – DinoTeam',
      description:
        'Réponses aux questions fréquentes avant ta première séance de coaching, et tous les moyens de contacter Enzo : Instagram, Facebook, e-mail, téléphone.',
      rubric: '03',
    },
  },
  {
    path: '/mentions-legales',
    name: 'mentions-legales',
    component: () => import('../views/LegalView.vue'),
    meta: {
      title: 'Mentions légales – DinoTeam',
      description: 'Mentions légales du site DinoTeam : éditeur, hébergeur et propriété intellectuelle.',
      noindex: true,
    },
  },
  {
    path: '/cgv',
    name: 'cgv',
    component: () => import('../views/LegalView.vue'),
    meta: {
      title: 'Conditions générales de vente – DinoTeam',
      description: 'Conditions générales de vente des prestations de coaching sportif DinoTeam.',
      noindex: true,
    },
  },
  {
    path: '/confidentialite',
    name: 'confidentialite',
    component: () => import('../views/LegalView.vue'),
    meta: {
      title: 'Politique de confidentialité – DinoTeam',
      description: 'Politique de confidentialité du site DinoTeam : données collectées, droits et cookies.',
      noindex: true,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFoundView.vue'),
    meta: {
      title: 'Page introuvable – DinoTeam',
      description: "Cette page n'existe pas ou a été déplacée.",
      noindex: true,
    },
  },
]

function layoutTop(el) {
  let top = 0
  for (let node = el; node; node = node.offsetParent) top += node.offsetTop
  return top
}

const router = createRouter({
  history: createWebHistory(),
  routes,
  // Cross-page navigations scroll once the new view is mounted (the curtain is
  // still closed at that point) and instantly; same-page hash changes stay smooth.
  async scrollBehavior(to, from, savedPosition) {
    const crossPage = Boolean(from.name) && to.path !== from.path
    if (crossPage) await waitForSwap()
    if (savedPosition) return crossPage ? { ...savedPosition, behavior: 'instant' } : savedPosition
    if (to.hash && crossPage) {
      // The new view may still be mid scale-in: measure its layout position,
      // which ignores transforms, instead of its bounding box.
      const target = document.querySelector(to.hash)
      if (target) return { left: 0, top: Math.max(0, layoutTop(target) - 56), behavior: 'instant' }
    }
    if (to.hash) return { el: to.hash, top: 56, behavior: 'smooth' }
    return { top: 0, behavior: 'instant' }
  },
})

router.beforeResolve(beforeSwap)

router.afterEach((to, from, failure) => {
  if (!failure) applyPageMeta(to)
  afterSwap(failure)
})

export default router

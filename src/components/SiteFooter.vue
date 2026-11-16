<script setup>
import { computed } from 'vue'
import SiteLogo from './SiteLogo.vue'
import { site } from '../config/site'

const year = new Date().getFullYear()

// 24x24 filled/stroked glyphs, inline to avoid an icon library
const icons = {
  instagram:
    'M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm5 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm5.5-2.2a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z',
  facebook: 'M14 8V6.5c0-.8.2-1.5 1.5-1.5H17V2h-2.5C11.7 2 10 3.7 10 6.3V8H7.5v3H10v11h4V11h2.7l.5-3H14Z',
  tiktok:
    'M16.6 5.8A4.3 4.3 0 0 1 15.5 3h-3.2v12.4a2.6 2.6 0 1 1-2.6-2.6c.3 0 .5 0 .8.1V9.6a5.8 5.8 0 1 0 5 5.8V9.1a7.4 7.4 0 0 0 4.3 1.4V7.3a4.3 4.3 0 0 1-3.2-1.5Z',
  youtube:
    'M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8C22 15.2 22 12 22 12s0-3.2-.4-4.8ZM10 15V9l5.2 3-5.2 3Z',
}

// Only networks with a real link are shown
const socials = computed(() =>
  [
    { key: 'instagram', label: 'Instagram', href: site.socials.instagram },
    { key: 'facebook', label: 'Facebook', href: site.socials.facebook },
    { key: 'tiktok', label: 'TikTok', href: site.socials.tiktok },
    { key: 'youtube', label: 'YouTube', href: site.socials.youtube },
  ].filter((s) => s.href),
)

const legal = [
  { label: 'Mentions légales', to: '/mentions-legales' },
  { label: 'CGV', to: '/cgv' },
  { label: 'Politique de confidentialité', to: '/confidentialite' },
]
</script>

<template>
  <footer class="footer bg-forest-gradient">
    <div class="footer__grid">
      <div>
        <div class="footer__brand">
          <SiteLogo :size="48" alt="" />
          <span class="footer__name">DinoTeam</span>
        </div>
        <p class="footer__tag text-muted">
          Coaching sportif, collection de vêtements et réseau de professionnels.
        </p>
      </div>

      <nav aria-label="Rubriques">
        <h2 class="footer__title label-mono text-primary">Rubriques</h2>
        <ul class="footer__list">
          <li v-for="r in site.rubrics" :key="r.num">
            <RouterLink :to="r.to" class="footer__link">
              <span class="label-mono footer__num">{{ r.num }}</span>{{ r.label }}
            </RouterLink>
          </li>
        </ul>
      </nav>

      <div>
        <h2 class="footer__title label-mono text-primary">Contact</h2>
        <ul class="footer__list footer__list--contact">
          <li v-if="site.email">
            <a :href="`mailto:${site.email}`" class="footer__link footer__contact">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
              {{ site.email }}
            </a>
          </li>
          <li v-if="site.phone">
            <a :href="`tel:${site.phone.replace(/\s+/g, '')}`" class="footer__link footer__contact">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
              </svg>
              {{ site.phone }}
            </a>
          </li>
        </ul>
        <div v-if="socials.length" class="footer__socials">
          <a
            v-for="s in socials"
            :key="s.key"
            :href="s.href"
            target="_blank"
            rel="noopener"
            class="footer__social"
            :aria-label="s.label"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
              <path :d="icons[s.key]" />
            </svg>
          </a>
        </div>
      </div>

      <nav aria-label="Informations légales">
        <h2 class="footer__title label-mono text-primary">Légal</h2>
        <ul class="footer__list">
          <li v-for="l in legal" :key="l.to">
            <RouterLink :to="l.to" class="footer__link">{{ l.label }}</RouterLink>
          </li>
        </ul>
      </nav>
    </div>

    <div class="footer__bottom">
      <div class="footer__bottom-inner">
        <span>© {{ year }} DinoTeam — Tous droits réservés</span>
        <span class="label-mono">Évolue à ton rythme</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--border);
}
.footer__grid,
.footer__bottom-inner {
  max-width: 80rem;
  margin: 0 auto;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}
.footer__grid {
  display: grid;
  gap: 2.5rem;
  padding-top: 3.5rem;
  padding-bottom: 3.5rem;
}
.footer__brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.footer__name {
  font-family: var(--font-display);
  font-size: 1.875rem;
  font-weight: 800;
  line-height: 1;
  text-transform: uppercase;
}
.footer__tag {
  max-width: 20rem;
  margin-top: 1rem;
  font-size: 0.875rem;
}
.footer__title {
  margin: 0;
  font-family: var(--font-mono);
  font-weight: 400;
  line-height: 1.55;
}
.footer__list {
  display: grid;
  gap: 0.5rem;
  margin: 1rem 0 0;
  padding: 0;
  list-style: none;
  font-size: 0.875rem;
}
.footer__list--contact {
  gap: 0.75rem;
}
.footer__link {
  color: var(--muted-foreground);
  transition: color 0.2s;
}
.footer__link:hover {
  color: var(--foreground);
}
.footer__num {
  margin-right: 0.5rem;
  font-size: 0.6rem;
}
.footer__contact {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  overflow-wrap: anywhere;
}
.footer__socials {
  display: flex;
  gap: 0.5rem;
  margin-top: 1.25rem;
}
.footer__social {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border: 1px solid var(--border);
  border-radius: 50%;
  color: var(--muted-foreground);
  transition:
    border-color 0.2s,
    color 0.2s;
}
.footer__social:hover {
  border-color: var(--primary);
  color: var(--primary);
}
.footer__bottom {
  border-top: 1px solid var(--border);
}
.footer__bottom-inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
  font-size: 0.75rem;
  color: var(--muted-foreground);
}
@media (min-width: 768px) {
  .footer__grid {
    grid-template-columns: 1.4fr 1fr 1fr 1fr;
    padding-left: 2rem;
    padding-right: 2rem;
  }
  .footer__bottom-inner {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}
</style>

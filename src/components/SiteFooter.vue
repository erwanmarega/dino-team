<script setup>
import DtLogo from './DtLogo.vue'
import { site } from '../config/site'

const year = new Date().getFullYear()

const socials = [
  { label: 'Instagram', href: site.socials.instagram },
  { label: 'TikTok', href: site.socials.tiktok },
  { label: 'YouTube', href: site.socials.youtube },
]

const legal = [
  { label: 'Mentions légales', to: '/mentions-legales' },
  { label: 'CGV', to: '/cgv' },
  { label: 'Politique de confidentialité', to: '/confidentialite' },
]
</script>

<template>
  <footer class="footer">
    <div class="w footer__inner">
      <div class="footer__cols">
        <div class="footer__brand">
          <DtLogo :size="44" />
          <span>DinoTeam</span>
        </div>

        <nav class="footer__col" aria-label="Rubriques">
          <h2 class="footer__title">Rubriques</h2>
          <RouterLink v-for="r in site.rubrics" :key="r.num" :to="r.to">
            {{ r.num }} {{ r.label }}
          </RouterLink>
        </nav>

        <div class="footer__col">
          <h2 class="footer__title">Contact</h2>
          <a v-if="site.email" :href="`mailto:${site.email}`">{{ site.email }}</a>
          <span v-else>[EMAIL]</span>
          <a v-if="site.phone" :href="`tel:${site.phone.replace(/\s+/g, '')}`">{{ site.phone }}</a>
          <span v-else>[TÉLÉPHONE]</span>
        </div>

        <div class="footer__col">
          <h2 class="footer__title">Réseaux</h2>
          <a v-for="s in socials" :key="s.label" :href="s.href || '#'">{{ s.label }}</a>
        </div>
      </div>

      <div class="footer__bottom">
        <nav class="footer__legal" aria-label="Informations légales">
          <RouterLink v-for="l in legal" :key="l.to" :to="l.to">{{ l.label }}</RouterLink>
        </nav>
        <span>© {{ year }} DinoTeam</span>
      </div>

      <p class="footer__roar">Rejoignez la DinoTeam — <span class="brush-text">Roarrrrr</span></p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding: 64px 0 40px;
  background: var(--bg);
  border-top: 1px solid var(--line);
  font-family: var(--label);
  font-size: 14px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--muted);
}
.footer__inner {
  display: flex;
  flex-direction: column;
  gap: 40px;
}
.footer__cols {
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr 1fr;
  gap: 40px;
}
.footer__brand {
  display: flex;
  align-items: center;
  align-self: start;
  gap: 12px;
  font-family: var(--display);
  font-size: 28px;
  letter-spacing: 1.5px;
  color: var(--text);
}
.footer__col {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
}
.footer__title {
  margin: 0 0 4px;
  font-family: var(--label);
  font-weight: 600;
  font-size: 13px;
  letter-spacing: 2px;
  color: var(--text);
}
.footer a:hover {
  color: var(--accent-bright);
}
.footer__bottom {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding-top: 28px;
  border-top: 1px solid var(--line);
}
.footer__legal {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 24px;
}
.footer__roar {
  text-align: center;
  font-size: 15px;
  letter-spacing: 2px;
  color: var(--body);
}
/* Hover: the "Roarrrrr" roars */
.footer__roar .brush-text {
  display: inline-block;
}
@media (hover: hover) and (prefers-reduced-motion: no-preference) {
  .footer__roar:hover .brush-text {
    animation: roar 0.5s ease-in-out;
  }
}
@keyframes roar {
  0%,
  100% {
    transform: none;
  }
  20% {
    transform: rotate(-6deg) scale(1.25);
  }
  40% {
    transform: rotate(5deg) scale(1.3);
  }
  60% {
    transform: rotate(-4deg) scale(1.25);
  }
  80% {
    transform: rotate(2deg) scale(1.1);
  }
}

@media (max-width: 820px) {
  .footer__cols {
    grid-template-columns: 1fr 1fr;
  }
  .footer__brand {
    grid-column: 1 / -1;
  }
}
@media (max-width: 480px) {
  .footer__cols {
    grid-template-columns: 1fr;
  }
}
</style>

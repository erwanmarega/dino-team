<script setup>
import { computed } from 'vue'
import { site } from '../../config/site'

// Only networks with a real link are shown
const networks = computed(() =>
  [
    { key: 'instagram', label: 'Instagram', href: site.socials.instagram },
    { key: 'facebook', label: 'Facebook', href: site.socials.facebook },
    { key: 'tiktok', label: 'TikTok', href: site.socials.tiktok },
    { key: 'youtube', label: 'YouTube', href: site.socials.youtube },
  ].filter((n) => n.href),
)

const phoneHref = computed(() => `tel:${site.phone.replace(/\s+/g, '')}`)
</script>

<template>
  <section id="reseaux" class="soc">
    <div class="w soc__inner">
      <div v-reveal class="soc__heading">
        <p class="label label--accent">Réseaux</p>
        <h2 class="section-title">Réseaux &amp; contact</h2>
        <p class="lede">
          Le moyen le plus rapide de joindre {{ site.coachFirstName }} : un message sur Instagram. Écris « DINO » en DM pour ton 1er bilan offert.
        </p>
      </div>

      <ul class="soc__cards">
        <li v-for="(n, i) in networks" :key="n.key" v-reveal="i * 80">
          <a :href="n.href" target="_blank" rel="noopener" class="card">
            <svg class="card__icon" viewBox="0 0 24 24" aria-hidden="true">
              <template v-if="n.key === 'instagram'">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
              </template>
              <template v-else-if="n.key === 'facebook'">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <path d="M16 21v-7h2.5l.5-3H16V9.5C16 8.6 16.6 8 17.5 8H19V5.2C18.5 5.1 17.7 5 17 5c-2.2 0-4 1.5-4 4v2h-2.5v3H13v7" />
              </template>
              <template v-else-if="n.key === 'tiktok'">
                <path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5" />
                <path d="M14 3c.4 2.6 2 4.2 5 4.5" />
              </template>
              <template v-else-if="n.key === 'youtube'">
                <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
                <path d="M10 9.5v5l4.5-2.5z" fill="currentColor" stroke="none" />
              </template>
            </svg>
            <span class="card__name">{{ n.label }}</span>
          </a>
        </li>
      </ul>

      <ul v-reveal class="soc__lines">
        <li>
          <span class="soc__k">E-mail</span>
          <a v-if="site.email" :href="`mailto:${site.email}`">{{ site.email }}</a>
          <span v-else>[EMAIL]</span>
        </li>
        <li>
          <span class="soc__k">Téléphone</span>
          <a v-if="site.phone" :href="phoneHref">{{ site.phone }}</a>
          <span v-else>[TÉLÉPHONE]</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.soc {
  padding: 64px 0;
  background: var(--veil);
  border-top: 1px solid var(--line);
}
.soc__inner {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
.soc__heading {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.soc__cards {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}
.card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 18px 20px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-left: 4px solid var(--accent);
  color: var(--text);
  transition:
    border-color 0.2s,
    color 0.2s;
}
a.card:hover {
  border-color: var(--accent);
  color: var(--accent-bright);
}
.card__icon {
  width: 26px;
  height: 26px;
  flex-shrink: 0;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.card__name {
  font-family: var(--display);
  font-size: 26px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.soc__lines {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 12px 40px;
  color: var(--body);
}
.soc__lines li {
  display: flex;
  gap: 10px;
  align-items: baseline;
}
.soc__k {
  font-family: var(--label);
  font-size: 13px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--muted);
}
.soc__lines a {
  color: var(--text);
  border-bottom: 1px solid var(--accent);
}
.soc__lines a:hover {
  color: var(--accent-bright);
}
</style>

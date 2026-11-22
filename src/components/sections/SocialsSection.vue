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
    <p class="label-mono text-muted">Réseaux</p>
    <p class="soc__intro text-muted">
      Le moyen le plus rapide de joindre {{ site.coachFirstName }} : un message sur Instagram.
      Écris « DINO » en DM pour ton 1er bilan offert.
    </p>

    <ul class="soc__grid">
      <li v-for="n in networks" :key="n.key">
        <a :href="n.href" target="_blank" rel="noopener" class="soc__link">
          <svg class="soc__icon" viewBox="0 0 24 24" aria-hidden="true">
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
          <span class="soc__name">{{ n.label }}</span>
        </a>
      </li>
    </ul>

    <ul class="soc__lines card">
      <li>
        <svg class="soc__lico" viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
        <a v-if="site.email" :href="`mailto:${site.email}`" class="soc__chip label-mono">{{ site.email }}</a>
        <span v-else>[EMAIL]</span>
      </li>
      <li>
        <svg class="soc__lico" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
        </svg>
        <a v-if="site.phone" :href="phoneHref" class="soc__chip label-mono">{{ site.phone }}</a>
        <span v-else>[TÉLÉPHONE]</span>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.soc {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.soc__intro {
  margin: 0;
  font-size: 0.9rem;
}
.soc__grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(7rem, 1fr));
  gap: 0.75rem;
}
.soc__link {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--card);
  color: var(--foreground);
  transition: border-color 0.2s;
}
.soc__link:hover,
.soc__link:focus-visible {
  border-color: var(--primary);
}
.soc__icon {
  width: 1.5rem;
  height: 1.5rem;
  fill: none;
  stroke: var(--muted-foreground);
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: stroke 0.2s;
}
.soc__link:hover .soc__icon,
.soc__link:focus-visible .soc__icon {
  stroke: var(--primary);
}
.soc__name {
  font-size: 0.75rem;
  font-weight: 600;
}
.soc__lines {
  list-style: none;
  margin: 0;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.soc__lines li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;
}
/* Green dashed tag, same family as the review chips */
.soc__chip {
  min-width: 0;
  padding: 0.4rem 0.75rem;
  border: 1px dashed color-mix(in oklab, var(--primary) 50%, transparent);
  border-radius: 2px;
  background: repeating-linear-gradient(
    135deg,
    color-mix(in oklab, var(--primary) 5%, transparent) 0 10px,
    transparent 10px 20px
  );
  color: var(--primary);
  font-size: 0.8rem;
  overflow-wrap: anywhere;
  transition:
    border-color 0.2s,
    background-color 0.2s;
}
.soc__chip:hover {
  border-color: var(--primary);
  background-color: color-mix(in oklab, var(--primary) 10%, transparent);
}
.soc__lico {
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
  fill: none;
  stroke: var(--primary);
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}
</style>

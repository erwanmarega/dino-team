<script setup>
import { computed } from 'vue'

const props = defineProps({
  partner: { type: Object, required: true },
  categoryLabel: { type: String, default: '' },
})

const socialLabels = {
  instagram: 'Instagram',
  tiktok: 'TikTok',
  youtube: 'YouTube',
  facebook: 'Facebook',
  linkedin: 'LinkedIn',
  x: 'X',
}

const code = computed(() => `DT-0${String(props.partner.num).padStart(3, '0')}`)

const socials = computed(() =>
  Object.entries(props.partner.socials || {})
    .filter(([, href]) => href)
    .map(([key, href]) => ({
      key,
      href,
      label: socialLabels[key] || key.charAt(0).toUpperCase() + key.slice(1),
    })),
)
</script>

<template>
  <article class="spec glass shadow-card">
    <div class="spec__head">
      <span class="label-mono text-primary">Spécimen {{ partner.num }}</span>
      <span class="label-mono text-muted">{{ code }}</span>
    </div>

    <div class="spec__photo">
      <img
        v-if="partner.photo"
        :src="partner.photo"
        :alt="`${partner.name}, ${partner.job}`"
        loading="lazy"
      />
      <span v-else class="spec__placeholder label-mono">[PHOTO]</span>
    </div>

    <div class="spec__body">
      <h3 class="spec__name">{{ partner.name }}</h3>
      <p v-if="partner.job || partner.specialty" class="spec__job label-mono text-primary">
        {{ [partner.job, partner.specialty].filter(Boolean).join(' · ') }}
      </p>

      <dl v-if="categoryLabel || partner.location" class="spec__rows">
        <div v-if="categoryLabel" class="spec__row">
          <dt class="label-mono text-muted">Catégorie</dt>
          <dd>{{ categoryLabel }}</dd>
        </div>
        <div v-if="partner.location" class="spec__row">
          <dt class="label-mono text-muted">Habitat</dt>
          <dd>{{ partner.location }}</dd>
        </div>
      </dl>

      <p v-if="partner.description" class="spec__desc text-muted">{{ partner.description }}</p>

      <ul
        v-if="partner.url || socials.length || partner.email || partner.phone"
        class="spec__links"
      >
        <li v-if="partner.url">
          <a :href="partner.url" target="_blank" rel="noopener">Site web</a>
        </li>
        <li v-for="s in socials" :key="s.key">
          <a :href="s.href" target="_blank" rel="noopener">{{ s.label }}</a>
        </li>
        <li v-if="partner.email">
          <a :href="`mailto:${partner.email}`">E-mail</a>
        </li>
        <li v-if="partner.phone">
          <a :href="`tel:${partner.phone.replace(/\s+/g, '')}`">{{ partner.phone }}</a>
        </li>
      </ul>
    </div>
  </article>
</template>

<style scoped>
.spec {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid color-mix(in oklab, var(--primary) 30%, transparent);
  border-radius: var(--radius);
  font-size: 0.875rem;
  transition:
    translate 0.3s ease,
    border-color 0.3s ease;
}
.spec__head {
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.625rem 1rem;
  border-bottom: 1px solid color-mix(in oklab, var(--primary) 20%, transparent);
}
.spec__photo {
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: var(--card);
  border-bottom: 1px solid var(--border);
}
.spec__photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
}
.spec__placeholder {
  color: var(--muted-foreground);
}
.spec__body {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.25rem 1rem 1.25rem;
}
.spec__name {
  font-size: 2rem;
  font-weight: 800;
  line-height: 1;
}
.spec__rows {
  margin: 0;
}
.spec__row {
  display: grid;
  grid-template-columns: 7.5rem 1fr;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0;
  border-top: 1px solid var(--border);
}
.spec__row:last-child {
  border-bottom: 1px solid var(--border);
}
.spec__row dd {
  margin: 0;
  font-weight: 500;
}
.spec__desc {
  line-height: 1.55;
}
.spec__links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
  margin: auto 0 0;
  padding: 0.875rem 0 0;
  list-style: none;
  border-top: 1px solid var(--border);
}
.spec__links a {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  border-bottom: 1px solid color-mix(in oklab, var(--primary) 50%, transparent);
  overflow-wrap: anywhere;
}
@media (hover: hover) and (prefers-reduced-motion: no-preference) {
  .spec:hover {
    translate: 0 -6px;
    border-color: var(--primary);
  }
}
</style>

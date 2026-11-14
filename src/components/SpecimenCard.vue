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
  <article class="spec">
    <div class="spec__head">
      <span>Spécimen {{ partner.num }}</span>
      <span>{{ code }}</span>
    </div>

    <div class="spec__photo">
      <img
        v-if="partner.photo"
        :src="partner.photo"
        :alt="`${partner.name}, ${partner.job}`"
        loading="lazy"
      />
      <span v-else class="spec__placeholder">[PHOTO]</span>
    </div>

    <div class="spec__body">
      <h3 class="spec__name">{{ partner.name }}</h3>
      <p v-if="partner.job || partner.specialty" class="spec__job">
        {{ [partner.job, partner.specialty].filter(Boolean).join(' · ') }}
      </p>

      <dl class="spec__lines">
        <div v-if="categoryLabel">
          <dt>Catégorie</dt>
          <dd>{{ categoryLabel }}</dd>
        </div>
        <div v-if="partner.location">
          <dt>Habitat</dt>
          <dd>{{ partner.location }}</dd>
        </div>
      </dl>

      <p v-if="partner.description" class="spec__desc">{{ partner.description }}</p>

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
  background: var(--surface);
  border: 1px solid var(--line);
  border-left: 4px solid var(--accent);
  font-size: 14px;
  color: var(--body);
}
.spec__head {
  display: flex;
  justify-content: space-between;
  padding: 12px 18px;
  border-bottom: 1px solid var(--line);
  font-family: var(--label);
  font-weight: 600;
  font-size: 13px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--text);
}
.spec__head span:last-child {
  color: var(--accent-bright);
}
.spec__photo {
  aspect-ratio: 4 / 3;
  background: var(--bg-2);
  border-bottom: 1px solid var(--line);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.spec__photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
}
.spec__placeholder {
  font-family: var(--label);
  font-size: 14px;
  letter-spacing: 2px;
  color: var(--muted);
}
.spec__body {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px 18px 22px;
  flex: 1;
}
.spec__name {
  font-family: var(--display);
  font-weight: 400;
  font-size: 30px;
  line-height: 1;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: var(--text);
}
.spec__job {
  font-family: var(--label);
  font-size: 14px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--accent-bright);
}
.spec__lines {
  margin: 0;
  line-height: 1.7;
}
.spec__lines div {
  display: flex;
  gap: 8px;
}
.spec__lines dt {
  color: var(--muted);
}
.spec__lines dt::after {
  content: ' :';
}
.spec__lines dd {
  margin: 0;
  color: var(--text);
}
.spec__desc {
  line-height: 1.55;
}
.spec__links {
  list-style: none;
  margin: auto 0 0;
  padding: 14px 0 0;
  border-top: 1px solid var(--line);
  display: flex;
  flex-wrap: wrap;
  gap: 8px 16px;
}
.spec__links a {
  font-family: var(--label);
  font-size: 13px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--text);
  border-bottom: 1px solid var(--accent);
  overflow-wrap: anywhere;
}
.spec__links a:hover {
  color: var(--accent-bright);
}

.spec {
  transition:
    translate 0.3s ease,
    box-shadow 0.3s ease,
    border-color 0.3s ease;
}
@media (hover: hover) and (prefers-reduced-motion: no-preference) {
  .spec:hover {
    translate: 0 -6px;
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.45);
  }
}
</style>

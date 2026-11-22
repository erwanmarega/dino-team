<script setup>
import { computed, ref } from 'vue'
import SceneSection from '../components/SceneSection.vue'
import SectionHeading from '../components/SectionHeading.vue'
import SpecimenCard from '../components/SpecimenCard.vue'
import { river as riverImg } from '../assets/scenes'
import { categories, partners } from '../data/partners'

const criteria = [
  { title: 'Sérieux', text: 'Des professionnels fiables, ponctuels et transparents.' },
  { title: 'Compétence', text: 'Un vrai savoir-faire, reconnu dans leur domaine.' },
  { title: 'Passion du métier', text: "Ils aiment ce qu'ils font, et ça se voit." },
  { title: 'Travail de qualité', text: 'Un résultat soigné, sans compromis.' },
]

const selected = ref('all')

const sorted = [...partners].sort((a, b) => String(a.num).localeCompare(String(b.num)))

const labelById = Object.fromEntries(categories.map((c) => [c.id, c.label]))

const filters = computed(() => [
  { id: 'all', label: 'Tous', count: partners.length },
  ...categories.map((c) => ({
    id: c.id,
    label: c.label,
    count: partners.filter((p) => p.category === c.id).length,
  })),
])

const visible = computed(() =>
  selected.value === 'all' ? sorted : sorted.filter((p) => p.category === selected.value),
)

const currentCategory = computed(() => categories.find((c) => c.id === selected.value) || null)
</script>

<template>
  <div>
    <SceneSection
      :image="riverImg"
      alt="Tente éclairée au bord d'une rivière dans la jungle"
      mirror
      class="hero"
    >
      <div class="container hero__inner">
        <div class="hero__content animate-rise">
          <p class="label-mono text-primary">02 — Collaborations · Le campement</p>
          <h1 class="hero__title">Des partenaires <span class="text-primary">de confiance</span></h1>
          <p class="hero__lede">
            DinoTeam ne travaille qu'avec des professionnels sérieux, compétents et passionnés par
            leur métier, qui livrent un travail de qualité. L'objectif : un réseau qui grandit, de
            métiers variés, réunis par une identité commune.
          </p>
          <ul class="criteria" aria-label="Critères de sélection">
            <li v-for="c in criteria" :key="c.title" class="criteria__item glass">
              <span class="criteria__title">{{ c.title }}</span>
              <span class="criteria__text">{{ c.text }}</span>
            </li>
          </ul>
        </div>
      </div>
    </SceneSection>

    <section class="directory">
      <div class="container">
        <SectionHeading kicker="Les partenaires" title="Explorer par métier" />

        <div class="filters" role="group" aria-label="Filtrer par catégorie">
          <button
            v-for="f in filters"
            :key="f.id"
            type="button"
            class="filter label-mono"
            :class="{ 'filter--active': selected === f.id }"
            :aria-pressed="selected === f.id"
            @click="selected = f.id"
          >
            {{ f.label }} <span class="filter__count">{{ f.count }}</span>
          </button>
        </div>

        <p v-if="currentCategory" class="examples text-muted">{{ currentCategory.examples }}</p>

        <p class="label-mono text-muted count" aria-live="polite">
          {{ visible.length }} partenaire{{ visible.length > 1 ? 's' : '' }}
        </p>

        <div v-if="visible.length" class="grid">
          <SpecimenCard
            v-for="p in visible"
            :key="p.num"
            :partner="p"
            :category-label="labelById[p.category] || ''"
          />
          <RouterLink to="/faq#contact" class="join">
            <span class="label-mono text-primary">Rejoindre le réseau</span>
            <span class="join__title">Et si c'était toi ?</span>
            <span class="join__text text-muted"
              >Tu es professionnel et tu veux rejoindre le réseau ? Prendre contact.</span
            >
          </RouterLink>
        </div>
        <template v-else>
          <p class="empty text-muted">
            Aucun partenaire répertorié dans cette catégorie pour l'instant.
          </p>
          <RouterLink to="/faq#contact" class="btn btn--leaf btn--xl">Prendre contact</RouterLink>
        </template>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero {
  min-height: 92svh;
}
.hero__inner {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 92svh;
  padding-top: 7rem;
  padding-bottom: 4rem;
}
.hero__content {
  max-width: 42rem;
}
.hero__title {
  margin-top: 1.25rem;
  font-size: clamp(2.75rem, 13vw, 6rem);
  font-weight: 900;
  line-height: 1;
  overflow-wrap: break-word;
}
.hero__lede {
  margin-top: 1.5rem;
  max-width: 34rem;
  font-size: 1.0625rem;
  color: color-mix(in oklab, var(--foreground) 90%, transparent);
}
.criteria {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.5rem;
  margin: 2rem 0 0;
  padding: 0;
  list-style: none;
}
.criteria__item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.75rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
}
.criteria__title {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--primary);
}
.criteria__text {
  font-size: 0.75rem;
  color: var(--muted-foreground);
}

.directory {
  padding: 5rem 0;
  background: var(--background);
}
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 2rem;
}
.filter {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 44px;
  padding: 0.5rem 1rem;
  background: transparent;
  border: 1px solid var(--border);
  border-radius: 999px;
  color: var(--muted-foreground);
  cursor: pointer;
  transition:
    background-color 0.2s,
    border-color 0.2s,
    color 0.2s;
}
.filter:hover {
  border-color: color-mix(in oklab, var(--primary) 60%, transparent);
  color: var(--foreground);
}
.filter--active,
.filter--active:hover {
  background: var(--primary);
  border-color: var(--primary);
  color: var(--primary-foreground);
}
.filter__count {
  opacity: 0.75;
}
.examples {
  margin-top: 1rem;
  font-size: 0.875rem;
}
.count {
  margin-top: 1.5rem;
}
.grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 1rem;
  margin-top: 1rem;
}
.empty {
  margin: 1rem 0 1.5rem;
  padding: 3rem 1.5rem;
  border: 1px dashed var(--border);
  border-radius: var(--radius);
  text-align: center;
}
.join {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  min-height: 16rem;
  padding: 1.5rem;
  border: 1px dashed color-mix(in oklab, var(--primary) 50%, transparent);
  border-radius: var(--radius);
  text-align: center;
  transition: background-color 0.2s;
}
.join:hover {
  background: var(--color-accent);
}
.join__title {
  font-family: var(--font-display);
  font-size: 1.875rem;
  font-weight: 700;
  text-transform: uppercase;
}
.join__text {
  font-size: 0.875rem;
}

@media (min-width: 640px) {
  .criteria {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
  .grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>

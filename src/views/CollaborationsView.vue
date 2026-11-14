<script setup>
import { computed, ref } from 'vue'
import SpecimenCard from '../components/SpecimenCard.vue'
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
  <section class="collab">
    <div class="w collab__inner">
      <header class="collab__intro">
        <p v-reveal class="label label--accent">02 — Collaborations</p>
        <h1 v-reveal="100" class="section-title">
          Des partenaires<br /><em class="brush">de confiance</em>
        </h1>
        <p v-reveal="200" class="lede">
          DinoTeam ne travaille qu'avec des professionnels sérieux, compétents et passionnés par
          leur métier, qui livrent un travail de qualité. L'objectif : un réseau qui grandit, de
          métiers variés, réunis par une identité commune.
        </p>
      </header>

      <ul v-reveal="250" class="criteria" aria-label="Critères de sélection">
        <li v-for="c in criteria" :key="c.title" class="criteria__item">
          <span class="criteria__title">{{ c.title }}</span>
          <span class="criteria__text">{{ c.text }}</span>
        </li>
      </ul>

      <div class="directory">
        <div class="filters" role="group" aria-label="Filtrer par catégorie">
          <button
            v-for="f in filters"
            :key="f.id"
            type="button"
            class="filter"
            :class="{ 'filter--active': selected === f.id }"
            :aria-pressed="selected === f.id"
            @click="selected = f.id"
          >
            {{ f.label }} <span class="filter__count">{{ f.count }}</span>
          </button>
        </div>

        <p v-if="currentCategory" class="examples">{{ currentCategory.examples }}</p>

        <p class="label count" aria-live="polite">
          {{ visible.length }} spécimen{{ visible.length > 1 ? 's' : '' }}
        </p>

        <div v-if="visible.length" class="grid">
          <SpecimenCard
            v-for="p in visible"
            :key="p.num"
            :partner="p"
            :category-label="labelById[p.category] || ''"
          />
        </div>
        <p v-else class="empty">Aucun spécimen répertorié dans cette catégorie pour l'instant.</p>
      </div>

      <div v-reveal class="join">
        <p class="join__text">Tu es professionnel et tu veux rejoindre le réseau ?</p>
        <RouterLink to="/faq#contact" class="btn btn--accent">Prendre contact</RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.collab {
  padding: 96px 0 120px;
}
.collab__inner {
  display: flex;
  flex-direction: column;
  gap: 48px;
}
.collab__intro {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
}
.lede {
  max-width: 640px;
}

.criteria {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 16px;
}
.criteria__item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 4px 0 4px 16px;
  border-left: 3px solid var(--accent);
}
.criteria__title {
  font-family: var(--label);
  font-weight: 600;
  font-size: 15px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--text);
}
.criteria__text {
  font-size: 14px;
  color: var(--body);
}

.directory {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.filter {
  min-height: 44px;
  padding: 8px 18px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: transparent;
  border: 1px solid var(--line);
  color: var(--body);
  font-family: var(--label);
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  cursor: pointer;
  transition:
    background-color 0.2s,
    border-color 0.2s,
    color 0.2s;
}
.filter:hover {
  border-color: var(--accent);
  color: var(--text);
}
.filter--active,
.filter--active:hover {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
}
.filter__count {
  font-size: 12px;
  opacity: 0.75;
}
.examples {
  color: var(--muted);
  font-size: 14px;
}
.count {
  margin-top: 8px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}
.empty {
  padding: 48px 24px;
  border: 1px dashed var(--line);
  text-align: center;
  color: var(--muted);
}

.join {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 28px 32px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-left: 4px solid var(--accent);
}
.join__text {
  font-family: var(--display);
  font-size: 32px;
  line-height: 1.05;
  text-transform: uppercase;
}

@media (max-width: 1000px) {
  .grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (max-width: 640px) {
  .collab {
    padding: 64px 0 80px;
  }
  .grid {
    grid-template-columns: minmax(0, 1fr);
  }
  .join {
    padding: 24px 20px;
  }
  .join__text {
    font-size: 26px;
  }
}
</style>

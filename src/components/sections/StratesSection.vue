<script setup>
import LifterFigure from '../LifterFigure.vue'

// Du plus avancé (en haut) au débutant (en bas), comme des couches géologiques :
// le rouge s'intensifie à mesure qu'on monte.
// offer : la fiche coaching conseillée pour ce niveau (#fiche-01, 02, 03).
const strates = [
  {
    era: 'Ère IV',
    title: 'Performance',
    text: 'Objectifs précis, cycles de force, préparation à une échéance.',
    level: 'Confirmé',
    bg: 'var(--red)',
    figure: 4,
    offer: { num: '03', label: 'Pack évolution' },
  },
  {
    era: 'Ère III',
    title: 'Progression',
    text: 'Programmes structurés, charges qui montent, on casse les plateaux.',
    level: 'Intermédiaire',
    bg: '#a3161b',
    figure: 3,
    offer: { num: '03', label: 'Pack évolution' },
  },
  {
    era: 'Ère II',
    title: 'Fondations',
    text: 'Les mouvements de base maîtrisés : squat, soulevé, développé, tirage.',
    level: 'Débutant +',
    bg: '#5c1013',
    figure: 2,
    offer: { num: '02', label: 'En salle' },
  },
  {
    era: 'Ère I',
    title: 'Reprise',
    text: 'Retrouver le goût de bouger, poser des habitudes, apprendre les bons gestes.',
    level: 'Débutant',
    bg: '#2a1213',
    figure: 1,
    offer: { num: '01', label: 'À domicile' },
    last: true,
  },
]
</script>

<template>
  <section id="strates" class="strates">
    <div v-reveal class="w strates__heading">
      <p class="label label--red">02 — Évolution</p>
      <h2 class="section-title">
        Chaque niveau est une strate.<br /><em
          v-reveal="{ variant: 'wipe', delay: 350 }"
          class="brush"
          >On creuse, on construit, on monte.</em
        >
      </h2>
    </div>

    <div class="layers">
      <div
        v-for="s in strates"
        :key="s.era"
        class="layer"
        :class="{ 'layer--last': s.last }"
        :style="{ background: s.bg }"
      >
        <div v-reveal="{ variant: 'left' }" class="w layer__grid">
          <LifterFigure :level="s.figure" />
          <span class="layer__era">{{ s.era }}</span>
          <h3 class="layer__title">{{ s.title }}</h3>
          <p class="layer__text">{{ s.text }}</p>
          <div class="layer__side">
            <span class="layer__level">{{ s.level }}</span>
            <a :href="`#fiche-${s.offer.num}`" class="layer__offer">
              {{ s.offer.label }} <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.strates {
  background: var(--bg);
  color: var(--text);
  padding-top: 104px;
}
.strates__heading {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding-bottom: 56px;
}

.layers {
  display: flex;
  flex-direction: column;
}
.layer {
  position: relative;
  padding: 16px 0;
  color: #fff;
}
.layer--last {
  padding-bottom: 24px;
}
.layer__grid {
  display: grid;
  grid-template-columns: 120px 110px 1fr 1fr 150px;
  gap: 24px;
  align-items: center;
}
.layer__era,
.layer__level {
  font-family: var(--label);
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 2px;
  text-transform: uppercase;
}
.layer__title {
  font-family: var(--display);
  font-weight: 400;
  font-size: 52px;
  line-height: 1;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}
.layer__text {
  color: rgba(255, 255, 255, 0.86);
}
.layer__side {
  justify-self: end;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
}
.layer__level {
  color: rgba(255, 255, 255, 0.86);
}
.layer__offer {
  padding: 6px 12px;
  border: 2px solid #fff;
  font-family: var(--label);
  font-weight: 600;
  font-size: 13px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  white-space: nowrap;
  color: #fff;
  transition:
    background-color 0.2s,
    color 0.2s;
}
.layer__offer:hover {
  background: #fff;
  color: var(--bg);
}

@media (max-width: 820px) {
  .layer__grid {
    grid-template-columns: 1fr;
    gap: 8px;
  }
  .layer__side {
    justify-self: start;
    align-items: flex-start;
  }
}
</style>

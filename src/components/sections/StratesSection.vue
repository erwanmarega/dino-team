<script setup>
import LifterFigure from '../LifterFigure.vue'

// Du plus avancé (en haut) au débutant (en bas), comme des couches géologiques :
// le rouge s'intensifie à mesure qu'on monte.
const strates = [
  {
    era: 'Ère IV',
    title: 'Performance',
    text: 'Objectifs précis, cycles de force, préparation à une échéance.',
    level: 'Confirmé',
    bg: 'var(--red)',
    figure: 4,
  },
  {
    era: 'Ère III',
    title: 'Progression',
    text: 'Programmes structurés, charges qui montent, on casse les plateaux.',
    level: 'Intermédiaire',
    bg: '#a3161b',
    figure: 3,
  },
  {
    era: 'Ère II',
    title: 'Fondations',
    text: 'Les mouvements de base maîtrisés : squat, soulevé, développé, tirage.',
    level: 'Débutant +',
    bg: '#5c1013',
    figure: 2,
  },
  {
    era: 'Ère I',
    title: 'Reprise',
    text: 'Retrouver le goût de bouger, poser des habitudes, apprendre les bons gestes.',
    level: 'Débutant',
    bg: '#2a1213',
    figure: 1,
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
          <span class="layer__level">{{ s.level }}</span>
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
.layer__level {
  justify-self: end;
  color: rgba(255, 255, 255, 0.86);
}

@media (max-width: 820px) {
  .layer__grid {
    grid-template-columns: 1fr;
    gap: 8px;
  }
  .layer__level {
    justify-self: start;
  }
}
</style>

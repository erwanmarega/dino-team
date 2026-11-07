<script setup>
import { ref } from 'vue'
import { useThreeScene } from '../../three/useThreeScene'
import { buildSalle } from '../../three/scenes'

const features = [
  ['A', 'Rack, barre olympique & disques'],
  ['B', 'Haltères & kettlebells'],
  ['C', 'Séances 100 % privatisées'],
  ['D', "Pas d'attente, pas de foule"],
]

const canvas = ref(null)
useThreeScene(canvas, buildSalle, { shadows: true })
</script>

<template>
  <section id="habitat" class="habitat">
    <div class="w habitat__grid">
      <div class="habitat__copy">
        <p class="label label--red">03 — Habitat · Bientôt</p>
        <h2 class="section-title">Le futur habitat<br /><em class="brush">de la team</em></h2>
        <p class="habitat__text">
          Une salle privée entièrement équipée, réservée aux membres. Tu arrives, elle est à toi le
          temps de ta séance.
        </p>
        <ol class="features">
          <li v-for="[letter, label] in features" :key="letter">
            <span class="features__letter">{{ letter }}</span>{{ label }}
          </li>
        </ol>
        <a href="#contact" class="btn btn--outline-red">Être prévenu de l'ouverture</a>
      </div>

      <div class="salle">
        <canvas
          ref="canvas"
          class="salle__canvas"
          role="img"
          aria-label="Vue 3D du projet de salle privée : rack, barre, banc, haltères et kettlebells"
        ></canvas>
        <span class="salle__tag">Plan 3D — Projet</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.habitat {
  padding: 104px 0;
  background: var(--bg);
  border-top: 1px solid var(--line);
}
.habitat__grid {
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
  gap: 56px;
  align-items: center;
}
.habitat__copy {
  display: flex;
  flex-direction: column;
  gap: 22px;
}
.habitat__text {
  color: var(--body);
  font-size: 17px;
}
.features {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  font-family: var(--label);
  font-size: 16px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}
.features li {
  display: flex;
  gap: 16px;
  padding: 12px 0;
  border-top: 1px solid var(--line);
}
.features li:last-child {
  border-bottom: 1px solid var(--line);
}
.features__letter {
  color: var(--red-bright);
  font-weight: 600;
}

.salle {
  position: relative;
  height: 560px;
  background: var(--surface);
  border: 1px solid var(--line);
}
.salle__canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
}
.salle__tag {
  position: absolute;
  left: 16px;
  top: 16px;
  font-family: var(--label);
  font-size: 12px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--muted);
}

@media (max-width: 820px) {
  .habitat__grid {
    grid-template-columns: 1fr;
  }
  .salle {
    height: 420px;
  }
}
</style>

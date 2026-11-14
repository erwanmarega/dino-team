<script setup>
import { site } from '../../config/site'
import JungleVines from '../JungleVines.vue'
import portrait from '../../assets/coach/enzo-portrait.webp'

const firstName = site.coachFirstName

const credentials = [
  ['Diplôme', '[DIPLÔME — ex. BPJEPS AF]'],
  ['Carte professionnelle', '[N° CARTE PRO]'],
  ['Expérience', '[X] ans de coaching'],
]

// Brand presentation (client brief: history, values, vision, goals). Kept short.
const brand = [
  ['Histoire', '[Comment DinoTeam est née, en 1–2 phrases.]'],
  ['Valeurs', '[3 mots — ex. exigence, bienveillance, humour.]'],
  [
    'Vision',
    "S'entraîner sérieusement sans se prendre trop au sérieux. Les dinosaures n'ont pas su s'adapter. Toi, si.",
  ],
  ['Objectifs', '[Où va DinoTeam : coaching, boutique, réseau de pros…]'],
]
</script>

<template>
  <section id="apropos" class="about">
    <div class="w about__grid">
      <figure v-reveal="{ variant: 'left' }" class="portrait">
        <img
          :src="portrait"
          :alt="`Portrait souriant de ${firstName}, coach DinoTeam`"
          class="portrait__img"
          width="1400"
          height="1050"
          loading="lazy"
        />
        <JungleVines variant="corner" :seed="12" side="right" lean="mixed" :reach="44" :strands="0" class="portrait__vine" />
      </figure>
      <div v-reveal="{ variant: 'right', delay: 150 }" class="about__copy">
        <p class="label label--accent">À propos</p>
        <h2 class="section-title">Moi c'est {{ firstName }}.</h2>
        <p class="about__text">
          [Ton parcours en 2–3 phrases : comment tu es venu au sport, ta formation, ce qui t'a donné
          envie de coacher.]
        </p>
        <dl class="creds">
          <div v-for="[term, value] in credentials" :key="term" class="creds__item">
            <dt>{{ term }}</dt>
            <dd>{{ value }}</dd>
          </div>
        </dl>
      </div>
    </div>

    <div v-reveal class="w brand">
      <h3 class="brand__title">L'ADN DinoTeam</h3>
      <dl class="brand__list">
        <div v-for="[term, value] in brand" :key="term" class="brand__item">
          <dt>{{ term }}</dt>
          <dd>{{ value }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<style scoped>
.about {
  padding: 56px 0 64px;
  background: var(--veil);
  border-top: 1px solid var(--line);
}
.about__grid {
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 40px;
  align-items: center;
}
.portrait {
  position: relative;
  margin: 0;
  border: 1px solid var(--line);
  border-bottom: 4px solid var(--accent);
}
.portrait__vine {
  top: -16px;
  right: -26px;
}
.portrait__img {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  object-position: 50% 35%;
}
.about__copy {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.about__text {
  font-size: 17px;
  color: var(--body);
}
.creds {
  margin: 8px 0 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}
.creds__item {
  padding: 12px 14px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-top: 3px solid var(--accent);
}
.creds dt {
  font-family: var(--label);
  font-size: 12px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--muted);
}
.creds dd {
  margin: 4px 0 0;
  font-size: 14px;
  font-weight: 500;
}

.brand {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.brand__title {
  font-family: var(--label);
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--accent-bright);
}
.brand__list {
  margin: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-top: 1px solid var(--line);
}
.brand__item {
  padding: 14px 20px 0 0;
}
.brand__item + .brand__item {
  padding-left: 20px;
  border-left: 1px solid var(--line);
}
.brand dt {
  font-family: var(--display);
  font-size: 22px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}
.brand dd {
  margin: 4px 0 0;
  font-size: 14px;
  color: var(--body);
}

@media (max-width: 820px) {
  .about__grid {
    grid-template-columns: 1fr;
  }
  .creds {
    grid-template-columns: 1fr;
  }
  .brand__list {
    grid-template-columns: 1fr 1fr;
    row-gap: 16px;
  }
  .brand__item:nth-child(odd) {
    padding-left: 0;
    border-left: 0;
  }
}
</style>

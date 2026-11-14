<script setup>
import { site } from '../../config/site'
import portrait from '../../assets/coach/enzo-portrait.jpg'

const firstName = site.coachFirstName

const credentials = [
  ['Diplôme', '[DIPLÔME — ex. BPJEPS AF]'],
  ['Carte professionnelle', '[N° CARTE PRO]'],
  ['Expérience', '[X] ans de coaching'],
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
      </figure>
      <div v-reveal="{ variant: 'right', delay: 150 }" class="about__copy">
        <p class="label label--accent">À propos</p>
        <h2 class="section-title">Moi c'est {{ firstName }}.</h2>
        <p class="about__text">
          [Ton parcours en 2–3 phrases : comment tu es venu au sport, ta formation, ce qui t'a donné
          envie de coacher.]
        </p>
        <p class="about__text">
          DinoTeam, c'est l'idée qu'on peut s'entraîner sérieusement sans se prendre trop au
          sérieux. Les dinosaures n'ont pas su s'adapter. Toi, si.
        </p>
        <dl class="creds">
          <div v-for="[term, value] in credentials" :key="term" class="creds__item">
            <dt>{{ term }}</dt>
            <dd>{{ value }}</dd>
          </div>
        </dl>
      </div>
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
  margin: 0;
  border: 1px solid var(--line);
  border-bottom: 4px solid var(--accent);
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

@media (max-width: 820px) {
  .about__grid {
    grid-template-columns: 1fr;
  }
  .creds {
    grid-template-columns: 1fr;
  }
}
</style>

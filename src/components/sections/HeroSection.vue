<script setup>
import BrushSlashes from '../BrushSlashes.vue'
import BookingLink from '../BookingLink.vue'

import { site } from '../../config/site'
import coachPhoto from '../../assets/coach/enzo-hero.jpg'

const firstName = site.coachFirstName
const fullName = [site.coachFirstName, site.coachLastName].filter(Boolean).join(' ')
</script>

<template>
  <section id="top" class="hero">
    <BrushSlashes corner="top-left" class="hero__slashes" />
    <div class="w hero__grid">
      <div class="hero__copy">
        <p v-reveal class="label label--accent">Spécimen n°001 — {{ firstName }}, coach sportif</p>
        <div class="hero__titles">
          <h1 v-reveal="{ variant: 'slam', delay: 100 }" class="hero__title">Évolue.</h1>
          <p v-reveal="{ variant: 'fade', delay: 450 }" class="hero__sub brush-text">
            à ton rythme.
          </p>
        </div>
        <p v-reveal="550" class="hero__text">
          Coaching personnalisé à domicile et en salle. Du premier squat aux charges lourdes, on
          fait évoluer ton entraînement étape par étape, avec méthode et un peu d'humour.
        </p>
        <div v-reveal="650" class="hero__actions">
          <BookingLink class="btn btn--accent">Réserver mon bilan</BookingLink>
          <BookingLink kind="discovery" class="btn btn--outline">
            Réserver ma séance découverte
          </BookingLink>
        </div>
      </div>

      <figure v-reveal="{ variant: 'right', delay: 200 }" class="photo">
        <img
          :src="coachPhoto"
          :alt="`${firstName}, coach sportif DinoTeam, bras fléchis`"
          class="photo__img"
          width="1050"
          height="1400"
          fetchpriority="high"
        />
        <BrushSlashes corner="top-right" />
        <figcaption v-reveal="800" class="specimen">
          <div class="specimen__head"><span>Spécimen 001</span><span>DT-0001</span></div>
          <div>Nom : {{ fullName }}</div>
          <div>Espèce : coach sportif</div>
          <div>Habitat : domicile, salle</div>
          <div>Statut : <span class="specimen__status">en pleine évolution</span></div>
        </figcaption>
      </figure>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  padding: 56px 0 56px;
  overflow: hidden;
}
.hero__slashes {
  opacity: 0.5;
}
.hero__grid {
  position: relative;
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 56px;
  align-items: stretch;
}
.hero__copy {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 28px;
}
.hero__titles {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.hero__title {
  font-family: var(--display);
  font-weight: 400;
  font-size: clamp(112px, 16vw, 230px);
  line-height: 0.82;
  letter-spacing: 1px;
  text-transform: uppercase;
}
.hero__sub {
  font-size: clamp(30px, 3.8vw, 52px);
  line-height: 1.1;
  transform: rotate(-3deg);
  transform-origin: left center;
}
.hero__text {
  font-size: 18px;
  max-width: 500px;
  color: var(--body);
}
.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}

.photo {
  position: relative;
  min-height: 560px;
  margin: 0;
  background: var(--surface);
  border: 1px solid var(--line);
  overflow: hidden;
}
.photo__img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 20%;
}
.photo__placeholder {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--label);
  font-size: 14px;
  letter-spacing: 2px;
  color: var(--muted);
}
.specimen {
  position: absolute;
  left: 20px;
  bottom: 20px;
  width: 280px;
  background: var(--bg);
  border: 2px solid var(--accent);
  padding: 16px 18px;
  font-size: 13px;
  line-height: 1.7;
  color: var(--body);
}
.specimen__head {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--line);
  padding-bottom: 8px;
  margin-bottom: 8px;
  font-family: var(--label);
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--text);
}
.specimen__status {
  color: var(--accent-bright);
  font-weight: 600;
}

@media (max-width: 820px) {
  .hero__grid {
    grid-template-columns: 1fr;
  }
  .photo {
    min-height: 480px;
  }
}
</style>

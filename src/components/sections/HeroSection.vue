<script setup>
import BrushSlashes from '../BrushSlashes.vue'

// Photo du coach : dépose le fichier dans src/assets/ puis remplace null par l’import, ex.
// import coachPhoto from "../../assets/coach.jpg"
const coachPhoto = null
</script>

<template>
  <section id="top" class="hero">
    <BrushSlashes corner="top-left" class="hero__slashes" />
    <div class="w hero__grid">
      <div class="hero__copy">
        <p class="label label--red">Spécimen n°001 — [PRÉNOM], coach sportif</p>
        <div class="hero__titles">
          <h1 class="hero__title">Évolue.</h1>
          <p class="hero__sub brush-text">ou reste un fossile.</p>
        </div>
        <p class="hero__text">
          Coaching personnalisé à domicile et en salle. Du premier squat aux charges lourdes, on
          fait évoluer ton entraînement étape par étape, avec méthode et un peu d'humour.
        </p>
        <div class="hero__actions">
          <a href="#contact" class="btn btn--red">Réserver une séance découverte</a>
          <a href="#strates" class="btn btn--outline">Trouver mon niveau</a>
        </div>
      </div>

      <figure class="photo">
        <img
          v-if="coachPhoto"
          :src="coachPhoto"
          alt="[PRÉNOM], coach sportif DinoTeam"
          class="photo__img"
        />
        <div v-else class="photo__placeholder">[PHOTO DU COACH]</div>
        <BrushSlashes corner="top-right" />
        <figcaption class="specimen">
          <div class="specimen__head"><span>Spécimen 001</span><span>DT-0001</span></div>
          <div>Nom : [PRÉNOM NOM]</div>
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
  padding: 72px 0 96px;
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
  gap: 40px;
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
  min-height: 600px;
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
  object-position: center top;
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
  border: 2px solid var(--red);
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
  color: var(--red-bright);
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

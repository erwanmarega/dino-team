<script setup>
import { ref } from 'vue'
import CharacterScene from '../CharacterScene.vue'

const items = [
  { num: '01', name: 'Sweat DinoTeam', photo: '[PHOTO SWEAT]' },
  { num: '02', name: 'Jogging DinoTeam', photo: '[PHOTO JOGGING]' },
  { num: '03', name: 'Tapis de sol', photo: '[PHOTO TAPIS]' },
]

const email = ref('')
const submitted = ref(false)

function onSubmit() {
  // TODO: brancher sur le service d'emailing.
  submitted.value = true
}
</script>

<template>
  <section id="collection" class="collection">
    <div class="w collection__inner">
      <div class="g2">
        <div class="collection__heading">
          <p class="label collection__label">05 — Collection · Bientôt</p>
          <h2 class="section-title">Pièces de collection</h2>
        </div>
        <div class="intro">
          <p class="lede collection__lede">
            Sweats, joggings et tapis aux couleurs de la team. Sobres, solides, faits pour durer.
          </p>
          <CharacterScene name="flex" />
        </div>
      </div>

      <div class="items">
        <article v-for="item in items" :key="item.num" class="item">
          <div class="item__photo">{{ item.photo }}</div>
          <div class="item__label">
            <span>Objet {{ item.num }} — {{ item.name }}</span><span>[PRIX] €</span>
          </div>
        </article>
      </div>

      <form class="signup" @submit.prevent="onSubmit">
        <label class="signup__label">
          Être prévenu du lancement
          <input
            v-model="email"
            type="email"
            required
            placeholder="ton@email.fr"
            class="signup__input"
          />
        </label>
        <button type="submit" class="signup__btn">M'inscrire</button>
        <p v-if="submitted" class="signup__ok" role="status">
          Merci, tu seras prévenu du lancement.
        </p>
      </form>
    </div>
  </section>
</template>

<style scoped>
.collection {
  padding: 104px 0;
  background: var(--red);
  color: #fff;
}
.collection__inner {
  display: flex;
  flex-direction: column;
  gap: 48px;
}
.collection__heading {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.collection__label {
  color: #fff;
}
.collection__lede {
  color: #fff;
  max-width: 300px;
  flex: 1 1 220px;
}
.intro {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 24px;
}

.items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
}
.item {
  display: flex;
  flex-direction: column;
  background: var(--bg);
}
.item__photo {
  height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--label);
  font-size: 13px;
  letter-spacing: 2px;
  color: var(--muted);
}
.item__label {
  border-top: 3px solid var(--red-deep);
  padding: 14px 16px;
  font-family: var(--label);
  font-size: 14px;
  letter-spacing: 1px;
  text-transform: uppercase;
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.signup {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.4);
  padding-top: 32px;
}
.signup__label {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1 1 280px;
  font-family: var(--label);
  font-size: 14px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}
.signup__input {
  height: 52px;
  padding: 0 16px;
  border: 2px solid #fff;
  background: transparent;
  color: #fff;
  font-size: 16px;
  font-family: var(--sans);
  border-radius: 0;
}
.signup__input::placeholder {
  color: rgba(255, 255, 255, 0.75);
}
.signup__input:focus-visible {
  outline-color: #fff;
}
.signup__btn {
  height: 52px;
  padding: 0 32px;
  background: var(--bg);
  color: #fff;
  border: 0;
  font-family: var(--label);
  font-weight: 600;
  font-size: 16px;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
}
.signup__btn:hover {
  background: #fff;
  color: var(--bg);
}
.signup__btn:focus-visible {
  outline-color: #fff;
}
.signup__ok {
  flex-basis: 100%;
  font-size: 14px;
}
</style>

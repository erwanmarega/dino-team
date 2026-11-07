<script setup>
import CharacterScene from '../CharacterScene.vue'

const fiches = [
  {
    num: '01',
    kind: 'À domicile',
    scene: 'pushup',
    title: 'Le coach vient à toi',
    text: 'Matériel fourni, zéro trajet. Parfait pour reprendre ou s’entraîner entre deux obligations.',
    details: [
      ['Format', 'Solo ou duo'],
      ['Zone', '[VILLE / SECTEUR]'],
      ['Tarif', 'dès [TARIF] €'],
    ],
  },
  {
    num: '02',
    kind: 'En salle',
    scene: 'curl',
    title: 'Technique & charges',
    text: 'Tout l’équipement d’une salle pour apprendre les mouvements clés et progresser en sécurité.',
    details: [
      ['Format', 'Individuel'],
      ['Lieu', '[NOM DE LA SALLE]'],
      ['Tarif', 'dès [TARIF] €'],
    ],
    featured: true,
  },
  {
    num: '03',
    kind: 'Suivi',
    scene: 'chart',
    title: 'Le pack évolution',
    text: 'Plusieurs séances par mois et des conseils entre les séances pour mesurer ta progression.',
    details: [
      ['Rythme', '[NOMBRE] séances / mois'],
      ['Inclus', 'Bilan + suivi'],
      ['Tarif', '[TARIF] € / mois'],
    ],
  },
]
</script>

<template>
  <section id="fiches" class="coaching">
    <div class="w coaching__inner">
      <div class="g2">
        <div v-reveal class="coaching__heading">
          <p class="label label--red">01 — Coaching</p>
          <h2 class="section-title">
            Trois façons de<br /><em v-reveal="{ variant: 'wipe', delay: 350 }" class="brush"
              >s'entraîner ensemble</em
            >
          </h2>
        </div>
        <p v-reveal="150" class="lede">
          Chaque accompagnement commence par un bilan : ton niveau, ton objectif, ton temps
          disponible. Ensuite on construit, séance après séance.
        </p>
      </div>

      <div class="fiches">
        <article
          v-for="(fiche, i) in fiches"
          v-reveal="i * 140"
          :key="fiche.num"
          :id="`fiche-${fiche.num}`"
          class="fiche"
          :class="{ 'fiche--featured': fiche.featured }"
        >
          <div class="fiche__meta">
            <span class="fiche__num">Fiche n°{{ fiche.num }}</span>
            <span class="fiche__kind">{{ fiche.kind }}</span>
          </div>
          <div class="fiche__scene">
            <CharacterScene :name="fiche.scene" />
          </div>
          <h3 class="fiche__title">{{ fiche.title }}</h3>
          <p class="fiche__text">{{ fiche.text }}</p>
          <dl class="fiche__details">
            <template v-for="[term, value] in fiche.details" :key="term">
              <dt>{{ term }}</dt>
              <dd>{{ value }}</dd>
            </template>
          </dl>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.coaching {
  padding: 104px 0;
  background: var(--bg-2);
  border-top: 1px solid var(--line);
}
.coaching__inner {
  display: flex;
  flex-direction: column;
  gap: 56px;
}
.coaching__heading {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.fiches {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}
.fiche {
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-top: 4px solid var(--line);
}
.fiche--featured {
  border-color: var(--red);
}
.fiche {
  scroll-margin-top: 100px;
}
/* Fiche ciblée depuis une strate (#fiche-01…) */
.fiche:target {
  border-top-color: var(--red);
  animation: fiche-ping 1.4s ease-out;
}
@keyframes fiche-ping {
  0%,
  30% {
    box-shadow: 0 0 0 3px var(--red-bright);
  }
  100% {
    box-shadow: 0 0 0 3px transparent;
  }
}
@media (prefers-reduced-motion: reduce) {
  .fiche:target {
    animation: none;
    box-shadow: 0 0 0 3px var(--red-bright);
  }
}
.fiche__meta {
  display: flex;
  justify-content: space-between;
  font-family: var(--label);
  font-weight: 500;
  font-size: 13px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}
.fiche__num {
  color: var(--red-bright);
}
.fiche__kind {
  color: var(--muted);
}
.fiche__scene {
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}
.fiche__title {
  font-family: var(--display);
  font-weight: 400;
  font-size: 40px;
  line-height: 1;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}
.fiche__text {
  color: var(--body);
}
.fiche__details {
  margin: auto 0 0;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 8px 16px;
  font-size: 14px;
  border-top: 1px solid var(--line);
  padding-top: 16px;
}
.fiche__details dt {
  font-family: var(--label);
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--muted);
}
.fiche__details dd {
  margin: 0;
  font-weight: 500;
}
</style>

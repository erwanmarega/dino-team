<template>
  <section id="temoignages" class="fouilles">
    <div class="w fouilles__inner">
      <div class="g2">
        <div v-reveal class="fouilles__heading">
          <p class="label label--red">Registre des fouilles — Témoignages</p>
          <h2 class="section-title">
            Spécimens<br /><em v-reveal="{ variant: 'wipe', delay: 350 }" class="brush"
              >en pleine évolution</em
            >
          </h2>
        </div>
        <p v-reveal="150" class="lede">
          Ils sont arrivés en Ère I ou coincés sur un plateau. Voilà où ils en sont aujourd'hui,
          racontés par eux.
        </p>
      </div>

      <div class="cards">
        <figure
          v-for="(t, i) in temoignages"
          :key="t.num"
          v-reveal="i * 140"
          class="card"
        >
          <div class="card__meta">
            <span class="card__num">Fouille n°{{ t.num }}</span>
            <span class="card__duree">{{ t.duree }}</span>
          </div>

          <div class="card__strates" :aria-label="`Passé de ${t.avant} à ${t.apres}`">
            <span class="strate strate--avant">{{ t.avant }}</span>
            <span class="card__arrow" aria-hidden="true">→</span>
            <span class="strate strate--apres">{{ t.apres }}</span>
          </div>

          <blockquote class="card__quote">
            <p>{{ t.citation }}</p>
          </blockquote>

          <figcaption class="card__who">
            <span class="card__name">{{ t.nom }}</span>
            <span class="card__offre">{{ t.offre }}</span>
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>

<script setup>
// À remplacer par de vrais retours clients (avec leur accord).
// avant / apres : reprendre les noms des strates (Reprise, Fondations, Progression, Performance).
const temoignages = [
  {
    num: '01',
    duree: '[DURÉE] de suivi',
    avant: 'Ère I · Reprise',
    apres: 'Ère II · Fondations',
    citation:
      '[Témoignage : où en était la personne au départ, ce qui a changé, ce qu’elle a aimé dans le coaching.]',
    nom: '[PRÉNOM], [ÂGE] ans',
    offre: 'À domicile',
  },
  {
    num: '02',
    duree: '[DURÉE] de suivi',
    avant: 'Ère II · Fondations',
    apres: 'Ère III · Progression',
    citation:
      '[Témoignage : un résultat concret (première traction, charge au squat, douleurs disparues…).]',
    nom: '[PRÉNOM], [ÂGE] ans',
    offre: 'En salle',
  },
  {
    num: '03',
    duree: '[DURÉE] de suivi',
    avant: 'Ère III · Progression',
    apres: 'Ère IV · Performance',
    citation:
      '[Témoignage : l’objectif atteint (compétition, trail, échéance…) et le rôle du suivi.]',
    nom: '[PRÉNOM], [ÂGE] ans',
    offre: 'Pack évolution',
  },
]
</script>

<style scoped>
.fouilles {
  padding: 104px 0;
  background: var(--bg-2);
  border-top: 1px solid var(--line);
}
.fouilles__inner {
  display: flex;
  flex-direction: column;
  gap: 56px;
}
.fouilles__heading {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}
.card {
  margin: 0;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 22px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-left: 4px solid var(--red);
}
.card__meta {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  font-family: var(--label);
  font-weight: 500;
  font-size: 13px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}
.card__num {
  color: var(--red-bright);
}
.card__duree {
  color: var(--muted);
}

.card__strates {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  padding: 14px 0;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}
.strate {
  padding: 6px 10px;
  font-family: var(--label);
  font-weight: 600;
  font-size: 12px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #fff;
}
.strate--avant {
  background: #2a1213;
}
.strate--apres {
  background: var(--red);
}
.card__arrow {
  color: var(--muted);
  font-size: 18px;
}

.card__quote {
  margin: 0;
  position: relative;
  padding-top: 28px;
  font-size: 17px;
  color: var(--text);
}
.card__quote::before {
  content: '“';
  position: absolute;
  top: -14px;
  left: -4px;
  font-family: var(--display);
  font-size: 72px;
  line-height: 1;
  color: var(--red);
}

.card__who {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.card__name {
  font-family: var(--display);
  font-size: 28px;
  line-height: 1;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}
.card__offre {
  font-family: var(--label);
  font-size: 13px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--muted);
}
</style>

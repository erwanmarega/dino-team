<script setup>
import CharacterScene from '../CharacterScene.vue'

const videos = [
  { num: '001', tag: 'Débutant', title: 'Ta première séance en salle : par quoi commencer' },
  { num: '002', tag: 'Technique', title: 'Le squat expliqué simplement' },
  { num: '003', tag: 'Fossiles', title: 'Les mythes de la muscu qui devraient être au musée' },
  { num: '004', tag: 'Intermédiaire', title: 'Pourquoi tu stagnes (et comment repartir)' },
]
</script>

<template>
  <section id="archives" class="archives">
    <div class="w archives__inner">
      <div class="g2">
        <div v-reveal class="archives__heading">
          <p class="label label--red">03 — Archives</p>
          <h2 class="section-title">Notes de terrain</h2>
        </div>
        <div v-reveal="150" class="intro">
          <p class="lede intro__text">
            Des vidéos courtes pour comprendre ton entraînement, casser les idées reçues et en rire
            un peu. Sur Instagram, TikTok et YouTube.
          </p>
          <CharacterScene name="creator" />
        </div>
      </div>

      <div class="rows">
        <a v-for="(v, i) in videos" :key="v.num" v-reveal="i * 100" href="#" class="row">
          <span class="row__thumb" aria-hidden="true">Vidéo</span>
          <span class="row__tag row-x">N°{{ v.num }} · {{ v.tag }}</span>
          <span class="row__title">{{ v.title }}</span>
          <span class="row__network row-x">[RÉSEAU]</span>
          <span class="row__arrow row-x" aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.archives {
  padding: 104px 0;
  background: var(--bg-2);
  border-top: 1px solid var(--line);
}
.archives__inner {
  display: flex;
  flex-direction: column;
  gap: 48px;
}
.archives__heading {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.intro {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 24px;
}
.intro__text {
  max-width: 300px;
  flex: 1 1 220px;
}

.rows {
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--line);
}
.row {
  display: grid;
  grid-template-columns: 64px 160px 1fr 120px 40px;
  gap: 24px;
  align-items: center;
  padding: 18px 0;
  border-bottom: 1px solid var(--line);
}
.row:hover {
  color: inherit;
}
.row:hover .row__title,
.row:hover .row__arrow {
  color: var(--red-bright);
}
.row__thumb {
  width: 64px;
  height: 96px;
  background: var(--surface);
  border: 1px solid var(--line);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--label);
  font-size: 11px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--muted);
  transition:
    transform 0.35s cubic-bezier(0.2, 1.4, 0.4, 1),
    border-color 0.2s,
    color 0.2s;
}
/* Survol : la miniature penche et s'encadre de rouge, le titre glisse */
.row:hover .row__thumb {
  border-color: var(--red);
  color: var(--text);
}
@media (hover: hover) and (prefers-reduced-motion: no-preference) {
  .row__title {
    transition:
      color 0.2s,
      translate 0.3s ease;
  }
  .row:hover .row__thumb {
    transform: rotate(-4deg) scale(1.06);
  }
  .row:hover .row__title {
    translate: 8px 0;
  }
}
.row__tag,
.row__network {
  font-family: var(--label);
  font-size: 13px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}
.row__tag {
  color: var(--red-bright);
}
.row__network {
  color: var(--muted);
}
.row__title {
  font-family: var(--display);
  font-size: 34px;
  line-height: 1;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}
.row__arrow {
  font-size: 22px;
  transition: transform 0.2s;
}
.row:hover .row__arrow {
  transform: translateX(4px);
}

@media (max-width: 820px) {
  .row {
    grid-template-columns: 64px 1fr;
  }
  .row-x {
    display: none;
  }
  .row__title {
    font-size: 28px;
  }
}
</style>

<script setup>
import BrushSlashes from '../BrushSlashes.vue'
import CharacterScene from '../CharacterScene.vue'
import DtLogo from '../DtLogo.vue'
</script>

<template>
  <section id="contact" class="contact">
    <BrushSlashes corner="top-right" class="contact__slashes" />
    <BrushSlashes corner="bottom-left" class="contact__slashes" />
    <div class="w contact__inner">
      <div v-reveal="{ variant: 'left' }">
        <CharacterScene name="walk" />
      </div>
      <h2 v-reveal="{ variant: 'slam', delay: 150 }" class="contact__title">
        Prêt à<br /><em v-reveal="{ variant: 'wipe', delay: 550 }" class="brush">évoluer ?</em>
      </h2>
      <div v-reveal="300" class="contact__actions">
        <a href="#" class="btn btn--red">Réserver ma séance découverte</a>
        <a href="#" class="btn btn--outline">M'écrire sur Instagram</a>
      </div>
      <footer class="footer">
        <div class="footer__brand">
          <DtLogo :size="44" />
          <span>DinoTeam</span>
        </div>
        <span>[EMAIL] · [TÉLÉPHONE] · [VILLE]</span>
        <span>© 2026 · Mentions légales</span>
      </footer>
      <p class="footer__roar">Rejoignez la DinoTeam — <span class="brush-text">Roarrrrr</span></p>
    </div>
  </section>
</template>

<style scoped>
.contact {
  position: relative;
  padding: 120px 0 48px;
  background: var(--bg);
  border-top: 4px solid var(--red);
  overflow: hidden;
}
.contact__slashes {
  opacity: 0.55;
}
.contact__inner {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 32px;
}
.contact__title {
  font-family: var(--display);
  font-weight: 400;
  font-size: clamp(80px, 12vw, 180px);
  line-height: 0.88;
  letter-spacing: 1px;
  text-transform: uppercase;
}
.contact__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}
.footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  border-top: 1px solid var(--line);
  padding-top: 28px;
  margin-top: 56px;
  font-family: var(--label);
  font-size: 14px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--muted);
}
.footer__brand {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: var(--display);
  font-size: 28px;
  letter-spacing: 1.5px;
  color: var(--text);
}
.footer__roar {
  text-align: center;
  font-family: var(--label);
  font-size: 15px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--body);
}
</style>

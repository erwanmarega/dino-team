<script setup>
import DtLogo from './DtLogo.vue'

const links = [
  { href: '#fiches', label: '01 Coaching' },
  { href: '#strates', label: '02 Évolution' },
  { href: '#habitat', label: '03 Habitat' },
  { href: '#archives', label: '04 Archives' },
  { href: '#collection', label: '05 Collection' },
]
</script>

<template>
  <header class="header">
    <div class="w header__inner">
      <a href="#top" class="brand">
        <DtLogo :size="48" />
        <span class="brand__text">
          <span class="brand__name">DinoTeam</span>
          <span class="brand__tag">Coaching sportif</span>
        </span>
      </a>
      <nav class="nav" aria-label="Navigation principale">
        <a v-for="link in links" :key="link.href" :href="link.href">{{ link.label }}</a>
      </nav>
      <a href="#contact" class="btn btn--red cta">Réserver</a>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: rgba(11, 11, 11, 0.92);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--line);
}
.header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  height: 80px;
}
.brand {
  display: flex;
  align-items: center;
  gap: 14px;
}
.brand:hover {
  color: inherit;
}
.brand__text {
  display: flex;
  flex-direction: column;
  line-height: 1;
}
.brand__name {
  font-family: var(--display);
  font-size: 30px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}
.brand__tag {
  font-family: var(--label);
  font-size: 11px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--red-bright);
}
.nav {
  display: flex;
  gap: 32px;
  font-family: var(--label);
  font-weight: 500;
  font-size: 14px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--body);
}
.cta {
  min-height: 44px;
  padding: 10px 22px;
  font-size: 15px;
}

@media (max-width: 1024px) {
  .nav {
    display: none;
  }
}
@media (max-width: 480px) {
  .brand__tag {
    display: none;
  }
}
</style>

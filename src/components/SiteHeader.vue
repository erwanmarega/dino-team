<script setup>
import DtLogo from './DtLogo.vue'

const links = [
  { href: '#fiches', label: '01 Coaching' },
  { href: '#strates', label: '02 Évolution' },
  // Habitat retiré temporairement (salle pas encore ouverte), cf. App.vue.
  { href: '#archives', label: '03 Archives' },
  { href: '#collection', label: '04 Collection' },
]
</script>

<template>
  <header class="header">
    <div class="w header__inner">
      <a href="/" class="brand">
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
/* Soulignement rouge qui se peint de gauche à droite */
.nav a {
  position: relative;
  padding: 6px 0;
}
.nav a::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 3px;
  background: var(--red);
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 0.3s cubic-bezier(0.7, 0, 0.2, 1);
}
.nav a:hover::after,
.nav a:focus-visible::after {
  transform: scaleX(1);
}
/* Le badge pivote d'un coup, comme un tampon */
.brand .dt-logo {
  transition: transform 0.45s cubic-bezier(0.2, 1.6, 0.4, 1);
}
.brand:hover .dt-logo {
  transform: rotate(-14deg) scale(1.06);
}
@media (prefers-reduced-motion: reduce) {
  .nav a::after,
  .brand .dt-logo {
    transition: none;
  }
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

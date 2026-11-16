<template>
  <section class="nf bg-forest-gradient">
    <div class="container nf__inner">
      <p class="label-mono text-primary">Spécimen introuvable</p>
      <h1 class="nf__code animate-rise">404</h1>
      <p class="nf__sub font-display">Cette page a disparu</p>
      <p class="text-muted nf__text">
        Elle a peut-être été déplacée, ou l'adresse contient une faute de frappe. Pas de panique,
        le reste de la team est toujours là.
      </p>
      <RouterLink to="/" class="btn btn--leaf btn--xl">Retour à l'accueil</RouterLink>
    </div>
  </section>
</template>

<style scoped>
.nf {
  min-height: 80vh;
  display: grid;
  place-items: center;
  padding: 8rem 0 5rem;
}
.nf__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  text-align: center;
}
.nf__code {
  font-size: clamp(7rem, 30vw, 12rem);
  font-weight: 900;
  line-height: 0.85;
  color: var(--primary);
}
.nf__sub {
  margin: 0;
  font-size: 1.75rem;
  font-weight: 700;
}
.nf__text {
  max-width: 34rem;
  margin: 0;
}
</style>

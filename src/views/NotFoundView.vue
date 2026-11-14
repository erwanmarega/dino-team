<template>
  <section class="nf">
    <div class="w nf__inner">
      <p class="label label--accent">Erreur 404</p>
      <h1 class="section-title">Page <em class="brush">introuvable</em></h1>
      <p class="lede">Cette page n'existe pas ou a été déplacée.</p>
      <RouterLink to="/" class="btn btn--accent">Retour à l'accueil</RouterLink>
    </div>
  </section>
</template>

<style scoped>
.nf {
  padding: 96px 0 140px;
}
.nf__inner {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
}
</style>

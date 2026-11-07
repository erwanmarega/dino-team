<template>
  <section id="apropos" class="about">
    <div class="w about__grid">
      <figure class="portrait">
        <div class="portrait__img">[PORTRAIT DU COACH]</div>
        <figcaption class="portrait__caption">
          <span>Le conservateur</span><span>[DIPLÔME]</span>
        </figcaption>
      </figure>
      <div class="about__copy">
        <p class="label label--red">À propos</p>
        <h2 class="section-title">Moi c'est [PRÉNOM].</h2>
        <p class="about__text">
          [Ton parcours en 2–3 phrases : comment tu es venu au sport, ta formation, ce qui t'a donné
          envie de coacher.]
        </p>
        <p class="about__text">
          DinoTeam, c'est l'idée qu'on peut s'entraîner sérieusement sans se prendre trop au
          sérieux. Les dinosaures n'ont pas su s'adapter. Toi, si.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about {
  padding: 104px 0;
  background: var(--bg);
}
.about__grid {
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 56px;
  align-items: start;
}
.portrait {
  margin: 0;
  display: flex;
  flex-direction: column;
}
.portrait__img {
  height: 460px;
  background: var(--surface);
  border: 1px solid var(--line);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--label);
  font-size: 14px;
  letter-spacing: 2px;
  color: var(--muted);
}
.portrait__caption {
  background: var(--red);
  color: #fff;
  padding: 12px 16px;
  font-family: var(--label);
  font-weight: 500;
  font-size: 14px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  display: flex;
  justify-content: space-between;
}
.about__copy {
  display: flex;
  flex-direction: column;
  gap: 22px;
}
.about__text {
  font-size: 18px;
  color: var(--body);
}

@media (max-width: 820px) {
  .about__grid {
    grid-template-columns: 1fr;
  }
  .portrait__img {
    height: 360px;
  }
}
</style>

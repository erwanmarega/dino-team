<script setup>
import SectionHeading from '../SectionHeading.vue'
import boutique from '../../assets/scenes/boutique-studio.jpg'
import river from '../../assets/scenes/river-tent.jpg'
import clearing from '../../assets/scenes/clearing.jpg'

const stops = [
  {
    num: '01',
    label: 'Boutique',
    to: '/boutique',
    image: boutique,
    blurb: 'Vêtements et accessoires de la collection DinoTeam.',
  },
  {
    num: '02',
    label: 'Collaborations',
    to: '/collaborations',
    image: river,
    blurb: 'Le réseau de professionnels qui partagent nos valeurs.',
  },
  {
    num: '03',
    label: 'FAQ & Réseaux',
    to: '/faq',
    image: clearing,
    blurb: 'Questions fréquentes, réseaux sociaux et contact.',
  },
]
</script>

<template>
  <section id="chemin" class="trail">
    <div class="container">
      <SectionHeading kicker="Le chemin">
        <template #title>Continue <span class="text-primary">l'exploration</span></template>
        Suis les rails pour t'enfoncer dans la forêt DinoTeam.
      </SectionHeading>

      <div class="trail__wrap">
        <svg
          class="trail__rails"
          preserveAspectRatio="none"
          viewBox="0 0 1000 24"
          aria-hidden="true"
        >
          <line x1="0" y1="4" x2="1000" y2="4" stroke="var(--stone)" stroke-width="2" />
          <line x1="0" y1="20" x2="1000" y2="20" stroke="var(--stone)" stroke-width="2" />
          <line
            x1="0"
            y1="12"
            x2="1000"
            y2="12"
            stroke="var(--leaf)"
            stroke-width="14"
            stroke-opacity="0.12"
            class="rail-dash"
          />
        </svg>

        <div class="trail__grid">
          <RouterLink v-for="s in stops" :key="s.to" :to="s.to" class="stop">
            <div class="stop__num">{{ s.num }}</div>
            <div class="stop__card">
              <div class="stop__img">
                <img :src="s.image" alt="" loading="lazy" width="1920" height="1088" />
                <div class="bg-canopy stop__shade"></div>
              </div>
              <div class="stop__body">
                <div>
                  <h3 class="stop__title">{{ s.label }}</h3>
                  <p class="text-muted stop__blurb">{{ s.blurb }}</p>
                </div>
                <span class="stop__arrow" aria-hidden="true">→</span>
              </div>
            </div>
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.trail {
  padding: 6rem 0;
  background: var(--background);
}
.trail__wrap {
  position: relative;
  margin-top: 3.5rem;
}
.trail__rails {
  display: none;
  position: absolute;
  left: 0;
  right: 0;
  top: 2rem;
  width: 100%;
  height: 1.5rem;
}
.trail__grid {
  display: grid;
  gap: 1.5rem;
}
.stop {
  display: block;
}
.stop__num {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  margin: 0 auto;
  border: 1px solid color-mix(in oklab, var(--primary) 60%, transparent);
  border-radius: 50%;
  background: var(--background);
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--primary);
  transition:
    background-color 0.2s,
    color 0.2s;
}
.stop:hover .stop__num,
.stop:focus-visible .stop__num {
  background: var(--primary);
  color: var(--primary-foreground);
}
.stop__card {
  margin-top: 1.5rem;
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--card);
  transition:
    translate 0.3s,
    border-color 0.3s;
}
.stop__img {
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
}
.stop__img img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s;
}
.stop__shade {
  position: absolute;
  inset: 0;
}
.stop__body {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.25rem;
}
.stop__title {
  font-size: 1.875rem;
  font-weight: 700;
}
.stop__blurb {
  margin-top: 0.25rem;
  font-size: 0.875rem;
}
.stop__arrow {
  flex-shrink: 0;
  color: var(--muted-foreground);
  transition:
    translate 0.3s,
    color 0.3s;
}
.stop:hover .stop__arrow {
  translate: 0.25rem 0;
  color: var(--primary);
}
@media (hover: hover) and (prefers-reduced-motion: no-preference) {
  .stop:hover .stop__card {
    translate: 0 -4px;
    border-color: color-mix(in oklab, var(--primary) 60%, transparent);
  }
  .stop:hover .stop__img img {
    transform: scale(1.1);
  }
}
@media (min-width: 768px) {
  .trail__rails {
    display: block;
  }
  .trail__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>

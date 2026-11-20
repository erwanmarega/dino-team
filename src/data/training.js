// Content of the "L'entraînement" section (TrainingSection.vue).
// - image: import a file from src/assets and assign it, e.g.
//     import room from '../assets/training-room.jpg'  ->  image: room
//   While null, a striped placeholder is shown.
// - intro: the coach's paragraph; while empty, skeleton bars are shown.
// - stats[].value: a string such as '500+'; while empty, an "À compléter" chip is shown.
import jungleTraining from '../assets/scenes/jungle-training.webp'

export const training = {
  image: jungleTraining,
  imageAlt: "Zone d'entraînement DinoTeam dans la jungle : kettlebells, cordes et portique",
  intro: '',
  stats: [
    { label: 'Séances coachées', value: '' },
    { label: 'Spécimens accompagnés', value: '' },
    { label: "Années d'expérience", value: '' },
  ],
}

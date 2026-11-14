// Replace with real client feedback (with their consent).
// Optional per entry: photoBefore / photoAfter (imported image URLs; the pair is
// shown only when both are set), rating (1-5), source and date.
//
// Google reviews are added by hand (free, no API key): copy the review text, the
// author's name as shown on Google, the star rating and the date, and set
// `source: 'google'` so the card shows an "Avis Google" tag. Example:
//   { num: '04', source: 'google', date: 'mars 2026', rating: 5,
//     nom: 'Julie M.', citation: 'Texte de l’avis…', offre: 'À domicile',
//     duree: '', avant: '', apres: '', photoBefore: null, photoAfter: null },
// Update site.googleRating / site.googleReviewCount when new reviews come in.
// Authors are shown as first name + initial (privacy). Entries with `draft: true`
// are templates and are not displayed.
export const testimonials = [
  // Google reviews, copied verbatim from the Google Business profile on 2026-11-14.
  {
    num: '01',
    source: 'google',
    date: 'nov. 2026',
    rating: 5,
    nom: 'Soline G.',
    offre: '',
    citation:
      'Un coach au top, passionné, à l’écoute, investi et très professionnel ! Il fait un programme de sport personnalisé, il sait s’adapter aux objectifs et au niveau de chacun, que ce soit pour une remise en forme, une perte de poids, pour se muscler ou simplement pour se sentir mieux dans son corps. Il propose également une partie nutrition avec un plan personnalisé en fonction des besoins qui est un vrai +.\nPour ma part perte de 4 kg en quelques mois, avec remise au sport + rééquilibrage alimentaire je me sens mieux dans mon corps.\nIl sait motiver, encourager et accompagner chacun avec bienveillance, tout en poussant à se dépasser. Un vrai suivi et de bons conseils qui permettent de progresser à son rythme. Je recommande a 100%.',
    duree: '',
    avant: '',
    apres: '',
    photoBefore: null,
    photoAfter: null,
  },
  {
    num: '02',
    source: 'google',
    date: 'sept. 2026',
    rating: 5,
    nom: 'Marine G.',
    offre: 'Préparation physique',
    citation:
      'Je suis accompagnée par Enzo pour ma PP (rugby, hyrox, running...), je vais prendre le temps de laisser un avis complet car choisir LE bon coach me semblait dur quand je cherchais.\n\nJe fais du sport depuis toujours, parfois de manière assez intensive, donc je pensais déjà avoir une bonne connaissance de mon corps et de l’entraînement. Pourtant, avec Enzo, j’ai vraiment passé un cap. Pas seulement dans mes performances sportives, mais aussi dans ma progression physique.\n\nIl ne se contente pas de donner des séances.\nIl à créé un espace de confiance et cherche à comprendre mes objectifs, mes habitudes, mes difficultés qui pourraient bloquer ma progression. Il adapte vraiment son accompagnement et arrive à faire travailler plusieurs objectifs en même temps sans tomber dans le « toujours plus ».\nTout est progressif, réfléchi et surtout adapté à moi.\nIl a recrée une base physique solide avant qu\'on se mette à fond sur mes objectifs et ça a tout changé dans mes perfs !\n\nEnzo est très à l’écoute, extrêmement précis et il fait attention à des détails auxquels je n’aurais pas pensé.\nUn des avantages de son coaching c\'est qu\'on travaille ensemble pour que je puisse devenir autonome, garder les bons réflexes, les bonnes habitudes et c\'est une vraie différence.\nJe me sens accompagnée et en même temps je grandis dans ma pratique perso.\n\nJe suis fan des défis et compétition et j\'apprécie sa façon d\'être ambitieux tout en m\'apprenant à gérer et répartir mes efforts sur le long terme.\n\nBref, si vous cherchez un coach sportif qui ne fait pas simplement « des programmes », mais qui cherche réellement à comprendre la personne, et à construire un accompagnement adapté, je recommande vraiment Enzo et la DinoTeam.',
    duree: '',
    avant: '',
    apres: '',
    photoBefore: null,
    photoAfter: null,
  },
  {
    num: '03',
    source: 'google',
    date: 'oct. 2026',
    rating: 5,
    nom: 'Sandrine N.',
    offre: '',
    citation:
      'Enzo est un coach très professionnel, qui a pris le temps de connaître mes objectifs pour ensuite établir un programme personnalisé tout en tenant compte de mes possibilites/limites physiques.\nIl veille à ce que les mouvements soient exécutés correctement. Il est à l\'écoute et m\'accompagne réellement en corrigeant mes mauvaises postures et mouvements s\'ils sont mal faits, si une douleur survient lors d\'un mouvement.\nIl adapte les exercices en fonction de mon corps ce qui le démarque des autres coachs qui ont tendance à proposer un exercice standard identique pour tout le monde.\nIl est bienveillant, toujours de bonne humeur, dynamique et m\'amène à me surpasser.\nJe recommande à 100% Enzo de chez DinoTeam si vous cherchez enfin un vrai coach.',
    duree: '',
    avant: '',
    apres: '',
    photoBefore: null,
    photoAfter: null,
  },
  {
    num: '04',
    source: 'google',
    date: 'nov. 2026',
    rating: 5,
    nom: 'Olive',
    offre: '',
    citation:
      'Enzo est un très bon coach avec beaucoup de professionnalisme et s\'adapte très vite à toutes les situations selon les jours et les efforts à faire.\nJe le conseille +++.',
    duree: '',
    avant: '',
    apres: '',
    photoBefore: null,
    photoAfter: null,
  },
  {
    num: '05',
    source: 'google',
    date: 'oct. 2026',
    rating: 5,
    nom: 'Marie A.',
    offre: '',
    citation: 'Enzo un très bon coach je le conseille',
    duree: '',
    avant: '',
    apres: '',
    photoBefore: null,
    photoAfter: null,
  },

  // Templates for "before / after" stories (not displayed while draft: true).
  {
    num: '91',
    draft: true,
    duree: '[DURÉE] de suivi',
    avant: '[AVANT — ex. reprise après 5 ans d’arrêt]',
    apres: '[APRÈS — ex. 3 séances par semaine]',
    citation:
      '[Témoignage : où en était la personne au départ, ce qui a changé, ce qu’elle a aimé dans le coaching.]',
    nom: '[PRÉNOM], [ÂGE] ans',
    offre: 'À domicile',
    photoBefore: null,
    photoAfter: null,
    rating: null,
  },
  {
    num: '92',
    draft: true,
    duree: '[DURÉE] de suivi',
    avant: '[AVANT — ex. aucune traction]',
    apres: '[APRÈS — ex. 8 tractions enchaînées]',
    citation:
      '[Témoignage : un résultat concret (première traction, charge au squat, douleurs disparues…).]',
    nom: '[PRÉNOM], [ÂGE] ans',
    offre: 'En salle',
    photoBefore: null,
    photoAfter: null,
    rating: null,
  },
  {
    num: '93',
    draft: true,
    duree: '[DURÉE] de suivi',
    avant: '[AVANT — ex. plateau depuis des mois]',
    apres: '[APRÈS — ex. premier trail terminé]',
    citation:
      '[Témoignage : l’objectif atteint (compétition, trail, échéance…) et le rôle du suivi.]',
    nom: '[PRÉNOM], [ÂGE] ans',
    offre: 'Pack évolution',
    photoBefore: null,
    photoAfter: null,
    rating: null,
  },
]

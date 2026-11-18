// Client-editable offers. Keep the [TARIF] placeholders until prices are final.
import { site } from '../config/site'

export const fiches = [
  {
    num: '01',
    kind: 'Le coach vient à toi',
    title: 'À domicile',
    text: 'Matériel fourni, zéro trajet. Parfait pour reprendre ou s’entraîner entre deux obligations.',
    details: [
      ['Format', 'Solo ou duo'],
      ['Zone', site.city || '[VILLE / SECTEUR]'],
      ['Tarif', 'dès [TARIF] €'],
    ],
  },
  {
    num: '02',
    kind: 'Technique & charges',
    title: 'En salle commerciale',
    text: 'Tout l’équipement d’une salle pour apprendre les mouvements clés et progresser en sécurité.',
    details: [
      ['Format', 'Individuel'],
      ['Lieu', '[NOM DE LA SALLE]'],
      ['Tarif', 'dès [TARIF] €'],
    ],
    featured: true,
  },
  {
    num: '03',
    kind: 'Bientôt',
    title: 'Salle privée ou HomeGym privatisée',
    text: 'Un espace privé, rien que pour toi et ton coach. En préparation.',
    details: [
      ['Format', 'Individuel ou duo'],
      ['Lieu', '[À VENIR]'],
    ],
    upcoming: true,
  },
]

// "Prestations & options": tag is the price or "Sur mesure".
export const options = [
  { title: 'Alimentaire', text: 'Des repères et un plan adaptés à tes besoins pour accompagner l’entraînement.', tag: '[TARIF]' },
  { title: 'Gestion et organisation de vie quotidienne', text: 'Trouver un rythme qui tient avec ton travail, ta famille et ton sommeil.', tag: '[TARIF]' },
  { title: 'Un autre besoin particulier ?', text: 'Chaque personne est différente. Échangeons sur tes attentes pour construire un accompagnement qui te correspond.', tag: 'Sur mesure' },
]

export const infos = [
  ['Zone d’intervention', site.city || '[VILLE / SECTEUR]'],
  ['Paiement', '[MODES DE PAIEMENT]'],
  ['Annulation', '[CONDITIONS D’ANNULATION]'],
]

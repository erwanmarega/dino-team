// Client-editable offers. Keep the [TARIF] placeholders until prices are final.
import { site } from '../config/site'

export const fiches = [
  {
    num: '01',
    kind: 'À domicile',
    scene: 'pushup',
    title: 'Le coach vient à toi',
    text: 'Matériel fourni, zéro trajet. Parfait pour reprendre ou s’entraîner entre deux obligations.',
    details: [
      ['Format', 'Solo ou duo'],
      ['Zone', site.city || '[VILLE / SECTEUR]'],
      ['Tarif', 'dès [TARIF] €'],
    ],
  },
  {
    num: '02',
    kind: 'En salle',
    scene: 'curl',
    title: 'Technique & charges',
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
    kind: 'Suivi',
    scene: 'chart',
    title: 'Le pack évolution',
    text: 'Plusieurs séances par mois et des conseils entre les séances pour mesurer ta progression.',
    details: [
      ['Rythme', '[NOMBRE] séances / mois'],
      ['Inclus', 'Bilan + suivi'],
      ['Tarif', '[TARIF] € / mois'],
    ],
  },
]

// "Prestations & options": tag is the price or "Inclus".
export const options = [
  { title: 'Bilan de départ', text: 'Niveau, objectif, temps disponible : on fait le point.', tag: 'Inclus' },
  { title: 'Programme entre les séances', text: 'Un plan à suivre seul pour ne pas perdre le rythme.', tag: '[TARIF]' },
  { title: 'Suivi nutrition [À CONFIRMER]', text: 'Des repères simples pour accompagner l’entraînement.', tag: '[TARIF]' },
  { title: 'Séance duo', text: 'Viens avec un ami ou un proche, on partage la séance.', tag: '[TARIF]' },
]

export const infos = [
  ['Zone d’intervention', site.city || '[VILLE / SECTEUR]'],
  ['Paiement', '[MODES DE PAIEMENT]'],
  ['Annulation', '[CONDITIONS D’ANNULATION]'],
]

/*
 * Partner directory — the only file to edit to add a partner.
 *
 * To add a partner: copy an object in `partners`, give it the next `num` ('004', '005'…),
 * and set `category` to one of the ids in `categories`.
 * Optional fields (url, socials, email, phone, location…) can be '' or omitted: they are
 * simply not displayed.
 * To add a photo: drop the file in src/assets/partners/, then at the top of this file:
 *   import enzoPhoto from '../assets/partners/enzo.jpg'
 * and use `photo: enzoPhoto`. Keep `photo: null` to show the "[PHOTO]" placeholder.
 */

export const categories = [
  { id: 'manuel', label: 'Métiers manuels', examples: 'Garagistes, plaquistes, artisans…' },
  {
    id: 'sante',
    label: 'Santé',
    examples: 'Kinésithérapeutes, médecins, ostéopathes…',
  },
  { id: 'informatique', label: 'Informatique', examples: 'Monteurs, techniciens…' },
  {
    id: 'sport',
    label: 'Sport & bien-être',
    examples: 'Coachs sportifs, diététiciens, masseurs, professeurs de yoga…',
  },
  {
    id: 'services',
    label: 'Services & autres',
    examples: 'Photographes, comptables, restaurateurs, créateurs…',
  },
]

export const partners = [
  {
    num: '001',
    name: 'Enzo Nuovo',
    job: 'Coach sportif',
    specialty: '[Spécialité]',
    category: 'sport',
    description: "[Présentation de l'activité en 2–3 phrases.]",
    location: '[VILLE]',
    photo: null,
    url: '',
    socials: { instagram: '' },
    email: '',
    phone: '07 70 80 86 08',
  },
  {
    num: '002',
    name: '[PRÉNOM NOM]',
    job: 'Kinésithérapeute',
    specialty: '[Spécialité]',
    category: 'sante',
    description: "[Présentation de l'activité en 2–3 phrases.]",
    location: '[VILLE]',
    photo: null,
    url: '',
    socials: { instagram: '' },
    email: '',
    phone: '',
  },
  {
    num: '003',
    name: '[PRÉNOM NOM]',
    job: 'Artisan plaquiste',
    specialty: '[Spécialité]',
    category: 'manuel',
    description: "[Présentation de l'activité en 2–3 phrases.]",
    location: '[VILLE]',
    photo: null,
    url: '',
    socials: { instagram: '' },
    email: '',
    phone: '',
  },
]

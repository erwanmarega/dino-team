// Legal page templates, keyed by route name. Each page is a list of { heading, paragraphs[] }.
// Bracketed values are placeholders to be completed and validated before going live.
export const legal = {
  'mentions-legales': [
    {
      heading: 'Éditeur du site',
      paragraphs: [
        'Le site DinoTeam est édité par [NOM PRÉNOM / RAISON SOCIALE], [STATUT — ex. micro-entrepreneur], immatriculé sous le numéro SIRET [SIRET].',
        'Adresse : [ADRESSE]. E-mail : [EMAIL]. Téléphone : 07 70 80 86 08.',
      ],
    },
    {
      heading: 'Directeur de la publication',
      paragraphs: ['Le directeur de la publication est [NOM PRÉNOM].'],
    },
    {
      heading: "Carte professionnelle d'éducateur sportif",
      paragraphs: [
        "Carte professionnelle d'éducateur sportif n° [N°], délivrée par [PRÉFECTURE / DÉPARTEMENT] le [DATE].",
      ],
    },
    {
      heading: 'Hébergeur',
      paragraphs: ['Le site est hébergé par [NOM], [ADRESSE], téléphone : [TÉLÉPHONE].'],
    },
    {
      heading: 'Propriété intellectuelle',
      paragraphs: [
        "L'ensemble des contenus du site (textes, images, logos, illustrations, vidéos) est la propriété de [NOM / RAISON SOCIALE] ou de ses partenaires, sauf mention contraire.",
        "Toute reproduction ou réutilisation, totale ou partielle, sans autorisation écrite préalable est interdite.",
      ],
    },
    {
      heading: 'Crédits',
      paragraphs: ['Conception et développement : [NOM / AGENCE]. Photographies : [CRÉDITS PHOTO].'],
    },
  ],
  cgv: [
    {
      heading: 'Objet',
      paragraphs: [
        "Les présentes conditions générales de vente (CGV) régissent les prestations de coaching sportif proposées par [NOM PRÉNOM / RAISON SOCIALE] (« le Coach ») à toute personne physique (« le Client »).",
      ],
    },
    {
      heading: 'Prestations',
      paragraphs: [
        'Le Coach propose des séances de coaching sportif individuelles ou en petit groupe, à domicile, en salle ou en extérieur : [DESCRIPTION DES PRESTATIONS].',
        'Zone d’intervention : [ZONE].',
      ],
    },
    {
      heading: 'Tarifs',
      paragraphs: [
        'Les tarifs en vigueur sont : [TARIFS — séance, forfait, séance découverte]. Ils sont exprimés en euros [TTC / TVA non applicable, art. 293 B du CGI — À VÉRIFIER].',
      ],
    },
    {
      heading: 'Réservation et paiement',
      paragraphs: [
        'Les séances se réservent via l’outil de réservation en ligne ou par contact direct avec le Coach.',
        'Le paiement s’effectue par [MOYENS DE PAIEMENT], [À LA SÉANCE / À LA COMMANDE DU FORFAIT].',
      ],
    },
    {
      heading: 'Annulation et report',
      paragraphs: [
        'Toute séance peut être annulée ou reportée sans frais jusqu’à [DÉLAI] avant l’heure prévue. Passé ce délai, [CONSÉQUENCE — ex. séance due].',
      ],
    },
    {
      heading: 'Droit de rétractation',
      paragraphs: [
        'Conformément au Code de la consommation, le Client dispose d’un délai de 14 jours pour se rétracter d’un contrat conclu à distance, sauf si la prestation a commencé avec son accord avant l’expiration de ce délai. [À VÉRIFIER ET ADAPTER].',
      ],
    },
    {
      heading: 'Responsabilité et aptitude médicale',
      paragraphs: [
        'Le Client déclare être apte à la pratique d’une activité physique et s’engage à signaler tout problème de santé. Un certificat médical peut être demandé : [CONDITIONS].',
        'La responsabilité du Coach est limitée à [LIMITES — À DÉFINIR]. Le Coach est assuré auprès de [ASSUREUR], contrat n° [N°].',
      ],
    },
    {
      heading: 'Vente de produits',
      paragraphs: [
        'Les produits de la collection DinoTeam sont vendus sur une boutique en ligne externe, [URL DE LA BOUTIQUE]. Leur vente est régie par les conditions générales de vente de cette boutique.',
      ],
    },
    {
      heading: 'Médiation de la consommation',
      paragraphs: [
        'En cas de litige, le Client peut recourir gratuitement au médiateur de la consommation : [MÉDIATEUR — NOM, ADRESSE, SITE WEB].',
      ],
    },
    {
      heading: 'Droit applicable',
      paragraphs: [
        'Les présentes CGV sont soumises au droit français. En cas de litige, et à défaut de résolution amiable, les tribunaux compétents seront ceux de [JURIDICTION].',
      ],
    },
  ],
  confidentialite: [
    {
      heading: 'Responsable du traitement',
      paragraphs: [
        'Le responsable du traitement des données personnelles est [NOM PRÉNOM / RAISON SOCIALE], [ADRESSE], [EMAIL].',
      ],
    },
    {
      heading: 'Données collectées',
      paragraphs: [
        'Prise de contact : les données que vous nous communiquez par e-mail, téléphone ou message sur les réseaux sociaux (identité, coordonnées, contenu du message).',
        'Réservation : lorsque vous réservez via Calendly, les informations saisies (nom, e-mail, créneau, éventuelles réponses aux questions) sont collectées par ce service.',
      ],
    },
    {
      heading: 'Finalités et bases légales',
      paragraphs: [
        'Répondre à vos demandes (intérêt légitime) ; gérer vos réservations et l’exécution des séances (exécution du contrat ou de mesures précontractuelles) ; respecter nos obligations légales et comptables (obligation légale). [À COMPLÉTER SI D’AUTRES FINALITÉS].',
      ],
    },
    {
      heading: 'Durées de conservation',
      paragraphs: [
        'Données de contact : [DURÉE] à compter du dernier échange. Données de réservation et de facturation : [DURÉE — ex. 10 ans pour les pièces comptables].',
      ],
    },
    {
      heading: 'Destinataires et sous-traitants',
      paragraphs: [
        'Vos données sont accessibles au Coach et à ses sous-traitants : l’hébergeur du site ([HÉBERGEUR]), Calendly pour la réservation, et la boutique en ligne externe ([BOUTIQUE]) pour les achats de produits. [À COMPLÉTER : localisation des données et garanties en cas de transfert hors UE].',
      ],
    },
    {
      heading: 'Vos droits',
      paragraphs: [
        'Vous disposez des droits d’accès, de rectification, d’effacement, d’opposition, de limitation et de portabilité de vos données. Pour les exercer, écrivez à [EMAIL].',
        'Vous pouvez également introduire une réclamation auprès de la CNIL (cnil.fr).',
      ],
    },
    {
      heading: 'Cookies',
      paragraphs: [
        'Ce site ne dépose lui-même aucun cookie de suivi ou de mesure d’audience.',
        'Les services tiers vers lesquels vous êtes redirigé, comme l’outil de réservation ou la boutique, peuvent déposer leurs propres cookies à l’ouverture. Nous vous invitons à consulter leurs politiques respectives.',
      ],
    },
  ],
}

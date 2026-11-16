// Central, client-editable site configuration. Empty strings are placeholders.
export const site = {
  coachFirstName: 'Enzo',
  coachLastName: 'Nuovo', // shown on the specimen card when set
  city: 'Seine-et-Marne (77)', // main service area
  bookingUrl: 'https://calendly.com/enzoloup1/30min', // Calendly link: assessment call ("bilan")
  discoveryUrl: '', // Calendly link: discovery session ("séance découverte")
  shopUrl: '', // external shop
  // Google Business profile "Enzo Nuovo - Coach Sportif" (place ID ChIJb21GNLx4WAMRKEoskZUjkqk)
  googleReviewsUrl: 'https://share.google/DMEFihkyjLUfSxvpU',
  googleWriteReviewUrl:
    'https://search.google.com/local/writereview?placeid=ChIJb21GNLx4WAMRKEoskZUjkqk',
  googleRating: '5', // average rating shown on the profile (checked 2026-11-14)
  googleReviewCount: '5', // number of reviews on the profile (checked 2026-11-14)
  email: 'enzocoaching77@gmail.com',
  phone: '07 70 80 86 08',
  socials: {
    instagram: 'https://www.instagram.com/enzo.nuovo.77/',
    facebook: 'https://www.facebook.com/enzonuovocoachingsportif/',
    tiktok: '',
    youtube: '',
  },
  rubrics: [
    { num: '00', label: 'Coaching', to: '/' },
    { num: '01', label: 'Boutique', to: '/boutique' },
    { num: '02', label: 'Collaborations', to: '/collaborations' },
    { num: '03', label: 'FAQ & Réseaux', to: '/faq' },
  ],
}

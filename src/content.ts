/**
 * All copy lives here. Facts come from the Venue at Boschkop Facebook page
 * and posts. Anything marked TODO is a placeholder to confirm or fill in
 * before launch — search this file for "TODO".
 */
import type {MediaName} from './lib/nav';

export const brand = {
  name: 'Venue at Boschkop',
  tagline: 'Self-catering venue · Zwavelpoort, Pretoria',
};

export const contact = {
  phone: '078 120 0669',
  tel: '+27781200669',
  whatsapp: 'https://wa.me/27781200669',
  email: 'tanyabac@mweb.co.za',
  address: ['3 Boschkop Road', 'Zwavelpoort, Pretoria'],
  maps: 'https://www.google.com/maps/search/?api=1&query=3+Boschkop+Road%2C+Zwavelpoort%2C+Pretoria',
  mapEmbed: 'https://maps.google.com/maps?q=3%20Boschkop%20Road%2C%20Zwavelpoort%2C%20Pretoria&z=14&output=embed',
  instagram: 'https://www.instagram.com/venueatboschkop/',
  facebook: 'https://www.facebook.com/p/Venue-at-Boschkop-61565803590434/',
};

export const nav = [
  {label: 'Home', href: '/'},
  {label: 'The venue', href: '/venue/'},
  {label: 'Events', href: '/events/'},
  {label: 'Gallery', href: '/gallery/'},
  {label: 'Packages', href: '/packages/'},
  {label: 'Contact', href: '/contact/'},
];

export const socials = [
  {label: 'Instagram', href: contact.instagram},
  {label: 'Facebook', href: contact.facebook},
  {label: 'WhatsApp', href: contact.whatsapp},
];

/** The early-booking offer; it hides itself after `until`. */
export const promo = {
  until: '2026-12-05',
  title: ['Save 10%', 'on your 2027 celebration'],
  body: 'Book and pay before 5 December 2026 to enjoy 10% off your venue fee.',
};

/** Headline lines; `i` lines are set in italic. */
export type Line = {t: string; i?: boolean};

export const home = {
  hero: {
    lines: [{t: 'From kiddies'}, {t: 'parties', i: true}, {t: 'to evening'}, {t: 'celebrations.', i: true}] as Line[],
    body: 'A self-catering venue in Zwavelpoort, Pretoria. Open lawns, farm animals, a boma fire and string lights under the trees.',
    slides: ['evening-celebration', 'lawn-day-setup', 'evening-string-lights', 'long-tables-on-the-lawn', 'evening-tree-lights'] as MediaName[],
  },
  intro: {
    lines: [{t: 'Your function.'}, {t: 'Your space.', i: true}, {t: 'Your privacy.'}] as Line[],
    body: 'Three unique spaces, one special venue. Bring your own menu and your own people. We provide the setting: shady lawns, a fire pit, play areas for the little ones and a farmyard full of friendly animals.',
    facts: [
      ['3', 'unique spaces'],
      ['Fri & Sat', 'evening functions'],
      ['100%', 'self-catering'],
    ],
  },
  activities: [
    {label: 'Pony rides', image: 'pony-ride'},
    {label: 'Train rides', image: 'train-ride'},
    {label: 'Jumping castles', image: 'jumping-castle'},
    {label: 'Feed the animals', image: 'feeding-the-donkeys'},
    {label: 'Soft play', image: 'soft-play-slide'},
    {label: 'Boma evenings', image: 'boma-braai-fires'},
  ] as {label: string; image: MediaName}[],
  explore: [
    {label: 'Events', note: 'Kiddies parties to year-end functions', href: '/events/'},
    {label: 'Gallery', note: 'Moments at Boschkop', href: '/gallery/'},
    {label: 'Packages', note: 'Hire, add-ons & the 2027 offer', href: '/packages/'},
    {label: 'Contact', note: 'Check your date', href: '/contact/'},
  ],
};

export type Space = {
  id: string;
  name: [string, string];
  image: MediaName;
  /** Two short facts shown on the home-page panels. */
  specs: [string, string][];
  body: string;
  features: string[];
  extra: MediaName;
};

// TODO: confirm each space's description and best uses with the venue.
export const spaces: Space[] = [
  {
    id: 'tinroof',
    name: ['The', 'Tinroof'],
    image: 'boma-area',
    extra: 'evening-tree-lights',
    specs: [['Setting', 'Covered lapa & boma'], ['Best for', 'Evening functions']],
    body: 'A covered lapa around a sunken boma, with built-in seating, scatter cushions and a fire pit at its heart. Tinroof evenings mean flames, fairy lights and long conversations.',
    features: ['Covered seating under the tin roof', 'Boma fire pit', 'Built-in benches with cushions', 'Steps from the lawns and play areas'],
  },
  {
    id: 'kiddies-corner',
    name: ['Kiddies', 'Corner'],
    image: 'jumping-castle-trees',
    extra: 'kiddies-tables',
    specs: [['Setting', 'Play areas & lawns'], ['Best for', 'Kiddies parties']],
    body: 'Let the little ones loose. A jungle gym, jumping castles and soft-play stations on soft grass, with the farmyard animals just over the fence.',
    features: ['Jungle gym and swings', 'Jumping castles and soft play', 'Kiddies tables and chairs', 'Pony, train and animal-feeding extras'],
  },
  {
    id: 'rustic-affair',
    name: ['Rustic', 'Affair'],
    image: 'rustic-hall-buffet',
    extra: 'hall-birthday-setup',
    specs: [['Setting', 'Log cabin & garden'], ['Best for', 'Brunches & birthdays']],
    body: 'Timber walls, wide windows and a garden courtyard. The Rustic Affair suits long buffet tables, birthday set-ups and celebrations with a farmhouse feel.',
    features: ['Log-cabin interior', 'Room for buffet and dessert tables', 'Garden courtyard with stone seating', 'Under cover if the weather turns'],
  },
];

export const venue = {
  hero: {
    lines: [{t: 'Three unique'}, {t: 'spaces.', i: true}, {t: 'One special'}, {t: 'venue.', i: true}] as Line[],
    body: 'The Tinroof, Kiddies Corner and the Rustic Affair, set among open lawns and old trees in Zwavelpoort.',
    slides: ['lawn-day-setup', 'farmyard-lawn', 'lawn-under-trees'] as MediaName[],
  },
  grounds: [
    {title: 'Open lawns', body: 'Room for long tables, umbrellas and kids running wild.', image: 'long-tables-on-the-lawn'},
    {title: 'Boma & braai', body: 'Fire pits and braai areas for potjies and evening fires.', image: 'boma-braai-fires'},
    {title: 'The farmyard', body: 'Donkeys, ponies, rabbits, peacocks, chickens and a tortoise or two.', image: 'donkeys-at-the-fence'},
    {title: 'Shade & thatch', body: 'Thatch umbrellas and old trees for the hottest Highveld days.', image: 'thatch-umbrella'},
  ] as {title: string; body: string; image: MediaName}[],
  catering: {
    lines: [{t: 'Your celebration,'}, {t: 'your menu,', i: true}, {t: 'your way.'}] as Line[],
    body: 'Venue at Boschkop is fully self-catering. Bring your own food and drinks, your favourite caterer or a potjie for the fire. You choose the menu; we provide the space.',
  },
};

export type EventType = {
  id: string;
  kicker: string;
  title: [string, string];
  body: string;
  offer: string[];
  images: [MediaName, MediaName];
  cta: string;
};

export const events = {
  hero: {
    lines: [{t: 'Celebrate'}, {t: 'your way.', i: true}] as Line[],
    body: 'Kiddies parties, evening functions, outdoor celebrations and year-end functions, plus inflatables and decor to hire.',
    slides: ['evening-celebration', 'pony-ride', 'pastel-party-tables'] as MediaName[],
  },
  types: [
    {
      id: 'kiddies-parties',
      kicker: 'Kiddies parties',
      title: ['Let the little ones', 'loose.'],
      body: 'Birthday parties at Kiddies Corner come with room to run, things to climb and animals to meet. Add pony rides, train rides and animal feeding to make the day.',
      offer: ['Jungle gym, jumping castles & soft-play stations', 'Pony rides & pony-cart rides', 'Train rides around the grounds', 'Feeding the farm animals', 'Kiddies tables, chairs & party set-ups'],
      images: ['pastel-party-tables', 'pony-cart'],
      cta: 'kiddies',
    },
    {
      id: 'evening-functions',
      kicker: 'Friday & Saturday evenings',
      title: ['Evenings under', 'the lights.'],
      body: 'When the sun goes down the trees light up. Evening functions run on Friday and Saturday nights: year-end functions, birthdays and special celebrations around the boma fire.',
      offer: ['Year-end functions', 'Birthdays & milestone celebrations', 'String lights & lanterns in the trees', 'Boma fire pit & braai areas', 'Spring potjie evenings'],
      images: ['evening-string-lights', 'evening-buffet'],
      cta: 'evening',
    },
    {
      id: 'outdoor-celebrations',
      kicker: 'Outdoor celebrations',
      title: ['Long tables on', 'the lawn.'],
      body: 'Daytime celebrations on open lawns under old trees and thatch umbrellas. There is space for a long-table lunch while the children play nearby.',
      offer: ['Open lawns for long-table set-ups', 'Thatch & umbrella shade', 'End-of-year functions', 'Play areas within sight of the tables'],
      images: ['long-tables-on-the-lawn', 'thatch-umbrella'],
      cta: 'outdoor',
    },
    {
      id: 'inflatable-hire',
      kicker: 'Inflatable hire & decor rentals',
      title: ['Fun for all,', 'delivered.'],
      body: 'Hosting at home? Rent our jumping castles, waterslides and soft play, plus decor for the party table.',
      offer: ['Jumping castles', 'Waterslides', 'Soft-play sets', 'Decor rentals', 'Delivery & collection in Pretoria east only, or collect from 3 Boschkop Road'],
      images: ['waterslide', 'inflatable-obstacle'],
      cta: 'inflatables',
    },
  ] as EventType[],
  animals: {
    title: ['The animals of', 'Boschkop'],
    list: [
      {label: 'Donkeys', image: 'donkeys-at-the-fence'},
      {label: 'Ponies', image: 'pony-grazing'},
      {label: 'Rabbits', image: 'rabbits'},
      {label: 'Peacocks', image: 'peacock'},
      {label: 'Chickens', image: 'hen-and-chicks'},
    ] as {label: string; image: MediaName}[],
  },
};

export type GalleryTag = 'Kiddies' | 'Evenings' | 'Grounds' | 'Animals';
export const galleryTags: GalleryTag[] = ['Kiddies', 'Evenings', 'Grounds', 'Animals'];

export const gallery = {
  hero: {
    lines: [{t: 'Moments at'}, {t: 'Boschkop.', i: true}] as Line[],
    body: 'Parties, functions and lazy afternoons from our Facebook page.',
    slides: ['evening-string-lights'] as MediaName[],
  },
  photos: [
    ['evening-celebration', 'Evenings', 'Guests at long tables under string lights at dusk'],
    ['pastel-party-tables', 'Kiddies', 'Pastel kiddies party tables under a covered lapa'],
    ['donkeys-at-the-fence', 'Animals', 'Two donkeys looking over a wooden fence'],
    ['lawn-day-setup', 'Grounds', 'Tables and chairs set out on a green lawn on a sunny day'],
    ['pony-ride', 'Kiddies', 'A child on a pony ride across the lawn'],
    ['evening-string-lights', 'Evenings', 'String lights hanging between trees above a dinner party'],
    ['jumping-castle', 'Kiddies', 'A bright jumping castle on the grass'],
    ['peacock', 'Animals', 'A peacock with its tail fanned out'],
    ['long-tables-on-the-lawn', 'Grounds', 'Long tables with white chairs on the lawn'],
    ['hall-birthday-setup', 'Kiddies', 'Peach balloon arch and birthday table inside the hall'],
    ['pond-at-dusk', 'Evenings', 'Fairy lights reflected in the garden pond at dusk'],
    ['train-ride', 'Kiddies', 'Children riding the little train along a dirt path'],
    ['rustic-hall-buffet', 'Grounds', 'A buffet table inside the timber hall'],
    ['pony-grazing', 'Animals', 'A pony grazing'],
    ['evening-buffet', 'Evenings', 'Buffet tables set under lit trees at night'],
    ['balloon-arch', 'Kiddies', 'Green, white and yellow balloon arch over a party table'],
    ['boma-area', 'Grounds', 'The boma with its round fire pit and cushioned benches'],
    ['feeding-the-donkeys', 'Animals', 'Children feeding the donkeys'],
    ['evening-tree-lights', 'Evenings', 'Lights strung through the trees over an evening function'],
    ['soft-play-slide', 'Kiddies', 'Soft-play slide and ball pit on the grass'],
    ['farmyard-lawn', 'Grounds', 'The farmyard fence and lawns with a jumping castle beyond'],
    ['rabbits', 'Animals', 'Two rabbits in their hutch'],
    ['birthday-centrepiece', 'Evenings', 'A sunflower centrepiece on a 40th birthday table'],
    ['pink-carpet-arch', 'Kiddies', 'A pink carpet leading to a balloon arch'],
    ['thatch-umbrella', 'Grounds', 'A thatch umbrella above guests on the lawn'],
    ['hen-and-chicks', 'Animals', 'A hen with her chicks on the grass'],
    ['evening-lawn-party', 'Evenings', 'A lawn party lit with purple lights'],
    ['pony-cart', 'Kiddies', 'Children on a pony-cart ride'],
    ['lawn-under-trees', 'Grounds', 'Cocktail tables on the lawn under the trees'],
    ['donkeys', 'Animals', 'Donkeys in the farmyard'],
    ['bouncy-giraffe', 'Kiddies', 'A yellow bouncy giraffe toy on the lawn'],
    ['boma-braai-fires', 'Grounds', 'Two braai fires burning in the boma'],
    ['princess-party-table', 'Kiddies', 'A pink princess party table'],
    ['garden-path', 'Grounds', 'A stone path through the garden'],
    ['waterslide', 'Kiddies', 'An inflatable waterslide on the lawn'],
    ['kiddies-tables', 'Kiddies', 'Colourful kiddies tables and chairs on the lawn'],
    ['train-carriages', 'Kiddies', 'The colourful carriages of the little train'],
    ['party-bags-table', 'Kiddies', 'Party bags laid out along a kiddies table'],
    ['inflatable-obstacle', 'Kiddies', 'An inflatable obstacle course'],
    ['kiosk', 'Grounds', 'The kiosk counter'],
  ] as [MediaName, GalleryTag, string][],
};

export type Package = {
  id: string;
  name: string;
  bestFor: string;
  /** TODO: set the real price, e.g. 'From R2 500'. Null shows "Price on request". */
  price: string | null;
  includes: string[];
  image: MediaName;
};

export const packages = {
  hero: {
    lines: [{t: 'Packages &'}, {t: 'pricing.', i: true}] as Line[],
    body: 'Hire the space and add the extras you want. Every booking is self-catering.',
    slides: ['long-tables-on-the-lawn'] as MediaName[],
  },
  // TODO: confirm what each package includes, and add prices.
  list: [
    {
      id: 'kiddies',
      name: 'Kiddies party',
      bestFor: 'Birthday parties',
      price: null,
      includes: ['Kiddies Corner play areas', 'Lawns & covered seating', 'Visit the farm animals', 'Self-catering: bring your own food & cake'],
      image: 'pastel-party-castle',
    },
    {
      id: 'evening',
      name: 'Evening function',
      bestFor: 'Friday & Saturday nights',
      price: null,
      includes: ['The Tinroof & boma fire pit', 'String-lit garden', 'Braai areas', 'Self-catering: your menu, your way'],
      image: 'evening-tree-lights',
    },
    {
      id: 'outdoor',
      name: 'Day celebration',
      bestFor: 'Year-end & family functions',
      price: null,
      includes: ['Open lawns for long tables', 'Thatch & umbrella shade', 'Play areas for the kids', 'Self-catering'],
      image: 'lawn-day-setup',
    },
  ] as Package[],
  // TODO: add prices to the extras ('R350', 'R50 per child'…) or leave as "On request".
  extras: [
    ['Pony rides', null],
    ['Pony-cart rides', null],
    ['Train rides', null],
    ['Animal feeding', null],
    ['Jumping castles', null],
    ['Waterslides', null],
    ['Soft-play sets', null],
    ['Decor rentals', null],
  ] as [string, string | null][],
  faq: [
    ['Is the venue self-catering?', 'Yes. Bring your own food and drinks, or your own caterer. Your menu, your way.'],
    ['When can I book an evening function?', 'Evening functions run on Friday and Saturday evenings.'],
    ['Can I hire inflatables for a party at home?', 'Yes. Jumping castles, waterslides and soft play can be delivered and collected in Pretoria east only. You can also collect them yourself from 3 Boschkop Road, Zwavelpoort.'],
    ['How does the 2027 discount work?', 'Book and pay for your 2027 date before 5 December 2026 to get 10% off the venue fee.'],
    ['Can I see the venue before I book?', 'Send us a WhatsApp or call 078 120 0669 to arrange a visit.'],
  ] as [string, string][],
};

export const contactPage = {
  hero: {
    lines: [{t: "Let's plan"}, {t: 'your day.', i: true}] as Line[],
    body: 'Tell us your date, your guests and what you are celebrating. We reply on WhatsApp or by email.',
    slides: ['pond-at-dusk'] as MediaName[],
  },
  eventTypes: [
    ['kiddies', 'Kiddies party'],
    ['evening', 'Evening function'],
    ['outdoor', 'Day / outdoor celebration'],
    ['year-end', 'Year-end function'],
    ['inflatables', 'Inflatable or decor hire'],
    ['other', 'Something else'],
  ] as [string, string][],
};

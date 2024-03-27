const USERS = {
  1: {
    id: 1,
    username: 'Another Name',
    avatar: require('../../assets/images/users/32.jpeg'),
  },
  2: {
    id: 2,
    username: 'Fomubad Borista',
    avatar: require('../../assets/images/users/35.jpeg'),
  },
};

const REVIEWS = {
  1: {
    id: 1,
    date: '21 May, 2022',
    author: USERS[1],
    rating: 7,
    text: 'Lorem ipsum dolor sit amet. Iusto nihil et porro soluta ut labore nesciunt sed dolor nihil qui laudantium consequatur',
  },
  2: {
    id: 2,
    date: '14 July, 2021',
    author: USERS[2],
    rating: 9.1,
    text: 'Lorem ipsum dolor sit amet.',
  },
};

export const TLLNESS = {
  1: {
    id: 1,
    title: 'Potato illness case 1',
    image: require('../../assets/images/sicks/cp-1.jpg'),
    location: 'Rampan Location',
    rating: 9,
    pricePeerDay: '130$',
    type: 'SICK',
  },
  2: {
    id: 2,
    title: 'Potato Illness Case 2',
    image: require('../../assets/images/sicks/cp-2.jpg'),
    location: 'Rampan Location',
    rating: 9.3,
    pricePeerDay: '230$',
    type: 'SICK',
  },
  3: {
    id: 3,
    title: 'Cassava illness',
    image: require('../../assets/images/sicks/capri-1.jpg'),
    location: 'Rampan Location',
    rating: 9.4,
    pricePeerDay: '280$',
    type: 'SICK',
  },
  4: {
    id: 4,
    title: 'Cassava illness on leaves',
    image: require('../../assets/images/sicks/capri-2.jpg'),
    location: 'Rampan Location',
    rating: 9.3,
    pricePeerDay: '190$',
    type: 'SICK',
  },
  5: {
    id: 5,
    title: "Tomata illness case 1",
    image: require('../../assets/images/sicks/polynesia-1.jpg'),
    location: 'Rampan Location',
    rating: 9.2,
    pricePeerDay: '250$',
    type: 'SICK',
  },
  6: {
    id: 6,
    title: 'Tomato illness case 2',
    image: require('../../assets/images/sicks/polynesia-2.jpg'),
    location: 'Rampan Location',
    rating: 9.4,
    pricePeerDay: '270$',
    type: 'SICK',
  },
  7: {
    id: 7,
    title: 'Sweet potato illness variety',
    image: require('../../assets/images/sicks/phuket-1.jpg'),
    location: 'Rampan Location',
    rating: 9.2,
    pricePeerDay: '210$',
    type: 'SICK',
  },
  8: {
    id: 8,
    title: 'sweet potato illness single case',
    image: require('../../assets/images/sicks/phuket-2.jpg'),
    location: 'Rampan Location',
    rating: 9.4,
    pricePeerDay: '430$',
    type: 'SICK',
  },
  9: {
    id: 9,
    title: 'Beans illness Variety',
    image: require('../../assets/images/sicks/ac-1.jpg'),
    location: 'Rampan Location',
    rating: 9.2,
    pricePeerDay: '330$',
    type: 'SICK',
  },
  10: {
    id: 10,
    title: 'Beans illness single',
    image: require('../../assets/images/sicks/ac-2.jpg'),
    location: 'Rampan Location',
    rating: 9.4,
    pricePeerDay: '350$',
    type: 'SICK',
  },
  11: {
    id: 11,
    title: 'Rice illness case 1',
    image: require('../../assets/images/sicks/granada-1.jpg'),
    location: 'Rampan Location',
    rating: 9.2,
    pricePeerDay: '230$',
    type: 'SICK',
  },
  12: {
    id: 12,
    title: 'Rice illness case 2',
    image: require('../../assets/images/sicks/granada-2.jpg'),
    location: 'Rampan Location',
    rating: 9.4,
    pricePeerDay: '120$',
    type: 'SICK',
  },

  13: {
    id: 13,
    title: 'Corn illness case 1',
    image: require('../../assets/images/sicks/cb-1.jpg'),
    location: 'Rampan Location',
    rating: 9.2,
    pricePeerDay: '740$',
    type: 'SICK',
  },
  14: {
    id: 14,
    title: 'Corn illness case 2',
    image: require('../../assets/images/sicks/cb-2.jpg'),
    location: 'Rampan Location',
    rating: 9.4,
    pricePeerDay: '240$',
    type: 'SICK',
  },
};

export const TOP_PLACES = [
  {
    id: 1,
    image: require('../../assets/images/crops/2082f59465c39094ce90bebd0fcf8fa7.jpg'),
    title: 'Rice Farming',
    location: 'Cultivation de riz',
    description:
      'The ultimate Amalfi Coast travel guide, where to stay, where to eat, and what areas to visit in the Amalfi Coast of Italy. Positano, Ravello, Amalfi and more',
    rating: 9.4,
    gallery: [
      require('../../assets/images/crops/3722dd4614a5a58f2ec8ebf17c22f76d.jpg'),
      require('../../assets/images/crops/af933a359582704eee05be198e882be0.jpg'),
    ],
    reviews: [REVIEWS[2], REVIEWS[1]],
    sicks: [TLLNESS[9], TLLNESS[10]],
    type: 'PLACE',
  },
  {
    id: 4,
    image: require('../../assets/images/crops/922a0cb274208ccd234f6c14f2174b8b.jpeg'),
    title: 'Corn farming',
    location: 'Cultivation Mais',
    description:
      'Granada is the capital city of the province of Granada, in the autonomous community of Andalusia, Spain',
    rating: 8.9,
    gallery: [],
    reviews: [REVIEWS[1], REVIEWS[2]],
    sicks: [TLLNESS[11], TLLNESS[12]],
    type: 'PLACE',
  },
  {
    id: 6,
    image: require('../../assets/images/crops/e57a2a310330ee1d8928eb75d416a53d.jpg'),
    title: 'Tomato farming',
    location: 'Cultivation tomate',
    description:
      "Cherry blossoms usually bloom between mid-March and early May. In 2022, Tokyo's cherry blossom season officially began on March 20",
    rating: 7.4,
    gallery: [],
    reviews: [REVIEWS[1], REVIEWS[2]],
    sicks: [TLLNESS[13], TLLNESS[14]],
    type: 'PLACE',
  },
];

export const PLACES = [
  {
    id: 5,
    image: require('../../assets/images/crops/645d5f28e26c7de2a280f71db15c2141.jpg'),
    title: 'Cassava Farming',
    location: 'Cultivation Manioc',
    description:
      "Cappadocia's landscape includes dramatic expanses of soft volcanic rock, shaped by erosion into towers, cones, valleys, and caves. Rock-cut churches and underground tunnel complexes from the Byzantine and Islamic eras are scattered throughout the countryside.",
    rating: 9.2,
    gallery: [
      require('../../assets/images/crops/4c73f37e70dded978374960fb29360f2.jpg'),
      require('../../assets/images/crops/55608c7000bb15d24ee022f3d3f0bf8a.jpg'),
      require('../../assets/images/crops/c68a4484f89d0c087ebdaa43629d2a7a.jpg'),
    ],
    reviews: [REVIEWS[1], REVIEWS[2]],
    sicks: [TLLNESS[1], TLLNESS[2]],
    type: 'PLACE',
  },
  {
    id: 2,
    image: require('../../assets/images/crops/eea622430834cb64b900c2f03e5be6b8.jpg'),
    title: 'Potato Farming',
    location: 'Cultivation pomme de Terre',
    description:
      'Capri is an island of a thousand faces, where visitors can walk the trails skirting the cliffs above the Mediterranean in total solitude, dive into the crystalline waters of its rocky shore, or plunge into the vibrant crowds of the Piazzetta and shop in the most fashionable boutiques in the world.',
    rating: 9.1,
    gallery: [],
    reviews: [REVIEWS[2], REVIEWS[1]],
    sicks: [TLLNESS[3], TLLNESS[4]],
    type: 'PLACE',
  },
  {
    id: 3,
    image: require('../../assets/images/crops/0e627c12c05e4dd93ab122d618ea7849.jpg'),
    title: 'Beans Farming',
    location: 'Cultivation Haricot',
    description:
      'Learn how you can travel Bora Bora on a budget and how overwater bungalows are possible for cheap plus tips on keeping Bora Bora trip costs low.',
    rating: 8.9,
    gallery: [],
    reviews: [REVIEWS[1], REVIEWS[2]],
    sicks: [TLLNESS[5], TLLNESS[6]],
    type: 'PLACE',
  },
  {
    id: 7,
    image: require('../../assets/images/crops/c2dcbb54ca9316831b0f6ed4d4136dda.jpg'),
    title: 'Tomato Farming',
    location: 'Cultivation Tomate',
    description:
      'Phuket is the largest island in Thailand. It is located in the Andaman Sea in southern Thailand',
    rating: 9.2,
    gallery: [],
    reviews: [REVIEWS[2], REVIEWS[1]],
    sicks: [TLLNESS[7], TLLNESS[8]],
    type: 'PLACE',
  },
];

export const SEARCH_PLACES = [...PLACES, ...TOP_PLACES].map(item => ({
  ...item,
  id: Math.random().toString(),
}));

export const SEARCH_TLLNESS = [...Object.values(TLLNESS)].map(item => ({
  ...item,
  id: Math.random().toString(),
}));

export const SEARCH_ALL = [...SEARCH_PLACES, ...SEARCH_TLLNESS];

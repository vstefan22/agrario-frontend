import flImage from './src/assets/images/fl-image.png';
import { QuestionsHelpItem } from './src/types/questions-help-types';
import fieldsImg from './src/assets/images/fieldsImage.png';

export const plotsListData = [
  {
    id: 'FL-001',
    state_name: 'Hessen',
    plz: 60306,
    municipality_name: 'Frankfurt',
    district_name: 'Westend',
    cadastral_area: 'Field 12',
    cadastral_sector: 'Parcel 34',
    land_use: 'Residential Land',
    plot_number_main: 10000,
    plot_number_secondary: '123-456-789',
    image: flImage,
    analyzePlus: 'active',
  },
  {
    id: 'FL-002',
    state_name: 'Bayern',
    plz: 80331,
    municipality_name: 'Munich',
    district_name: 'Altstadt',
    cadastral_area: 'Field 15',
    cadastral_sector: 'Parcel 56',
    land_use: 'Commercial Land',
    plot_number_main: 15000,
    plot_number_secondary: '987-654-321',
    image: flImage,
    analyzePlus: 'inactive',
  },
  {
    id: 'FL-003',
    state_name: 'Baden-Württemberg',
    plz: 70173,
    municipality_name: 'Stuttgart',
    district_name: 'Mitte',
    cadastral_area: 'Field 20',
    cadastral_sector: 'Parcel 78',
    land_use: 'Agricultural Land',
    plot_number_main: 20000,
    plot_number_secondary: '456-789-123',
    image: flImage,
    analyzePlus: 'active',
  },
];

export const questionsHelpData: QuestionsHelpItem[] = [
  {
    title: 'Morbi fringilla metus ac lacus dapibus.',
    content:
      'Sed nec pharetra felis, in ultrices neque. Phasellus varius semper tellus, ac imperdiet erat commodo id.',
  },
  {
    title: 'What we like to do & what we don’t like to do',
    content:
      'Sed nec pharetra felis, in ultrices neque. Phasellus varius semper tellus, ac imperdiet erat commodo id.',
  },
  {
    title:
      'Fusce fermentum tempus sapien a sagittis tellus mattis id. Cras et enim ex.',
    content:
      'Sed nec pharetra felis, in ultrices neque. Phasellus varius semper tellus, ac imperdiet erat commodo id.',
  },
  {
    title: 'Nunc aliquam tempus iaculis. Ut eu imperdiet velit.',
    content:
      'Sed nec pharetra felis, in ultrices neque. Phasellus varius semper tellus, ac imperdiet erat commodo id.',
  },
];

export const flurstuckData = {
  id: 'FL-001',
  state_name: 'Hessen',
  plz: 60306,
  municipality_name: 'Frankfurt',
  district_name: 'Westend',
  cadastral_area: 'Field 12',
  cadastral_sector: 'Parcel 34',
  land_use: 'Residential Land',
  plot_number_main: 10000,
  plot_number_secondary: '123-456-789',
  image: flImage,
  analyzePlus: 'active',
};

export const offerItemData = {
  id: 'FL-001',
  state_name: 'Hessen',
  plz: 60306,
  municipality_name: 'Frankfurt',
  district_name: 'Westend',
  cadastral_area: 'Field 12',
  cadastral_sector: 'Parcel 34',
  land_use: 'Residential Land',
  plot_number_main: 10000,
  image: flImage,
};

export const analysePlusCartData = [
  {
    id: 'FL-56141',
    state_name: 'Hessen',
    plz: 65366,
    municipality_name: 'Rüdesheim',
    district_name: 'Hasensprung',
    cadastral_area: '2',
    cadastral_sector: '35-6',
    land_use: 'Grünland',
    plot_number_main: 10000,
    plot_number_secondary: '123-456-789',
    image: flImage,
    analyzePlus: 'active',
  },
  {
    id: 'FL-56142',
    state_name: 'Hessen',
    plz: 65366,
    municipality_name: 'Rüdesheim',
    district_name: 'Hasensprung',
    cadastral_area: '2',
    cadastral_sector: '35-6',
    land_use: 'Grünland',
    plot_number_main: 10000,
    plot_number_secondary: '123-456-789',
    image: flImage,
    analyzePlus: 'active',
  },
  {
    id: 'FL-56143',
    state_name: 'Hessen',
    plz: 65366,
    municipality_name: 'Rüdesheim',
    district_name: 'Hasensprung',
    cadastral_area: '2',
    cadastral_sector: '35-6',
    land_use: 'Grünland',
    plot_number_main: 10000,
    plot_number_secondary: '123-456-789',
    image: flImage,
    analyzePlus: 'active',
  },
];

export const thankYouMarketingData = [
  {
    id: 'FL-001',
    state_name: 'Hessen',
    plz: 60306,
    municipality_name: 'Frankfurt',
    district_name: 'Westend',
    cadastral_area: 'Field 12',
    cadastral_sector: 'Parcel 34',
    land_use: 'Residential Land',
    plot_number_main: 10000,
    plot_number_secondary: '123-456-789',
    image: flImage,
    analyzePlus: 'active',
  },
];

export const detailsData = [
  {
    id: 'FL-001',
    state_name: 'Hessen',
    plz: 60306,
    municipality_name: 'Frankfurt',
    district_name: 'Westend',
    cadastral_area: 'Field 12',
    cadastral_sector: 'Parcel 34',
    land_use: 'Residential Land',
    plot_number_main: 10000,
    plot_number_secondary: '123-456-789',
    image: fieldsImg,
    analyzePlus: 'inactive',
    infrastructure: 'Freiflächensolar',
    evaluation: 'Potentiell geeignet',
  },
];

export const myOfferData = [
  {
    id: 'FL-56141',
    state_name: 'Hessen',
    plz: 65366,
    municipality_name: 'Rüdesheim',
    district_name: 'Hasensprung',
    cadastral_area: '2',
    cadastral_sector: '35-6',
    land_use: 'Grünland',
    plot_number_main: 10000,
    plot_number_secondary: '123-456-789',
    image: fieldsImg,
    analyzePlus: 'active',
  },
  {
    id: 'FL-56142',
    state_name: 'Hessen',
    plz: 65366,
    municipality_name: 'Rüdesheim',
    district_name: 'Hasensprung',
    cadastral_area: '2',
    cadastral_sector: '35-6',
    land_use: 'Grünland',
    plot_number_main: 10000,
    plot_number_secondary: '987-654-321',
    image: flImage,
    analyzePlus: 'inactive',
  },
];

export const analysePlusValues = {
  items: 3,
  costPerItem: 199,
  sumOfItems: 597,
  taxPercent: 19,
  taxAmount: 113.34,
  subtotal: 711.34,
  total: 711.34,
};

export const plotSearchData = [
  {
    id: 'FL-56141',
    state_name: 'Hessen',
    district_name: 'Rheingau-Taunus',
    land_use: 'Grünland',
    plot_number_main: 10000,
    image: flImage,
    infrastructure: 'Wind, Biodiversität',
    evaluation: 'Potentiell geeignet',
  },
  {
    id: 'FL-56142',
    state_name: 'Hessen',
    district_name: 'Rheingau-Taunus',
    land_use: 'Grünland',
    plot_number_main: 10000,
    image: fieldsImg,
    infrastructure: 'Freiflächensolar',
    evaluation: 'Potentiell geeignet',
  },
];

export const myWatchlistData = [
  {
    id: 'FL-56141',
    state_name: 'Hessen',
    district_name: 'Rheingau-Taunus',
    land_use: 'Grünland',
    plot_number_main: 10000,
    image: flImage,
    infrastructure: 'Freiflächensolar',
    evaluation: 'Potentiell geeignet',
  },
  {
    id: 'FL-56142',
    state_name: 'Hessen',
    district_name: 'Rheingau-Taunus',
    land_use: 'Grünland',
    plot_number_main: 10000,
    image: fieldsImg,
    infrastructure: 'Freiflächensolar',
    evaluation: 'Potentiell geeignet',
  },
];

export const receivedMessages = [
  {
    name: 'Jullu Jalal',
    message: 'Our Bachelor of Commerce program is ACBSP-accredited.',
    time: '8:38 AM',
    category: '',
  },
  {
    name: 'Minerva Barnett',
    message: 'Get Best Advertiser In Your Side Pocket',
    time: '8:13 AM',
    category: '',
  },
  {
    name: 'Peter Lewis',
    message: 'Vacation Home Rental Success',
    time: '7:52 PM',
    category: '',
  },
  {
    name: 'Anthony Briggs',
    message: 'Free Classifieds Using Them To Promote Your Stuff Online',
    time: '7:52 PM',
    category: '',
  },
  {
    name: 'Clifford Morgan',
    message: 'Enhance Your Brand Potential With Giant Advertising Blimps',
    time: '4:13 PM',
    category: '',
  },
  {
    name: 'Cecilia Webster',
    message: 'Always Look On The Bright Side Of Life',
    time: '3:52 PM',
    category: '',
  },
  {
    name: 'Harvey Manning',
    message: 'Curling Irons Are As Individual As The Women Who Use Them',
    time: '2:30 PM',
    category: '',
  },
  {
    name: 'Willie Blake',
    message: 'Our Bachelor of Commerce program is ACBSP-accredited.',
    time: '8:38 AM',
    category: '',
  },
  {
    name: 'Minerva Barnett',
    message: 'Get Best Advertiser In Your Side Pocket',
    time: '8:13 AM',
    category: 'Work',
  },
  {
    name: 'Fanny Weaver',
    message: 'Free Classifieds Using Them To Promote Your Stuff Online',
    time: '7:52 PM',
    category: '',
  },
  {
    name: 'Olga Hogan',
    message: 'Enhance Your Brand Potential With Giant Advertising Blimps',
    time: '4:13 PM',
    category: 'Social',
  },
  {
    name: 'Lora Houston',
    message: 'Vacation Home Rental Success',
    time: '7:52 AM',
    category: 'Friends',
  },
];

export const activeAuctionsData = [
  {
    id: 'FL-56141',
    state_name: 'Hessen',
    plz: 65366,
    municipality_name: 'Rüdesheim',
    district_name: 'Hasensprung',
    cadastral_area: '2',
    cadastral_sector: '35-6',
    land_use: 'Grünland',
    plot_number_main: 10000,
    plot_number_secondary: '987-654-321',
    image: flImage,
    analyzePlus: 'active',
    infrastructure: 'Wind, Biodiversität',
    evaluation: 'Potentiell geeignet',
  },
  {
    id: 'FL-56142',
    state_name: 'Hessen',
    plz: 65366,
    municipality_name: 'Rüdesheim',
    district_name: 'Hasensprung',
    cadastral_area: '2',
    cadastral_sector: '35-6',
    land_use: 'Grünland',
    plot_number_main: 10000,
    plot_number_secondary: '987-654-321',
    image: fieldsImg,
    analyzePlus: 'active',
    infrastructure: 'Freiflächensolar',
    evaluation: 'Potentiell geeignet',
  },
];

export const myAuctionsData = [
  {
    id: 'FL-56141',
    state_name: 'Hessen',
    plz: 65366,
    municipality_name: 'Rüdesheim',
    district_name: 'Hasensprung',
    cadastral_area: '2',
    cadastral_sector: '35-6',
    land_use: 'Grünland',
    plot_number_main: 10000,
    plot_number_secondary: '987-654-321',
    image: fieldsImg,
    analyzePlus: 'active',
    infrastructure: 'Freiflächensolar',
    evaluation: 'Potentiell geeignet',
  },
  {
    id: 'FL-56142',
    state_name: 'Hessen',
    plz: 65366,
    municipality_name: 'Rüdesheim',
    district_name: 'Hasensprung',
    cadastral_area: '2',
    cadastral_sector: '35-6',
    land_use: 'Grünland',
    plot_number_main: 10000,
    plot_number_secondary: '987-654-321',
    image: fieldsImg,
    analyzePlus: 'active',
    infrastructure: 'Freiflächensolar',
    evaluation: 'Potentiell geeignet',
  },
];

export const myOfferDetailsData = {
  availableDate: new Date('2024-08-11'),
  select1: 'Option 1',
  select2: 'Option 2',
  select3: 'Option 3',
  noUsageRestriction: false,
  windEnergyRestriction: true,
  solarEnergyRestriction: true,
  energyStorageRestriction: false,
  ecoEnhancementsRestriction: true,
  message: 'This is message from user...',
  files: [] as File[],
  isOwnerOrAuthorized: true,
  acceptPrivacyPolicy: true,
  acceptTermsAndConditions: true,
  other: true,
};

export const tenderCriteriaData = {
  list: [
    'There are many variations of passages of Lorem.',
    'There are many variations of passages of Lorem.',
    'There are many variations of passages of Lorem.',
    'There are many variations of passages of Lorem.',
    'There are many variations of passages of Lorem.',
  ],
  sonstiges:
    'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.',
};

export const placeABidData = {
  select1: 'Option 3',
  select2: 'Ja',
  select3: 'Ja',
  select4: 'Nein',
  select5: 'Keine Angabe',
  input1: 'Asdfgg',
  input2: 'Fsadjdg sdfbb',
  input3: 'Lfmdsm fsdmpf fasda',
  input4: '100 €',
  textArea1: 'This is some random text by user....',
  textArea2: 'This is sec rand text.......',
  checkbox1: true,
  checkbox2: true,
  checkbox3: true,
};

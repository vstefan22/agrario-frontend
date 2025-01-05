import flImage from './src/assets/images/fl-image.png';
import { QuestionsHelpItem } from './src/types/questions-help-types';
import fieldsImg from './src/assets/images/fieldsImage.png';

export const plotsListData = [
  {
    id: 'FL-001',
    state: 'Hessen',
    plz: 60306,
    city: 'Frankfurt',
    district: 'Westend',
    flur: 'Field 12',
    flurstuck: 'Parcel 34',
    registry: 'Residential Land',
    size: 10000,
    parcelNumber: '123-456-789',
    image: flImage,
    analyzePlus: 'active',
  },
  {
    id: 'FL-002',
    state: 'Bayern',
    plz: 80331,
    city: 'Munich',
    district: 'Altstadt',
    flur: 'Field 15',
    flurstuck: 'Parcel 56',
    registry: 'Commercial Land',
    size: 15000,
    parcelNumber: '987-654-321',
    image: flImage,
    analyzePlus: 'inactive',
  },
  {
    id: 'FL-003',
    state: 'Baden-Württemberg',
    plz: 70173,
    city: 'Stuttgart',
    district: 'Mitte',
    flur: 'Field 20',
    flurstuck: 'Parcel 78',
    registry: 'Agricultural Land',
    size: 20000,
    parcelNumber: '456-789-123',
    image: flImage,
    analyzePlus: 'active',
  },
];

export const questionsHelpData: QuestionsHelpItem[] = [
  {
    title: 'Morbi fringilla metus ac lacus dapibus.',
    content:
      'Sed nec pharetra felis, in ultrices neque. Phasellus varius semper tellus, ac imperdiet erat commodo id. Aenean lobortis justo et velit ornare malesuada. Nam lacus orci, elementum eu odio ac, molestie venenatis turpis. Mauris ex ipsum, dictum gravida pretium sed, molestie nec ante. Sed ac ullamcorper nisi.',
  },
  {
    title: 'What we like to do & what we don’t like to do',
    content:
      'Sed nec pharetra felis, in ultrices neque. Phasellus varius semper tellus, ac imperdiet erat commodo id. Aenean lobortis justo et velit ornare malesuada. Nam lacus orci, elementum eu odio ac, molestie venenatis turpis. Mauris ex ipsum, dictum gravida pretium sed, molestie nec ante. Sed ac ullamcorper nisi.',
  },
  {
    title:
      'Fusce fermentum tempus sapien a sagittis tellus mattis id. Cras et enim ex.',
    content:
      'Sed nec pharetra felis, in ultrices neque. Phasellus varius semper tellus, ac imperdiet erat commodo id. Aenean lobortis justo et velit ornare malesuada. Nam lacus orci, elementum eu odio ac, molestie venenatis turpis. Mauris ex ipsum, dictum gravida pretium sed, molestie nec ante. Sed ac ullamcorper nisi.',
  },
  {
    title: 'Nunc aliquam tempus iaculis. Ut eu imperdiet velit.',
    content:
      'Sed nec pharetra felis, in ultrices neque. Phasellus varius semper tellus, ac imperdiet erat commodo id. Aenean lobortis justo et velit ornare malesuada. Nam lacus orci, elementum eu odio ac, molestie venenatis turpis. Mauris ex ipsum, dictum gravida pretium sed, molestie nec ante. Sed ac ullamcorper nisi.',
  },
];

export const flurstuckData = {
  id: 'FL-001',
  state: 'Hessen',
  plz: 60306,
  city: 'Frankfurt',
  district: 'Westend',
  flur: 'Field 12',
  flurstuck: 'Parcel 34',
  registry: 'Residential Land',
  size: 10000,
  parcelNumber: '123-456-789',
  image: flImage,
  analyzePlus: 'active',
};

export const offerItemData = {
  id: 'FL-001',
  state: 'Hessen',
  plz: 60306,
  city: 'Frankfurt',
  district: 'Westend',
  flur: 'Field 12',
  flurstuck: 'Parcel 34',
  registry: 'Residential Land',
  size: 10000,
  image: flImage,
};

export const analysePlusCartData = [
  {
    id: 'FL-56141',
    bundesland: 'Hessen',
    plz: 65366,
    gemeinde: 'Rüdesheim',
    gemarkung: 'Hasensprung',
    flur: '2',
    flurstuck: '35-6',
    nll: 'Grünland',
    grobe: 10000,
  },

  {
    id: 'FL-56142',
    bundesland: 'Hessen',
    plz: 65366,
    gemeinde: 'Rüdesheim',
    gemarkung: 'Hasensprung',
    flur: '2',
    flurstuck: '35-6',
    nll: 'Grünland',
    grobe: 10000,
  },

  {
    id: 'FL-56143',
    bundesland: 'Hessen',
    plz: 65366,
    gemeinde: 'Rüdesheim',
    gemarkung: 'Hasensprung',
    flur: '2',
    flurstuck: '35-6',
    nll: 'Grünland',
    grobe: 10000,
  },
];

export const thankYouMarketingData = [
  {
    id: 'FL-001',
    state: 'Hessen',
    plz: 60306,
    city: 'Frankfurt',
    district: 'Westend',
    flur: 'Field 12',
    flurstuck: 'Parcel 34',
    registry: 'Residential Land',
    size: 10000,
    parcelNumber: '123-456-789',
    image: flImage,
    analyzePlus: 'active',
  },
];

export const detailsData = [
  {
    id: 'FL-001',
    state: 'Hessen',
    plz: 60306,
    city: 'Frankfurt',
    district: 'Westend',
    flur: 'Field 12',
    flurstuck: 'Parcel 34',
    registry: 'Residential Land',
    size: 10000,
    parcelNumber: '123-456-789',
    image: fieldsImg,
    analyzePlus: 'inactive',
    infrastructure: 'Freiflächensolar',
    evaluation: 'Potentiell geeignet',
  },
];

export const myOfferData = [
  {
    id: 'FL-56141',
    state: 'Hessen',
    plz: 65366,
    city: 'Rüdesheim',
    district: 'Hasensprung',
    flur: '2',
    flurstuck: '35-6',
    registry: 'Grünland',
    size: 10000,
    parcelNumber: '123-456-789',
    image: fieldsImg,
    analyzePlus: 'active',
  },
  {
    id: 'FL-56142',
    state: 'Hessen',
    plz: 65366,
    city: 'Rüdesheim',
    district: 'Hasensprung',
    flur: '2',
    flurstuck: '35-6',
    registry: 'Grünland',
    size: 10000,
    parcelNumber: '987-654-321',
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
    state: 'Hessen',
    district: 'Rheingau-Taunus',
    registry: 'Grünland',
    size: 10000,
    image: flImage,
    infrastructure: 'Wind, Biodiversität',
    evaluation: 'Potentiell geeignet',
  },
  {
    id: 'FL-56142',
    state: 'Hessen',
    district: 'Rheingau-Taunus',
    registry: 'Grünland',
    size: 10000,
    image: fieldsImg,
    infrastructure: 'Freiflächensolar',
    evaluation: 'Potentiell geeignet',
  },
];

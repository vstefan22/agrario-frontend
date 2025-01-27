export const sortOptions = [
  'Sortieren nach Eignung',
  'Sortieren nach Bundesland',
  'Sortieren nach Größe',
];

export const numberOfEmployees = ['1-5', '6-10', '10-50', '50-200', '> 200'];

export const employeesOptionsMap: Record<string, number> = {
  '1-5': 1,
  '6-10': 2,
  '10-50': 3,
  '50-200': 4,
  '> 200': 5,
};

// eslint-disable-next-line
export const employeesOptionsReverseMap: Record<any, string> = {
  1: '1-5',
  2: '6-10',
  3: '10-50',
  4: '50-200',
  5: '> 200',
};

export const MWOptions = ['1-20 MW', '21-100 MW', '101-500 MW', '> 500 MW'];

export const bidOptions = ['Ja', 'Nein', 'Keine Angabe'];

export const utilization = [
  'Offen für Verkauf und Verpachtung',
  'Verkauf',
  'Verpachtung',
];

export const landOptions = ['Pacht', 'Kauf', 'Beides'];

export const mwOptionsMap: Record<string, number> = {
  '1-20 MW': 1,
  '21-100 MW': 2,
  '101-500 MW': 3,
  '> 500 MW': 4,
};

// eslint-disable-next-line
export const mwOptionsReverseMap: Record<any, string> = {
  1: '1-20 MW',
  2: '21-100 MW',
  3: '101-500 MW',
  4: '> 500 MW',
};

export const auctionOptionsMap: Record<string, string> = {
  Pacht: 'LE',
  Kauf: 'SA',
  Beides: 'BO',
  Ja: 'YES',
  Nein: 'NO',
  'Keine Angabe': 'NOT',
};

export const auctionOptionsReverseMap: Record<string, string> = {
  LE: 'Pacht',
  SA: 'Kauf',
  BO: 'Beides',
  YES: 'Ja',
  NO: 'Nein',
  NOT: 'Keine Angabe',
};

export const preferredRegionality = [
  'Keine Präferenz',
  'Firmensitz in Deutschland',
  'Firmensitz im Bundesland des Grundstücks',
];

export const shareholderModel = [
  'Keine Präferenz',
  'Beteiligungen am Erlös',
  'Beteiligungen an der Projektgesellschaf',
  'Beides',
];

export const optionsMap: Record<string, string> = {
  'Offen für Verkauf und Verpachtung': 'NO',
  Verkauf: 'SA',
  Verpachtung: 'LE',
  'Firmensitz in Deutschland': 'DE',
  'Firmensitz im Bundesland des Grundstücks': 'BL',
  'Beteiligungen am Erlös': 'IN',
  'Beteiligungen an der Projektgesellschaf': 'CO',
  Beides: 'BO',
};

export const optionsMapReverse: Record<string, string> = {
  NO: 'Offen für Verkauf und Verpachtung',
  SA: 'Verkauf',
  LE: 'Verpachtung',
  DE: 'Firmensitz in Deutschland',
  BL: 'Firmensitz im Bundesland des Grundstücks',
  IN: 'Beteiligungen am Erlös',
  CO: 'Beteiligungen an der Projektgesellschaf',
  BO: 'Beides',
};

export const landownerSupportOptions = [
  'Flurstücksanalyse PLUS',
  'Angebot erstellen',
  'Sonstiges',
];

export const developerSupportOptions = [
  'Mein Subscription Plan',
  'Fragen zu einer Auktion',
  'Sonstiges',
];

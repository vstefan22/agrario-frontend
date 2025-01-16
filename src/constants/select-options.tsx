export const sortOptions = [
  'Sortieren nach Eignung',
  'Sortieren nach Bundesland',
  'Sortieren nach Größe',
];

export const profileOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const bidOptions = ['Ja', 'Nein', 'Keine Angabe'];

export const utilization = ['Keine Einschränkung', 'Verkauf', 'Verpachtung'];

export const landOptions = ['Pacht', 'Kauf', 'Beides'];

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
  'Keine Einschränkung',
  'Firmensitz in Deutschland',
  'Firmensitz im Bundesland des Grundstücks',
];

export const shareholderModel = [
  'Keine Einschränkung',
  'Beteiligungen am Erlös',
  'Beteiligungen an der Projektgesellschaf',
  'Beides',
];

export const optionsMap: Record<string, string> = {
  'Keine Einschränkung': 'NO',
  Verkauf: 'SA',
  Verpachtung: 'LE',
  'Firmensitz in Deutschland': 'DE',
  'Firmensitz im Bundesland des Grundstücks': 'BL',
  'Beteiligungen am Erlös': 'IN',
  'Beteiligungen an der Projektgesellschaf': 'CO',
  Beides: 'BO',
};

export const optionsMapReverse: Record<string, string> = {
  NO: 'Keine Einschränkung',
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

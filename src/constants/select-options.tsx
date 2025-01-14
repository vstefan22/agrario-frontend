export const sortOptions = [
  'Sortieren nach Eignung',
  'Sortieren nach Bundesland',
  'Sortieren nach Größe',
];

export const profileOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const bidOptions = ['Ja', 'Nein', 'Keine Angabe'];

export const defaultOptions = ['Option 1', 'Option 2', 'Option 3'];

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

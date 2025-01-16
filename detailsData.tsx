import locationImg from './src/assets/images/location.png';
import plantImg from './src/assets/images/plant.png';
import raindropImg from './src/assets/images/raindrop.png';
import electricPylonImg from './src/assets/images/electric-pylon.png';
import solarPanelImg from './src/assets/images/solar-panel.png';
import windEnergyImg from './src/assets/images/wind-energy.png';
import electricDatabaseImg from './src/assets/images/electric-database.png';

export const showDetailsData = [
  {
    image: `${locationImg}`,
    title: 'Lage Und Nutzung',
    description:
      'Hier finden Sie Informationen zur Lage, Größe und verschiedenen Nutzung Ihres Flurstücks aus dem amtlichen Katasterinformationssystem.',
    columns: [
      { key: 'Bezeichnung', label: 'Bezeichnung' },
      { key: 'Bundesland', label: 'Bundesland [-]' },
      { key: 'Landkreis', label: 'Landkreis [-]' },
      { key: 'Gemeinde', label: 'Gemeinde [-]' },
      { key: 'Gemarkung', label: 'Gemarkung [-]' },
      { key: 'Flur', label: 'Flur [-]' },
      { key: 'Flurstuck', label: 'Flurstück [-]' },
      { key: 'Grobe', label: 'Größe [m2]' },
      { key: 'Grobe2', label: 'Größe [m2]' },
      { key: 'Distanz', label: 'Distanz Siedlunggebiet [km]' },
    ],
    data: {
      Bezeichnung: 'Wert',
      Bundesland: 'Hessen',
      Landkreis: 'Rheingau-Taunus',
      Gemeinde: 'Rüdesheim',
      Gemarkung: 'Hasensprung',
      Flur: '2',
      Flurstuck: '36-4',
      Grobe: '10.431',
      Grobe2: 'Grünland',
      Distanz: '1.9',
    },
  },
  {
    image: `${plantImg}`,
    title: 'Landwirtschaftliche Bodeneigenschaften',
    description:
      'Hier finden Sie Informationen zur Bodeneigenschaften und Bodenqualität Ihres Flurstückes',
    columns: [
      { key: 'Bezeichnung', label: 'Bezeichnung Bodeneigenschaft' },
      { key: 'Nutzart', label: 'Nutzart [-]' },
      { key: 'Bodenart', label: 'Bodenart [-]' },
      { key: 'Bodenstufe', label: 'Bodenstufe [-]' },
      { key: 'Bodenzahl', label: 'Bodenzahl [-]' },
      { key: 'Acker', label: 'Acker/Gründlandzahl [-]' },
    ],
    data: {
      Bezeichnung: 'Wert',
    },
  },
  {
    image: `${plantImg}`,
    title: 'Natur- und Landschaftsschutz',
    description:
      'Hier finden Sie Informationen Schutzgebieten aus den Kategorien Natur, Landschaft und FFH (Flora-Fauna-Habitat)',
    columns: [
      { key: 'Bezeichnung', label: 'Bezeichnung Restriktionsgebiet' },
      { key: 'Naturschutzgebiet', label: 'Naturschutzgebiet (§ 23 BNatSchG )' },
      { key: 'Nationalpark', label: 'Nationalpark (§ 24 BNatSchG)' },
      { key: 'Naturparke', label: 'Naturparke (§ 27 BNatSchG)' },
      { key: 'SPA', label: 'SPA Vogelschutzgebiet (NATURA2000 EU-Richtlinie)' },
      { key: 'FFH', label: 'FFH Gebiete (NATURA2000 EU-Richtlinie)' },
      { key: 'RAMSAR', label: 'RAMSAR-Feuchtgebiete (RAMSAR Konvention)' },
      {
        key: 'Gesetzlich',
        label: 'Gesetzlich geschützte Biotope (§ 30 BNatSchG )',
      },
      {
        key: 'Landschaftsschutzgebiete',
        label: 'Landschaftsschutzgebiete (§ 26 BNatSchG )',
      },
      {
        key: 'Geschutzte',
        label: 'Geschützte Landschaftsbestandteile (§ 29 BNatSchG)',
      },
    ],
    data: {
      Bezeichnung: 'Anteil Des Flurstücks [%]',
    },
  },
  {
    image: `${raindropImg}`,
    title: 'Gewässer, Wasserschutz und Hochwasserrisiko',
    description:
      'Hier finden Sie Informationen über Schutzgebiete und Restriktionen aus der Kategorie "Wasser"',
    columns: [
      {
        key: 'Bezeichnung',
        label: 'Bezeichnung Schutz- bzw. Restriktionsgebiet',
      },
      { key: 'Wasserschutzgebiet1', label: 'Wasserschutzgebiet Zone 1' },
      { key: 'Wasserschutzgebiet2', label: 'Wasserschutzgebiet Zone 2' },
      { key: 'Wasserschutzgebiet3', label: 'Wasserschutzgebiet Zone 3' },
      {
        key: 'Heilquellenschutzgebiet1',
        label: 'Heilquellenschutzgebiet Zone 1',
      },
      {
        key: 'Heilquellenschutzgebiet2',
        label: 'Heilquellenschutzgebiet Zone 2',
      },
      {
        key: 'Heilquellenschutzgebiet3',
        label: 'Heilquellenschutzgebiet Zone 3',
      },
      {
        key: 'Trinkwasserschutzgebiet1',
        label: 'Trinkwasserschutzgebiet Zone 1',
      },
      {
        key: 'Trinkwasserschutzgebiet2',
        label: 'Trinkwasserschutzgebiet Zone 2',
      },
      {
        key: 'Trinkwasserschutzgebiet3',
        label: 'Trinkwasserschutzgebiet Zone 3',
      },
      { key: 'Festgesetzte', label: 'Festgesetzte Überschwemmungsgebiete' },
      { key: 'Vorlaufig', label: 'Vorläufig gesicherte Überschwemmungsbiete' },
      { key: 'HQhaeufig', label: 'Hochwasserrisikogebiete HQhaeufig (10-50)' },
      { key: 'HQ100', label: 'Hochwasserrisikogebiete HQ100' },
      { key: 'HQExtrem', label: 'Hochwasserrisikogebiete HQExtrem' },
    ],
    data: {
      Bezeichnung: 'Anteil Des Flurstücks [%]',
    },
  },
  {
    image: `${electricPylonImg}`,
    title: 'Stromnetz und Infrastruktur',
    description:
      'Hier finden Sie Informationen über die nahe des Grundstückes gelegenen Anschlussmöglichkeiten an Stromnetz und Verkehrsinfrastruktur',
    columns: [
      {
        key: 'Bezeichnung',
        label: 'Bezeichnung',
      },
      { key: 'Strom', label: 'Strom' },
      {
        key: 'Zustandiger',
        label: 'Zuständiger Übertragungsnetzbetreiber [-]',
      },
      {
        key: 'Distanz1',
        label: 'Distanz Umspannwerk Mittelspannung/Hochspannung [km]',
      },
      {
        key: 'Distanz2',
        label: 'Distanz Umspannwerk Hochspannung/Höchstspannung [km]',
      },
      { key: 'Distanz3', label: 'Distanz Höchstspannungsleitungs-Mast [km]' },
      { key: 'Distanz4', label: 'Distanz Hochspannungsleitungs-Mast [km]' },
      { key: 'Distanz5', label: 'Distanz Mittelspannungsleitung-Mast [km]' },
      { key: 'Verkehr', label: 'Verkehr' },
      { key: 'Distanz6', label: 'Distanz Autobahn Ab-/Auffahrt [km]' },
      { key: 'Distanz7', label: 'Distanz Bundesautobahn [km]' },
      { key: 'Distanz8', label: 'Distanz Bundesstraße [km]' },
      { key: 'Distanz9', label: 'Distanz Landesstraße [km]' },
      { key: 'Distanz10', label: 'Distanz Schienenwege [km]' },
    ],
    data: {
      Bezeichnung: 'Wert',
    },
  },
  {
    image: `${solarPanelImg}`,
    title: 'Solarpark',
    description:
      'Hier finden Sie relevante Informationen, welche die Eignung ihrer Fläche für eine Freiflächen-Solarenergieanlage betreffen',
    columns: [
      {
        key: 'Bezeichnung',
        label: 'Bezeichnung',
      },
      {
        key: 'Geeignet',
        label: 'Geeignet für Freiflächen-Solarenergie gemäß Vorab-Analyse [%]',
      },
      {
        key: 'Mogliche',
        label: 'Mögliche Pachteinnahmen',
      },
      {
        key: 'Jahrliche',
        label: 'Jährliche Pachteinnahmen bei Verpachtung [€]',
      },
      {
        key: 'Typische',
        label: 'Typische Vertragslaufzeit [Jahre]',
      },
      {
        key: 'Summierte',
        label: 'Summierte Einnahmen nach Vertragslaufzeit [€]',
      },
      {
        key: 'Zusatzliche1',
        label: 'Zusätzliche Einnahmen für Standortgemeinde pro Jahr [€]',
      },
      {
        key: 'Zusatzliche2',
        label:
          'Zusatzliche Einnahmen für Standortgemeinde nach Vertragslaufzeit [€]',
      },
      { key: 'Mehrwert', label: 'Mehrwert für Menschen, Klima & Umwelt' },
      { key: 'Durch', label: 'Durch Grünstrom zu versorgende Haushalte [-]' },
      { key: 'Einsparung1', label: 'CO2 Einsparung pro Jahr [kg]' },
      {
        key: 'Einsparung2',
        label: 'CO2 Einsparung nach Vertragslaufzeit [kg]',
      },
      { key: 'Energieertrag', label: 'Energieertrag' },
      {
        key: 'Durchschnittliche',
        label:
          'Durchschnittliche jährliche Globalstrahlung am Standort [kWh/m2]',
      },
      { key: 'Spezifischer', label: 'Spezifischer Energieertrag [kWh/kWp]' },
      { key: 'Optimale', label: 'Optimale Modulneigung [°]' },
      { key: 'EEG', label: 'EEG-Förderfähigkeit' },
      {
        key: 'Anteil',
        label: 'Anteil landwirtschaftlich benachteiligte Gebiete [%]',
      },
      {
        key: 'Anteil1',
        label: 'Anteil landwirtschaftlich benachteiligte Gebiete [%]',
      },
      { key: 'Anteil2', label: 'Anteil Fläche 500m Autobahn Randstreifen [%]' },
      {
        key: 'Anteil3',
        label: 'Anteil Fläche 500m Bahngleise Randstreifen [%]',
      },
      {
        key: 'Baurechtliche',
        label: 'Baurechtliche Privilegierung gem. §35 BauGB',
      },
      { key: 'Anteil4', label: 'Anteil Fläche 200m Autobahn Randstreifen [%]' },
      {
        key: 'Anteil5',
        label: 'Anteil Fläche 200m Bahngleise Randstreifen [%]',
      },
    ],
    data: {
      Bezeichnung: 'Wert',
    },
  },

  {
    image: `${windEnergyImg}`,
    title: 'Windenergie',
    description:
      'Hier finden Sie relevante Informationen, welche die Eignung ihrer Fläche für Windenergie betreffen',
    columns: [
      {
        key: 'Bezeichnung',
        label: 'Bezeichnung',
      },
      {
        key: 'Geeignet',
        label: 'Geeignet für Windenergie gemäß Vorab-Analyse [%]',
      },
      {
        key: 'Mogliche',
        label: 'Mögliche Pachteinnahmen',
      },
      {
        key: 'Jahrliche',
        label: 'Jährliche Pachteinnahmen bei Verpachtung [€]',
      },
      {
        key: 'Typische',
        label: 'Typische Vertragslaufzeit [Jahre]',
      },
      {
        key: 'Summierte',
        label: 'Summierte Einnahmen nach Vertragslaufzeit [€]',
      },
      {
        key: 'Zusatzliche1',
        label: 'Zusätzliche Einnahmen für Standortgemeinde pro Jahr [€]',
      },
      {
        key: 'Zusatzliche2',
        label:
          'Zusätzliche Einnahmen für Standortgemeinde nach Vertragslaufzeit [€]',
      },
      { key: 'Mehrwert', label: 'Mehrwert für Menschen, Klima & Umwelt' },
      { key: 'Durch', label: 'Durch Grünstrom zu versorgende Haushalte' },
      { key: 'Einsparung1', label: 'CO2 Einsparung pro Jahr' },
      { key: 'Einsparung2', label: 'CO2 Einsparung nach Vertragslaufzeit' },
      { key: 'Energieertrag', label: 'Energieertrag' },
      {
        key: 'Mittlere1',
        label: 'Mittlere Windgeschwindigkeit 100m Höhe [m/s]',
      },
      {
        key: 'Mittlere2',
        label: 'Mittlere Windgeschwindigkeit in 150m Höhe [m/s]',
      },
      {
        key: 'Mittlere3',
        label: 'Mittlere Windgeschwindigkeit in 200m Höhe [m/s]',
      },
      {
        key: 'Mittlere4',
        label: 'Mittlere Windleistungsdicht in 100m Höhe [W/m2]',
      },
      {
        key: 'Mittlere5',
        label: 'Mittlere Windleistungsdicht in 150m Höhe [W/m2]',
      },
      {
        key: 'Mittlere6',
        label: 'Mittlere Windgeschwindigkeit in 200m Höhe [m/s]',
      },
      { key: 'Planungsrechtliche', label: 'Planungsrechtliche Themen' },
      { key: 'Zustandige', label: 'Zuständige Regionalplanungsbehörde [-]' },
      {
        key: 'Flache',
        label: 'Fläche in Vorranggebiet Windenergie/Windenergiebereich [%]',
      },
      { key: 'Distanz1', label: 'Distanz Drehfunkfeuer [km]' },
      { key: 'Distanz2', label: 'Distanz Flughafen [km]' },
    ],
    data: {
      Bezeichnung: 'Wert',
    },
  },
  {
    image: `${plantImg}`,
    title: 'Natur- und Landschaftsschutz',
    description:
      'Hier finden Sie Informationen Schutzgebieten aus den Kategorien Natur, Landschaft und FFH (Flora-Fauna-Habitat)',
    columns: [
      { key: 'Bezeichnung', label: 'Bezeichnung Restriktionsgebiet' },
      { key: 'Naturschutzgebiet', label: 'Naturschutzgebiet (§ 23 BNatSchG )' },
      { key: 'Nationalpark', label: 'Nationalpark (§ 24 BNatSchG)' },
      { key: 'Naturparke', label: 'Naturparke (§ 27 BNatSchG)' },
      { key: 'SPA', label: 'SPA Vogelschutzgebiet (NATURA2000 EU-Richtlinie)' },
      { key: 'FFH', label: 'FFH Gebiete (NATURA2000 EU-Richtlinie)' },
      { key: 'RAMSAR', label: 'RAMSAR-Feuchtgebiete (RAMSAR Konvention)' },
      {
        key: 'Gesetzlich',
        label: 'Gesetzlich geschützte Biotope (§ 30 BNatSchG )',
      },
      {
        key: 'Landschaftsschutzgebiete',
        label: 'Landschaftsschutzgebiete (§ 26 BNatSchG )',
      },
      {
        key: 'Geschutzte',
        label: 'Geschützte Landschaftsbestandteile (§ 29 BNatSchG)',
      },
    ],
    data: {
      Bezeichnung: 'Anteil des Flurstücks [%]',
    },
  },
  {
    image: `${electricDatabaseImg}`,
    title: 'Energiespeicher',
    description:
      'Hier finden Sie relevante Informationen, welche die Eignung ihrer Fläche für einen Energiespeicher betreffen',
    columns: [
      { key: 'Bezeichnung', label: 'Bezeichnung' },
      { key: 'Established1', label: 'Established fact' },
      { key: 'Reader1', label: 'Reader will be distracted' },
      { key: 'Naturparke1', label: 'Naturparke (§ 27 BNatSchG)' },
      { key: 'Variations', label: 'Variations of passages' },
      { key: 'Contrary', label: 'Contrary to popular belief' },

      { key: 'Established2', label: 'Established fact' },
      { key: 'Reader2', label: 'Reader will be distracted' },
      {
        key: 'Landschaftsschutzgebiete',
        label: 'Landschaftsschutzgebiete (§ 26 BNatSchG )',
      },
      {
        key: 'Naturparke2',
        label: 'Naturparke (§ 27 BNatSchG)',
      },
    ],
    data: {
      Bezeichnung: 'Anteil des Flurstücks [%]',
    },
  },
  {
    image: `${electricDatabaseImg}`,
    title: 'Biodiversität & ökologische Aufwertungsmaßnahmen',
    description:
      'Hier finden Sie relevante Informationen, welche die Eignung ihrer Fläche für einen Energiespeicher betreffen',
    columns: [
      { key: 'Bezeichnung', label: 'Bezeichnung' },
      { key: 'Established1', label: 'Established fact' },
      { key: 'Reader1', label: 'Reader will be distracted' },
      { key: 'Naturparke1', label: 'Naturparke (§ 27 BNatSchG)' },
      { key: 'Variations', label: 'Variations of passages' },
      { key: 'Contrary', label: 'Contrary to popular belief' },
      { key: 'Established2', label: 'Established fact' },
      { key: 'Reader2', label: 'Reader will be distracted' },
      {
        key: 'Landschaftsschutzgebiete',
        label: 'Landschaftsschutzgebiete (§ 26 BNatSchG )',
      },
      {
        key: 'Naturparke2',
        label: 'Naturparke (§ 27 BNatSchG)',
      },
    ],
    data: {
      Bezeichnung: 'Anteil des Flurstücks [%]',
    },
  },
];

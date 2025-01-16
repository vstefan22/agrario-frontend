import { Helmet } from 'react-helmet-async';

const GlobalHelmet = () => (
  <Helmet>
    <meta charSet='utf-8' />
    <meta name='viewport' content='width=device-width, initial-scale=1.0' />
    <meta name='author' content='Agrario Energie-Marktplatz' />
    <meta
      name='description'
      content='Die Agrario Energy Marketplace App bietet eine Plattform, auf der Grundstückseigentümer ihre Parzellen registrieren, ihre Eignung für erneuerbare Energien bewerten und zur Pacht oder zum Verkauf anbieten können. Unternehmen und Projektentwickler können verfügbare Parzellen durchsuchen, überwachen und Gebote für Pacht oder Kauf abgeben.'
    />
    <meta
      name='keywords'
      content='Agrario, Energie-Marktplatz, erneuerbare Energien, Grundstückseigentümer, Projektentwickler, Parzellen zur Pacht, Parzellen zum Verkauf, Eignung für erneuerbare Energien, Energieprojekte, Grundstücksbewertung, Immobilienüberwachung, Gebote für Grundstücke'
    />
    <title>Agrario Energie-Marktplatz</title>
  </Helmet>
);

export default GlobalHelmet;

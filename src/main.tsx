import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

import './index.css';

const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_KEY;
const script = document.createElement('script');
script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&callback=initMap&v=weekly&libraries=drawing,geometry,places`;
script.defer = true;

script.addEventListener('load', () => {
  console.log('Google Maps script loaded!');
});

document.body.appendChild(script);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

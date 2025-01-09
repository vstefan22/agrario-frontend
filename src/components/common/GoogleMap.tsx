/// <reference types="@types/google.maps" />

import { useEffect, useRef, useState } from 'react';
import {
  PolygonData,
  PolygonType,
  LocationType,
} from '../../types/google-maps-types';

const MAP_DISPLAY_OPTIONS: google.maps.PolygonOptions = {
  fillColor: '#206f6a',
  fillOpacity: 0.65,
  strokeColor: '#104f50',
  strokeOpacity: 0.9,
  strokeWeight: 4,
};

type GoogleMapProps = {
  polygonData?: PolygonData;
  onMapClick?: (polygonData: PolygonType, locationData: LocationType) => void;
  mapSearchTerm?: string;
};

const GoogleMap = ({
  polygonData = [],
  onMapClick,
  mapSearchTerm,
}: GoogleMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow | null>(
    null
  );

  useEffect(() => {
    if (!mapRef.current) return;

    const createdMap = new google.maps.Map(mapRef.current, {
      center: { lat: 52.52, lng: 13.4 },
      zoom: 13,
      mapTypeId: 'hybrid',
      streetViewControl: false,
      mapTypeControl: false,
      panControl: false,
      rotateControl: false,
    });

    setMap(createdMap);
    setInfoWindow(new google.maps.InfoWindow());
  }, []);

  useEffect(() => {
    if (!map || !mapSearchTerm) return;
    if (mapSearchTerm.trim().length < 2) return;

    const service = new google.maps.places.PlacesService(map);

    const request: google.maps.places.TextSearchRequest = {
      query: mapSearchTerm,
      region: 'de',
    };

    service.textSearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        const place = results[0];
        if (place.geometry?.location) {
          map.setCenter(place.geometry.location);
          map.setZoom(15);
        }
      }
    });
  }, [map, mapSearchTerm]);

  useEffect(() => {
    if (!map || !onMapClick) return;

    const listener = map.addListener(
      'click',
      (e: google.maps.MapMouseEvent) => {
        if (e.latLng) {
          const lat = e.latLng.lat();
          const lng = e.latLng.lng();

          const geocoder = new google.maps.Geocoder();
          geocoder.geocode({ location: { lat, lng } }, (results, status) => {
            if (status === 'OK' && results && results.length) {
              const place = results[0];
              const addressComponents = place.address_components;
              console.log('addressComponents: ', addressComponents);

              const state = addressComponents.find((comp) =>
                comp.types.includes('administrative_area_level_1')
              );
              const district = addressComponents.find((comp) =>
                comp.types.includes('administrative_area_level_3')
              );
              const municipality = addressComponents.find((comp) =>
                comp.types.includes('locality')
              );
              const address = addressComponents.find((comp) =>
                comp.types.includes('route')
              );
              const addressNumber = addressComponents.find((comp) =>
                comp.types.includes('street_number')
              );
              const zipCode = addressComponents.find((comp) =>
                comp.types.includes('postal_code')
              );

              const polygonData: PolygonType = { lat, lng };

              const locationData: LocationType = {
                state_name: state?.long_name || '',
                district_name: district?.long_name || '',
                municipality_name: municipality?.long_name || '',
                cadastral_area: address?.long_name || '',
                cadastral_sector: addressNumber?.long_name || '',
                zipcode: zipCode?.long_name || '',
              };

              onMapClick(polygonData, locationData);
            } else {
              console.error('Reverse Geocoding failed:', status);
            }
          });
        }
      }
    );

    return () => {
      google.maps.event.removeListener(listener);
    };
  }, [map, onMapClick]);

  useEffect(() => {
    if (!map) return;
    if (polygonData.length === 0) return;

    const polygon = new google.maps.Polygon({
      paths: polygonData,
      ...MAP_DISPLAY_OPTIONS,
    });

    polygon.setMap(map);

    polygon.addListener('mouseover', () => {
      polygon.setOptions({ strokeWeight: 6 });
    });

    polygon.addListener('mouseout', () => {
      polygon.setOptions({ strokeWeight: 4 });
    });

    polygon.addListener('click', (event: google.maps.MapMouseEvent) => {
      if (infoWindow && event.latLng) {
        infoWindow.setPosition(event.latLng);
        // this is an example
        infoWindow.setContent(`
          <div style="color:black">
            <strong>Parcel Info:</strong><br/>
            Lokacija: ${event.latLng.lat().toFixed(5)}, ${event.latLng
          .lng()
          .toFixed(5)}
          </div>
        `);
        infoWindow.open(map);
      }
    });

    const bounds = new google.maps.LatLngBounds();
    polygonData.forEach((coord) => {
      bounds.extend(coord);
    });
    map.fitBounds(bounds);

    return () => {
      polygon.setMap(null);
    };
  }, [map, polygonData, infoWindow]);

  return (
    <div
      ref={mapRef}
      style={{
        width: '100%',
        height: '600px',
        borderRadius: '8px',
      }}
    />
  );
};

export default GoogleMap;

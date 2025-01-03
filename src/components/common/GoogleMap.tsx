/// <reference types="@types/google.maps" />

import { useEffect, useRef, useState } from 'react';

type PolygonCoord = {
  lat: number;
  lng: number;
};

export type PolygonData = PolygonCoord[];

const MAP_DISPLAY_OPTIONS: google.maps.PolygonOptions = {
  fillColor: '#206f6a',
  fillOpacity: 0.65,
  strokeColor: '#104f50',
  strokeOpacity: 0.9,
  strokeWeight: 4,
};

interface GoogleMapProps {
  polygonData?: PolygonData;
}

const GoogleMap = ({ polygonData = [] }: GoogleMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  // Prvi useEffect -> Inicijalizacija Google mape
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
  }, []);

  // Drugi useEffect -> Crtanje poligona kada dobijemo polygonData
  useEffect(() => {
    if (!map || polygonData.length === 0) return;

    const polygon = new google.maps.Polygon({
      paths: polygonData,
      ...MAP_DISPLAY_OPTIONS,
    });
    polygon.setMap(map);

    // Fit bounds na poligon
    const bounds = new google.maps.LatLngBounds();
    polygonData.forEach((coord) => bounds.extend(coord));
    map.fitBounds(bounds);

    // Čišćenje poligona pri demontaži ili pri promeni dependencies
    return () => {
      polygon.setMap(null);
    };
  }, [map, polygonData]);

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

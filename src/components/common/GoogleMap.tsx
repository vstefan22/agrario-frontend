import { useEffect, useRef, useState } from 'react';
import { ParcelPolygon } from '../../types/google-maps-types';

const MAP_DISPLAY_OPTIONS: google.maps.PolygonOptions = {
  fillColor: '#206f6a',
  fillOpacity: 0.65,
  strokeColor: '#104f50',
  strokeOpacity: 0.9,
  strokeWeight: 4,
};

type GoogleMapProps = {
  mapPolygons: ParcelPolygon[];
  searchPolygons: ParcelPolygon[];
  onParcelClick?: (parcel: ParcelPolygon) => void;
  mapSearchTerm?: string;
};

const GoogleMap = ({
  mapPolygons = [],
  searchPolygons = [],
  onParcelClick,
  mapSearchTerm,
}: GoogleMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow | null>(
    null
  );

  useEffect(() => {
    const initializeMap = () => {
      if (!mapRef.current || !window.google) return;

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
    };

    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initializeMap;
      document.body.appendChild(script);
    } else {
      initializeMap();
    }
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
    if (!map) return;

    const mapBounds = new google.maps.LatLngBounds();

    mapPolygons.forEach((parcel) => {
      const polygonObj = new google.maps.Polygon({
        paths: parcel.polygon,
        ...MAP_DISPLAY_OPTIONS,
      });
      polygonObj.setMap(map);
      polygonObj.getPath().forEach((latLng) => {
        mapBounds.extend(latLng);
      });
      polygonObj.addListener('mouseover', () => {
        polygonObj.setOptions({ strokeWeight: 6 });
      });
      polygonObj.addListener('mouseout', () => {
        polygonObj.setOptions({ strokeWeight: 4 });
      });
      polygonObj.addListener('click', (event: google.maps.MapMouseEvent) => {
        if (!infoWindow || !event.latLng) return;

        infoWindow.setPosition(event.latLng);
        infoWindow.setContent(`
          <div style="color:black">
            <strong>Parcel Info:</strong><br/>
            ID: ${parcel.parcel_id}<br/>
            State: ${parcel.state_name}<br/>
            District: ${parcel.district_name}<br/>
            Municipality: ${parcel.municipality_name}<br/>
            Cadastral Area: ${parcel.cadastral_area}<br/>
            Cadastral Parcel: ${parcel.cadastral_parcel}<br/>
          </div>
        `);
        infoWindow.open(map);

        if (onParcelClick) {
          onParcelClick(parcel);
        }
      });
    });
    const searchBounds = new google.maps.LatLngBounds();

    searchPolygons.forEach((parcel) => {
      const polygonObj = new google.maps.Polygon({
        paths: parcel.polygon,
        ...MAP_DISPLAY_OPTIONS,
        strokeColor: '#FF0000',
        fillColor: '#FF0000',
      });
      polygonObj.setMap(map);

      polygonObj.getPath().forEach((latLng) => {
        searchBounds.extend(latLng);
      });
      polygonObj.addListener('mouseover', () => {
        polygonObj.setOptions({ strokeWeight: 6 });
      });
      polygonObj.addListener('mouseout', () => {
        polygonObj.setOptions({ strokeWeight: 4 });
      });
      polygonObj.addListener('click', (event: google.maps.MapMouseEvent) => {
        if (!infoWindow || !event.latLng) return;

        infoWindow.setPosition(event.latLng);
        infoWindow.setContent(`
          <div style="color:black">
            <strong>Parcel Info (Search):</strong><br/>
            ID: ${parcel.parcel_id}<br/>
            State: ${parcel.state_name}<br/>
            District: ${parcel.district_name}<br/>
            Municipality: ${parcel.municipality_name}<br/>
            Cadastral Area: ${parcel.cadastral_area}<br/>
            Cadastral Parcel: ${parcel.cadastral_parcel}<br/>
          </div>
        `);
        infoWindow.open(map);

        if (onParcelClick) {
          onParcelClick(parcel);
        }
      });
    });

    if (searchPolygons.length > 0 && !searchBounds.isEmpty()) {
      map.fitBounds(searchBounds);
    } else if (mapPolygons.length > 0 && !mapBounds.isEmpty()) {
      map.fitBounds(mapBounds);
    }
  }, [map, mapPolygons, searchPolygons, infoWindow, onParcelClick]);

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

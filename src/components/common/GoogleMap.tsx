/// <reference types="@types/google.maps" />

import { useEffect, useRef, useState } from "react";
import { ParcelPolygon } from "../../types/google-maps-types";

const MAP_DISPLAY_OPTIONS: google.maps.PolygonOptions = {
  fillColor: "#206f6a",
  fillOpacity: 0.65,
  strokeColor: "#104f50",
  strokeOpacity: 0.9,
  strokeWeight: 4,
};
type GoogleMapProps = {
  polygonsData: ParcelPolygon[];
  onParcelClick?: (parcel: ParcelPolygon) => void;
  mapSearchTerm?: string;
};

const GoogleMap = ({ polygonsData = [], onParcelClick, mapSearchTerm }: GoogleMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow | null>(null);

  useEffect(() => {
    const initializeMap = () => {
      if (!mapRef.current || !window.google) return;

      const createdMap = new google.maps.Map(mapRef.current, {
        center: { lat: 52.52, lng: 13.4 },
        zoom: 13,
        mapTypeId: "hybrid",
        streetViewControl: false,
        mapTypeControl: false,
        panControl: false,
        rotateControl: false,
      });

      setMap(createdMap);
      setInfoWindow(new google.maps.InfoWindow());
    };
    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDLXIrJcM43n4raoIJTR2Jd7EbL5mFIYJs&libraries=places`;
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
      region: "de",
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

  // useEffect(() => {
  //   if (!map) return;

  //   const listener = map.addListener("click", (e: google.maps.MapMouseEvent) => {
  //     if (e.latLng) {
  //       const lat = e.latLng.lat();
  //       const lng = e.latLng.lng();

  //       const geocoder = new google.maps.Geocoder();
  //       geocoder.geocode({ location: { lat, lng } }, (results, status) => {
  //         if (status === "OK" && results && results.length) {
  //           const place = results[0];
  //           const addressComponents = place.address_components;

  //           const state = addressComponents.find((comp) =>
  //             comp.types.includes("administrative_area_level_1")
  //           );
  //           const district = addressComponents.find((comp) =>
  //             comp.types.includes("administrative_area_level_3")
  //           );
  //           const municipality = addressComponents.find((comp) => comp.types.includes("locality"));
  //           const address = addressComponents.find((comp) => comp.types.includes("route"));
  //           const addressNumber = addressComponents.find((comp) =>
  //             comp.types.includes("street_number")
  //           );
  //           const zipCode = addressComponents.find((comp) => comp.types.includes("postal_code"));

  //           const googleMapData: GoogleMapDataType = {
  //             state_name: state?.long_name || "",
  //             district_name: district?.long_name || "",
  //             municipality_name: municipality?.long_name || "",
  //             cadastral_area: address?.long_name || "",
  //             cadastral_sector: addressNumber?.long_name || "",
  //             zipcode: zipCode?.long_name || "",
  //             polygon: {
  //               type: "Polygon",
  //               coordinates: [{ lat, lng }],
  //             },
  //           };
  //         } else {
  //           console.error("Reverse Geocoding failed:", status);
  //         }
  //       });
  //     }
  //   });

  //   return () => {
  //     google.maps.event.removeListener(listener);
  //   };
  // }, [map]);

  useEffect(() => {
    if (!map || polygonsData.length === 0) return;

    polygonsData.forEach((parcel) => {
      const { polygon } = parcel;

      const polygonObj = new google.maps.Polygon({
        paths: polygon,
        ...MAP_DISPLAY_OPTIONS,
      });
      polygonObj.setMap(map);

      polygonObj.addListener("mouseover", () => {
        polygonObj.setOptions({ strokeWeight: 6 });
      });
      polygonObj.addListener("mouseout", () => {
        polygonObj.setOptions({ strokeWeight: 4 });
      });
      polygonObj.addListener("click", (event: google.maps.MapMouseEvent) => {
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
            Lat/Lng: ${event.latLng.lat().toFixed(5)}, ${event.latLng.lng().toFixed(5)}
          </div>
        `);
        infoWindow.open(map);

        if (onParcelClick) {
          onParcelClick(parcel);
        }
      });

      // Optional: auto-fit the map so all polygons are in view
      // const bounds = new google.maps.LatLngBounds();
      // coordinates.forEach((coord) => bounds.extend(coord));
      // map.fitBounds(bounds);
    });
  }, [map, polygonsData, infoWindow, onParcelClick]);

  return (
    <div
      ref={mapRef}
      style={{
        width: "100%",
        height: "600px",
        borderRadius: "8px",
      }}
    />
  );
};

export default GoogleMap;

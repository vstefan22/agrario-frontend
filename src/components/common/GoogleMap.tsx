import { useEffect, useRef, useState } from "react";
import { ParcelPolygon } from "../../types/google-maps-types";

const DEFAULT_POLYGON_STYLE: google.maps.PolygonOptions = {
  fillOpacity: 0,
  strokeColor: "#099178",
  strokeOpacity: 0.9,
  strokeWeight: 3,
};

const DEFAULT_SEARCH_POLYGON_STYLE: google.maps.PolygonOptions = {
  fillOpacity: 0,
  strokeColor: "#FF0000",
  fillColor: "#FF0000",
  strokeOpacity: 0.9,
  strokeWeight: 3,
};

const SELECTED_POLYGON_STYLE: google.maps.PolygonOptions = {
  fillOpacity: 0.3,
  fillColor: "#edc84e",
  strokeColor: "#edc84e",
  strokeOpacity: 0.2,
  strokeWeight: 16,
};

type GoogleMapProps = {
  mapPolygons: ParcelPolygon[];
  searchPolygons: ParcelPolygon[];
  onParcelClick?: (parcel: ParcelPolygon) => void;
  mapCenter?: google.maps.LatLngLiteral | null;
};

export default function GoogleMap({
  mapPolygons = [],
  searchPolygons = [],
  onParcelClick,
  mapCenter,
}: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow | null>(null);
  const [selectedPolygon, setSelectedPolygon] = useState<google.maps.Polygon | null>(null);
  const [selectedPolygonIsSearch, setSelectedPolygonIsSearch] = useState(false);
  const selectedPolygonRef = useRef<google.maps.Polygon | null>(null);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    if (map && mapCenter) {
      map.setCenter(mapCenter);
      map.setZoom(14);
    }
  }, [map, mapCenter]);

  useEffect(() => {
    if (!map) return;

    console.log("SELECTED PARCEL CLICK!");
    mapPolygons.forEach((parcel) => {
      const polygonObj = new google.maps.Polygon({
        paths: parcel.polygon,
        ...DEFAULT_POLYGON_STYLE,
      });
      polygonObj.setMap(map);
      polygonObj.addListener("mouseover", () => {
        polygonObj.setOptions({ strokeWeight: 6 });
      });
      polygonObj.addListener("mouseout", () => {
        if (polygonObj !== selectedPolygonRef.current) {
          polygonObj.setOptions({ strokeWeight: 3 });
        }
      });

      polygonObj.addListener("click", (event: google.maps.MapMouseEvent) => {
        if (!infoWindow || !event.latLng) return;

        infoWindow.setPosition(event.latLng);
        infoWindow.setContent(`
          <div style="color:black">
            <strong>Parcel Info:</strong><br/>
            ID: ${parcel.parcel_id}<br/>
            State: ${parcel.state_name}<br/>
            District: ${parcel.communal_district}<br/>
            Municipality: ${parcel.municipality_name}<br/>
            Cadastral Area: ${parcel.cadastral_area}<br/>
            Cadastral Parcel: ${parcel.cadastral_parcel}<br/>
          </div>
        `);
        infoWindow.open(map);

        // Reset the previously selected polygon
        if (selectedPolygonRef.current) {
          selectedPolygonRef.current.setOptions(
            selectedPolygonRef.current.get("selectedPolygonIsSearch")
              ? DEFAULT_SEARCH_POLYGON_STYLE
              : DEFAULT_POLYGON_STYLE
          );
        }

        // Highlight the new polygon
        polygonObj.setOptions(SELECTED_POLYGON_STYLE);

        // Update ref and add custom property to track search polygons
        polygonObj.set("selectedPolygonIsSearch", selectedPolygonIsSearch);
        selectedPolygonRef.current = polygonObj;

        if (onParcelClick) {
          onParcelClick(parcel);
        }
      });
    });

    searchPolygons.forEach((parcel) => {
      const polygonObj = new google.maps.Polygon({
        paths: parcel.polygon,
        ...DEFAULT_SEARCH_POLYGON_STYLE,
      });
      polygonObj.setMap(map);

      polygonObj.addListener("mouseover", () => {
        polygonObj.setOptions({ strokeWeight: 6 });
      });
      polygonObj.addListener("mouseout", () => {
        if (polygonObj !== selectedPolygon) {
          polygonObj.setOptions({ strokeWeight: 3 });
        }
      });

      polygonObj.addListener("click", (event: google.maps.MapMouseEvent) => {
        if (!infoWindow || !event.latLng) return;
        infoWindow.setPosition(event.latLng);
        infoWindow.setContent(`
          <div style="color:black">
            <strong>Parcel Info (Search):</strong><br/>
            ID: ${parcel.parcel_id}<br/>
            State: ${parcel.state_name}<br/>
            District: ${parcel.communal_district}<br/>
            Municipality: ${parcel.municipality_name}<br/>
            Cadastral Area: ${parcel.cadastral_area}<br/>
            Cadastral Parcel: ${parcel.cadastral_parcel}<br/>
          </div>
        `);
        infoWindow.open(map);

        if (selectedPolygon) {
          if (selectedPolygonIsSearch) {
            selectedPolygon.setOptions(DEFAULT_SEARCH_POLYGON_STYLE);
          } else {
            selectedPolygon.setOptions(DEFAULT_POLYGON_STYLE);
          }
        }

        polygonObj.setOptions(SELECTED_POLYGON_STYLE);
        setSelectedPolygon(polygonObj);
        setSelectedPolygonIsSearch(true);

        if (onParcelClick) {
          onParcelClick(parcel);
        }
      });
    });

    if (searchPolygons.length > 0) {
      const searchBounds = new google.maps.LatLngBounds();
      searchPolygons.forEach((p) => {
        p.polygon.forEach((coord) => {
          searchBounds.extend(coord);
        });
      });
      if (!searchBounds.isEmpty()) {
        map.fitBounds(searchBounds);
      }
    }
    // eslint-disable-next-line
  }, [map, mapPolygons, searchPolygons, infoWindow, onParcelClick]);

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
}

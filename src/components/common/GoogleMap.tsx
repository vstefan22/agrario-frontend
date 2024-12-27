// import { useEffect, useState, useRef } from 'react';

// type PolygonCoord = {
//   lat: number;
//   lng: number;
// };

// export type PolygonData = PolygonCoord[];

// export default function GoogleMap({
//   polygonData,
// }: {
//   polygonData: PolygonData;
// }) {
//   const mapRef = useRef<HTMLDivElement>(null);
//   const [map, setMap] = useState<google.maps.Map | null>(null);

//   // Inicijalizacija Google mape
//   useEffect(() => {
//     if (!mapRef.current) return;

//     const createdMap = new google.maps.Map(mapRef.current, {
//       center: { lat: 52.520008, lng: 13.404954 },
//       zoom: 12,
//     });
//     setMap(createdMap);
//   }, []);

//   // Kada dobijemo nove koordinate, iscrtaj poligon
//   useEffect(() => {
//     if (!map || !polygonData || polygonData.length === 0) return;

//     // Ocisti stare poligone/markere ako je potrebno
//     // (u produkcionom kodu bi trebalo pamtiti reference na poligone i obrisati ih .setMap(null))

//     const polygon = new google.maps.Polygon({
//       paths: polygonData,
//       strokeColor: '#FF0000',
//       strokeOpacity: 0.8,
//       strokeWeight: 2,
//       fillColor: '#FF0000',
//       fillOpacity: 0.35,
//     });
//     polygon.setMap(map);

//     // Opcionalno: zumiraj mapu da obuhvati ceo poligon
//     const bounds = new google.maps.LatLngBounds();
//     polygonData.forEach((coord) => {
//       bounds.extend(coord);
//     });
//     map.fitBounds(bounds);
//   }, [map, polygonData]);

//   return (
//     <div
//       ref={mapRef}
//       style={{
//         width: '100%',
//         height: '400px',
//         borderRadius: '10px',
//       }}
//     />
//   );
// }

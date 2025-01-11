import { PlotType } from "../types/plot-types";
import { PlotSearchType } from "../types/plot-types";
import { ActiveAuctionsType } from "../types/plot-types";

export const filterData = (items: PlotType[], searchValue: string): PlotType[] => {
  if (!searchValue) return items;

  return items.filter((item) => item.state_name.toLowerCase().includes(searchValue.toLowerCase()));
};

export const sortData = (items: PlotType[], sortOption: string | null): PlotType[] => {
  if (!sortOption) return items;

  switch (sortOption) {
    case "Sortieren nach Eignung":
      return [...items].sort((a, b) => a.land_use.localeCompare(b.land_use));
    case "Sortieren nach Bundesland":
      return [...items].sort((a, b) => a.state_name.localeCompare(b.state_name));
    case "Sortieren nach Größe":
      return [...items].sort((a, b) => a.plot_number_main - b.plot_number_main);
    default:
      return items;
  }
};

export const filterDataRange = (items: PlotType[], range: [number, number]): PlotType[] => {
  const filteredItems = items.filter((item) => {
    return item.plot_number_main >= range[0] && item.plot_number_main <= range[1];
  });

  return filteredItems.sort((a, b) => a.plot_number_main - b.plot_number_main);
};

export const filterPlotsSearchData = (
  items: PlotSearchType[],
  searchValue: string
): PlotSearchType[] => {
  if (!searchValue) return items;

  return items.filter((item) => item.state_name.toLowerCase().includes(searchValue.toLowerCase()));
};

export const sortPlotsSearchData = (
  items: PlotSearchType[],
  sortOption: string | null
): PlotSearchType[] => {
  if (!sortOption) return items;

  switch (sortOption) {
    case "Sortieren nach Eignung":
      return [...items].sort((a, b) => a.land_use.localeCompare(b.land_use));
    case "Sortieren nach Bundesland":
      return [...items].sort((a, b) => a.state_name.localeCompare(b.state_name));
    case "Sortieren nach Größe":
      return [...items].sort((a, b) => a.plot_number_main - b.plot_number_main);
    default:
      return items;
  }
};

export const filterPlotSearchDataRange = (
  items: PlotSearchType[],
  range: [number, number]
): PlotSearchType[] => {
  const filteredItems = items.filter((item) => {
    return item.plot_number_main >= range[0] && item.plot_number_main <= range[1];
  });

  return filteredItems.sort((a, b) => a.plot_number_main - b.plot_number_main);
};

export const filterActiveAuctionsData = (
  items: ActiveAuctionsType[],
  searchValue: string
): ActiveAuctionsType[] => {
  if (!searchValue) return items;

  return items.filter((item) => item.state_name.toLowerCase().includes(searchValue.toLowerCase()));
};

export const sortActiveAuctionsData = (
  items: ActiveAuctionsType[],
  sortOption: string | null
): ActiveAuctionsType[] => {
  if (!sortOption) return items;

  switch (sortOption) {
    case "Sortieren nach Eignung":
      return [...items].sort((a, b) => a.land_use.localeCompare(b.land_use));
    case "Sortieren nach Bundesland":
      return [...items].sort((a, b) => a.state_name.localeCompare(b.state_name));
    case "Sortieren nach Größe":
      return [...items].sort((a, b) => a.plot_number_main - b.plot_number_main);
    default:
      return items;
  }
};

export function geoJsonToLatLngArrays(geometry: {
  type: string;
  coordinates: number[][][] | number[][][][]; // Polygon or MultiPolygon
}) {
  if (!geometry) return [];

  // Polygon => coordinates: number[][][]
  // MultiPolygon => coordinates: number[][][][]
  const { type, coordinates } = geometry;

  if (type === "Polygon") {
    // Polygon has shape: [ [ [lng, lat], [lng, lat], ... ] ]
    // Typically the first array is the outer ring
    return coordinates.map((ring) =>
      ring.map((coordPair) => ({ lat: coordPair[1], lng: coordPair[0] }))
    );
  } else if (type === "MultiPolygon") {
    // MultiPolygon has shape: [ [ [ [lng, lat], ... ] ], [ [ ... ] ] ]
    // It's an array of polygons, each polygon is an array of rings
    const allPolygons = coordinates.map((polygon) => {
      // polygon is [ [ [lng, lat], [lng, lat], ... ] ]
      return polygon.map((ring) =>
        ring.map((coordPair) => ({ lat: coordPair[1], lng: coordPair[0] }))
      );
    });
    // For simplicity, flatten if you only want the outer ring or combine them.
    // Or you can return allPolygons as an array-of-arrays-of-arrays if you want multiple polygons.
    return allPolygons.flat();
  }
  return [];
}

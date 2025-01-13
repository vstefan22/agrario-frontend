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
      // return [...items].sort((a, b) => a.land_use.localeCompare(b.land_use));
      return items;
    case "Sortieren nach Bundesland":
      return [...items].sort((a, b) => a.state_name.localeCompare(b.state_name));
    case "Sortieren nach Größe":
      return [...items].sort((a, b) => a.area_square_meters - b.area_square_meters);
    default:
      return items;
  }
};

export const filterDataRange = (items: PlotType[], range: [number, number]): PlotType[] => {
  console.log(items, range);
  const filteredItems = items.filter((item) => {
    return item.area_square_meters >= range[0] && item.area_square_meters <= range[1];
  });

  // console.log(filteredItems.sort((a, b) => a.area_square_meters - b.area_square_meters));
  // return filteredItems.sort((a, b) => a.area_square_meters - b.area_square_meters);
  console.log(filteredItems);
  return filteredItems;
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
      return items;
    // return [...items].sort((a, b) => a.land_use.localeCompare(b.land_use));
    case "Sortieren nach Bundesland":
      return [...items].sort((a, b) => a.state_name.localeCompare(b.state_name));
    case "Sortieren nach Größe":
      return [...items].sort((a, b) => a.area_square_meters - b.area_square_meters);
    default:
      return items;
  }
};

export const filterPlotSearchDataRange = (
  items: PlotSearchType[],
  range: [number, number]
): PlotSearchType[] => {
  const filteredItems = items.filter((item) => {
    return item.area_square_meters >= range[0] && item.area_square_meters <= range[1];
  });

  return filteredItems.sort((a, b) => a.area_square_meters - b.area_square_meters);
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
      // return [...items].sort((a, b) => a.land_use.localeCompare(b.land_use));
      return items;
    case "Sortieren nach Bundesland":
      return [...items].sort((a, b) => a.state_name.localeCompare(b.state_name));
    case "Sortieren nach Größe":
      return [...items].sort((a, b) => a.area_square_meters - b.area_square_meters);
    default:
      return items;
  }
};

export function geoJsonToLatLngArrays(geometry: {
  type: "Polygon" | "MultiPolygon";
  coordinates: number[][][] | number[][][][];
}) {
  if (!geometry) return [];
  const { type, coordinates } = geometry;

  if (type === "Polygon") {
    const coords = coordinates as number[][][];
    return coords.map((ring) =>
      ring.map((coordPair) => ({
        lat: coordPair[1],
        lng: coordPair[0],
      }))
    );
  } else if (type === "MultiPolygon") {
    const coords = coordinates as number[][][][];
    const allPolygons = coords.map((polygon) => {
      return polygon.map((ring) =>
        ring.map((coordPair) => ({
          lat: coordPair[1],
          lng: coordPair[0],
        }))
      );
    });
    return allPolygons.flat();
  }

  return [];
}

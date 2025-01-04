import { PlotType } from '../types/plot-types';

export const filterData = (
  items: PlotType[],
  searchValue: string
): PlotType[] => {
  if (!searchValue) return items;

  return items.filter((item) =>
    item.state.toLowerCase().includes(searchValue.toLowerCase())
  );
};

export const sortData = (
  items: PlotType[],
  sortOption: string | null
): PlotType[] => {
  if (!sortOption) return items;

  switch (sortOption) {
    case 'Sortieren nach Eignung':
      return [...items].sort((a, b) => a.registry.localeCompare(b.registry));
    case 'Sortieren nach Bundesland':
      return [...items].sort((a, b) => a.state.localeCompare(b.state));
    case 'Sortieren nach Größe':
      return [...items].sort((a, b) => a.size - b.size);
    default:
      return items;
  }
};

export const filterDataRange = (
  items: PlotType[],
  range: [number, number]
): PlotType[] => {
  const filteredItems = items.filter((item) => {
    return item.size >= range[0] && item.size <= range[1];
  });

  return filteredItems.sort((a, b) => a.size - b.size);
};

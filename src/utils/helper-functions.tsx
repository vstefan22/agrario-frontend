import { PlotType } from '../types/plot-types';
import { PlotSearchType } from '../types/plot-types';

export const filterData = (
  items: PlotType[],
  searchValue: string
): PlotType[] => {
  if (!searchValue) return items;

  return items.filter((item) =>
    item.state_name.toLowerCase().includes(searchValue.toLowerCase())
  );
};

export const sortData = (
  items: PlotType[],
  sortOption: string | null
): PlotType[] => {
  if (!sortOption) return items;

  switch (sortOption) {
    case 'Sortieren nach Eignung':
      return [...items].sort((a, b) => a.land_use.localeCompare(b.land_use));
    case 'Sortieren nach Bundesland':
      return [...items].sort((a, b) =>
        a.state_name.localeCompare(b.state_name)
      );
    case 'Sortieren nach Größe':
      return [...items].sort((a, b) => a.plot_number_main - b.plot_number_main);
    default:
      return items;
  }
};

export const filterDataRange = (
  items: PlotType[],
  range: [number, number]
): PlotType[] => {
  const filteredItems = items.filter((item) => {
    return (
      item.plot_number_main >= range[0] && item.plot_number_main <= range[1]
    );
  });

  return filteredItems.sort((a, b) => a.plot_number_main - b.plot_number_main);
};

export const filterPlotsSearchData = (
  items: PlotSearchType[],
  searchValue: string
): PlotSearchType[] => {
  if (!searchValue) return items;

  return items.filter((item) =>
    item.state_name.toLowerCase().includes(searchValue.toLowerCase())
  );
};

export const sortPlotsSearchData = (
  items: PlotSearchType[],
  sortOption: string | null
): PlotSearchType[] => {
  if (!sortOption) return items;

  switch (sortOption) {
    case 'Sortieren nach Eignung':
      return [...items].sort((a, b) => a.land_use.localeCompare(b.land_use));
    case 'Sortieren nach Bundesland':
      return [...items].sort((a, b) =>
        a.state_name.localeCompare(b.state_name)
      );
    case 'Sortieren nach Größe':
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
    return (
      item.plot_number_main >= range[0] && item.plot_number_main <= range[1]
    );
  });

  return filteredItems.sort((a, b) => a.plot_number_main - b.plot_number_main);
};

import { PlotType, RegisteredPlotDetailsType } from '../types/plot-types';
import { AuctionOfferDetailsType } from '../types/auctions-offer-types';

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
  items: RegisteredPlotDetailsType[],
  searchValue: string
): RegisteredPlotDetailsType[] => {
  if (!searchValue) return items;

  return items.filter((item) =>
    item.parcel.state_name.toLowerCase().includes(searchValue.toLowerCase())
  );
};

export const sortPlotsSearchData = (
  items: RegisteredPlotDetailsType[],
  sortOption: string | null
): RegisteredPlotDetailsType[] => {
  if (!sortOption) return items;

  switch (sortOption) {
    case 'Sortieren nach Eignung':
      return [...items].sort((a, b) =>
        a.parcel.land_use.localeCompare(b.parcel.land_use)
      );
    case 'Sortieren nach Bundesland':
      return [...items].sort((a, b) =>
        a.parcel.state_name.localeCompare(b.parcel.state_name)
      );
    case 'Sortieren nach Größe':
      return [...items].sort(
        (a, b) => a.parcel.area_square_meters - b.parcel.area_square_meters
      );
    default:
      return items;
  }
};

export const filterPlotSearchDataRange = (
  items: RegisteredPlotDetailsType[],
  range: [number, number]
): RegisteredPlotDetailsType[] => {
  const filteredItems = items.filter((item) => {
    return (
      item.parcel.area_square_meters >= range[0] &&
      item.parcel.area_square_meters <= range[1]
    );
  });

  return filteredItems.sort(
    (a, b) => a.parcel.area_square_meters - b.parcel.area_square_meters
  );
};

export const filterActiveAuctionsData = (
  items: AuctionOfferDetailsType[],
  searchValue: string
): AuctionOfferDetailsType[] => {
  if (!searchValue) return items;

  return items.filter((item) =>
    item.parcels[0].state_name.toLowerCase().includes(searchValue.toLowerCase())
  );
};

export const sortActiveAuctionsData = (
  items: AuctionOfferDetailsType[],
  sortOption: string | null
): AuctionOfferDetailsType[] => {
  if (!sortOption) return items;

  switch (sortOption) {
    case 'Sortieren nach Eignung':
      return [...items].sort((a, b) =>
        a.parcels[0].land_use.localeCompare(b.parcels[0].land_use)
      );
    case 'Sortieren nach Bundesland':
      return [...items].sort((a, b) =>
        a.parcels[0].state_name.localeCompare(b.parcels[0].state_name)
      );
    case 'Sortieren nach Größe':
      return [...items].sort(
        (a, b) =>
          a.parcels[0].area_square_meters - b.parcels[0].area_square_meters
      );
    default:
      return items;
  }
};

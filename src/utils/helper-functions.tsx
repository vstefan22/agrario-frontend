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

export function geoJsonToLatLngArrays(geometry: {
  type: 'Polygon' | 'MultiPolygon';
  coordinates: number[][][] | number[][][][];
}) {
  if (!geometry) return [];
  const { type, coordinates } = geometry;

  if (type === 'Polygon') {
    const coords = coordinates as number[][][];
    return coords.map((ring) =>
      ring.map((coordPair) => ({
        lat: coordPair[1],
        lng: coordPair[0],
      }))
    );
  } else if (type === 'MultiPolygon') {
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

// eslint-disable-next-line
export const validateAuctionDetailForm = (formData: any) => {
  const newErrors: Record<string, string> = {};

  if (!formData.utilization) {
    newErrors.utilitization = 'Dieses Feld ist erforderlich.';
  }
  if (!formData.staggered_lease) {
    newErrors.staggered_lease = 'Dieses Feld ist erforderlich.';
  }
  if (!formData.share_of_income) {
    newErrors.share_of_income = 'Dieses Feld ist erforderlich.';
  }
  if (!formData.shares_project_company) {
    newErrors.shares_project_company = 'Dieses Feld ist erforderlich.';
  }
  if (!formData.sale_amount) {
    newErrors.sale_amount = 'Dieses Feld ist erforderlich.';
  }
  if (!formData.contracted_term_month) {
    newErrors.contracted_term_month = 'Dieses Feld ist erforderlich.';
  }
  if (!formData.lease_amount_yearly_lease_year_one) {
    newErrors.lease_amount_yearly_lease_year_one =
      'Dieses Feld ist erforderlich.';
  }
  if (!formData.message_to_landowner) {
    newErrors.message_to_landowner = 'Dieses Feld ist erforderlich.';
  }
  if (!formData.message_to_platform) {
    newErrors.message_to_platform = 'Dieses Feld ist erforderlich.';
  }

  if (!formData.accept_privacy_policy) {
    newErrors.accept_privacy_policy =
      'Bitte akzeptieren Sie die Datenschutzbedingungen.';
  }
  if (!formData.accept_terms) {
    newErrors.accept_terms = 'Bitte akzeptieren Sie die AGBs.';
  }
  if (!formData.other) {
    newErrors.other = 'Bitte bestätigen Sie dieses Feld.';
  }

  return {
    isFormValidate: Object.keys(newErrors).length === 0,
    errors: newErrors,
  };
};

// eslint-disable-next-line
export const validateOfferDetailForm = (formData: any) => {
  const newErrors: Record<string, string> = {};

  if (!formData.available_from) {
    newErrors.available_from = 'Dieses Feld ist erforderlich.';
  }
  if (!formData.utilization) {
    newErrors.utilization = 'Dieses Feld ist erforderlich.';
  }
  if (!formData.preferred_regionality) {
    newErrors.preferred_regionality = 'Dieses Feld ist erforderlich.';
  }
  if (!formData.shareholder_model) {
    newErrors.shareholder_model = 'Dieses Feld ist erforderlich.';
  }
  if (!formData.is_owner_or_authorized) {
    newErrors.is_owner_or_authorized =
      'Bitte bestätigen Sie, dass Sie berechtigt sind.';
  }
  if (!formData.accept_privacy_policy) {
    newErrors.accept_privacy_policy =
      'Bitte akzeptieren Sie die Datenschutzbedingungen.';
  }
  if (!formData.accept_terms) {
    newErrors.accept_terms = 'Bitte akzeptieren Sie die AGBs.';
  }
  if (!formData.other) {
    newErrors.other = 'Bitte bestätigen Sie dieses Feld.';
  }

  return {
    isFormValidate: Object.keys(newErrors).length === 0,
    errors: newErrors,
  };
};

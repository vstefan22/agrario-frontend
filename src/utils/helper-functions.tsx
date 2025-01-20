import { PlotType, RegisteredPlotDetailsType } from '../types/plot-types';
import { OfferType } from '../types/offer-types';
import { AuctionOfferDetailsType } from '../types/auctions-offer-types';

export const filterData = (
  items: PlotType[],
  searchValue: string
): PlotType[] => {
  if (!Array.isArray(items)) {
    return [];
  }

  if (!searchValue) return items;

  return items.filter(
    (item) =>
      item.state_name &&
      item.state_name?.toLowerCase().startsWith(searchValue.toLowerCase())
  );
};

export const sortData = (
  items: PlotType[],
  sortOption: string | null
): PlotType[] => {
  if (!Array.isArray(items)) {
    return [];
  }

  if (!sortOption) return items;

  switch (sortOption) {
    case 'Sortieren nach Eignung':
      return items;
    // return [...items].sort((a, b) => a.land_use.localeCompare(b.land_use));
    case 'Sortieren nach Bundesland':
      return [...items].sort((a, b) => {
        const stateA = a.state_name || '';
        const stateB = b.state_name || '';
        return stateA.localeCompare(stateB);
      });

    case 'Sortieren nach Größe':
      return [...items].sort((a, b) => {
        const areaA = a.area_square_meters ?? 0;
        const areaB = b.area_square_meters ?? 0;
        return areaA - areaB;
      });
    default:
      return items;
  }
};

export const filterOfferData = (
  items: OfferType[],
  searchValue: string
): OfferType[] => {
  if (!searchValue) return items;

  return items.filter(
    (item) =>
      item.parcels.length > 0 &&
      item.parcels[0].state_name
        .toLowerCase()
        .startsWith(searchValue.toLowerCase())
  );
};

export const sortOfferData = (
  items: OfferType[],
  sortOption: string | null
): OfferType[] => {
  if (!sortOption) return items;

  switch (sortOption) {
    case 'Sortieren nach Eignung':
      return items;
    case 'Sortieren nach Bundesland':
      return [...items].sort((a, b) => {
        const aState = a.parcels.length > 0 ? a.parcels[0].state_name : '';
        const bState = b.parcels.length > 0 ? b.parcels[0].state_name : '';
        return aState.localeCompare(bState);
      });
    case 'Sortieren nach Größe':
      return [...items].sort((a, b) => {
        const aArea =
          a.parcels.length > 0 ? a.parcels[0].area_square_meters : 0;
        const bArea =
          b.parcels.length > 0 ? b.parcels[0].area_square_meters : 0;
        return aArea - bArea;
      });
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
      item.area_square_meters >= range[0] && item.area_square_meters <= range[1]
    );
  });

  return filteredItems.sort(
    (a, b) => a.area_square_meters - b.area_square_meters
  );
};

export const filterPlotsSearchData = (
  items: RegisteredPlotDetailsType[],
  searchValue: string
): RegisteredPlotDetailsType[] => {
  if (!Array.isArray(items)) {
    return [];
  }

  if (!searchValue) return items;

  return items.filter((item) =>
    item.parcel.state_name.toLowerCase().startsWith(searchValue.toLowerCase())
  );
};

export const sortPlotsSearchData = (
  items: RegisteredPlotDetailsType[],
  sortOption: string | null
): RegisteredPlotDetailsType[] => {
  if (!sortOption) return items;

  switch (sortOption) {
    case 'Sortieren nach Eignung':
      return items;
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
  if (!Array.isArray(items)) {
    return [];
  }
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
  if (!Array.isArray(items)) {
    return [];
  }

  if (!searchValue) return items;

  return items.filter((item) =>
    item.parcels[0].state_name
      .toLowerCase()
      .startsWith(searchValue.toLowerCase())
  );
};

export const sortActiveAuctionsData = (
  items: AuctionOfferDetailsType[],
  sortOption: string | null
): AuctionOfferDetailsType[] => {
  if (!sortOption) return items;

  switch (sortOption) {
    case 'Sortieren nach Eignung':
      // return [...items].sort((a, b) =>
      //   a.parcels[0].land_use.localeCompare(b.parcels[0].land_use)
      // );
      return items;
    case 'Sortieren nach Bundesland':
      return [...items].sort((a, b) =>
        a.parcels[0].state_name.localeCompare(b.parcels[0].state_name)
      );
    case 'Sortieren nach Größe':
      return [...items].sort(
        (a, b) =>
          b.parcels[0].area_square_meters - a.parcels[0].area_square_meters
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

export function geoJsonToPolygon(geometry: {
  type: 'Polygon' | 'MultiPolygon';
  coordinates: number[][][] | number[][][][];
}): { lat: number; lng: number }[] {
  if (!geometry) return [];

  const { type, coordinates } = geometry;

  if (type === 'Polygon') {
    const coords = coordinates as number[][][];
    return coords.flatMap((ring) => ring.map(([lng, lat]) => ({ lat, lng })));
  }

  if (type === 'MultiPolygon') {
    const coords = coordinates as number[][][][];
    return coords.flatMap((poly) =>
      poly.flatMap((ring) => ring.map(([lng, lat]) => ({ lat, lng })))
    );
  }
  return [];
}

// eslint-disable-next-line
export const validateAuctionDetailForm = (formData: any) => {
  const newErrors: Record<string, string> = {};

  if (!formData.utilization) {
    newErrors.utilization = 'Dieses Feld ist erforderlich.';
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
  const MAX_CHAR_LIMIT = 3000;
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

  if (
    formData.important_remarks &&
    formData.important_remarks.length > MAX_CHAR_LIMIT
  ) {
    newErrors.important_remarks = `Die Nachricht darf nicht mehr als ${MAX_CHAR_LIMIT} Zeichen enthalten.`;
  }

  return {
    isFormValidate: Object.keys(newErrors).length === 0,
    errors: newErrors,
  };
};

export const extractFileName = (fileUrl: string) => {
  try {
    const parsedUrl = new URL(fileUrl);
    const pathName = parsedUrl.pathname;
    const fileName = pathName.split('/').pop();
    return fileName;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export type PlotType = {
  id: string;
  state_name: string;
  zipcode: number;
  municipality_name: string;
  district_name: string;
  cadastral_area: string;
  cadastral_parcel: string;
  land_use: string;
  area_square_meters: number;
  plot_number_secondary: string;
  image: string;
  analyzePlus: string;
};

export type PlotDetailsType = {
  id: string;
  state_name: string;
  zipcode: number;
  municipality_name: string;
  district_name: string;
  cadastral_area: string;
  cadastral_parcel: string;
  land_use: string;
  area_square_meters: number;
  image: string;
  analyzePlus: string;
  infrastructure: string;
  evaluation: string;
};

export type PlotOfferType = {
  id: string;
  state_name: string;
  zipcode: number;
  municipality_name: string;
  district_name: string;
  cadastral_area: string;
  cadastral_parcel: string;
  land_use: string;
  area_square_meters: number;
  image: string;
};

export type PlotSearchType = {
  id: string;
  state_name: string;
  district_name: string;
  land_use: string;
  area_square_meters: number;
  image: string;
  infrastructure: string;
  evaluation: string;
};

export type PlotAnalysePlusType = {
  id: string;
  state_name: string;
  zipcode: number;
  municipality_name: string;
  district_name: string;
  cadastral_area: string;
  cadastral_parcel: string;
  land_use: string;
  area_square_meters: number;
};

export type ActiveAuctionsType = {
  id: string;
  state_name: string;
  zipcode: number;
  municipality_name: string;
  district_name: string;
  cadastral_area: string;
  cadastral_parcel: string;
  land_use: string;
  area_square_meters: number;
  image: string;
  analyzePlus: string;
  infrastructure: string;
  evaluation: string;
};

export type PlotSearchData = {
  state_name: string;
  zipcode: string;
  municipality_name: string;
  district_name: string;
  cadastral_area: string;
  cadastral_parcel: string;
};

export type RegisteredPlotType = {
  parcel: {
    id: string | number;
    state_name: string;
    district_name: string;
    municipality_name: string;
    cadastral_area: string;
    cadastral_parcel: string;
    plot_number_main: string;
    plot_number_secondary: string;
    land_use: string;
    area_square_meters: number;
    created_by: string;
    polygon: {
      type: "MultiPolygon";
      coordinates: number[][][][];
    };
  };
};

type CriteriaType = {
  no_usage_restriction: boolean;
  wind_energy_restriction: boolean;
  solar_energy_restriction: boolean;
  energy_storage_restriction: boolean;
  eco_enhancements_restriction: boolean;
};

type OfferPlotType = {
  offer: {
    identifier: string;
    offer_number: number;
    status: string;
    status_display: string;
    hide_from_search: boolean;
    available_from: string;
    utilization: string;
    utilization_display: string;
    preferred_regionality: string;
    preferred_regionality_display: string;
    shareholder_model: string;
    shareholder_model_display: string;
    criteria: CriteriaType;
    important_remarks: string;
    documented_offers: {
      id: string | number;
      offer: string;
      uploaded_at: string;
      document_url: string;
    }[];
  };
};

export type RegisteredPlotDetailsType = RegisteredPlotType &
  Partial<{ criteria: CriteriaType }> &
  Partial<OfferPlotType>;

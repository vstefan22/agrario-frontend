export type AuctionOfferType = {
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
  criteria: {
    no_usage_restriction: boolean;
    wind_energy_restriction: boolean;
    solar_energy_restriction: boolean;
    energy_storage_restriction: boolean;
    eco_enhancements_restriction: boolean;
  };
  important_remarks: string;
  documented_offers: {
    id: number;
    offer: string;
    uploaded_at: string;
    document_url: string;
  }[];
  parcels: {
    id: string | number;
    state_name: string;
    district_name: string;
    communal_district: string;
    municipality_name: string;
    cadastral_area: string;
    cadastral_parcel: string;
    plot_number_main: string;
    plot_number_secondary: string;
    land_use: string;
    area_square_meters: number;
    created_by: string;
    polygon: {
      type: 'MultiPolygon';
      coordinates: number[][][][];
    };
  }[];
};

export type AuctionOfferDetailsType = AuctionOfferType &
  Partial<{
    offer_confirmation: {
      // identifier: string;
      utilization: 'LE' | 'SA' | 'BO';
      sale_amount?: number | null;
      contracted_term_month?: number;
      lease_amount_yearly_lease_year_one?: number;
      staggered_lease?: 'YES' | 'NO' | 'NOT';
      share_of_income?: 'YES' | 'NO' | 'NOT';
      shares_project_company?: 'YES' | 'NO' | 'NOT';
      message_to_landowner: string;
      message_to_platform: string;
      currency?: string;
      lease_amount_single_payment?: number;
    };
  }>;

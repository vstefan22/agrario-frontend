import { PlotType } from "./plot-types";

export type BasicOfferType = {
  parcels: PlotType[];
};

export type BasicOfferDetailsType = {
  identifier?: string;
  available_from: Date | null | undefined;
  utilization: string | undefined;
  preferred_regionality: string | undefined;
  shareholder_model: string | undefined;
  hide_from_search: boolean | undefined;
  important_remarks: string | undefined;
  criteria: {
    no_usage_restriction: boolean | undefined;
    wind_energy_restriction: boolean | undefined;
    solar_energy_restriction: boolean | undefined;
    energy_storage_restriction: boolean | undefined;
    eco_enhancements_restriction: boolean | undefined;
  };
  documented_offers: {
    id: string | number;
    offer: string;
    uploaded_at: string;
    document_url: string;
  }[];
  is_owner_or_authorized: boolean;
  accept_privacy_policy: boolean;
  accept_terms: boolean;
  other: boolean;
};

export type OfferPreparationType = {
  available_from: Date | null | undefined;
  utilization: string | undefined;
  preferred_regionality: string | undefined;
  shareholder_model: string | undefined;
  no_usage_restriction: boolean | undefined;
  wind_energy_restriction: boolean | undefined;
  solar_energy_restriction: boolean | undefined;
  energy_storage_restriction: boolean | undefined;
  eco_enhancements_restriction: boolean | undefined;
  documented_offers: File[];
  hide_from_search: boolean | undefined;
  important_remarks: string | undefined;
  is_owner_or_authorized: boolean;
  accept_privacy_policy: boolean;
  accept_terms: boolean;
  other: boolean;
};

export type OfferDetailsType = {
  identifier: string;
  utilization_display: string | undefined;
  preferred_regionality_display: string | undefined;
  shareholder_model_display: string | undefined;
  offer_number: number | undefined;
  status: string | undefined;
  status_display: string | undefined;
};

export type OfferType = BasicOfferType & Partial<BasicOfferDetailsType>;

export type StoreOfferType = OfferType & Partial<OfferPreparationType> & Partial<OfferDetailsType>;

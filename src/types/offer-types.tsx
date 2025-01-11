import { PlotType } from './plot-types';

export type OfferType = {
  available_from: Date | null;
  utilization: string | null;
  preferred_regionality: string | null;
  shareholder_model: string | null;
  no_usage_restriction: boolean;
  wind_energy_restriction: boolean;
  solar_energy_restriction: boolean;
  energy_storage_restriction: boolean;
  eco_enhancements_restriction: boolean;
  important_remarks: string;
  hide_from_search: boolean;
  files: File[];
  is_owner_or_authorized: boolean;
  accept_privacy_policy: boolean;
  accept_terms: boolean;
  other: boolean;
};

export type StoreOfferType = PlotType & Partial<OfferType>;

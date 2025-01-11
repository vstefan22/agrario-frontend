import { PlotType } from './plot-types';

export type OfferType = {
  available_from: Date | null | undefined;
  utilization: string | undefined;
  preferred_regionality: string | undefined;
  shareholder_model: string | undefined;
  no_usage_restriction: boolean | undefined;
  wind_energy_restriction: boolean | undefined;
  solar_energy_restriction: boolean | undefined;
  energy_storage_restriction: boolean | undefined;
  eco_enhancements_restriction: boolean | undefined;
  important_remarks: string | undefined;
  hide_from_search: boolean | undefined;
  documents: File[];
  is_owner_or_authorized: boolean;
  accept_privacy_policy: boolean;
  accept_terms: boolean;
  other: boolean;
};

export type StoreOfferType = PlotType & Partial<OfferType>;

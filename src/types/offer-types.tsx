export type OfferType = {
  available_from: Date | null;
  criteria1: string | null;
  criteria2: string | null;
  criteria3: string | null;
  no_usage_restriction: boolean;
  wind_energy_restriction: boolean;
  solar_energy_restriction: boolean;
  energy_storage_restriction: boolean;
  eco_enhancements_restriction: boolean;
  message: string;
  files: File[];
  is_owner_or_authorized: boolean;
  accept_privacy_policy: boolean;
  accept_terms: boolean;
  other: boolean;
};

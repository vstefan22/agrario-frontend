export type ReportType = {
  parcel_ids: number[];
  solar_irradiance: number;
  wind_speed: number;
  grid_distance: number;
};

export type DiscountType = {
  discount_code: string;
};

export type PaymentType = {
  parcel_id: number | string;
  amount: number;
  currency: string;
};

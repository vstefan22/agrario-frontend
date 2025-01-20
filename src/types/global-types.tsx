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
  payment_type: string;
};

export type PlanTierType = 'FREE' | 'PREM' | 'ENTE';

export type PackagePaymentType = {
  payment_type: string;
  plan_tier: PlanTierType;
  billing_mode: string;
};

export type InviteBodyType = {
  email: string;
};

export type InviteRegisterType = {
  invite_code: string;
  user_data: {
    email: string;
    password: string;
    confirm_password: string;
    role: string;
    phone_number: string;
    address: string;
    zipcode: string | number;
    city: string;
    street_housenumber: string | number;
    company_website: string;
  };
};

export type PromoCodeType = {
  code: string;
};

export type AuthType = {
  refresh_token: string;
};

export type UserType = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
};

export type UserProfile = {
  company_name: string;
  position: string;
  address: string;
  zipcode: string;
  city: string;
  company_website: string;
  phone_number: string;
  profile_picture: string;
  tier: string;
};

export type UserDeveloperProfile = {
  wind: boolean;
  ground_mounted_solar: boolean;
  battery: boolean;
  heat: boolean;
  hydrogen: boolean;
  electromobility: boolean;
  ecological_upgrading: boolean;
  other: string;
  company_logo: string;
  founding_year: number;
  mw_capacity: string;
  employees: number;
  // current_plan: string;
};

export type StoreUser = UserType &
  Partial<UserProfile> &
  Partial<UserDeveloperProfile>;

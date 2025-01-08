export type UserType = {
  id: string;
  firstname: string;
  lastname: string;
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
};

export type StoreUser = UserType & Partial<UserProfile>;

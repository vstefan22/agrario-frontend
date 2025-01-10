export type PlotType = {
  id: string;
  state_name: string;
  zipcode: number;
  municipality_name: string;
  district_name: string;
  cadastral_area: string;
  cadastral_sector: string;
  land_use: string;
  plot_number_main: number;
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
  cadastral_sector: string;
  land_use: string;
  plot_number_main: number;
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
  cadastral_sector: string;
  land_use: string;
  plot_number_main: number;
  image: string;
};

export type PlotSearchType = {
  id: string;
  state_name: string;
  district_name: string;
  land_use: string;
  plot_number_main: number;
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
  cadastral_sector: string;
  land_use: string;
  plot_number_main: number;
};

export type ActiveAuctionsType = {
  id: string;
  state_name: string;
  zipcode: number;
  municipality_name: string;
  district_name: string;
  cadastral_area: string;
  cadastral_sector: string;
  land_use: string;
  plot_number_main: number;
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
  cadastral_sector: string;
};

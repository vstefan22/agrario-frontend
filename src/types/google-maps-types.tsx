export type PolygonType = {
  lat: number;
  lng: number;
};

export type ParcelPolygon = {
  id: number;
  polygon: PolygonType[];
  parcel_id: number;
  state_name: string;
  municipality_name: string;
  communal_district: string;
  cadastral_area: string;
  cadastral_parcel: string;
};

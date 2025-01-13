export type PolygonType = {
  lat: number;
  lng: number;
};

export type ParcelPolygon = {
  coordinates: PolygonType[];
  parcel_id: number;
  state_name: string;
  municipality_name: string;
  district_name: string;
  cadastral_area: string;
  cadastral_parcel: string;
};

export type PolygonData = ParcelPolygon[];

export type ParcelPolygonArray = ParcelPolygon[];

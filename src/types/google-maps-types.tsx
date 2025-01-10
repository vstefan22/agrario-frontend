export type PolygonType = {
  lat: number;
  lng: number;
};

export type PolygonData = PolygonType[];

export type GoogleMapDataType = {
  id?: string;
  state_name: string;
  zipcode: string;
  municipality_name: string;
  district_name: string;
  cadastral_area: string;
  cadastral_sector: string;
  polygon: {
    type: string;
    coordinates: [{ lat: number; lng: number }];
  };
};

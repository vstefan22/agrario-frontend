export type PolygonType = {
  lat: number;
  lng: number;
};

export type LocationType = {
  state_name: string;
  municipality_name: string;
  district_name: string;
  cadastral_area: string;
  cadastral_sector: string;
  zipcode: string;
};

export type PolygonData = PolygonType[];

export type PlotPolygonDataType = {
  id: string;
  state_name: string;
  zipcode: string;
  municipality_name: string;
  district_name: string;
  cadastral_area: string;
  cadastral_sector: string;
  polygonCoords: PolygonData;
};

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

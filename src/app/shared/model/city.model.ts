export interface City {
  id: number;
  name: string;
  code: string;
}

export interface CityResponse {
  result: number;
  message: string;
  data: City[];
}

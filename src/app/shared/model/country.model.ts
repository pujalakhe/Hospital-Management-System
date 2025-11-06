export interface Country {
  id: number;
  name: string;
  code: string;
}

export interface CountryResponse {
  result: number;
  message: string;
  data: Country[];
}

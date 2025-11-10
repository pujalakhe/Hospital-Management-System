export interface CheckInRequest {
  checkInReason: string;
  workLocation: number;
}

export interface CheckInResponse {
  result: number;
  message: string;
  data: string;
}

export interface CheckOutRequest {
  checkOutReason: string;
}

export interface CheckOutResponse {
  result: number;
  message: string;
  data: string;
}

export interface statusResponse {
  result: number;
  message: string;
  data: boolean;
}

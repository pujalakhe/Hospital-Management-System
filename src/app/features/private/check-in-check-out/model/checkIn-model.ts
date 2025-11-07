export interface CheckInRequest {
  checkInReason: string;
  workLocation: number;
}

export interface CheckInResponse {
  result: number;
  message: string;
  data: string;
}

export interface CheckOutRequest {
  checkOutReason: string;
}

export interface CheckOutResponse {
  result: number;
  message: string;
  data: string;
}

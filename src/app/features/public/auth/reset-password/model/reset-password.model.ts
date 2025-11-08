export interface RequestOtpRequest {
  email: string;
}

export interface RequestOtpResponse {
  result: number;
  message: string;
  data: any;
}

export interface ResetPasswordRequest {
  email: string;
  otp: string;
  newPassword: string;
}

export interface ResetPasswordResponse {
  result: number;
  message: string;
  data: any;
}


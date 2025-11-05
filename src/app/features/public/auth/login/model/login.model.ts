export interface LoginRequest {
  email: string;
  password: string;
}
export interface LoginResponse {
  result: number;
  message: string;
  data: {
    token: string | null;
    employeeId: number;
    role: string | null;
  };
}

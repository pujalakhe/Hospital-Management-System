export interface Address {
  name: string;
  countryId: number;
  cityId: number;
}

export interface SignupRequest {
  firstName: string;
  lastName: string;
  middleName: string;
  mobileNo: string;
  address: Address;
  email: string;
  citizenshipNo: string;
  dob: string;
  departmentId: number;
  role: number;
  gender: number;
  nationality: string;
  startDate: string;
  password: string;
  confirmPassword: string;
}

export interface SignupResponse {
  result: number;
  message: string;
  data: boolean;
}

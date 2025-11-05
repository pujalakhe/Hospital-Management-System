export interface LoggedUserCredentials {
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface LoginUserResponse {
  token: string;
  user: User;
}

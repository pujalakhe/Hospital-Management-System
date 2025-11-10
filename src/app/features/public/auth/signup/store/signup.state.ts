import { SignupResponse } from '../models/signup.model';

export interface SignupState {
  loading: boolean;
  data: SignupResponse | null;
  error: string | null;
}

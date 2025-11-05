export const resetPasswordFeatureKey = 'resetPassword';

export interface ResetPasswordState {
  email: string | null;
  otp: string | null;
  loading: {
    sendOTP: boolean;
    verifyOTP: boolean;
    resetPassword: boolean;
  };
  error: {
    sendOTP: string | null;
    verifyOTP: string | null;
    resetPassword: string | null;
  };
  success: {
    sendOTP: boolean;
    verifyOTP: boolean;
    resetPassword: boolean;
  };
  otpTimer: number;
  canResendOTP: boolean;
}

export const initialState: ResetPasswordState = {
  email: null,
  otp: null,
  loading: {
    sendOTP: false,
    verifyOTP: false,
    resetPassword: false
  },
  error: {
    sendOTP: null,
    verifyOTP: null,
    resetPassword: null
  },
  success: {
    sendOTP: false,
    verifyOTP: false,
    resetPassword: false
  },
  otpTimer: 0,
  canResendOTP: true
};
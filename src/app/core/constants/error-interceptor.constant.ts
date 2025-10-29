import { SNACKBAR_DURATION } from '../../shared/constants/snackbar.constant';

export const API_ERROR_CODES = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

export const API_SUCCESS_MESSAGE = {
  SUCCESS: {
    message: 'Operation successful.',
    duration: SNACKBAR_DURATION.SHORT,
  },
  CREATED: {
    message: 'Resource created successfully.',
    duration: SNACKBAR_DURATION.SHORT,
  },
} as const;

export const API_ERROR_MESSAGES = {
  UNAUTHORIZED: {
    message: 'Session expired. Please log in again.',
    duration: SNACKBAR_DURATION.LONG,
  },
  BAD_REQUEST: {
    message: 'Invalid request. Please check your input.',
    duration: SNACKBAR_DURATION.MEDIUM,
  },
  FORBIDDEN: {
    message: 'You do not have permission to perform this action.',
    duration: SNACKBAR_DURATION.LONG,
  },
  NOT_FOUND: {
    message: 'Requested resource not found.',
    duration: SNACKBAR_DURATION.MEDIUM,
  },
  INTERNAL_SERVER_ERROR: {
    message: 'Internal server error. Please try again later.',
    duration: SNACKBAR_DURATION.MEDIUM,
  },
  DEFAULT: {
    message: 'Something went wrong.',
    duration: SNACKBAR_DURATION.MEDIUM,
  },
};

import { createAction, props } from '@ngrx/store';
import {
  CheckInRequest,
  CheckInResponse,
  CheckOutRequest,
} from '../model/check-in-check-out-model';
import {
  CHECK_IN_FAILURE,
  CHECK_IN_REQUEST,
  CHECK_IN_STATUS,
  CHECK_IN_STATUS_FAILURE,
  CHECK_IN_STATUS_SUCCESS,
  CHECK_IN_SUCCESS,
  CHECK_OUT_FAILURE,
  CHECK_OUT_REQUEST,
  CHECK_OUT_SUCCESS,
} from './check-in-check-out.constants';

export const checkInRequest = createAction(
  CHECK_IN_REQUEST,
  props<{ payload: CheckInRequest }>()
);

export const checkInSuccess = createAction(
  CHECK_IN_SUCCESS,
  props<{ response: CheckInResponse }>()
);

export const checkInFailure = createAction(
  CHECK_IN_FAILURE,
  props<{ error: string }>()
);

export const checkOutRequest = createAction(
  CHECK_OUT_REQUEST,
  props<{ payload: CheckOutRequest }>()
);

export const checkOutSuccess = createAction(
  CHECK_OUT_SUCCESS,
  props<{ response: CheckInResponse }>()
);

export const checkOutFailure = createAction(
  CHECK_OUT_FAILURE,
  props<{ error: string }>()
);

export const loadCheckInStatusRequest = createAction(CHECK_IN_STATUS);
export const loadCheckInStatusSuccess = createAction(
  CHECK_IN_STATUS_SUCCESS,
  props<{ checkInStatus: boolean }>()
);
export const loadCheckInStatusFailure = createAction(
  CHECK_IN_STATUS_FAILURE,
  props<{ error: string }>()
);

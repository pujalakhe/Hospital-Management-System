import { createAction, props } from '@ngrx/store';
import { CheckInRequest, CheckInResponse } from '../../model/checkIn-model';
import {
  CHECK_IN_FAILURE,
  CHECK_IN_REQUEST,
  CHECK_IN_SUCCESS,
} from './checkIn.constants';

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

import { createAction, props } from '@ngrx/store';
import { Gender } from '../../model/gender.model';
import {
  LOAD_GENDER,
  LOAD_GENDER_FAILURE,
  LOAD_GENDER_SUCCESS,
} from './genderList.constant';

export const loadGenderList = createAction(LOAD_GENDER);

export const loadGenderListSuccess = createAction(
  LOAD_GENDER_SUCCESS,
  props<{ genderList: Gender[] }>()
);

export const loadGenderListFailure = createAction(
  LOAD_GENDER_FAILURE,
  props<{ error: string }>()
);

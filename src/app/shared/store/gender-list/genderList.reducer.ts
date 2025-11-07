import { createReducer, on } from '@ngrx/store';
import * as GenderActions from './genderList.action';
import { Gender } from '../../model/gender.model';

export interface GenderState {
  genderList: Gender[];
  loading: boolean;
  error: string | null;
}

export const initialState: GenderState = {
  genderList: [],
  loading: false,
  error: null,
};

export const genderReducer = createReducer(
  initialState,

  on(GenderActions.loadGenderList, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(GenderActions.loadGenderListSuccess, (state, { genderList }) => ({
    ...state,
    loading: false,
    genderList,
  })),

  on(GenderActions.loadGenderListFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

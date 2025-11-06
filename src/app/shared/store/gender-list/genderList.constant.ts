export enum GENDER_ENUM {
  MALE = 1,
  FEMALE = 2,
  OTHERS = 3,
}

export const GENDER_LIST = [
  { id: GENDER_ENUM.MALE, name: 'Male' },
  { id: GENDER_ENUM.FEMALE, name: 'Female' },
  { id: GENDER_ENUM.OTHERS, name: 'Others' },
];

export const GENDER_FEATURE_SELECTOR_KEY = 'gender';

export const LOAD_GENDER = `[${GENDER_FEATURE_SELECTOR_KEY}] Load gender`;
export const LOAD_GENDER_SUCCESS = `[${GENDER_FEATURE_SELECTOR_KEY}] Load gender Success`;
export const LOAD_GENDER_FAILURE = `[${GENDER_FEATURE_SELECTOR_KEY}]Load gender Failure`;

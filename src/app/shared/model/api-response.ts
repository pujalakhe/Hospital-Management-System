import { ResultType } from '../../core/enum/result-type.enum';

export interface ApiResponse<T = any> {
  result: ResultType;
  message: string;
  data?: T; // can be an object, array, boolean, etc.
}

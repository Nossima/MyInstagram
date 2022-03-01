import {
  error,
  Error
} from './error';
import {
  Either,
  Left,
  Maybe,
  Nothing,
  Right,
  Some
} from 'monet';
import { AxiosResponse } from 'axios';

export interface ResultContent<T> {
  success: boolean,
  data?: T,
  errors?: Array<Error>
}

export const resultDataOrError = <T>(result: ResultContent<T>): Either<Error[], T> => {
  if (result.success && result.data)
    return Right(result.data);
  return Left(result.errors || [error('data', 'error.no-data')]);
};

export const resultError = (result: ResultContent<any>): Maybe<Error[]> => {
  if (result.success)
    return Nothing();
  return Some(result.errors || []);
};

export const parseAxiosDataOrError = <T>(axiosResponse: AxiosResponse<ResultContent<T>>) =>
  resultDataOrError(axiosResponse.data);

export const parseAxiosError = (axiosResponse: AxiosResponse<ResultContent<any>>) =>
  resultError(axiosResponse.data);

export const catchAxiosDataOrError = <T>(axiosError: { response: AxiosResponse<ResultContent<T>>, message?: string }) =>
  resultDataOrError(
    axiosError.response ?
      axiosError.response.data :
      {
        success: false,
        errors: [error('axios', (axiosError.message || 'Axios error'))]
      }
  );

export const catchAxiosError = (axiosError: { response: AxiosResponse<ResultContent<any>> }) =>
  resultError(axiosError.response.data);

export const extractData = <T, Y>(extract: (v: T) => Y) => (either: Either<Error[], T>): Either<Error[], Y> =>
  either.map(extract);

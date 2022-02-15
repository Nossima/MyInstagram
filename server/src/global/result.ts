import { Error } from 'global/error';

export interface Result {
  status: number,
  content: ResultContent
}

export const Ok = (data?: Object): Result => ({
  status: 200,
  content: success(data)
});

export const Accepted = (data?: Object): Result => ({
  status: 202,
  content: success(data)
});

export const BadRequest = (errors?: Array<Error> | Error): Result => ({
  status: 400,
  content: failure(errors)
});

export const Unauthorized = (errors?: Array<Error> | Error): Result => ({
  status: 401,
  content: failure(errors)
});

export const NotFound = (errors?: Array<Error> | Error): Result => ({
  status: 404,
  content: failure(errors)
});

export interface ResultContent {
  success: boolean,
  data?: Object,
  errors?: Array<Error>
}

export const success = (data?: Object): ResultContent => ({
  success: true,
  data
});

export const failure = (errors?: Array<Error> | Error): ResultContent => ({
  success: false,
  errors: Array.isArray(errors) ? errors : [errors]
});

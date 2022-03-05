import {
  Asserts, setLocale, ValidationError
} from 'yup';
import {
  ObjectShape, OptionalObjectSchema
} from 'yup/lib/object';
import * as _ from 'lodash/fp';
import {
  BadRequest, Result
} from './result';
import {
  error, Error
} from './error';

setLocale({
  mixed: {
    defined: 'error.required',
    required: 'error.required'
  }
});

export const validate = <T extends ObjectShape>(shape: OptionalObjectSchema<T>) => (object: Object) => (ifValid: (data: Asserts<typeof shape>) => Promise<Result>) =>
  {console.log(object)
    return shape
    .validate(object, { abortEarly: false })
    .then((data) => ifValid(data))
    .catch((errors: ValidationError) =>
      BadRequest(
        _.flatMap(parseYupError)(errors.inner)
      )
    );}

export const parseYupError = (yupError: ValidationError): Error[] =>
  yupError.errors.map((err) =>
    error(
      yupError.path || '',
      err
    )
  );

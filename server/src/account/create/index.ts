import {
  Either, Left, Maybe, None, Some
} from 'monet';
import {
  error, Error
} from 'global/error';
import { Account } from 'account/models';
import getAccountByUsername from 'account/get/byUsername';
import getAccountByEmail from 'account/get/byEmail';
import createAccountInDatabase from 'account/create/createInDatabase';

export type CreateAccount = (account: Account) => Promise<Either<Error, Account>>;

const createAccount: CreateAccount = (account: Account) =>
  getAccountByUsername(account.username)
    .then(checkIfUsernameIsUsed)
    .then(checkIfEmailIsUsed(account.email))
    .then(createAccountIfAllowed(account));

const checkIfUsernameIsUsed = (maybeAccount: Maybe<Account>): Maybe<Error> =>
  maybeAccount.cata(
    () => None(),
    () => Some(error('register', 'error.register.username.used'))
  );

const checkIfEmailIsUsed = (
  email: string
) => (maybeError: Maybe<Error>): Promise<Maybe<Error>> =>
  maybeError.cata(
    () => getAccountByEmail(email)
      .then((maybeAccount) =>
        maybeAccount.cata(
          () => None(),
          () => Some(error('register', 'error.register.email.used'))
        )),
    (err) => Promise.resolve(Some(err))
  );

const createAccountIfAllowed = (
  account: Account
) => (maybeError: Maybe<Error>) =>
  maybeError.cata(
    () => createAccountInDatabase(account),
    (err) => Promise.resolve(Left(err))
  );

export default createAccount;

import {
  Either, Left, Maybe, None, Right, Some
} from 'monet';
import {
  error, Error
} from 'global/error';
import { Account } from 'account/models';
import * as bcrypt from 'bcryptjs';
import getAccountByUsername from 'account/get/byUsername';
import getAccountByEmail from 'account/get/byEmail';
import * as jwt from 'jsonwebtoken';

export type Login = (account: Partial<Account>) => Promise<Either<Error, string>>;

const login: Login = (account: Partial<Account>) =>
  getAccount(account)
    .then(checkPassword(account.password));

const getAccount = (account: Partial<Account>): Promise<Maybe<Account>> =>
  getAccountByUsername(account.username)
    .then((maybeAccount) =>
      maybeAccount.cata(
        () => getAccountByEmail(account.username)
          .then((maybeUser) =>
            maybeUser.cata(
              () => None(),
              (user) => Some(user)
            )),
        (user) => Promise.resolve(Some(user))
      )
    );

const checkPassword = (
  password: string
) => (maybeAccount: Maybe<Account>) =>
  maybeAccount.cata(
    () => Promise.resolve(Left<Error, string>(error('login', 'error.login.account'))),
    (account) =>
      bcrypt.compare(password, account.password)
        .then((res) => {
          if (res) {
            const token = jwt.sign(
              { accountId: account.id, email: account.email },
              process.env.TOKEN_KEY,
              { expiresIn: '2h' }
            );
            return Right(token);
          } else
            return Left<Error, string>(error('login', 'error.login.password'));
        })
  );

export default login;


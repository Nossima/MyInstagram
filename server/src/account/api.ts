import { APIRequest } from 'global/api';
import {
  BadRequest, NotFound,
  Ok,
  Result, Unauthorized
} from 'global/result';
import * as yup from 'yup';
import { validate } from 'global/validation';
import createNewAccount, { CreateAccount } from './create';
import { Account } from './models';
import getAccountList, { GetAccountList } from 'account/list';
import getAccountByUsername, { GetAccountByUsername } from 'account/get/byUsername';
import login, { Login } from 'account/login';
import { error } from 'global/error';

class AccountAPI {
  private createAccount: CreateAccount;
  private accountLogin: Login;
  private listAccount: GetAccountList;
  private getAccountByUsername: GetAccountByUsername;

  constructor() {
    this.createAccount = createNewAccount;
    this.accountLogin = login;
    this.listAccount = getAccountList;
    this.getAccountByUsername = getAccountByUsername;
  }

  register: APIRequest = (req): Promise<Result> =>
    validate(
      yup.object({
        username: yup.string().required('error.username.required'),
        email: yup.string().email('error.email.invalid').required('error.email.required'),
        password: yup.string().min(8, 'error.password.short').required('error.password.required'),
        birthDate: yup.number().positive('error.birthdate.invalid')
      })
    )(req.body as Partial<Account>)((body) =>
      this.createAccount(
        body as Account
      ).then((errorOrAccount) =>
        errorOrAccount.cata(
          BadRequest,
          (account) => Ok({ account })
        )
      )
    );

  login: APIRequest = (req): Promise<Result> =>
    validate(
      yup.object({
        username: yup.string().required('error.username.required'),
        password: yup.string().required('error.password.required')
      })
    )(req.body as Partial<Account>)((body) =>
      this.accountLogin(
        body as Partial<Account>
      ).then((errorOrToken) =>
        errorOrToken.cata(
          (err) => Unauthorized(err),
          (token) => Ok({ token })
        )
      )
    );

  list: APIRequest = (): Promise<Result> =>
    this.listAccount()
      .then((maybeAccounts) =>
        maybeAccounts.cata(
          BadRequest,
          (accounts) => Ok({ accounts })
        )
      );

  getByUsername: APIRequest = (req): Promise<Result> =>
    validate(
      yup.object({ username: yup.string().required('error.username.required') })
    )(req.params)(() =>
      this.getAccountByUsername(req.params.username)
        .then((maybeAccount) =>
          maybeAccount.cata(
            () => NotFound(error('user', 'error.user.unknown')),
            (account) => Ok({ account })
          )
        )
    );
}

export default AccountAPI;

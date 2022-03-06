import {
  APIRequest, UserAuth
} from 'global/api';
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
import followToggle, { FollowToggle } from 'account/follow';
import acceptFriendRequest, { AcceptFriendRequest } from 'account/follow/acceptFriendRequest';
import getFriendRequests, { GetFriendRequests } from 'account/follow/getFriendRequests';
import editAccount, { EditAccount } from 'account/edit';

class AccountAPI {
  private createAccount: CreateAccount;
  private accountLogin: Login;
  private listAccount: GetAccountList;
  private getAccountByUsername: GetAccountByUsername;
  private toggleFollow: FollowToggle;
  private listFriendRequests: GetFriendRequests;
  private acceptFollow: AcceptFriendRequest;
  private accountEdit: EditAccount;

  constructor() {
    this.createAccount = createNewAccount;
    this.accountLogin = login;
    this.listAccount = getAccountList;
    this.getAccountByUsername = getAccountByUsername;
    this.toggleFollow = followToggle;
    this.listFriendRequests = getFriendRequests;
    this.acceptFollow = acceptFriendRequest;
    this.accountEdit = editAccount;
  }

  register: APIRequest = (req): Promise<Result> =>
    validate(
      yup.object({
        username: yup.string().required('error.username.required'),
        email: yup.string().required('error.email.required'),
        password: yup.string().required('error.password.required')
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

  toggleUserFollow: APIRequest = (req): Promise<Result> =>
    validate(
      yup.object({ id: yup.string().required('error.id.required') })
    )(req.params)(() =>
      this.toggleFollow(
        req.params.id,
        req.user as UserAuth
      )
        .then((maybeError) =>
          maybeError.cata(
            () => Ok(),
            (e) => BadRequest(e)
          )
        )
    );

  listRequests: APIRequest = (req): Promise<Result> =>
    this.listFriendRequests(req.user as UserAuth)
      .then((listAccounts) => Ok(listAccounts));

  acceptFriend: APIRequest = (req): Promise<Result> =>
    validate(
      yup.object({
        id: yup.string().required('error.id.required'),
        accept: yup.boolean().required('error.accept.required')
      })
    )(req.body)((body) =>
      this.acceptFollow(
        body.id,
        body.accept,
        req.user as UserAuth
      )
        .then((maybeError) =>
          maybeError.cata(
            () => Ok(),
            (e) => BadRequest(e)
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

  edit: APIRequest = (req): Promise<Result> =>
    validate(
      yup.object({
        username: yup.string().optional(),
        bio: yup.string().optional(),
        private: yup.boolean().optional()
      })
    )(req.body as Partial<Account>)((body) =>
      this.accountEdit(
        body as Account,
        req.user as UserAuth
      ).then((errorOrAccount) =>
        errorOrAccount.cata(
          BadRequest,
          (account) => Ok({ account })
        )
      )
    );
}

export default AccountAPI;

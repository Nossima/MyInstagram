import { UserAuth } from 'global/api';
import {
  Account, AccountModel
} from 'account/models';
import idListToAccount from 'account/idListToAccount';

export type GetFollowed = (user: UserAuth) => Promise<Account[]>;

const getFollowed: GetFollowed = (user: UserAuth) =>
  AccountModel.findOne({ _id: user.accountId }).exec()
    .then((account) => idListToAccount(account.following));

export default getFollowed;

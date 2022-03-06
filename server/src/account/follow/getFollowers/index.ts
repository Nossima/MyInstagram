import { UserAuth } from 'global/api';
import {
  Account, AccountModel
} from 'account/models';
import idListToAccount from 'account/idListToAccount';

export type GetFollowers = (user: UserAuth) => Promise<Account[]>;

const getFollowers: GetFollowers = (user: UserAuth) =>
  AccountModel.findOne({ _id: user.accountId }).exec()
    .then((account) => idListToAccount(account.followedBy));

export default getFollowers;

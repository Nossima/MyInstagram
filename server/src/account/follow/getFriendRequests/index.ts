import { UserAuth } from 'global/api';
import {
  Account, AccountModel
} from 'account/models';
import idListToAccount from 'account/idListToAccount';

export type GetFriendRequests = (user: UserAuth) => Promise<Account[]>;

const getFriendRequests: GetFriendRequests = (user: UserAuth) =>
  AccountModel.findOne({ _id: user.accountId }).exec()
    .then((account) => idListToAccount(account.friendRequests));

export default getFriendRequests;

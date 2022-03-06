import {
  FeedParams,
  Post, PostModel
} from 'post/models';
import { UserAuth } from 'global/api';
import {
  Account, AccountModel
} from 'account/models';

export type GetFriendRequests = (user: UserAuth) => Promise<Account[]>;

const getFriendRequests: GetFriendRequests = (user: UserAuth) =>
  AccountModel.findOne({ _id: user.accountId }).exec()
    .then((account) => {
      const requests: Account[] = [];
      const forEachPromise = account.friendRequests.map((friendRequest) =>
        AccountModel.findOne({ _id: friendRequest }).exec()
          .then((request) => {
            requests.push(request);
          })
      );
      return Promise.all(forEachPromise)
        .then(() => requests)
        .catch((e) => {
          console.log(e);
          return [];
        });
    });

export default getFriendRequests;

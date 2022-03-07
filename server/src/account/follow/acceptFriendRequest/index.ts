import { UserAuth } from 'global/api';
import {
  Maybe, None, Some
} from 'monet';
import * as _ from 'lodash';
import {
  error, Error
} from 'global/error';
import { AccountModel } from 'account/models';
import followToggle from 'account/follow/index';

export type AcceptFriendRequest = (id: string, accept: boolean, user: UserAuth) => Promise<Maybe<Error>>;

const acceptFriendRequest: AcceptFriendRequest = (id: string, accept: boolean, user: UserAuth) =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  getUser(user.accountId)
    .then(acceptOrDecline(id, accept));

const acceptOrDecline = (id: string, accept: boolean) => (maybeAccount) =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
  maybeAccount.cata(
    () => Some(error('friendRequest',  'error.friendRequest')),
    (account) => {
      account.friendRequests = _.pull(account.friendRequests, id);
      account.markModified('friendRequests');
      if (accept) {
        account.followedBy = _.concat(account.followedBy, id);
        account.markModified('followedBy');
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      return account.save()
        .then(() => accept ? addToFollowing(id, account.id) : None())
        .catch(() => Some<Error>(error('follow',  'error.follow')));
    }
  );

const addToFollowing = (currentUser: string, id: string) =>
  getUser(currentUser)
    .then((maybeAccount) =>
      maybeAccount.cata(
        () => Promise.resolve(Some(error('follow',  'error.follow'))),
        (account) => {
          account.following = _.concat(account.following, id);
          account.markModified('following');
          return account.save()
            .then(() => None<Error>())
            .catch(() => Some<Error>(error('follow',  'error.follow')));
        }
      ));

const getUser = (id: string) =>
  AccountModel.findOne({ _id: id }).exec()
    .then(Maybe.fromNull);

export default acceptFriendRequest;

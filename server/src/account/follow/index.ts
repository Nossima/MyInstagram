import { UserAuth } from 'global/api';
import {
  Maybe, None, Some
} from 'monet';
import * as _ from 'lodash';
import {
  error, Error
} from 'global/error';
import { AccountModel } from 'account/models';

export type FollowToggle = (id: string, user: UserAuth) => Promise<Maybe<Error>>;

const followToggle: FollowToggle = (id: string, user: UserAuth) => {
  console.log(id)
  if (id === user.accountId)
    return Promise.resolve(Some(error('follow', 'error.follow.self')));
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return getUser(id)
    .then(addToFollowedBy(user.accountId));
};

const addToFollowedBy = (id: string) => (maybeAccount) =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
  maybeAccount.cata(
    () => Some(error('follow',  'error.follow')),
    (account) => {
      if (account.private) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unused-expressions
        account.friendRequests = account.friendRequests.includes(id) ?
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
          _.pull(account.friendRequests, id) :
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          _.concat(...id);
        account.markModified('friendRequests');
        return account.save()
          .then(() => None<Error>())
          .catch(() => Some<Error>(error('follow',  'error.follow')));
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unused-expressions
        account.followedBy = account.followedBy.includes(id) ?
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
          _.pull(account.followedBy, id) :
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          _.concat(...id);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
        account.markModified('followedBy');
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
        return account.save()
          .then(() => addToFollowing(id, account.id))
          .catch(() => Some<Error>(error('follow',  'error.follow')));
      }
    }
  );

const addToFollowing = (currentUser: string, id: string) =>
  getUser(currentUser)
    .then((maybeAccount) =>
      maybeAccount.cata(
        () => Promise.resolve(Some(error('follow',  'error.follow'))),
        (account) => {
          account.following = account.following.includes(id) ?
            _.pull(account.following, id) :
            _.concat(account.following, id);
          account.markModified('following');
          return account.save()
            .then(() => None<Error>())
            .catch(() => Some<Error>(error('follow',  'error.follow')));
        }
      ));

const getUser = (id: string) =>
  AccountModel.findOne({ _id: id }).exec()
    .then(Maybe.fromNull);

export default followToggle;

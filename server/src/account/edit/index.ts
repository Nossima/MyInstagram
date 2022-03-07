import {
  Either, Left, Right
} from 'monet';
import {
  error, Error
} from 'global/error';
import {
  Account, AccountModel
} from 'account/models';
import { UserAuth } from 'global/api';

export type EditAccount = (account: Account, user: UserAuth) => Promise<Either<Error, Account>>;

const editAccount: EditAccount = (account: Account, user: UserAuth) =>
  AccountModel.findOneAndUpdate({ _id: user.accountId }, { username: account.username, bio: account.bio, private: account.private }, { new: true })
    .then((saved) => Right<Error, Account>(saved.toObject() as Account))
    .catch((e) => Left<Error, Account>(error('editAccount', e.toString() || 'error.account.edit')));

export default editAccount;

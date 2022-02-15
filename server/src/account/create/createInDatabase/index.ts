import {
  Either, Left, Right
} from 'monet';
import {
  error, Error
} from 'global/error';
import {
  Account, AccountModel, Role
} from 'account/models';

export type CreateAccountInDatabase = (account: Account) => Promise<Either<Error, Account>>;

const createAccountInDatabase: CreateAccountInDatabase = (account: Account) => {
  account.email = account.email.toLowerCase();
  account.role = Role.USER;
  const newAccount = new AccountModel(account);

  return newAccount.save()
    .then(() => {
      return Right<Error, Account>(newAccount.toObject() as Account);
    })
    .catch((e) => Left(error('register', e as string || 'error.register')));
};

export default createAccountInDatabase;

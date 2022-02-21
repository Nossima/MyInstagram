import { Maybe } from 'monet';
import {
  Account, AccountModel
} from 'account/models';

export type GetAccountByUsername = (username: string) => Promise<Maybe<Account>>;

const getAccountByUsername: GetAccountByUsername = (username: string): Promise<Maybe<Account>> =>
  AccountModel.findOne({ username: username }).exec()
    .then(Maybe.fromNull);

export default getAccountByUsername;

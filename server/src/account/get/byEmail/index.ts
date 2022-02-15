import { Maybe } from 'monet';
import {
  Account, AccountModel
} from 'account/models';

export type GetAccountByEmail = (username: string) => Promise<Maybe<Account>>;

const getAccountByEmail: GetAccountByEmail = (email: string): Promise<Maybe<Account>> =>
  AccountModel.findOne({ email: email }).exec()
    .then(Maybe.fromNull);

export default getAccountByEmail;

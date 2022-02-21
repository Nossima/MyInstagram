import { Maybe } from 'monet';
import {
  Account, AccountModel
} from 'account/models';

export type GetAccountList = () => Promise<Maybe<Account[]>>;

const getAccountList: GetAccountList = (): Promise<Maybe<Account[]>> =>
  AccountModel.find().exec()
    .then(Maybe.fromNull);

export default getAccountList;

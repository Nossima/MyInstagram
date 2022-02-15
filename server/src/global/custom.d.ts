import { Account } from 'account/models';

declare global {
  namespace Express {
    interface Request {
      account?: Partial<Account>
    }
  }
}

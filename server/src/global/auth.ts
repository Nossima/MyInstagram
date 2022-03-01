import * as jwt from 'jsonwebtoken';
import { Response } from 'express';
import getAccountByEmail from 'account/get/byEmail';
import { Role } from 'account/models';
import {
  CustomRequest, UserAuth
} from 'global/api';

export const verifyToken = (req: CustomRequest, res: Response, next: any): any => {
  console.log(req)
  try {
    const token = req.headers.authorization.toString();

    if (!token)
      return res.status(403).send('A token is required for authentication');

    req.user = jwt.verify(token.split(' ')[1], process.env.TOKEN_KEY) as UserAuth;
  } catch {
    return res.status(401).send('Invalid Token');
  }
  console.log('res')
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  return next();
};

export const verifyAdmin = (req: CustomRequest, res: Response, next) => {
  return verifyRole(req, res, next, Role.ADMIN);
};

export const verifySubscriber = (req: CustomRequest, res: Response, next) => {
  return verifyRole(req, res, next, Role.SUBSCRIBER);
};

export const verifyUser = (req: CustomRequest, res: Response, next) => {
  return verifyRole(req, res, next, Role.USER);
};

const verifyRole = (req: CustomRequest, res: Response, next, role: Role) =>
  getAccountByEmail(req.user.email)
    .then((maybeAccount) =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      maybeAccount.cata(
        () => res.status(401).send('Unauthorized'),
        (account) =>
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-return
          (account.role as number) >= (role as number) ? next() : res.status(401).send('Unauthorized')
      )
    );

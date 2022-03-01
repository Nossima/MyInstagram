import {
  Request, Response
} from 'express';
import * as core from 'express-serve-static-core';
import { error } from './error';
import {
  failure, Result
} from './result';

export class FakeRequest {
  body: Object;
  params: core.ParamsDictionary;
  user: Object;
  file: any;

  constructor(body: Object = {}, params: core.ParamsDictionary = {}, user: Object = {}) {
    this.body = body;
    this.params = params;
    this.user = user;
  }

  withBody = (body: Object) =>
    new FakeRequest(body, this.params, this.user);

  withParams = (params: core.ParamsDictionary) =>
    new FakeRequest(this.body, params, this.user);

  withUser = (user: UserAuth) =>
    new FakeRequest(this.body, this.params, user);
}

export interface UserAuth {
  accountId: string,
  email: string,
  iat: number,
  exp: number
}

export interface CustomRequest extends Request {
  user?: UserAuth,
  file: any
}

export type APIRequest = (req: CustomRequest | FakeRequest) => Promise<Result>;

export const Endpoint = (apiRequest: APIRequest) => (req: CustomRequest, res: Response) => {
  apiRequest(req)
    .then((result: Result) => {
      res.status(result.status);
      res.json(result.content);
    })
    .catch((reason) => {
      res.status(400);
      res.json(
        failure(error('request', reason as string))
      );
    });
};

export type SSERequest = (req: CustomRequest, res: Response, sendResult: (result: Result) => void) => void;

export const SSEEndpoint = (sseRequest: SSERequest) => (req: CustomRequest, res: Response) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.flushHeaders();

  sseRequest(req, res, ((result) => {
    const sseFormattedResponse = `data: ${JSON.stringify(result.content)}\n\n`;
    res.write(sseFormattedResponse);
  }));

  res.on('close', () => {
    res.end();
  });
};

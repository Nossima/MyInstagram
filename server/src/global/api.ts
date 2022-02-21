import {
  Request, Response
} from 'express';
import { error } from './error';
import {
  failure, Result
} from './result';

export interface UserAuth {
  accountId: string,
  email: string,
  iat: number,
  exp: number
}

export interface CustomRequest extends Request {
  user?: UserAuth
}

export type APIRequest = (req: CustomRequest) => Promise<Result>;

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

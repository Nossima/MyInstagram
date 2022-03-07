import {
  APIRequest, UserAuth
} from 'global/api';
import {
  BadRequest,
  Ok,
  Result
} from 'global/result';
import * as yup from 'yup';
import { validate } from 'global/validation';
import { Post } from 'post/models';
import sendMessage, { SendMessage } from 'chat/send';
import getChat, { GetChatById } from 'chat/getChatById';
import getMyChats, { GetMyChats } from 'chat/getMyChats';

class ChatAPI {
  private sendDirectMessage: SendMessage;
  private getDirectMessages: GetChatById;
  private getMyDirectMessages: GetMyChats;

  constructor() {
    this.sendDirectMessage = sendMessage;
    this.getDirectMessages = getChat;
    this.getMyDirectMessages = getMyChats;
  }

  getDMById: APIRequest = (req): Promise<Result> =>
    validate(
      yup.object({ id: yup.string().required('error.id.required') })
    )(req.params)((params) =>
      this.getDirectMessages(
        params.id
      ).then((errorOrChat) =>
        errorOrChat.cata(
          BadRequest,
          (chat) => Ok({ chat })
        )
      )
    );

  getMyDM: APIRequest = (req): Promise<Result> =>
    this.getMyDirectMessages(
      req.user as UserAuth
    ).then((errorOrChat) =>
      errorOrChat.cata(
        BadRequest,
        (chat) => Ok({ chat })
      )
    );

  sendDM: APIRequest = (req): Promise<Result> =>
    validate(
      yup.object({
        id: yup.string().required('error.id.required'),
        text: yup.string().required('error.text.required'),
        chatId: yup.string().optional()
      })
    )(req.body as Partial<Post>)((body) =>
      this.sendDirectMessage(
        req.user as UserAuth,
        body.id,
        body.text,
        body.chatId
      ).then((errorOrPost) =>
        errorOrPost.cata(
          BadRequest,
          (chat) => Ok({ chat })
        )
      )
    );
}

export default ChatAPI;

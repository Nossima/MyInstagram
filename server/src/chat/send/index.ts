import {
  Chat, ChatModel
} from 'chat/models';
import { UserAuth } from 'global/api';
import {
  Either, Left, Right
} from 'monet';
import {
  error, Error
} from 'global/error';

export type SendMessage = (user: UserAuth, id: string, text: string, chatId: string) => Promise<Either<Error, Chat>>;

const sendMessage: SendMessage = (user: UserAuth, id: string, text: string, chatId: string = null) => {
  if (chatId === null) {
    const newChat = new ChatModel({
      users: [user.accountId, id],
      messages: [{
        text: text,
        author: user.accountId,
        date: Date.now()
      }]
    });
    return newChat.save()
      .then(() => Right<Error, Chat>(newChat.toObject() as Chat))
      .catch((e) => Left(error('sendMessage', e as string || 'error.sendMessage.createChat')));
  } else {
    ChatModel.findOne({ _id: chatId }).exec()
      .then((chat) => {
        chat.messages = chat.messages.concat({
          text: text,
          author: user.accountId,
          date: Date.now()
        });
        chat.markModified('messages');
        chat.save()
          .then((saved) => Right<Error, Chat>(saved.toObject() as Chat))
          .catch((e) => Left(error('sendMessage', e as string || 'error.sendMessage.save')));
      })
      .catch((e) => Left(error('sendMessage', e as string || 'error.sendMessage.findChat')));
  }
};

export default sendMessage;

import { Maybe } from 'monet';
import {
  Chat, ChatModel
} from 'chat/models';

export type GetChatById = (id: string) => Promise<Maybe<Chat>>;

const getChat: GetChatById = (id: string): Promise<Maybe<Chat>> =>
  ChatModel.findOne({ _id: id }).exec()
    .then(Maybe.fromNull);

export default getChat;

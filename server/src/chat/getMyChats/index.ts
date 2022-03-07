import { Maybe } from 'monet';
import {
  Chat, ChatModel
} from 'chat/models';
import { UserAuth } from 'global/api';

export type GetMyChats = (user: UserAuth) => Promise<Maybe<Chat[]>>;

// @ts-ignore
const getMyChats: GetMyChats = (user: UserAuth): Promise<Maybe<Chat[]>> =>
// @ts-ignore
  ChatModel.find({ users: user.accountId }).exec()
    .then(Maybe.fromNull);

export default getMyChats;

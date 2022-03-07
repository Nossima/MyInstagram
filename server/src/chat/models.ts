import {
  Model, Schema
} from 'mongoose';
import * as mongoose from 'mongoose';

export interface Message {
  text: string,
  author: string,
  date: number
}

export interface Chat {
  users: string[],
  messages: Message[]
}

export const ChatSchema = new Schema<Chat>({
  users: { type: [String] },
  messages: [{
    text: String,
    author: String,
    date: Number
  }]
});

export const ChatModel: Model<Chat> = mongoose.model<Chat>('Chat', ChatSchema);

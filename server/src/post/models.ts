import {
  Model, Schema
} from 'mongoose';
import * as mongoose from 'mongoose';

export interface FeedParams {
  number: number,
  page: number
}

export interface MulterFile {
  fieldname: string,
  originalname: string,
  encoding: string,
  mimetype: string,
  destination: string,
  filename: string,
  path: string,
  size: number

}

export interface Post {
  id: string,
  title: string,
  image: {
    data: Buffer,
    contentType: String
  },
  date: number,
  author: string,
  comments: Array<string>
}

export const PostSchema = new Schema<Post>({
  title: { type: String },
  image: {
    data: Buffer,
    contentType: String
  },
  date: { type: Number },
  author: { type: String },
  comments: { type: [String] }
});

export const PostModel: Model<Post> = mongoose.model<Post>('Post', PostSchema);

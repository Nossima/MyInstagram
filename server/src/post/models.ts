import {
  Model, Schema
} from 'mongoose';
import * as mongoose from 'mongoose';

export interface FeedParams {
  number: number,
  page: number,
  date: number
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

export interface Location {
  latitude: number,
  longitude: number
}


export interface Post {
  id: string,
  title: string,
  // image: {
  //   data: Buffer,
  //   contentType: String
  // },
  location: Location,
  uri: string,
  date: number,
  author: string,
  likes: Array<string>,
  comments: Array<string>
}

export const PostSchema : Schema<Post> = new Schema<Post>({
  title: { type: String },
  // image: {
  //   data: Buffer,
  //   contentType: String
  // },
  location: {
    latitude: { type: Number },
    longitude: { type: Number }
  },
  uri: { type: String },
  date: { type: Number },
  author: { type: String },
  likes: { type: [String] },
  comments: { type: [String] }
});

export const PostModel: Model<Post> = mongoose.model<Post>('Post', PostSchema);

export interface Comment {
  id: string,
  postId: string,
  commentId: string,
  text: string,
  likes: Array<string>,
  comments: Array<string>
}

export const CommentSchema: Schema<Comment> = new Schema<Comment>({
  postId: { type: String },
  commentId: { type: String },
  text: { type: String },
  likes: { type: [String] },
  comments: { type: [String] }
});

export const CommentModel: Model<Comment> = mongoose.model<Comment>('Comment', CommentSchema);

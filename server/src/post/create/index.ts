import {
  Either, Left, Maybe, None, Right, Some
} from 'monet';
import {
  error, Error
} from 'global/error';
import { UserAuth } from 'global/api';
import {
  Location,
  MulterFile,
  Post, PostModel
} from 'post/models';
import { AccountModel } from 'account/models';
import * as fs from 'fs';

export type CreatePost = (title: string, location: Location, uri: string, user: UserAuth) => Promise<Either<Error, Post>>;

const createNewPost: CreatePost = (title: string, location: Location = null, uri: string, user: UserAuth) => {
  const post: Partial<Post> = {
    title: title,
    location: location,
    uri: uri,
    date: Date.now(),
    likes: [],

  };
  post.author = user.accountId;
  const newPost = new PostModel(post);

  return newPost.save()
    .then(() =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      saveInUser(user.accountId, newPost.toObject().id)
        .then((maybeError) =>
          maybeError.cata(
            () => Right<Error, Post>(newPost.toObject() as Post),
            (e) => Left<Error, Post>(e)
          )))
    .catch((e) => Left<Error, Post>(error('newPost', e as string || 'error.newPost')));
};

const saveInUser = (userId: string, postId: string): Promise<Maybe<Error>> =>
  AccountModel.findOne({ _id: userId }).exec()
    .then((user) => {
      user.posts.push(postId);
      return user.save()
        .then(() => None<Error>())
        .catch((e) => Promise.resolve(Some(error('newPost', e as string || 'error.newPost'))));
    });

export default createNewPost;

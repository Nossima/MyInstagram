import {
  Comment,
  CommentModel,
  FeedParams,
  Post, PostModel
} from 'post/models';
import { UserAuth } from 'global/api';
import {
  Either, Left, Maybe, None, Right, Some
} from 'monet';
import * as _ from 'lodash';
import {
  error, Error
} from 'global/error';

export type LikeToggle = (id: string, isPost: boolean, user: UserAuth) => Promise<Either<Error, Post | Comment>>;

const likeToggle: LikeToggle = (id: string, isPost: boolean, user: UserAuth) =>
  getItem(id, isPost)
    .then((postOrComment) =>
      postOrComment.cata(
        (post) => {
          post.likes = post.likes.includes(user.accountId) ?
            _.pull(post.likes, user.accountId) :
            _.concat(post.likes, user.accountId);
          post.markModified('likes');
          return post.save()
            .then((saved) => Right<Error, Post | Comment>(saved as Post))
            .catch((e) => Left(error('like', e as string || 'error.like')));
        },
        (comment) => {
          comment.likes.includes(user.accountId) ?
            _.pull(comment.likes, user.accountId) :
            _.concat(comment.likes, user.accountId);
          comment.markModified('likes');
          return comment.save()
            .then((saved) => Right<Error, Post | Comment>(saved as Comment))
            .catch((e) => Left(error('like', e as string || 'error.like')));
        }
      )
    );

const updateItem = (item, userId: string): Array<String> => {
  console.log(item);
  return item.likes.includes(userId) ?
    item.likes.filter((like) => like === userId) :
    item.likes.concat(userId);
};

const getItem = (id: string, isPost: boolean) =>
  isPost ?
    PostModel.findOne({ _id: id } ).exec()
      .then((post) => Left(post)) :
    CommentModel.findOne({ _id: id } ).exec()
      .then((comment) => Right(comment));

export default likeToggle;

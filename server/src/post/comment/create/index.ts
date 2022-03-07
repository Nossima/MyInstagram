import {
  Either, Left, Right
} from 'monet';
import {
  error, Error
} from 'global/error';
import { CommentModel } from 'post/models';

export type CreateComment = (postId: string, text: string, commentId: string) => Promise<Either<Error, Partial<Comment>>>;

const createNewComment: CreateComment = (postId: string, text: string, commentId: string = undefined) => {
  const newComment = new CommentModel({
    postId: postId,
    text: text,
    commentId: commentId,
    likes: []
  });

  return newComment.save()
    .then(() => Right<Error, Partial<Comment>>(newComment.toObject() as Partial<Comment>))
    .catch((e) => Left<Error, Partial<Comment>>(error('newPost', e as string || 'error.newPost')));
};

export default createNewComment;

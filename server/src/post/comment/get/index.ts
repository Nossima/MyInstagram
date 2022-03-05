import { CommentModel } from 'post/models';

export type GetComments = (id: string, getByPost: boolean) => any;

const getComments = (id: string, getByPost: boolean) =>
  CommentModel.find(getByPost ? { postId: id } : { commentId: id });

export default getComments;

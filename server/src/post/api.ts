import {
  APIRequest, UserAuth
} from 'global/api';
import {
  BadRequest,
  Ok,
  Result
} from 'global/result';
import * as yup from 'yup';
import { validate } from 'global/validation';
import { CreatePost } from './create';
import {
  Comment,
  MulterFile, Post
} from 'post/models';
import createNewPost from './create';
import getFeed, { GetFeed } from 'post/get';
import createNewComment, { CreateComment } from 'post/comment/create';
import getComments from 'post/comment/get';
import likeToggle, { LikeToggle } from 'post/likeToggle';

class PostAPI {
  private createPost: CreatePost;
  private getFeed: GetFeed;
  private createComment: CreateComment;
  private getPostComments;
  private toggleLike: LikeToggle;

  constructor() {
    this.createPost = createNewPost;
    this.getFeed = getFeed;
    this.createComment = createNewComment;
    this.getPostComments = getComments;
    this.toggleLike = likeToggle;
  }

  newPost: APIRequest = (req): Promise<Result> =>
    validate(
      yup.object({ title: yup.string().required('error.title.required') })
    )(req.body as Partial<Post>)((body) =>
      this.createPost(
        body.title,
        req.file as MulterFile,
        req.user as UserAuth
      ).then((errorOrPost) =>
        errorOrPost.cata(
          BadRequest,
          (post) => Ok({ post })
        )
      )
    );

  getUserFeed: APIRequest = (req): Promise<Result> =>
    validate(
      yup.object({
        number: yup.number().required('error.number.required'),
        page: yup.number().required('error.page.required'),
        date: yup.number().required('error.date.required')
      })
    )(req.query)((body) => {
      return this.getFeed(
        body,
        req.user as UserAuth
      ).then((posts) => {
        console.log(Ok({ posts }));
        return Ok({ posts });
      }
      );
    });

  addComment: APIRequest = (req): Promise<Result> =>
    validate(
      yup.object({
        postId: yup.string().required('error.postId.required'),
        text: yup.string().required('error.text.required'),
        commentId: yup.string().optional()
      })
    )(req.body as Partial<Comment>)((body) =>
      this.createComment(
        body.postId,
        body.text,
        body.commentId
      ).then((errorOrComment) =>
        errorOrComment.cata(
          BadRequest,
          (comment) => Ok({ post: comment })
        )
      )
    );

  getComments: APIRequest = (req): Promise<Result> =>
    validate(
      yup.object({
        id: yup.string().required('error.id.required'),
        getByPost: yup.boolean().required('error.getByPost.required')
      })
    )(req.query)((body) =>
      this.getPostComments(
        body.id,
        body.getByPost
      ).then((posts) => {
        console.log(Ok({ posts }));
        return Ok({ posts });
      })
    );

  likeOrUnlike: APIRequest = (req): Promise<Result> =>
    validate(
      yup.object({
        id: yup.string().required('error.id.required'),
        isPost: yup.boolean().required('error.isPost.required')
      })
    )(req.body as Partial<Comment>)((body) =>
      this.toggleLike(
        body.id,
        body.isPost,
        req.user as UserAuth
      ).then((errorOrComment) =>
        errorOrComment.cata(
          BadRequest,
          (postOrComment) => Ok({ item: postOrComment })
        )
      )
    );
}

export default PostAPI;

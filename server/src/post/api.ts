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
  FeedParams, MulterFile, Post
} from 'post/models';
import createNewPost from './create';
import getFeed, { GetFeed } from 'post/get';

class PostAPI {
  private createPost: CreatePost;
  private getFeed: GetFeed;

  constructor() {
    this.createPost = createNewPost;
    this.getFeed = getFeed;
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
    )(req.body as FeedParams)((body) =>
      this.getFeed(
        body,
        req.user as UserAuth
      ).then((posts) =>
        Ok({ posts })
      )
    );
}

export default PostAPI;

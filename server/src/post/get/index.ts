import {
  FeedParams,
  Post, PostModel
} from 'post/models';
import { UserAuth } from 'global/api';
import { AccountModel } from 'account/models';

export type GetFeed = (params: FeedParams, user: UserAuth) => Promise<Post[]>;

const getFeed: GetFeed = (params: FeedParams, user: UserAuth) =>
  AccountModel.findOne({ _id: user.accountId }).exec()
    .then((account) => {
      const posts: Post[] = [];
      const forEachPromise = account.following.map((followedUser) =>
        getPostsFromFollowedUser(followedUser)
          .then((userPosts) => {
            posts.push(...userPosts);
          })
      );
      return Promise.all(forEachPromise)
        .then(() => posts)
        .catch((e) => {
          console.log(e);
          return [];
        });
    });

const getPostsFromFollowedUser = (userId: string) =>
  PostModel.find({ author: userId }).exec()
    .then((userPosts) => {
      return userPosts;
    });

export default getFeed;

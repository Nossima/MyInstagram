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
      let posts: Post[] = [];
      const forEachPromise = account.following.map((followedUser) =>
        getPostsFromFollowedUser(followedUser)
          .then((userPosts) => {
            posts.push(...userPosts);
          })
      );
      return Promise.all(forEachPromise)
        .then(() => {
          posts = posts.filter((post) => post.date < params.date);
          return posts.slice(params.page * params.number, (params.page + 1) * params.number);
        })
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

import { API } from '../../App';
import { catchAxiosDataOrError, extractData, parseAxiosDataOrError, ResultContent } from '../result';
import * as SecureStore from 'expo-secure-store';

interface Post {
    id: string,
    title: string,
    image: {
        data: Buffer,
        contentType: string
    },
    date: number,
    author: string,
    comments: string[]
}

type GetFeed = { posts: Post[] }

export const feedService = {
    getToken,
    getfeed,
    like
}

async function getToken() {
    let res = await SecureStore.getItemAsync('bearer_token')
    return res;
}

function getfeed(token: string, number: number, page: number, date: number = Date.now()) {
    return API.get<ResultContent<GetFeed>>('/getFeed?number=10&page=0&date=0', {headers: {'Authorization': 'Bearer ' + token}, })
    .then(parseAxiosDataOrError)
    .catch((e) => catchAxiosDataOrError<GetFeed>(e))
    .then(extractData<GetFeed, Post[]>((r) => {
        return r.posts;
    }));
}

function like(isLike: boolean) {
    console.log(isLike);
}
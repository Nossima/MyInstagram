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
    getfeed
}

async function getToken() {
    let res = await SecureStore.getItemAsync('bearer_token')
    return res;
}

function getfeed(token: string, number: number, page: number, date: number = Date.now()) {
    return API.get<ResultContent<GetFeed>>('/getFeed?number=' + number + '&page=' + page + '&date=' + date, {headers: {'Authorization': 'Bearer ' + token}, })
    .then(parseAxiosDataOrError)
    .catch((e) => catchAxiosDataOrError<GetFeed>(e))
    .then(extractData<GetFeed, Post[]>((r) => {
        console.log(r.posts)
        return r.posts;
    }));
}

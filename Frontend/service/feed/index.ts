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

type GetFeed = { feed: Post[] }

export const feedService = {
    getToken,
    getfeed
}

async function getToken() {
    let res = await SecureStore.getItemAsync('bearer_token')
    return res;
}

function getfeed(number: number, page: number, date: number = Date.now()) {
    return API.get<ResultContent<GetFeed>>('/getfeed', {params: {number, page, date}})
    .then(parseAxiosDataOrError)
    .catch((e) => catchAxiosDataOrError<GetFeed>(e))
    .then(extractData<GetFeed, Post[]>((r) => {
        return r.feed;
    }));
}
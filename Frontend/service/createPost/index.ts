import { API } from '../../App';
import { catchAxiosDataOrError, extractData, parseAxiosDataOrError, ResultContent } from '../result';
import * as SecureStore from 'expo-secure-store';

interface Location {
    latitude: string,
    longitude: string
}

interface Post {
    id: string,
    title: string,
    image: {
        data: Buffer,
        contentType: string
    },
    date: number,
    author: string,
    likes: Array<string>,
    comments: Array<string>
}

type GetPost = { post: Post};

export const createPostService = {
    getToken,
    createPost
}
async function getToken() {
    let res = await SecureStore.getItemAsync('bearer_token')
    return res;
}

// function createPost(token: string, image: {content: string, type: string}, title: string, location: {latitude: number, longitude: number}) {
//     return API.post<ResultContent<GetPost>>('/newPost', {image: image, title: title, location: location}, {headers: {'Authorization': 'Bearer ' + token}, })
//     .then(parseAxiosDataOrError)
//     .catch((e) => catchAxiosDataOrError<GetPost>(e))
//     .then(extractData<GetPost, Post>((r) => {
//         console.log('result:');
//         console.log(r);
//         return r.post;
//     }));

function createPost(token: string, data: FormData) {
    return API.post<ResultContent<GetPost>>('/newPost', data, {headers: {'Content-Type': 'multipart/form-data', 'Authorization': 'Bearer ' + token}})
    .then(parseAxiosDataOrError)
    .catch((e: any) => catchAxiosDataOrError<GetPost>(e))
    .then(extractData<GetPost, Post>((r) => {
        console.log('result:');
        console.log(r);
        return r.post;
    }));
}
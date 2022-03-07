import { API } from '../../App';
import { catchAxiosDataOrError, extractData, parseAxiosDataOrError, ResultContent } from '../result';
import * as SecureStore from 'expo-secure-store';
import { authentificationService } from '../authentification';

interface Location {
    latitude: string,
    longitude: string
}

interface Post {
    id: string,
    title: string,
    // image: {
    //     data: Buffer,
    //     contentType: string
    // },
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
    let res = await SecureStore.getItemAsync('bearer_token');
    return res;
}

async function createPost(title: string, uri: string, location: {latitude: number, longitude: number} | null)  {
    let token = await getToken();
    return API.post<ResultContent<GetPost>>('/newPost', {title: title, uri: uri, location: location}, {headers: {'Authorization': 'Bearer ' + token}, })
    .then(parseAxiosDataOrError)
    .catch((e) => catchAxiosDataOrError<GetPost>(e))
    .then(extractData<GetPost, Post>((r) => {
        return r.post;
    }));

// function createPost(token: string, data: FormData) {
//     return API.post<ResultContent<GetPost>>('/newPost', data, {headers: {'Content-Type': 'multipart/form-data', 'Authorization': 'Bearer ' + token}})
//     .then(parseAxiosDataOrError)
//     .catch((e: any) => catchAxiosDataOrError<GetPost>(e))
//     .then(extractData<GetPost, Post>((r) => {
//         console.log('result:');
//         console.log(r);
//         return r.post;
//     }));
}
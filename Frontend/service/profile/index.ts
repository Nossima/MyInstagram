import { API } from '../../App';
import { catchAxiosDataOrError, extractData, parseAxiosDataOrError, ResultContent } from '../result';
import { feedService } from '../feed';
import * as SecureStore from 'expo-secure-store';

interface Account {
    id: string,
    username: string,
    email: string,
    bio: string,
    avatar: string,
    password: string,
    birthDate: number,
    private: boolean,
    following: Array<string>,
    followedBy: Array<string>,
    posts: Array<string>,
    friendRequests: Array<string>
}

type GetAccount = { account: Account };

export const profileService = {
    profile,
    editProfile,
}

async function getToken() {
    let res = await SecureStore.getItemAsync('bearer_token');

    console.log(res);
    return res;
}

function profile(username: string) {
    //let token = await SecureStore.getItemAsync('bearer_token');

    return API.get<ResultContent<GetAccount>>('/account/' + username, { headers: { "Authorization": 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOiI2MjI1M2M4Yzk3MjQ0MzMyN2MwNGY3NTAiLCJlbWFpbCI6IjExQGdtYWlsLmNvbSIsImlhdCI6MTY0NjYxODU2NiwiZXhwIjoxNjQ2NjI1NzY2fQ.ETir8Rt1dUInuu-U0v5dILqmVog-MlYSYZwOYBwiDL0' } })// + SecureStore.getItemAsync('bearer_token') }})
    .then(parseAxiosDataOrError)
    .catch((e) => catchAxiosDataOrError<GetAccount>(e))
    .then(extractData<GetAccount, Account>((r) => {
        return r.account;
    }));
}

function editProfile(username: string, bio: string, isPrivate: boolean) {
    let token = getToken();

    console.log(username);

    return API.put<ResultContent<GetAccount>>('/account/edit', { username, bio, private: isPrivate }, {headers: { "Authorization": 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOiI2MjI1M2M4Yzk3MjQ0MzMyN2MwNGY3NTAiLCJlbWFpbCI6IjExQGdtYWlsLmNvbSIsImlhdCI6MTY0NjYxODU2NiwiZXhwIjoxNjQ2NjI1NzY2fQ.ETir8Rt1dUInuu-U0v5dILqmVog-MlYSYZwOYBwiDL0' } })// + SecureStore.getItemAsync('bearer_token') } })
        .then(parseAxiosDataOrError)
        .catch((e) => catchAxiosDataOrError<GetAccount>(e))
        .then(extractData<GetAccount, Account>((r) => {
            console.log(r);
            return r.account;
        }));
}
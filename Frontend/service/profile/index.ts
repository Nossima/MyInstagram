import { API } from '../../App';
import { catchAxiosDataOrError, extractData, parseAxiosDataOrError, ResultContent } from '../result';
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

async function profile(username: string) {
    return SecureStore.getItemAsync('bearer_token')
    .then((token) => {
        return API.get<ResultContent<GetAccount>>('/account/' + username, { headers: { "Authorization": 'Bearer ' + token } })
        .then(parseAxiosDataOrError)
        .catch((e) => catchAxiosDataOrError<GetAccount>(e))
        .then(extractData<GetAccount, Account>((r) => {
            return r.account;
        }));
    })
}

async function editProfile(username: string, bio: string, isPrivate: boolean) {
    return SecureStore.getItemAsync('bearer_token')
    .then((token) => {
        return API.put<ResultContent<GetAccount>>('/account/edit', { username, bio, private: isPrivate }, {headers: { "Authorization": 'Bearer ' + token } })
            .then(parseAxiosDataOrError)
            .catch((e) => catchAxiosDataOrError<GetAccount>(e))
            .then(extractData<GetAccount, Account>((r) => {
            return r.account;
        }));
    })
}
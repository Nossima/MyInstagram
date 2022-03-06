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

type GetAccountList = { accounts: Account[] };

export const searchService = {
    getListUser
}

async function getListUser() {
    return SecureStore.getItemAsync('bearer_token')
    .then((token) => {
        return API.get<ResultContent<GetAccountList>>('/account/list', {headers: {'Authorization': 'Bearer ' + token}})
        .then(parseAxiosDataOrError)
        .catch((e) => catchAxiosDataOrError<GetAccountList>(e))
        .then(extractData<GetAccountList, Account[]>((r) => {
            console.log(r.accounts);
            return r.accounts;
        }));
    })
}
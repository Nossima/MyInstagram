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
    profile
}

async function getToken() {
    let res = await SecureStore.getItemAsync('bearer_token');

    return res;
}


function profile(username: string) {
    let token = getToken();

    console.log(username);

    return API.get<ResultContent<GetAccount>>('/account/' + username, { headers: { "Authorization": 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOiI2MjI1MmE1N2M1NmJjYjBlMGM1MTc4OWMiLCJlbWFpbCI6IjEwQGdtYWlsLmNvbSIsImlhdCI6MTY0NjYwMzc5MSwiZXhwIjoxNjc4MTM5NzkxfQ.nQ2m7q66ixW_R9sQzLZ-tS1ulVDiVpI8nDg3xUV9owA'}})
    .then(parseAxiosDataOrError)
    .catch((e) => catchAxiosDataOrError<GetAccount>(e))
    .then(extractData<GetAccount, Account>((r) => {
        return r.account;
    }));
}
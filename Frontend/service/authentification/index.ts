import { API } from '../../App';
import { catchAxiosDataOrError, extractData, parseAxiosDataOrError, ResultContent } from '../result';

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

interface Token {
    token: string
<<<<<<< HEAD
=======
    username: string
>>>>>>> profile
}

type GetToken = { token: Token }

export const authentificationService = {
    register,
    login
}

function register(username: string, email: string, password: string, isPrivate: boolean) {
    return API.post<ResultContent<GetAccount>>('/register', {username, email, password, isPrivate})
    .then(parseAxiosDataOrError)
    .catch((e) => catchAxiosDataOrError<GetAccount>(e))
    .then(extractData<GetAccount, Account>((r) => {
        console.log(r);
        return r.account;
    }));
}

function login(username: string, password: string) {
    return API.post<ResultContent<GetToken>>('/login', {username, password})
    .then(parseAxiosDataOrError)
    .catch((e) => catchAxiosDataOrError<GetToken>(e))
    .then(extractData<GetToken, Token>((r) => {
        return r.token;
    }));
}
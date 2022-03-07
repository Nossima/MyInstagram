import { API } from '../../App';
import * as SecureStore from 'expo-secure-store';


export const requestService = {
    getrequest,
    acceptrequest,
}

function getrequest() {
    return SecureStore.getItemAsync('bearer_token')
    .then((token) => {
        return API.get('/friendRequests', { headers: { 'Authorization': 'Bearer ' + token }})
        .then((r) => {
            return r.data;
        });
    })
}

function acceptrequest(id: string, bool: boolean) {
    return SecureStore.getItemAsync('bearer_token')
    .then((token) => {
        return API.put('/friendRequest', { id: id, accept: bool }, {headers: { 'Authorization': 'Bearer ' + token }})
        .then((r) => {
            return r;
        });
    })
}

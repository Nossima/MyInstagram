import { Router } from 'express';
import AccountAPI from './api';
import { Endpoint } from 'global/api';
import {
  verifyAdmin,
  verifyToken, verifyUser
} from 'global/auth';

const accountAPI = new AccountAPI();

const accountAPIRoutes = (router: Router) => {
  router.post('/register', Endpoint(accountAPI.register));

  router.post('/login', Endpoint(accountAPI.login));

  router.put('/:id/follow', verifyToken, verifyUser, Endpoint(accountAPI.toggleUserFollow));

  router.get('/friendRequests', verifyToken, verifyUser, Endpoint(accountAPI.listRequests));

  router.get('/followers', verifyToken, verifyUser, Endpoint(accountAPI.listFollowers));

  router.get('/following', verifyToken, verifyUser, Endpoint(accountAPI.listFollowing));

  router.put('/friendRequest', verifyToken, verifyUser, Endpoint(accountAPI.acceptFriend));

  router.post('/account/delete', verifyToken, Endpoint(accountAPI.getByUsername));

  router.get('/account/list', verifyToken, verifyAdmin, Endpoint(accountAPI.list));

  router.get('/account/:username', verifyToken, verifyUser, Endpoint(accountAPI.getByUsername));

  router.put('/account/edit', verifyToken, verifyUser, Endpoint(accountAPI.edit));
};

export default accountAPIRoutes;

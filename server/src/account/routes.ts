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

  router.post('/account/delete', verifyToken, Endpoint(accountAPI.getByUsername));

  router.get('/account/list', verifyToken, verifyAdmin, Endpoint(accountAPI.list));

  router.get('/account/:username', verifyToken, verifyUser, Endpoint(accountAPI.getByUsername));
};

export default accountAPIRoutes;

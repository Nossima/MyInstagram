import { Router } from 'express';
import { Endpoint } from 'global/api';
import { verifyToken } from 'global/auth';
import ChatAPI from './api';

const chatAPI = new ChatAPI();

const chatAPIRoutes = (router: Router) => {
  router.get('/chat/:id', verifyToken, Endpoint(chatAPI.getDMById));

  router.get('/chat', verifyToken, Endpoint(chatAPI.getMyDM));

  router.post('/chat/send', verifyToken, Endpoint(chatAPI.sendDM));
};

export default chatAPIRoutes;

import { Router as expressRouter } from 'express';
import accountAPIRoutes from 'account/routes';
import postAPIRoutes from 'post/routes';
import chatAPIRoutes from 'chat/routes';

const router = expressRouter();

accountAPIRoutes(router);

postAPIRoutes(router);

chatAPIRoutes(router);

export default router;

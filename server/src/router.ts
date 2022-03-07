import { Router as expressRouter } from 'express';
import accountAPIRoutes from 'account/routes';
import postAPIRoutes from 'post/routes';

const router = expressRouter();

accountAPIRoutes(router);

postAPIRoutes(router);

export default router;

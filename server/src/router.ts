import { Router as expressRouter } from 'express';
import accountAPIRoutes from 'account/routes';

const router = expressRouter();

accountAPIRoutes(router);

export default router;

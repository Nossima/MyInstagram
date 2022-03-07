import { Router as expressRouter } from 'express';
import accountAPIRoutes from 'account/routes';
import postAPIRoutes from 'post/routes';
<<<<<<< HEAD
import chatAPIRoutes from 'chat/routes';
=======
>>>>>>> profile

const router = expressRouter();

accountAPIRoutes(router);

postAPIRoutes(router);

<<<<<<< HEAD
chatAPIRoutes(router);

=======
>>>>>>> profile
export default router;

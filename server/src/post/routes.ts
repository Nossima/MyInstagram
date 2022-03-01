import { Router } from 'express';
import {
  CustomRequest, Endpoint
} from 'global/api';
import { verifyToken } from 'global/auth';
import PostAPI from './api';
import * as multer from 'multer';

const imageFilter = (req, file, cb) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/))
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-return
    return cb(new Error('Only images are allowed'), false);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  cb(null, true);
};

const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req: CustomRequest, file, cb) => {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    cb(null, req.user.accountId + '_' + Date.now() + '_' + file.originalname.replace(/\s/g, '_'));
  }
});

const upload = multer({
  storage: storage,
  fileFilter: imageFilter
});

const postAPI = new PostAPI();

const postAPIRoutes = (router: Router) => {
  router.post('/newPost', verifyToken, upload.single('image'), Endpoint(postAPI.newPost));
  router.get('/getFeed', verifyToken, Endpoint(postAPI.getUserFeed));
};

export default postAPIRoutes;

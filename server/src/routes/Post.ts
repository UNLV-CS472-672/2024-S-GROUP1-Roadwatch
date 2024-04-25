import express from 'express';
import * as postController from '../controllers/PostController';
import { validateToken } from '../middlewares';

const router = express.Router();

router.get(
  '/community/:communityId',
  validateToken,
  postController.getCommunityPosts
);

router.post('/save-post', validateToken, postController.savePost);

router.delete('/delete-post/:id', validateToken, postController.deletePost);

export default router;

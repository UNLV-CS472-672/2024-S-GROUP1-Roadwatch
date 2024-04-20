import express from 'express';
import * as postController from '../controllers/PostController';
import { validateToken } from '../middlewares';

const router = express.Router();

router.get(
  '/all-posts',
  validateToken,
  postController.getAllPosts
);

router.post(
  '/save-post',
  validateToken,
  postController.savePost
);

router.delete(
  '/delete-post',
  validateToken,
  postController.deletePost
);

export default router;

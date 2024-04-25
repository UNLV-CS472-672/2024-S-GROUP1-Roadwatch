import express from 'express';
import * as communityController from '../controllers/CommunityController';
import { validateToken } from '../middlewares';

const router = express.Router();

router.get(
  '/all-communities',
  validateToken,
  communityController.getAllComunities
);

router.get(
  '/:communityId/posts',
  validateToken,
  communityController.getCommunityPosts
);

export default router;

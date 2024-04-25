import express from 'express';
import * as markerController from '../controllers/MarkerController';
import { validateToken } from '../middlewares';

const router = express.Router();

// define routes
router.get('/', validateToken, markerController.getMarkers);

router.post('/', validateToken, markerController.saveMarker);

router.delete('/', validateToken, markerController.deleteMarker);

// route to fetch a post by marker ID
router.get('/:markerId/post', validateToken, markerController.getPostByMarker);

export default router; 

import express from 'express';
import * as markerController from '../controllers/MarkerController';
import { validateToken } from '../middlewares';

const router = express.Router();

// define routes
router.get('/', markerController.getMarkers);

router.post('/', markerController.saveMarker);

router.delete('/', markerController.deleteMarker);

export default router; 

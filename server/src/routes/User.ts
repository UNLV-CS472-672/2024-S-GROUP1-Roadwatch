import express from "express";
import * as userController from '../controllers/UserController'

const router = express.Router();

// define routes
router.get('/', userController.getUser);
router.put('/', userController.updateUser);

export default router;
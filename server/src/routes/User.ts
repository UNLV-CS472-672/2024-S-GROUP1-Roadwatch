import express from 'express';
import * as userController from '../controllers/UserController';
import { validateToken } from '../middlewares';

const router = express.Router();

// define routes
router.get('/', validateToken, userController.getLoggedInUser);
router.get('/:id', validateToken, userController.getUser);

router.post('/', userController.createUser);
router.post('/login', userController.login);
router.put('/:id', validateToken, userController.updateUser);

router.delete('/:id', validateToken, userController.deleteUser);

router.post('/forgot-password', userController.forgotPassword);
router.post('/reset-password', userController.resetPassword);

export default router;

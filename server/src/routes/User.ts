import express from 'express';
import * as userController from '../controllers/UserController';

const router = express.Router();

// define routes
router.get('/', userController.getUsers);
router.get('/:id', userController.getUser);

router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);

router.delete('/:id', userController.deleteUser);

export default router;

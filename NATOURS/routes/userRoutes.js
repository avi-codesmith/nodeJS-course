import express from 'express';
import {
  getAllUsers,
  getUserByID,
  addUser,
  updateUser,
  deleteUser,
} from '../controllers/userControllers.js';

const router = express.Router();

router.route('/').get(getAllUsers).post(addUser);

router.route('/:id').get(getUserByID).patch(updateUser).delete(deleteUser);

export default router;

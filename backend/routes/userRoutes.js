import express from 'express';
const router = express.Router();
import {
  authUser,
  registerUser,
  getUserProfile,
  getUsers,
  verifyArtisan,
  deleteUser,
  upgradeToArtisan,
} from '../controllers/userController.js';
import { protect,admin } from '../middleware/authMiddleware.js';

router.route('/').post(registerUser).get(protect,admin,getUsers);
router.post('/login', authUser);
router.route('/profile').get(protect, getUserProfile);
router.route('/profile/become-artisan').put(protect, upgradeToArtisan);
router.route('/:id/verify').put(protect, admin, verifyArtisan);
router.route('/:id').delete(protect, admin, deleteUser);
export default router;
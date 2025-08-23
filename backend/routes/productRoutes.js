import express from 'express';
const router = express.Router();
import {
  getProducts,
  getProductById,
  getMyProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  approveProduct,
} from '../controllers/productController.js';
import { protect, artisan, admin } from '../middleware/authMiddleware.js';

// --- Public Routes ---
router.route('/').get(getProducts);

// --- Admin Routes (Specific routes first) ---
router.route('/all').get(protect, admin, getAllProducts);
router.route('/:id/approve').put(protect, admin, approveProduct);

// --- Artisan Routes ---
router.route('/myproducts').get(protect, artisan, getMyProducts);
router.route('/').post(protect, artisan, createProduct);

// --- Dynamic public route LAST ---
router.route('/:id').get(getProductById);

// --- Dynamic artisan routes ---
router.route('/:id')
  .put(protect, artisan, updateProduct)
  .delete(protect, artisan, deleteProduct);

export default router;
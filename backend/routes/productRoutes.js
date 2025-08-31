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

//  Public Routes 
router.route('/').get(getProducts);

//Admin Routes
router.route('/all').get(protect, admin, getAllProducts);
router.route('/:id/approve').put(protect, admin, approveProduct);
router.route('/:id').get(getProductById);

//Artisan Routes
router.route('/myproducts').get(protect, artisan, getMyProducts);
router.route('/').post(protect, artisan, createProduct);



router.route('/:id')
  .put(protect, artisan, updateProduct)
  .delete(protect, admin, deleteProduct);
export default router;
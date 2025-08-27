import Product from '../models/productModel.js';

// @desc    Fetch all approved products with search and pagination
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const pageSize = 8; // We will show 8 products per page
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: 'i', // 'i' for case-insensitive search
          },
        }
      : {};

    // First, count all the documents that match the keyword
    const count = await Product.countDocuments({ ...keyword, isApproved: true });

    // Then, find the products for the specific page
    const products = await Product.find({ ...keyword, isApproved: true })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    // Return the products for the page, the current page number, and the total number of pages
    res.json({ products, page, pages: Math.ceil(count / pageSize) });
  } catch (error) {
    console.error('ERROR IN getProducts:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product && product.isApproved) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found or not approved' });
    }
  } catch (error) {
    console.error('ERROR IN getProductById:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};


// --- ARTISAN CONTROLLERS ---

// @desc    Get logged in artisan's products
// @route   GET /api/products/myproducts
// @access  Private/Artisan
const getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({ user: req.user._id });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Artisan
const createProduct = async (req, res) => {
  try {
    const { name, price, description, image, category, countInStock } = req.body;
    const product = new Product({
      name,
      price,
      user: req.user._id,
      image,
      category,
      countInStock,
      description,
    });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Artisan
const updateProduct = async (req, res) => {
  try {
    const { name, price, description, image, category, countInStock } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product || product.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Product not found or not authorized' });
    }

    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.image = image || product.image;
    product.category = category || product.category;
    product.countInStock = countInStock ?? product.countInStock;
    product.isApproved = false;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Artisan
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
// Allow deletion if the user is the owner OR if the user is an admin
    if (product.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await Product.deleteOne({ _id: req.params.id });
    res.json({ message: 'Product removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};


// --- ADMIN CONTROLLERS ---

// @desc    Get all products (admin view)
// @route   GET /api/products/all
// @access  Private/Admin
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}).populate('user', 'name');
    res.json(products);
  } catch (error) {
    console.error('ERROR IN getAllProducts:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Approve a product
// @route   PUT /api/products/:id/approve
// @access  Private/Admin
const approveProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      product.isApproved = true;
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};


export {
  getProducts,
  getProductById,
  getMyProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  approveProduct,
};
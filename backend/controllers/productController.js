import Product from '../models/productModel.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    // We only want to show approved products to the public
    const products = await Product.find({ isApproved: true });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    // Ensure the fetched product is approved before sending it back
    if (product && product.isApproved) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found or not approved' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};



// --- (Existing getProducts and getProductById functions are here) ---

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
      // isApproved is false by default
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

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if the product belongs to the artisan trying to update it
    if (product.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.image = image || product.image;
    product.category = category || product.category;
    product.countInStock = countInStock || product.countInStock;
    // When an artisan updates a product, it should go back to pending approval
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

    // Check if the product belongs to the artisan trying to delete it
    if (product.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await product.remove();
    res.json({ message: 'Product removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get all products (admin view)
// @route   GET /api/products/all
// @access  Private/Admin
const getAllProducts = async (req, res) => {
  console.log('--- ENTERING getAllProducts CONTROLLER ---'); // --- ADD THIS ---

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
  approveProduct
};
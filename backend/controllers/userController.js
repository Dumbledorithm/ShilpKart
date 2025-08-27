import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc    Auth user & get token (Login)
// @route   POST /api/users/login
// @access  Public
const authUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isArtisan: user.isArtisan,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
  const { name, email, password, isArtisan, shopName, location } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const user = await User.create({
    name,
    email,
    password,
    isArtisan,
    artisanDetails: isArtisan ? { shopName, location } : {},
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isArtisan: user.isArtisan,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isArtisan: user.isArtisan,
      artisanDetails: user.artisanDetails,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = async (req, res) => {
  console.log('--- ENTERING getUsers CONTROLLER ---');
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error('ERROR IN getUsers:', error);
    res.status(500).json({ message: 'Server Error' });
  }
}

// @desc    Verify an artisan
// @route   PUT /api/users/:id/verify
// @access  Private/Admin
const verifyArtisan = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user && user.isArtisan) {
      user.artisanDetails.verified = true;
      const updatedUser = await user.save();
      res.json({ message: 'Artisan verified', user: updatedUser });
    } else {
      res.status(404).json({ message: 'User not found or is not an artisan' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      await User.deleteOne({ _id: user._id });
      res.json({ message: 'User removed' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('ERROR IN deleteUser:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export { authUser, registerUser, getUserProfile, getUsers, verifyArtisan, deleteUser };

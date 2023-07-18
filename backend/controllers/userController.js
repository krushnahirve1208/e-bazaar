const User = require("../model/User");
const generateToken = require("../utils/generateToken");
const asyncHandler = require("../middleware/asyncHandler");

// @desc    Auth User & Get User
// @route   Post /api/users/login
// @access  public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("invalid email or password");
  }
});

// @desc    Register User
// @route   Post /api/users/
// @access  public

const registerUser = asyncHandler(async (req, res) => {
  const { email, name, password } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User Already Exist");
  }
  const user = await User.create({ email, name, password });
  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  }
});

// @desc    Logout User and clear cookie
// @route   Post /api/users/logout
// @access  private

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", { expiresIn: Date.now(), httpOnly: true });
  res.status(200).json({ message: "logged out successfully" });
});

// @desc    Get user profile
// @route   Get /api/users/profile
// @access  private

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

// @desc    update user profile
// @route   PUT /api/users/profile
// @access  private

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.status(200).json({
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      _id: updatedUser._id,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

// @desc    get all users profile
// @route   GET /api/users/
// @access  private/Admin

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  if (users) res.status(200).json(users);
  else {
    res.status(404);
    throw new Error("Users Not Found");
  }
});

// @desc    get user profile
// @route   Get /api/users/:id
// @access  private/Admin

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) res.status(200).json(user);
  else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

// @desc    update user profile
// @route   PUT /api/users/:id
// @access  private/Admin

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin || user.isAdmin);
    const updatedUser = await user.save();
    res.status(200);
    res.json(updatedUser);
  }
});

// @desc    Delete user profile
// @route   DELETE /api/users/:id
// @access  private/Admin

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    if (user.isAdmin) {
      res.status(500);
      throw new Error("Cannot Delete Admin User");
    }
    await User.deleteOne({ _id: user._id });
    res.status(200);
    res.json({ message: "User Deleted Successfully" });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

module.exports = {
  getUserProfile,
  authUser,
  updateUserProfile,
  deleteUser,
  updateUser,
  getUserById,
  getUsers,
  registerUser,
  logoutUser,
};

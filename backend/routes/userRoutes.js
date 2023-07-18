const express = require("express");
const router = express.Router();
const {
  getUserProfile,
  authUser,
  updateUserProfile,
  deleteUser,
  updateUser,
  getUserById,
  getUsers,
  registerUser,
  logoutUser,
} = require("../controllers/userController");
const { admin, protect } = require("../middleware/authMiddleware");

router.route("/").post(registerUser).get(protect, admin, getUsers);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

module.exports = router;

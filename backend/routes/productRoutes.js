const express = require("express");
const router = express.Router();
const { admin, protect } = require("../middleware/authMiddleware");
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
} = require("../controllers/productController");

router.get("/top", getTopProducts);
router.route("/").get(getProducts).post(protect, admin, createProduct);
router
  .route("/:id")
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);
router.route("/:id/reviews").post(protect, createProductReview);

module.exports = router;

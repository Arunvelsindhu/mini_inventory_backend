const express = require("express");

const router = express.Router();

const productController = require("../controllers/productController");
const verifyToken = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/roleMiddleware");

// =========================
// GET All Products
// =========================
router.get(
    "/",
    verifyToken,
    productController.getProducts
);

// =========================
// GET Product By ID
// =========================
router.get(
    "/:id",
    verifyToken,
    productController.getProductById
);

// =========================
// Add Product (Admin Only)
// =========================
router.post(
    "/",
    verifyToken,
    authorizeRole("Admin"),
    productController.addProduct
);

// =========================
// Update Product (Admin Only)
// =========================
router.put(
    "/:id",
    verifyToken,
    authorizeRole("Admin"),
    productController.updateProduct
);

// =========================
// Stock In (Admin Only)
// =========================
router.put(
    "/:id/stock-in",
    verifyToken,
    authorizeRole("Admin"),
    productController.stockIn
);

// =========================
// Stock Out (Admin Only)
// =========================
router.put(
    "/:id/stock-out",
    verifyToken,
    authorizeRole("Admin"),
    productController.stockOut
);

// =========================
// Delete Product (Admin Only)
// =========================
router.delete(
    "/:id",
    verifyToken,
    authorizeRole("Admin"),
    productController.deleteProduct
);

module.exports = router;
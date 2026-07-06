const express = require("express");

const router = express.Router();

const dashboardController = require("../controllers/dashboardController");
const verifyToken = require("../middleware/authMiddleware");

// Total Products
router.get(
    "/total-products",
    verifyToken,
    dashboardController.totalProducts
);

// Low Stock
router.get(
    "/low-stock",
    verifyToken,
    dashboardController.lowStock
);

// Total Categories
router.get(
    "/categories",
    verifyToken,
    dashboardController.totalCategories
);

// Inventory Value
router.get(
    "/inventory-value",
    verifyToken,
    dashboardController.inventoryValue
);

module.exports = router;
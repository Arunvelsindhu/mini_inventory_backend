const productModel = require("../models/productModel");

// =========================
// Get All Products
// =========================
const getProducts = (req, res) => {

    productModel.getAllProducts((err, products) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Error fetching products"
            });
        }

        res.status(200).json(products);

    });

};

// =========================
// Add Product
// =========================
const addProduct = (req, res) => {

    const {
        name,
        sku,
        category,
        price,
        stock,
        low_stock_limit
    } = req.body;

    if (
        !name ||
        !sku ||
        !category ||
        price === undefined ||
        stock === undefined ||
        low_stock_limit === undefined
    ) {

        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });

    }

    productModel.insertProduct(req.body, (err, result) => {

        if (err) {

            return res.status(500).json({
                success: false,
                message: "Failed to add product"
            });

        }

        res.status(201).json({
            success: true,
            message: "Product Added Successfully",
            productId: result.insertId
        });

    });

};

// =========================
// Get Product By ID
// =========================
const getProductById = (req, res) => {

    productModel.getProductById(req.params.id, (err, product) => {

        if (err) {

            return res.status(500).json({
                success: false,
                message: "Error fetching product"
            });

        }

        if (product.length === 0) {

            return res.status(404).json({
                success: false,
                message: "Product not found"
            });

        }

        res.json(product[0]);

    });

};

// =========================
// Update Product
// =========================
const updateProduct = (req, res) => {

    productModel.updateProduct(
        req.params.id,
        req.body,
        (err, result) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: "Update Failed"
                });

            }

            if (result.affectedRows === 0) {

                return res.status(404).json({
                    success: false,
                    message: "Product not found"
                });

            }

            res.json({
                success: true,
                message: "Product Updated Successfully"
            });

        }
    );

};

// =========================
// Stock In
// =========================
const stockIn = (req, res) => {

    const { quantity } = req.body;

    if (!quantity || quantity <= 0) {

        return res.status(400).json({
            success: false,
            message: "Quantity must be greater than 0"
        });

    }

    productModel.stockIn(
        req.params.id,
        quantity,
        (err, result) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: "Failed to update stock"
                });

            }

            if (result.affectedRows === 0) {

                return res.status(404).json({
                    success: false,
                    message: "Product not found"
                });

            }

            res.json({
                success: true,
                message: "Stock Updated Successfully"
            });

        }
    );

};

// =========================
// Stock Out
// =========================
const stockOut = (req, res) => {

    const { quantity } = req.body;

    if (!quantity || quantity <= 0) {

        return res.status(400).json({
            success: false,
            message: "Quantity must be greater than 0"
        });

    }

    productModel.stockOut(
        req.params.id,
        quantity,
        (err, result) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: "Failed to update stock"
                });

            }

            if (result.affectedRows === 0) {

                return res.status(400).json({
                    success: false,
                    message: "Insufficient stock or product not found"
                });

            }

            res.json({
                success: true,
                message: "Stock Removed Successfully"
            });

        }
    );

};

// =========================
// Delete Product
// =========================
const deleteProduct = (req, res) => {

    productModel.deleteProduct(req.params.id, (err, result) => {

        if (err) {

            return res.status(500).json({
                success: false,
                message: "Delete Failed"
            });

        }

        if (result.affectedRows === 0) {

            return res.status(404).json({
                success: false,
                message: "Product not found"
            });

        }

        res.json({
            success: true,
            message: "Product Deleted Successfully"
        });

    });

};

module.exports = {
    getProducts,
    addProduct,
    getProductById,
    updateProduct,
    stockIn,
    stockOut,
    deleteProduct
};
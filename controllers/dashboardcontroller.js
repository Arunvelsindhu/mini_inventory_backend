const db = require("../config/db");

// Total Products
const totalProducts = (req, res) => {

    db.query(
        "SELECT COUNT(*) AS total FROM products",
        (err, result) => {

            if (err)
                return res.status(500).json(err);

            res.json(result[0]);

        }
    );

};

// Low Stock
const lowStock = (req, res) => {

    db.query(
        "SELECT COUNT(*) AS total FROM products WHERE stock <= low_stock_limit",
        (err, result) => {

            if (err)
                return res.status(500).json(err);

            res.json(result[0]);

        }
    );

};

// Categories
const totalCategories = (req, res) => {

    db.query(
        "SELECT COUNT(DISTINCT category) AS total FROM products",
        (err, result) => {

            if (err)
                return res.status(500).json(err);

            res.json(result[0]);

        }
    );

};

// Inventory Value
const inventoryValue = (req, res) => {

    db.query(
        "SELECT SUM(price * stock) AS total FROM products",
        (err, result) => {

            if (err)
                return res.status(500).json(err);

            res.json(result[0]);

        }
    );

};

module.exports = {
    totalProducts,
    lowStock,
    totalCategories,
    inventoryValue
};
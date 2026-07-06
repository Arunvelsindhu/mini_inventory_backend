const db = require("../config/db");

// =========================
// Get All Products
// =========================
const getAllProducts = (callback) => {

    const sql = "SELECT * FROM products ORDER BY id DESC";

    db.query(sql, (err, results) => {

        if (err) {
            console.error("❌ MySQL Error:", err);
            return callback(err, null);
        }

        callback(null, results);

    });

};

// =========================
// Insert Product
// =========================
const insertProduct = (product, callback) => {

    const sql = `
        INSERT INTO products
        (name, sku, category, price, stock, low_stock_limit)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            product.name,
            product.sku,
            product.category,
            product.price,
            product.stock,
            product.low_stock_limit
        ],
        (err, results) => {

            if (err) {
                console.error("❌ MySQL Error:", err);
                return callback(err, null);
            }

            callback(null, results);

        }
    );

};

// =========================
// Get Product By ID
// =========================
const getProductById = (id, callback) => {

    db.query(
        "SELECT * FROM products WHERE id=?",
        [id],
        (err, results) => {

            if (err) {
                console.error(err);
                return callback(err, null);
            }

            callback(null, results);

        }
    );

};

// =========================
// Update Product
// =========================
const updateProduct = (id, product, callback) => {

    const sql = `
        UPDATE products
        SET
            name=?,
            sku=?,
            category=?,
            price=?,
            stock=?,
            low_stock_limit=?
        WHERE id=?
    `;

    db.query(
        sql,
        [
            product.name,
            product.sku,
            product.category,
            product.price,
            product.stock,
            product.low_stock_limit,
            id
        ],
        (err, results) => {

            if (err) {
                console.error(err);
                return callback(err, null);
            }

            callback(null, results);

        }
    );

};

// =========================
// Stock In
// =========================
const stockIn = (id, quantity, callback) => {

    const sql = `
        UPDATE products
        SET stock = stock + ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [quantity, id],
        (err, results) => {

            if (err) {
                console.error(err);
                return callback(err, null);
            }

            callback(null, results);

        }
    );

};

// =========================
// Stock Out
// =========================
const stockOut = (id, quantity, callback) => {

    const sql = `
        UPDATE products
        SET stock = stock - ?
        WHERE id = ?
        AND stock >= ?
    `;

    db.query(
        sql,
        [quantity, id, quantity],
        (err, results) => {

            if (err) {
                console.error(err);
                return callback(err, null);
            }

            callback(null, results);

        }
    );

};

// =========================
// Delete Product
// =========================
const deleteProduct = (id, callback) => {

    db.query(
        "DELETE FROM products WHERE id=?",
        [id],
        (err, results) => {

            if (err) {
                console.error(err);
                return callback(err, null);
            }

            callback(null, results);

        }
    );

};

module.exports = {
    getAllProducts,
    insertProduct,
    getProductById,
    updateProduct,
    stockIn,
    stockOut,
    deleteProduct
};
const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Arunvel@2001",
    database: "inventory_db"
});

connection.connect((err) => {
    if (err) {
        console.error("Database Connection Failed:", err);
    } else {
        console.log("✅ Connected to MySQL Database");
    }
});

module.exports = connection;
const express = require("express");
const cors = require("cors");

const db = require("./config/db");

const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

// =========================
// Middleware
// =========================
app.use(cors());
app.use(express.json());

// =========================
// Routes
// =========================
app.use("/products", productRoutes);
app.use("/", userRoutes);
app.use("/dashboard", dashboardRoutes);

// =========================
// Home Route
// =========================
app.get("/", (req, res) => {
    res.send("🚀 Inventory Management API is Running...");
});

// =========================
// Server
// =========================
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
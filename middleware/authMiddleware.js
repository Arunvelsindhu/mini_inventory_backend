const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {

    console.log("========== VERIFY TOKEN ==========");

    const authHeader = req.headers.authorization;

    console.log("Authorization Header:", authHeader);

    if (!authHeader) {
        return res.status(401).json({
            message: "Access Denied. No Token Provided."
        });
    }

    const token = authHeader.split(" ")[1];

    console.log("Received Token:");
    console.log(token);

    try {

        const decoded = jwt.verify(token, "inventory_secret_key");

        console.log("Decoded Token:");
        console.log(decoded);

        req.user = decoded;

        next();

    } catch (err) {

        console.log("JWT ERROR:");
        console.log(err);

        return res.status(401).json({
            message: "Invalid Token"
        });

    }

};

module.exports = verifyToken;
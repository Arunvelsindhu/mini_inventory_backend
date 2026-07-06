const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Login User
const loginUser = async (req, res) => {

    console.log("Request Body:", req.body);

    const { username, password } = req.body;

    userModel.findUserByUsername(username, async (err, users) => {

        console.log("Database Error:", err);
        console.log("Users:", users);

        if (err) {
            return res.status(500).json({
                message: "Server Error"
            });
        }

        if (users.length === 0) {
            console.log("User not found");
            return res.status(401).json({
                message: "Invalid Username"
            });
        }

        const user = users[0];

        console.log("DB Password:", user.password);

        try {

            const isMatch = await bcrypt.compare(password, user.password);

            console.log("Password Match:", isMatch);

            if (!isMatch) {
                return res.status(401).json({
                    message: "Invalid Password"
                });
            }

            const token = jwt.sign(
                {
                    id: user.id,
                    username: user.username,
                    role: user.role
                },
                "inventory_secret_key",
                {
                    expiresIn: "1h"
                }
            );

            console.log("Token Generated");

            return res.status(200).json({
                message: "Login Successful",
                token,
                user: {
                    id: user.id,
                    username: user.username,
                    role: user.role
                }
            });

        } catch (e) {

            console.log(e);

            return res.status(500).json({
                message: "Internal Server Error"
            });

        }

    });

};

// ✅ IMPORTANT
module.exports = {
    loginUser
};
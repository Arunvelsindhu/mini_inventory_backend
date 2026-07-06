const db = require("../config/db");

// Find user by username
const findUserByUsername = (username, callback) => {

    const sql = "SELECT * FROM users WHERE username = ?";

    db.query(sql, [username], (err, results) => {

        if (err) {
            return callback(err, null);
        }

        callback(null, results);

    });

};

module.exports = {
    findUserByUsername
};
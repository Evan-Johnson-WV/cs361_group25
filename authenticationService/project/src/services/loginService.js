const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
require('dotenv').config();

// Connect to the database that has the Users and Passwords table
const pool = mysql.createPool({
    waitForConnections: true,
    connectionLimit   : 10,
    host              : process.env.DB_HOST,
    user              : process.env.DB_USER,
    password          : process.env.DB_PASS,
    database          : process.env.DB_NAME
});

// Checks if the user with the given username exists in the Users table of the database
exports.getUser = async (username) => {
    const [rows] = await pool.query(
        "SELECT UserID, Username FROM Users WHERE Username = ?",
        [username]
    );

    // Returns undefined is the username is not found
    return rows[0];
};

// Gets the salted/hashed password stored under the given userID from the Passwords table of the database
exports.getPasswordHash = async (userID) => {
    const [rows] = await pool.query(
        "SELECT PasswordHash FROM Passwords WHERE UserID = ?",
        [userID]
    );

    // If there is a hashed password stored under the given userID in the database, return that hashed password. Otherwise, return null
    return rows.length > 0 ? rows[0].PasswordHash : null;
};

// Use bcrypt's .compare() function to to salt/hash the given password, then compare it to the salted/hashed password stored in the database to verify that they match
exports.correctPassword = async (password, storedHash) => {
    return await bcrypt.compare(password, storedHash);
};

const mysql = require('mysql2/promise');
const bcrypt = require ('bcrypt');
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


// Verify that password and confirmPassword are the same. Return True if they are, False otherwise.
exports.verifyPasswordsMatch = (password, confirmPassword) => {
    return password === confirmPassword;
};

// Check if the username is already in the database
exports.usernameTaken = async (username) => {
    const [rows] = await pool.query(
        "SELECT UserID FROM Users WHERE Username = ?",
        [username]
    );

    // If rows.length is greater than 0, that means a match was found for that username in the database
    // So is the username taken evaluates to True, which is returned. Otherwise, it returns False as the username is available (not in the database yet)
    return rows.length > 0;
};

//Insert a new user into the Users table in the database and return the new UserID
exports.createUser = async (username) => {
    const [result] = await pool.query(
        "INSERT INTO Users (Username) VALUES (?)",
        [username]
    );
    return result.insertId;
};


// Salt and hash the password so that it can be securely stored in the database
exports.hashPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};


// Insert the salted and hashed password to the Passwords table in the database under the same UserID as the username
exports.createPassword = async (userID, hashedPassword) => {
    const [result] = await pool.query(
        "INSERT INTO Passwords (UserID, PasswordHash) VALUES (?, ?)",
        [userID, hashedPassword]
    );

    return userID;
}

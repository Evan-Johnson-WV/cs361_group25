const loginService = require('../services/loginService');

exports.handleLogin = async (req, res) => {
    const {username, password} = req.body;

    // Verify that the req.body contains a username and password
    if (!username || !password) {
        return res.status(400).json({
            message: "Please enter your username and password!"
        });
    }

    try {
        // Call the loginService.getUser() function which checks if a user with the given username exists in the database
        const user = await loginService.getUser(username);
        if (!user) {
            return res.status(400).json({message: "Invalid username or password!"});
        }

        // Call the loginService.getPasswordHash() function which gets the hashed and salted password for that user using their UserID
        const storedHash = await loginService.getPasswordHash(user.UserID);
        if (!storedHash) {
            return res.status(400).json({message: "Invalid username or password!"});
        }

        // Call the loginService.correctPassword() function which salts/hashes the entered password and compares it to the hashed password stored in the database
        const isMatch = await loginService.correctPassword(password, storedHash);
        if (!isMatch) {
            return res.status(400).json({message: "Invalid username or password!"});
        }

        // Reply with json object including success message, userID, and username
        res.json({
            message: "Login successful",
            userID: user.UserID,
            username: username
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Server error"});
    }
};

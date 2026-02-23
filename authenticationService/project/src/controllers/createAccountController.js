const createAccountService = require('../services/createAccountService');

exports.handleCreateAccount = async (req, res) => {
    const { username, password, confirmPassword } = req.body;

    // Verify that the req.body contains a username, password, and cofirmPassword (re-entered password)
    if (!username || !password || !confirmPassword) {
         return res.status(400).json({ message: "Please enter a username, password, and then re-enter your password!" }); 
    }

    // Call the createAccountService.verifyPasswordsMatch() function which checks if the password and re-entered password are the same
    const passwordsMatch = createAccountService.verifyPasswordsMatch(password, confirmPassword);
    if (!passwordsMatch) {
        return res.status(400).json({
            message: "Password must match re-entered password!"
        })
    }

    try {
        // Call the createAccountService.usernameTaken() function which checks if the username already exists in the database
        const usernameTaken = await createAccountService.usernameTaken(username);
        if (usernameTaken) {
            return res.status(400).json({
                message: "That username is already taken! Please choose another."
            });
        }

        // Call the createAccountService.createUser() function which adds a user to the database and returns their UserID
        const userID = await createAccountService.createUser(username);

        // Once a user has been successfully created, salt and hash the password
        const hashedPassword = await createAccountService.hashPassword(password);

        // Call the createAccountService.createPassword() function which adds the hashed password to the database under the same UserID as the username
        const passwordUserID = await createAccountService.createPassword(userID, hashedPassword);

        // Reply with json object including success message, userID and passwordUserID (which should be the same), the username, and the salted and hashed password
        res.json({
            message: "User created successfully!",
            userID: userID,
            passwordUserID: passwordUserID,
            username: username,
            hashedPassword: hashedPassword
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Server error"});
    }

};

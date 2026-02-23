/*
Notes:
    To TEST the mircroservice in a development environment (must be in the project root directory, so cd ~/authenticationService/project): npm run development

    Open a fresh terminal, make sure you are in the project root directory (cd ~/authenticationService/project), and type: node testCreateAccount.js

    To run the microservice FOREVER in a production environment (must be in the project root directory, so cd ~/authenticationService/project): npm run production
    To stop the microservice from running forever (must be in the project root directory, so cd ~/authenticationService/project): npm run stop_production
*/

const fetch = require('node-fetch');

// Test function to create an account
async function testCreateAccount() {
    const response = await fetch('http://localhost:64328/account/createAccount', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        // Pass the username, password, and confirmPassword in a JSON object
        body: JSON.stringify({
            username: "sleepyTired",
            password: "NapTime-99",
            confirmPassword: "NapTime-99"
        })
    });

    const data = await response.json();
    // Print the response
    console.log("Response: ", data);
}

// Call the test fucntion
testCreateAccount();

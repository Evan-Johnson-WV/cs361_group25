/*
Notes:
    To TEST the mircroservice in a development environment (must be in the project root directory, so cd ~/authenticationService/project): npm run development

    Open a fresh terminal, make sure you are in the project root directory (cd ~/authenticationService/project), and type: node testLogin.js

    To run the microservice FOREVER in a production environment (must be in the project root directory, so cd ~/authenticationService/project): npm run production
    To stop the microservice from running forever (must be in the project root directory, so cd ~/authenticationService/project): npm run stop_production
*/

const fetch = require('node-fetch');

// Test function to login with previously created account
async function testLogin() {
    const response = await fetch('http://localhost:64328/auth/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        // Pass the username and password in a JSON object
        body: JSON.stringify({
            username: "sleepyTired",
            password: "NapTime-99"
        })
    });

    console.log("Status: ", response.status);
    const data = await response.json();
    // Print the response
    console.log("Response: ", data);
}

// Call the test fucntion
testLogin();

/*
Notes:
    To TEST the web application in a development environment (must be in the project root directory, so cd ~/authenticationService/project): npm run development

    To run the web application FOREVER in a production environment (must be in the project root directory, so cd ~/authenticationService/project): npm run production
    To stop the web application from running forever (must be in the project root directory, so cd ~/authenticationService/project): npm run stop_production
*/

// #############################
// SETUP
// #############################

// #### Express ####
const express = require('express');
const path = require('path');
const app = express();
const session = require('express-session');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const PORT = 64328;

const createAccountRoutes = require('./routes/createAccountRoutes');
const loginRoutes = require('./routes/loginRoutes');

app.use('/account', createAccountRoutes);
app.use('/auth', loginRoutes);

// #############################
// LISTENER
// #############################

app.listen(PORT, function(){
    console.log(`Microservice running on port ${PORT}`);
});

DESCRIPTION: 
NOTE: In order for these microservices to work, you MUST have a database that contains a Users table with columns UserID (primary key) and Username, 
and it must be linked via a 1:1 relationship with a Passwords table with columns UserID (primary key, same as the one in Users table) and PasswordHash.

This service is technically composed of two microservices. The first, a createAccount microservice, takes a JSON object containing a username, password, 
and confirmPassword (which is the password but re-typed). It first verifies that password and confirmPassword match exactly, then verifies that a user with 
the entered username does not already exist in the Users table of a database. If no user with that username exists, it adds a user with the entered username, 
returning the UserID. It then salts and hashes the entered password for security, before adding it to the Passwords table in the database, setting this 
PasswordHash’s primary key to be the same UserID. It responds with a JSON object containing a success message, the UserID, the PasswordUserID (to verify 
that it is the same number as UserID), the username, and the hashed password.

The second microservice is a login service. It takes a JSON object containing a username and password. It first checks the Users table in the database to verify 
that a user with the entered username exists in it. It then gets the UserID and uses it to look up the corresponding PasswordHash from the Passwords table. Next, 
it salts and hashes the entered password, and compares it to the PasswordHash that it retrieved from the database to see if they are the same. If they are, it 
responds with a JSON object containing a success message, the userID, and the username.





HOW TO PROGRAMMATICALLY REQUEST AND RECEIVE DATA FROM CREATEACCOUNT MICROSERVICE:

  Code for example test function and call:

<img width="674" height="432" alt="testCreateAccount" src="https://github.com/user-attachments/assets/0ed323b7-0b30-444c-b4d6-88ed36f8b4b9" />
<img width="674" height="432" alt="testCreateAccount" src="https://github.com/user-attachments/assets/0ed323b7-0b30-444c-b4d6-88ed36f8b4b9" />

To Test:
    -Create a file in the project root directory (cd ~/microservice/project) called: testCreateAccount.js
    -Paste the above test function code into it
    -Run the microservice in npm development (or npm production) from project root directory
    -Open a fresh console, make sure you’re in the project root directory (cd ~/microservice/project), and type: node testCreateAccount.js







HOW TO PROGRAMMATICALLY REQUEST AND RECEIVE DATA FROM LOGIN MICROSERVICE:

   Example test function and call:

<img width="585" height="439" alt="testLogin" src="https://github.com/user-attachments/assets/4730cb22-a297-49aa-90f2-f91c1e743de4" />
<img width="585" height="439" alt="testLogin" src="https://github.com/user-attachments/assets/4730cb22-a297-49aa-90f2-f91c1e743de4" />


To Test:
    -Create a file in the project root directory (cd ~/microservice/project) called: testLogin.js
    -Paste the above test function code into it
    -Run the microservice in npm development (or npm production) from project root directory
    -Open a fresh console, make sure you’re in the project root directory (cd ~/microservice/project), and type: node testLogin.js

# cs361_group25
Repository to host our group project

## Personalized Feed Microservice

The Personalized Feed Microservice is a tag-based recommendation service. It acts as a communication bridge that takes a unique User ID, identifies that user's specific interest tags from a JSON, and filters a collection of generic items. It returns only the items that share at least one matching tag with the user. 
### How to Programmatically REQUEST Data
To get a personalized feed, send a GET request to /recommendations with the userId at the end of the URL.

<img width="513" height="162" alt="image" src="https://github.com/user-attachments/assets/39cf1c51-89bc-4dfc-b0e4-f88f297c231c" />

**Note:** To search for a different user, simply pass a different ID to the function. The microservice will automatically look up the new ID in the database.

### How to Programmatically RECEIVE Data
The microservice returns data as a JSON Array. You must parse the response body to access the list of recommended items.
<img width="499" height="258" alt="image" src="https://github.com/user-attachments/assets/0a194658-8f1f-4442-be5e-fe8a023fd569" />

**Example Response Data**

<img width="549" height="235" alt="image" src="https://github.com/user-attachments/assets/dfbcb2ac-0c86-440b-b3af-0706773c73b7" />


**How to Run**
```
Navigate to the folder personalized_feed in your local directory

Start the Server: node server.js

Run the Test: In a separate terminal navigate to personalized_feed and run node test_feed.js 
```

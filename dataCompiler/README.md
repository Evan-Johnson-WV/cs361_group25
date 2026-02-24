<h1>Data Compiler</h1>
This microservice serves to compile data that is sent to it into a local text file. The program can also add to existing files and delete unwanted files as well.

<h2>How to request data</h2>
To access the microservice the user must send a POST request to the link http://localhost:5555/enter-data. The request must have the required paramters of file_name, 
data_entry, and delete (which must be "True" or "False".
<img width="762" height="143" alt="image" src="https://github.com/user-attachments/assets/6dbcd7d3-4799-4616-8b78-53330432a0c0" />

<h2>How to receive data</h2>
The program should directly create, edit, and delete files in the same directory it is located in, so you can check those directly to see the results.
Also, the service will send a status code and a message in JSON form to let the user know the outcome of the operation.
<img width="742" height="97" alt="image" src="https://github.com/user-attachments/assets/e33748d7-6565-4d2d-942a-922694b97338" />

To run the microservice, simply run the file.

<img width="755" height="563" alt="ext(1)" src="https://github.com/user-attachments/assets/d59083f5-3e44-4b3f-b41e-b3d0a1d0abfd" />

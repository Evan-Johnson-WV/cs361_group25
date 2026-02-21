const targetUser = 12345;

console.log("Testing the README 'Receive' logic...");

fetch(`http://localhost:3005/recommendations/${targetUser}`, {
    method: 'GET'
})
// Tests Recieves Logic
.then(response => {
    if (response.ok) {
        return response.json(); 
    } else {
        throw new Error("User not found or service error");
    }
})
.then(data => {
    
    console.log("Personalized feed received:", data); 
})
.catch(error => {
    console.error("Test failed:", error.message);
});
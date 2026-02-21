// Test a single hardcoded user recommendation request
async function runTest() {
    try {
        const response = await fetch ('http://localhost:3005/recommendations/12345');
        const data = await response.json();

        if (response.ok) {
            console.log ("Sucess: Received mathing data:");
            console.log(data);
        } else {
            console.log("Failed: " + (data.error || "Unknown error"));
        }
    } catch (error) {
        console.error("Cannot reach data.");
    }
}

// Fetch and display recommendations for any user ID
async function getAnyUserFeed(id) {
    const response = await fetch(`http://localhost:3005/recommendations/${id}`);
    const data = await response.json();
    console.log(`--- Feed for User ${id} ---`);
    console.table(data);
}

// Run tests for multiple users
async function runAllTests() {
    await getAnyUserFeed(12345); // First user
    await getAnyUserFeed(67890); // Second user (if they exist in users.json)
}

runAllTests();
async function runTest() {
    try {
        const response = await fetch ('http://localhost:3000/recommendations/12345');
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

runTest();
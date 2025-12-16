/**
 * API Connection Test Script for jeiu.cc
 * Tests the actual API endpoints on the production server
 */

async function testAPIConnection() {
    console.log("Testing API connection to jeiu.cc...");
    
    try {
        // Test the debug endpoint first
        console.log("\n1. Testing debug endpoint...");
        const debugResponse = await fetch('https://jeiu.cc/api/debug');
        const debugData = await debugResponse.json();
        console.log("Debug response:", debugData);
        
        // Test the teams endpoint
        console.log("\n2. Testing teams endpoint...");
        const teamsResponse = await fetch('https://jeiu.cc/api/teams');
        console.log("Teams response status:", teamsResponse.status);
        if (teamsResponse.status === 200) {
            const teamsData = await teamsResponse.json();
            const teamCount = Object.values(teamsData).flat().length;
            console.log(`Teams loaded: ${teamCount} teams across all classes`);
        } else {
            console.log("Teams response:", await teamsResponse.text());
        }
        
        // Test the students endpoint (our new endpoint)
        console.log("\n3. Testing students endpoint...");
        const studentsResponse = await fetch('https://jeiu.cc/api/students');
        console.log("Students response status:", studentsResponse.status);
        if (studentsResponse.status === 200) {
            const studentsData = await studentsResponse.json();
            console.log(`Students loaded: ${Object.keys(studentsData).length}`);
            if (Object.keys(studentsData).length > 0) {
                console.log("Sample student data:", JSON.stringify(Object.entries(studentsData)[0], null, 2));
            }
        } else {
            console.log("Students response:", await studentsResponse.text());
        }
        
        // Test the comment counts endpoint
        console.log("\n4. Testing comment counts endpoint...");
        const countsResponse = await fetch('https://jeiu.cc/api/comment-counts');
        console.log("Comment counts response status:", countsResponse.status);
        
        console.log("\n✅ API connection test completed!");
        
    } catch (error) {
        console.error("\n❌ API connection test failed:", error.message);
    }
}

// Run the test
testAPIConnection();
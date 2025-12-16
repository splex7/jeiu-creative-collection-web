/**
 * Post-Deployment Verification Script
 * Run this after deploying the Worker to verify the students endpoint is available
 */

async function verifyDeployment() {
    console.log("Verifying students endpoint after deployment...");
    
    const maxRetries = 5;
    let retryCount = 0;
    
    while (retryCount < maxRetries) {
        try {
            console.log(`Attempt ${retryCount + 1}/${maxRetries}...`);
            
            // Test the students endpoint
            const response = await fetch('https://jeiu.cc/api/students');
            
            if (response.status === 200) {
                const data = await response.json();
                console.log("✅ Students endpoint is working!");
                console.log(`Students found: ${Object.keys(data).length}`);
                
                if (Object.keys(data).length === 0) {
                    console.log("⚠️  No students in database yet, ready for migration!");
                } else {
                    console.log("Sample student:", Object.entries(data)[0]);
                }
                return true;
            } else if (response.status === 404) {
                console.log("❌ Students endpoint not found - Worker likely not deployed yet");
            } else {
                console.log(`❌ Students endpoint returned status: ${response.status}`);
                console.log("Response:", await response.text());
            }
        } catch (error) {
            console.error(`❌ Error during verification:`, error.message);
        }
        
        retryCount++;
        console.log(`Waiting 10 seconds before next attempt...`);
        await new Promise(resolve => setTimeout(resolve, 10000));
    }
    
    console.log("❌ Students endpoint still not available after all retries.");
    console.log("Please ensure the updated Worker has been deployed to jeiu.cc");
    return false;
}

// Run verification
verifyDeployment();
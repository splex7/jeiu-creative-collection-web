// Bulk Update Script for Firestore Comments
// Purpose: Fix teamId values that start with "team_team_" to "team_"

// Firebase configuration (same as in index.html)
const firebaseConfig = {
    apiKey: "AIzaSyA3x2O7n1i1dQpXv3v6y3z3w3x3x3x3x3x3",
    authDomain: "jeiu-creative-collection.firebaseapp.com",
    projectId: "jeiu-creative-collection",
    storageBucket: "jeiu-creative-collection.appspot.com",
    messagingSenderId: "953948313357",
    appId: "1:953948313357:web:80d229c82c94edc31b4244"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Bulk update function
async function bulkUpdateTeamIds() {
    console.log('🔄 Starting bulk update for teamId values...');
    
    try {
        // Get all comments from Firestore
        const snapshot = await db.collection('comments').get();
        console.log(`📊 Found ${snapshot.size} comments to check`);
        
        let updateCount = 0;
        let errorCount = 0;
        const batch = db.batch();
        
        // Process each comment
        for (const doc of snapshot.docs) {
            const commentData = doc.data();
            const currentTeamId = commentData.teamId;
            
            // Check if teamId starts with "team_team_"
            if (currentTeamId && currentTeamId.startsWith('team_team_')) {
                const newTeamId = currentTeamId.replace('team_team_', 'team_');
                
                console.log(`🔧 Updating comment ${doc.id}:`);
                console.log(`   Old teamId: ${currentTeamId}`);
                console.log(`   New teamId: ${newTeamId}`);
                
                // Update the document
                batch.update(doc.ref, { teamId: newTeamId });
                updateCount++;
                
                // Firestore batch limit is 500 operations
                if (updateCount % 500 === 0) {
                    console.log(`📝 Committing batch ${Math.floor(updateCount / 500)}...`);
                    await batch.commit();
                    batch = db.batch(); // Start new batch
                }
            }
        }
        
        // Commit remaining operations
        if (updateCount % 500 !== 0) {
            console.log('📝 Committing final batch...');
            await batch.commit();
        }
        
        console.log(`✅ Bulk update completed!`);
        console.log(`📈 Total comments updated: ${updateCount}`);
        console.log(`❌ Errors encountered: ${errorCount}`);
        
        if (updateCount === 0) {
            console.log('ℹ️ No comments needed updating. All teamId values are already correct.');
        }
        
    } catch (error) {
        console.error('❌ Bulk update failed:', error);
        console.error('Error details:', error.code, error.message);
    }
}

// Function to verify the updates
async function verifyUpdates() {
    console.log('🔍 Verifying updates...');
    
    try {
        const snapshot = await db.collection('comments').get();
        let incorrectCount = 0;
        let correctCount = 0;
        
        snapshot.forEach(doc => {
            const teamId = doc.data().teamId;
            if (teamId && teamId.startsWith('team_team_')) {
                console.log(`❌ Still incorrect: ${doc.id} -> ${teamId}`);
                incorrectCount++;
            } else if (teamId && teamId.startsWith('team_')) {
                correctCount++;
            }
        });
        
        console.log(`✅ Correct teamId values: ${correctCount}`);
        console.log(`❌ Incorrect teamId values: ${incorrectCount}`);
        
        if (incorrectCount === 0) {
            console.log('🎉 All teamId values are correct!');
        } else {
            console.log('⚠️ Some teamId values still need fixing.');
        }
        
    } catch (error) {
        console.error('❌ Verification failed:', error);
    }
}

// Function to add a button to the page for easy execution
function addBulkUpdateButton() {
    // Check if we're on the main page
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        const buttonContainer = document.createElement('div');
        buttonContainer.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 9999;
            background: #ff6b6b;
            color: white;
            padding: 10px 15px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 12px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        `;
        
        buttonContainer.innerHTML = '🔧 Bulk Update TeamIds';
        buttonContainer.onclick = () => {
            if (confirm('정말로 teamId 대량 업데이트를 실행하시겠습니까?\n\n이 작업은 되돌릴 수 없습니다.')) {
                bulkUpdateTeamIds();
            }
        };
        
        document.body.appendChild(buttonContainer);
        
        // Add verification button
        const verifyButton = document.createElement('div');
        verifyButton.style.cssText = `
            position: fixed;
            bottom: 70px;
            right: 20px;
            z-index: 9999;
            background: #4ecdc4;
            color: white;
            padding: 10px 15px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 12px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        `;
        
        verifyButton.innerHTML = '🔍 Verify Updates';
        verifyButton.onclick = verifyUpdates;
        
        document.body.appendChild(verifyButton);
    }
}

// Auto-execute if running in browser console
if (typeof window !== 'undefined') {
    // Add buttons to page
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', addBulkUpdateButton);
    } else {
        addBulkUpdateButton();
    }
    
    // Make functions available globally
    window.bulkUpdateTeamIds = bulkUpdateTeamIds;
    window.verifyUpdates = verifyUpdates;
    
    console.log('🚀 Bulk update script loaded!');
    console.log('📋 Available commands:');
    console.log('  bulkUpdateTeamIds() - Execute bulk update');
    console.log('  verifyUpdates() - Verify the results');
} else {
    // Node.js environment
    module.exports = {
        bulkUpdateTeamIds,
        verifyUpdates
    };
}

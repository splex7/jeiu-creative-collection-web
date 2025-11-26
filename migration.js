/* ------------------------- Firestore Migration ------------------------- */
// Migration function to move comments from Realtime Database to Firestore
async function migrateCommentsToFirestore() {
    if (!firebaseConnected) {
        console.log('Firebase not connected, skipping migration');
        return;
    }

    console.log('Starting comment migration to Firestore...');
    
    try {
        // Get all comments from Realtime Database
        const realtimeCommentsRef = database.ref('comments');
        const snapshot = await realtimeCommentsRef.once('value');
        const allComments = snapshot.val() || {};
        
        console.log('Found comments for cards:', Object.keys(allComments));
        
        // Get project data to map cardId to teamId
        const projects = await loadProjectData({}, '2025');
        const cardIdToTeamId = {};
        
        projects.forEach(project => {
            if (project.cardId) {
                cardIdToTeamId[project.cardId] = project.teamId || project.team;
            }
        });
        
        console.log('Card ID to Team ID mapping:', cardIdToTeamId);
        
        // Migrate each comment
        let migrationCount = 0;
        for (const [cardId, comments] of Object.entries(allComments)) {
            const teamId = cardIdToTeamId[cardId] || `team_${cardId}`; // Fallback to generated teamId
            
            console.log(`Migrating comments for card ${cardId} (Team: ${teamId})`);
            
            for (const [commentId, commentData] of Object.entries(comments)) {
                const firestoreComment = {
                    ...commentData,
                    cardId: cardId,
                    teamId: teamId,
                    migratedFrom: 'realtime',
                    migrationDate: Date.now()
                };
                
                // Validate teamId before adding
                if (!firestoreComment.teamId) {
                    console.warn(`Skipping comment ${commentId} - no valid teamId`);
                    continue;
                }
                
                // Add to Firestore
                await db.collection('comments').doc(commentId).set(firestoreComment);
                migrationCount++;
            }
        }
        
        console.log(`Migration completed! Migrated ${migrationCount} comments to Firestore`);
        
        // Optional: Clean up old data after successful migration
        if (confirm('Migration successful! Would you like to delete the old Realtime Database comments?')) {
            await realtimeCommentsRef.remove();
            console.log('Old Realtime Database comments cleaned up');
        }
        
    } catch (error) {
        console.error('Migration failed:', error);
        alert('댓글 마이그레이션에 실패했습니다: ' + error.message);
    }
}

// Add migration button to the page (for admin use)
function addMigrationButton() {
    const button = document.createElement('button');
    button.textContent = '🔄 댓글 마이그레이션';
    button.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        background: #ff4d00;
        color: white;
        border: none;
        padding: 10px 15px;
        border-radius: 5px;
        cursor: pointer;
        z-index: 10001;
        font-size: 12px;
    `;
    button.onclick = migrateCommentsToFirestore;
    document.body.appendChild(button);
}

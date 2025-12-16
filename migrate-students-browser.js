/**
 * Browser-based migration script for students data
 * Copy and paste this into the browser console on the jeiu.cc website
 */

async function migrateStudentsToD1() {
    try {
        // Load the existing students.json data
        const response = await fetch('assets/data/students.json');
        const studentsData = await response.json();
        
        console.log(`Found ${Object.keys(studentsData).length} students to migrate`);
        
        // Convert to the format expected by our API
        const studentsArray = Object.entries(studentsData).map(([name, data]) => ({
            name: name,
            img: data.img,
            소감: data.소감
        }));
        
        console.log('Starting bulk migration...');
        
        // Send the data to the API
        const apiResponse = await fetch('/api/students', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(studentsArray)
        });
        
        const result = await apiResponse.json();
        console.log('Migration result:', result);
        
        if (result.success) {
            console.log(`Successfully migrated ${result.imported_count} out of ${result.total_count} students`);
        } else {
            console.error('Migration failed:', result);
        }
        
    } catch (error) {
        console.error('Error during migration:', error);
    }
}

// Run the migration
migrateStudentsToD1();
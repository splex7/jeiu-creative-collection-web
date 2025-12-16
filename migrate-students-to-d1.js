#!/usr/bin/env node

/**
 * Script to migrate students.json data to D1 database
 * Run this script to populate the students table
 */

const fs = require('fs');
const path = require('path');

// Read the students.json file
const studentsJsonPath = path.join(__dirname, 'assets', 'data', 'students.json');
const studentsData = JSON.parse(fs.readFileSync(studentsJsonPath, 'utf8'));

// Convert to array format for API
const studentsArray = Object.entries(studentsData).map(([name, data]) => ({
    name: name,
    img: data.img,
    소감: data.소감
}));

console.log(`Preparing to migrate ${studentsArray.length} students to D1 database...`);

// Create the payload
const payload = studentsArray;

// Write the migration script
const migrationScript = `// Migration script for students data
const studentsData = ${JSON.stringify(payload, null, 2)};

// Function to import students via API
async function importStudents() {
    try {
        const response = await fetch('/api/students', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(studentsData)
        });

        const result = await response.json();
        console.log('Migration result:', result);
    } catch (error) {
        console.error('Migration failed:', error);
    }
}

// Execute migration
importStudents();
`;

// Write to a file
const scriptPath = path.join(__dirname, 'migrate-students-to-d1.js');
fs.writeFileSync(scriptPath, migrationScript);

console.log(`Migration script created at: ${scriptPath}`);
console.log('You can now use this script to import students data to the D1 database.');
console.log('Example usage: node migrate-students-to-d1.js (in a browser console context)');
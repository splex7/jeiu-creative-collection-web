/**
 * D1 Student Data Migration Script
 * This script is designed to run after deployment to populate the D1 database
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

console.log(`Found ${studentsArray.length} students to migrate:`);

studentsArray.forEach((student, index) => {
    console.log(`${index + 1}. ${student.name} - ${student.img} - ${student['소감']}`);
});

// Create a detailed curl script for the migration
const migrationCommands = [
    '#!/bin/bash',
    '# Student Data Migration Script for JEIU Creative Collection',
    '# Generated on ' + new Date().toISOString(),
    '',
    'echo "Starting student data migration to D1 database..."',
    'echo "Total students to migrate: ' + studentsArray.length + '"',
    ''
];

// Add individual POST requests for each student
studentsArray.forEach(student => {
    migrationCommands.push(`echo "Migrating: ${student.name}"`);
    migrationCommands.push(`curl -X POST https://jeiu.cc/api/students \\`);
    migrationCommands.push(`  -H "Content-Type: application/json" \\`);
    migrationCommands.push(`  -d '${JSON.stringify(student).replace(/'/g, "'\\''")}'`);
    migrationCommands.push(`  -w "\\n"  # Add newline after each request`);
    migrationCommands.push('');
});

migrationCommands.push('echo "Student data migration completed!"');

const scriptContent = migrationCommands.join('\n');
const scriptPath = path.join(__dirname, 'migrate-students-individual.sh');
fs.writeFileSync(scriptPath, scriptContent);

console.log(`\nIndividual migration script created: ${scriptPath}`);
console.log('This script sends individual POST requests for each student.');
console.log('Execute with:');
console.log(`chmod +x ${scriptPath}`);
console.log(`./${scriptPath}`);

// Also create a more robust bulk migration script with error handling
const robustMigrationScript = `#!/bin/bash
# Robust Student Data Migration Script with Error Handling
# Generated on ${new Date().toISOString()}

set -e  # Exit on any error

API_ENDPOINT="https://jeiu.cc/api/students"
JSON_FILE="students.json.backup"

echo "Starting student data migration to D1 database..."
echo "API Endpoint: $API_ENDPOINT"

# Backup the current students.json data
echo "Creating backup of students data..."
cp assets/data/students.json $JSON_FILE
echo "Backup saved as $JSON_FILE"

# Send bulk data
echo "Sending bulk student data to D1 database..."
response=$(curl -X PUT $API_ENDPOINT \\
  -H "Content-Type: application/json" \\
  -d '${JSON.stringify(studentsArray).replace(/'/g, "'\\''")}' \\
  -w "\\nHTTP_CODE:%{http_code}" -s)

http_code=$(echo "$response" | tail -n1 | cut -d':' -f2)
result=$(echo "$response" | sed '$d')  # Remove last line (HTTP code)

if [ "$http_code" -eq 200 ]; then
    echo "Migration successful!"
    echo "Server response: $result"
    echo "Migrated ${studentsArray.length} student records."
    
    # Clean up backup
    rm $JSON_FILE
    echo "Backup file removed."
else
    echo "Migration failed with HTTP code: $http_code"
    echo "Server response: $result"
    echo "Check your backup file: $JSON_FILE"
    exit 1
fi

echo "Student data migration completed successfully!"
`;

const robustScriptPath = path.join(__dirname, 'migrate-students-robust.sh');
fs.writeFileSync(robustScriptPath, robustMigrationScript);

console.log(`\nRobust migration script created: ${robustScriptPath}`);
console.log('This script includes error handling and backups.');
console.log('Execute with:');
console.log(`chmod +x ${robustScriptPath}`);
console.log(`./${robustScriptPath}`);

// Also create a verification script
const verifyScript = `#!/bin/bash
# Verification Script for Student Data Migration
# Generated on ${new Date().toISOString()}

echo "Verifying student data migration..."

# Fetch student data from API
echo "Fetching student data from API..."
response=$(curl -s -w "\\nHTTP_CODE:%{http_code}" https://jeiu.cc/api/students)

http_code=$(echo "$response" | tail -n1 | cut -d':' -f2)
data=$(echo "$response" | sed '$d')  # Remove last line (HTTP code)

if [ "$http_code" -eq 200 ]; then
    count=$(echo "$data" | python3 -c "import sys, json; print(len(json.load(sys.stdin)))" 2>/dev/null || echo "unknown")
    echo "API returned HTTP $http_code"
    echo "Number of students in database: $count"
    
    if [ "$count" = "${studentsArray.length}" ]; then
        echo "✓ Migration appears successful - correct number of records"
    else
        echo "⚠ Record count mismatch: expected ${studentsArray.length}, got $count"
    fi
else
    echo "✗ API request failed with HTTP $http_code"
    exit 1
fi
`;

const verifyScriptPath = path.join(__dirname, 'verify-students-migration.sh');
fs.writeFileSync(verifyScriptPath, verifyScript);

console.log(`\nVerification script created: ${verifyScriptPath}`);
console.log('This script verifies the migration was successful.');
console.log('Execute with:');
console.log(`chmod +x ${verifyScriptPath}`);
console.log(`./${verifyScriptPath}`);

console.log('\nMigration completed! All scripts created successfully.');
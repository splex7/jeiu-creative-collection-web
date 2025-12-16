/**
 * API script to migrate students.json data to D1 database
 * This script should be run against the deployed API endpoint
 */

const fs = require('fs');

// Read the students.json file directly
const studentsData = require('./assets/data/students.json');

// Convert to array format for API
const studentsArray = Object.entries(studentsData).map(([name, data]) => ({
    name: name,
    img: data.img,
    소감: data.소감
}));

console.log(`Preparing to migrate ${studentsArray.length} students to D1 database...`);

// Create a curl command script for the migration
const curlCommands = studentsArray.map(student => 
    `curl -X POST https://jeiu.cc/api/students \\
  -H "Content-Type: application/json" \\
  -d '${JSON.stringify(student, null, 2).replace(/\n/g, '\\n').replace(/'/g, "'\\''")}'`
).join('\n\n');

// Write the curl commands to a shell script
const shellScript = `#!/bin/bash
# Migration script for students data to D1 database
# Generated on ${new Date().toISOString()}

echo "Starting migration of ${studentsArray.length} students to D1 database..."

${curlCommands}

echo "Migration completed!"
`;

const scriptPath = './migrate-students.sh';
fs.writeFileSync(scriptPath, shellScript);

// Make it executable
const { chmod } = require('fs').promises;
chmod(scriptPath, 0o755)
  .then(() => console.log(`Migration script created at: ${scriptPath}`))
  .catch(console.error);

console.log(`Migration script created at: ${scriptPath}`);
console.log('Run this script to migrate the student data to D1:');
console.log(`chmod +x ${scriptPath}`);
console.log(`./${scriptPath}`);

// Also create a bulk import version
const bulkImportScript = `#!/bin/bash
# Bulk import script for students data to D1 database
# Generated on ${new Date().toISOString()}

echo "Starting bulk migration of ${studentsArray.length} students to D1 database..."

curl -X PUT https://jeiu.cc/api/students \\
  -H "Content-Type: application/json" \\
  -d '${JSON.stringify(studentsArray).replace(/'/g, "'\\''")}'`

const bulkScriptPath = './migrate-students-bulk.sh';
fs.writeFileSync(bulkScriptPath, bulkImportScript);

console.log(`Bulk migration script created at: ${bulkScriptPath}`);
console.log('Run this script for bulk migration:');
console.log(`chmod +x ${bulkScriptPath}`);
console.log(`./${bulkScriptPath}`);
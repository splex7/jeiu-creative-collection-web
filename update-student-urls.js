/**
 * Script to update student data with URL information
 * This can be used to add URL data to students after the database schema is updated
 */

const fs = require('fs');
const path = require('path');

// Read the original students.json file
const studentsJsonPath = path.join(__dirname, 'assets', 'data', 'students.json');
const originalStudentsData = JSON.parse(fs.readFileSync(studentsJsonPath, 'utf8'));

// Add default URL values (or you can customize this based on real data)
const studentsWithUrls = {};
for (const [name, data] of Object.entries(originalStudentsData)) {
    studentsWithUrls[name] = {
        ...data,
        url: null  // Default to null, but you can set specific URLs for each student if available
    };
}

console.log('Updated students data with URL field:');
console.log(JSON.stringify(studentsWithUrls, null, 2));

// Create a script to update the database via API
const updateUrlsScript = `#!/bin/bash
# Script to update student URLs in D1 database
# Generated on ${new Date().toISOString()}

echo "Updating student URLs in database..."

# Example: Update individual student with URL
curl -X POST https://jeiu.cc/api/students \\
  -H "Content-Type: application/json" \\
  -d '{"name": "서지원", "img": "assets/images/faces/서_원.jpg", "소감": "최고의 팀원들과 함께해서 즐거웠어요!", "url": null}'

curl -X POST https://jeiu.cc/api/students \\
  -H "Content-Type: application/json" \\
  -d '{"name": "유재성", "img": "assets/images/faces/유_성.jpg", "소감": "새로운 기술을 배우며 성장할 수 있었습니다.", "url": null}'
  
# Add more students as needed or use the bulk endpoint:
# curl -X PUT https://jeiu.cc/api/students \\
#   -H "Content-Type: application/json" \\
#   -d '${JSON.stringify(Object.entries(studentsWithUrls).map(([name, data]) => ({
        name,
        ...data
    }))).replace(/'/g, "'\\''")}'
  
echo "Update completed!"
`;

const scriptPath = path.join(__dirname, 'update-student-urls.sh');
fs.writeFileSync(scriptPath, updateUrlsScript);

console.log(`\\nUpdate script created at: ${scriptPath}`);
console.log('Run this script to update student records with URL field after database schema is deployed.');
/**
 * D1 Database Migration Script
 * This script helps apply the students table schema to the D1 database
 */

const fs = require('fs');
const path = require('path');

console.log('D1 Database Migration Script for Students Table');
console.log('===============================================');

// Read the migration file
const migrationFile = path.join(__dirname, 'database', 'migrations', '001_create_students_table.sql');
const migrationSql = fs.readFileSync(migrationFile, 'utf8');

console.log('Migration SQL to be applied:');
console.log('------------------------------');
console.log(migrationSql);
console.log('------------------------------\n');

// Generate the wrangler command for the migration
const wranglerCommand = `
# To apply this migration to your D1 database, run:

# 1. First, create the migration file in the proper format:
# wrangler d1 migrations create jeiu-comments "create students table"

# 2. Then copy the SQL from 001_create_students_table.sql to the generated migration file

# 3. Apply the migration:
# wrangler d1 migrations apply jeiu-comments

# Alternative: You can also execute the SQL directly using:
# wrangler d1 execute jeiu-comments --command="${migrationSql.replace(/\n/g, ' ')}"

# For local development database:
# wrangler d1 execute jeiu-comments-local --command="${migrationSql.replace(/\n/g, ' ')}"
`;

console.log('Migration Commands:');
console.log('-------------------');
console.log(wranglerCommand);

// Generate a Cloudflare dashboard SQL command as well
const dashboardCommands = `
# You can also run these commands directly in the Cloudflare D1 dashboard SQL tab:

${migrationSql}
`;

console.log('Direct SQL Commands for Cloudflare Dashboard:');
console.log('---------------------------------------------');
console.log(dashboardCommands);

console.log('\nImportant Notes:');
console.log('----------------');
console.log('1. Make sure you have wrangler installed: npm install -g wrangler');
console.log('2. Log in to your Cloudflare account: wrangler login');
console.log('3. Verify your database name matches the one in wrangler.toml');
console.log('4. Always backup your database before running migrations');
console.log('5. Test the migration on a development database first');
# Students Data Migration to D1 Database

This document describes the process of moving student data from `students.json` to the D1 database.

## Changes Made

1. **Database Schema**: Added `students` table to D1 database in `database/schema/d1-students-schema.sql`
2. **API Endpoint**: Created `/api/students` endpoint with handlers in `worker/src/handlers/students.js`
3. **Frontend Update**: Modified `index.html` to fetch student data from API instead of JSON file (with fallback)
4. **Migration Scripts**: Created scripts to migrate existing data to D1 database

## Database Schema

The students table includes:
- `name` (TEXT, PRIMARY KEY): Student name
- `img` (TEXT): Image path
- `reflections` (TEXT): Student reflections ("소감" field)
- `created_at` (INTEGER): Creation timestamp
- `updated_at` (INTEGER): Update timestamp

## API Endpoints

- `GET /api/students`: Retrieve all students data
- `POST /api/students`: Create or update a single student
- `PUT /api/students`: Bulk import students data

## Migration Process

To migrate existing student data from JSON to D1:

### Step 1: Deploy the Cloudflare Worker
1. Deploy the updated worker with the new schema and endpoints
   - Files to deploy: `worker/src/index.js`, `worker/src/handlers/students.js`
   - Make sure the D1 database has the students table schema

**Important: Current API Test Results**
- The `/api/students` endpoint currently returns 404 "Route not found" on jeiu.cc
- This confirms the updated Worker with students endpoint is not yet deployed
- Run `./test-api-connection.sh` to verify current status

### Step 2: Verify Deployment
Run the verification script after deployment:
```bash
node verify-deployment.js
```

### Method 1: Bulk Migration (Recommended)
After successful deployment, run the robust migration script:
```bash
./migrate-students-robust.sh
```

### Method 2: Individual Records
If you prefer to migrate records one by one:
```bash
./migrate-students-individual.sh
```

### Method 3: Browser-based Migration
For direct migration from the website, copy the content from `migrate-students-browser.js` into the browser console on the jeiu.cc site.

### Method 4: Web-based Migration Tool
Use the web interface at `migrate-students.html` to migrate data interactively.

The migration scripts will transfer all 39 student records from the JSON file to the D1 database.

## Current Status

**Before deployment:** `/api/students` returns 404 "Route not found"
**After deployment:** `/api/students` should return 200 with student data (initially empty)

## Fallback Mechanism

If the API call to retrieve student data fails, the frontend will automatically fall back to using the local `students.json` file to ensure the site continues to function.

## Verification

After migration:
1. Verify that student messages appear correctly when clicking on student avatars
2. Check that the API returns the expected data: `curl https://jeiu.cc/api/students`
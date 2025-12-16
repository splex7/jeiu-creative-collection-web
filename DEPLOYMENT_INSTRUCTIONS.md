# Deployment and Testing Instructions

## Pre-Deployment Verification

Run the API connection test to confirm current status:
```bash
./test-api-connection.sh
```

Expected result: `/api/students` should return 404 "Route not found"

## Deployment Steps

1. **Deploy the Cloudflare Worker**
   - Update files in `worker/src/`:
     - `worker/src/index.js` (includes the students endpoint routing)
     - `worker/src/handlers/students.js` (the students API handlers)
   - Ensure the D1 database has the students table schema

2. **Verify Deployment**
   Run the verification script:
   ```bash
   node verify-deployment.js
   ```
   Or manually test:
   ```bash
   curl https://jeiu.cc/api/students
   ```
   - Before deployment: Returns `{"error":"Route not found"}` (404)
   - After deployment: Should return `{}` (empty object, 200 status) initially

3. **Test API Functionality**
   Once deployed, test basic functionality:
   ```bash
   # Should return empty student data initially
   curl https://jeiu.cc/api/students
   
   # Should return successful response for POST
   curl -X POST https://jeiu.cc/api/students \
     -H "Content-Type: application/json" \
     -d '{"name": "Test Student", "img": "test.jpg", "소감": "Test reflection"}'
   ```

4. **Migrate Student Data**
   After successful deployment and verification, run the migration:
   ```bash
   ./migrate-students-robust.sh
   ```

5. **Verify Migration**
   Check that students are now in the database:
   ```bash
   curl https://jeiu.cc/api/students
   ```
   Should return the 39 student records from the original JSON file.

## Post-Migration Verification

After migration, the frontend will automatically start using the D1 database instead of the JSON file, resolving both issues:
- Student images will display correctly
- Each student will show their specific reflection message instead of the default

## Troubleshooting

- If `/api/students` still returns 404 after deployment, check:
  1. Worker was properly deployed to Cloudflare
  2. The routing logic in `worker/src/index.js` is correct
  3. The import statement for students handler is properly included

- If student data doesn't appear after migration:
  1. Verify the database table was created with correct schema
  2. Check that migration script executed successfully
  3. Confirm the API is returning data when accessed directly
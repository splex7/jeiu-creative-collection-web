#!/bin/bash
# Verification Script for Student Data Migration
# Generated on 2025-12-16T15:57:18.843Z

echo "Verifying student data migration..."

# Fetch student data from API
echo "Fetching student data from API..."
response=$(curl -s -w "\nHTTP_CODE:%{http_code}" https://jeiu.cc/api/students)

http_code=$(echo "$response" | tail -n1 | cut -d':' -f2)
data=$(echo "$response" | sed '$d')  # Remove last line (HTTP code)

if [ "$http_code" -eq 200 ]; then
    count=$(echo "$data" | python3 -c "import sys, json; print(len(json.load(sys.stdin)))" 2>/dev/null || echo "unknown")
    echo "API returned HTTP $http_code"
    echo "Number of students in database: $count"
    
    if [ "$count" = "39" ]; then
        echo "✓ Migration appears successful - correct number of records"
    else
        echo "⚠ Record count mismatch: expected 39, got $count"
    fi
else
    echo "✗ API request failed with HTTP $http_code"
    exit 1
fi

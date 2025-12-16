#!/bin/bash
# API Connection Test Script for jeiu.cc
# Tests the actual API endpoints on the production server

echo "Testing API connection to jeiu.cc..."
echo "Generated on: $(date)"
echo

# Test 1: Debug endpoint
echo "1. Testing debug endpoint..."
curl -s -w "\nHTTP Status: %{http_code}\nTime: %{time_total}s\n" \
  "https://jeiu.cc/api/debug" \
  -H "Accept: application/json"
echo -e "\n"

# Test 2: Teams endpoint
echo "2. Testing teams endpoint..."
curl -s -w "\nHTTP Status: %{http_code}\nTime: %{time_total}s\n" \
  "https://jeiu.cc/api/teams" \
  -H "Accept: application/json" \
  | python3 -m json.tool 2>/dev/null | head -20 || echo "[Response too large or not JSON]"
echo -e "\n"

# Test 3: Students endpoint (our new endpoint)
echo "3. Testing students endpoint..."
curl -s -w "\nHTTP Status: %{http_code}\nTime: %{time_total}s\n" \
  "https://jeiu.cc/api/students" \
  -H "Accept: application/json"
echo -e "\n"

# Test 4: Comment counts endpoint
echo "4. Testing comment counts endpoint..."
curl -s -w "\nHTTP Status: %{http_code}\nTime: %{time_total}s\n" \
  "https://jeiu.cc/api/comment-counts" \
  -H "Accept: application/json"
echo -e "\n"

# Test 5: Check if our new students endpoint exists
echo "5. Testing POST to students endpoint (should fail with 405 if endpoint doesn't exist)..."
response=$(curl -s -w "\nHTTP Status: %{http_code}\n" \
  -X POST "https://jeiu.cc/api/students" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"name": "test"}' \
  --max-time 10)
echo "$response"
echo -e "\n"

echo "API connection test completed!"
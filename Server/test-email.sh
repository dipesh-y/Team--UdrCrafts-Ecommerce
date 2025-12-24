#!/bin/bash

# Simple test to verify email registration
echo "Testing User Registration with Email..."
echo "======================================="

# Using curl with verbose output
curl -v -X POST http://localhost:8000/api/user/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Shivam Bhardwaj",
    "email": "shivambhardwaj750000@gmail.com",
    "password": "Password159@"
  }' 2>&1

echo ""
echo "======================================="
echo "Test Complete"

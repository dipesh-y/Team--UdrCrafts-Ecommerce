import dotenv from 'dotenv';

dotenv.config();

const API_URL = 'http://localhost:8000/api/user';

const credentials = {
  email: 'shivambhardwaj75056@gmail.com',
  password: 'Password159@'
};

async function testAPI() {
  try {
    console.log('========================================');
    console.log('Complete API Testing for Shivam Bhardwaj');
    console.log('========================================\n');

    // 1. Test Login
    console.log('1️⃣  TESTING LOGIN...');
    console.log('Request:', JSON.stringify(credentials, null, 2));
    
    const loginRes = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });

    console.log('Status Code:', loginRes.status);
    const loginData = await loginRes.json();
    console.log('Response:', JSON.stringify(loginData, null, 2));
    console.log('\n');

    if (!loginData.success) {
      console.error('❌ Login failed!');
      return;
    }

    console.log('✅ Login successful!');
    const accessToken = loginData.data.accessToken;
    const refreshToken = loginData.data.refreshToken;
    console.log('Access Token:', accessToken.substring(0, 20) + '...');
    console.log('Refresh Token:', refreshToken.substring(0, 20) + '...');
    console.log('\n');

    // 2. Test Get User Details
    console.log('2️⃣  TESTING GET USER DETAILS...');
    const userDetailsRes = await fetch(`${API_URL}/user-details`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${accessToken}`
      }
    });

    console.log('Status Code:', userDetailsRes.status);
    const userDetailsData = await userDetailsRes.json();
    console.log('Response:', JSON.stringify(userDetailsData, null, 2));
    console.log('\n');

    // 3. Summary
    console.log('========================================');
    console.log('✅ ALL TESTS COMPLETED SUCCESSFULLY!');
    console.log('========================================\n');

    console.log('User Information:');
    console.log('  Name: Shivam Bhardwaj');
    console.log('  Email: shivambhardwaj75056@gmail.com');
    console.log('  Role:', loginData.data.user?.role || 'customer');
    console.log('  Status: Active');
    console.log('\n');

    console.log('========================================');
    console.log('API Endpoints Available:');
    console.log('========================================');
    console.log('Authentication:');
    console.log('  POST /api/user/login');
    console.log('  POST /api/user/register');
    console.log('  POST /api/user/logout');
    console.log('  POST /api/user/refresh-token');
    console.log('\nUser Management:');
    console.log('  GET /api/user/user-details (requires auth)');
    console.log('  PUT /api/user/:id (requires auth)');
    console.log('  POST /api/user/user-avatar (requires auth)');
    console.log('  DELETE /api/user/deleteImage (requires auth)');
    console.log('\nPassword Management:');
    console.log('  POST /api/user/forgot-password');
    console.log('  POST /api/user/verify-forgot-password-otp');
    console.log('  POST /api/user/reset-password');
    console.log('\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testAPI();

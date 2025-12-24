const https = require('https');
const http = require('http');

// Test user data
const userData = {
  name: 'Shivam Bhardwaj',
  email: 'shivambhardwaj75056@gmail.com',
  password: 'Password159@'
};

// Function to make POST request
function makeRequest(method, path, data) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(data);
    
    const options = {
      hostname: '127.0.0.1',
      port: 8000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = http.request(options, (res) => {
      let responseData = '';
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      res.on('end', () => {
        try {
          resolve({
            status: res.statusCode,
            data: JSON.parse(responseData)
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            data: responseData
          });
        }
      });
    });

    req.on('error', (error) => {
      console.error('Request error:', error.message);
      reject(error);
    });

    if (data) {
      req.write(postData);
    }
    req.end();
  });
}

// Main test function
async function testAPI() {
  try {
    console.log('========================================');
    console.log('API Testing - User Registration & Login');
    console.log('========================================\n');

    // 1. Register User
    console.log('1️⃣  REGISTERING USER...');
    console.log('Request:', userData);
    const registerRes = await makeRequest('POST', '/api/user/register', userData);
    console.log('Status:', registerRes.status);
    const registerData = registerRes.data;
    console.log('Response:', JSON.stringify(registerData, null, 2));
    console.log('\n');

    if (!registerData.success) {
      console.error('❌ Registration failed!');
      return;
    }

    console.log('✅ User registered successfully!');
    console.log('📧 OTP has been sent to the email address.');
    console.log('\n');

    // 2. Get OTP from email (in real scenario, user would copy from email)
    // For testing purposes, you need to check the email manually or use a test email service
    console.log('⏳ PLEASE CHECK YOUR EMAIL for OTP');
    console.log('📮 Check: shivambhardwaj75056@gmail.com');
    console.log('\n');

    // Note: OTP verification requires the actual OTP sent to the email
    // In production, use a test email service that provides API access to read emails
    console.log('========================================');
    console.log('Next Steps:');
    console.log('========================================');
    console.log('1. Check your email: shivambhardwaj75056@gmail.com');
    console.log('2. Copy the OTP from the email');
    console.log('3. Call /api/user/verifyEmail with:');
    console.log('   {');
    console.log('     "email": "shivambhardwaj75056@gmail.com",');
    console.log('     "otp": "<OTP_FROM_EMAIL>"');
    console.log('   }');
    console.log('4. After email verification, login with:');
    console.log('   {');
    console.log('     "email": "shivambhardwaj75056@gmail.com",');
    console.log('     "password": "Password159@"');
    console.log('   }');

  } catch (error) {
    console.error('Error:', error.message);
  }
}

testAPI();

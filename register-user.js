// Simple API test script
const userData = {
  name: 'Shivam Bhardwaj',
  email: 'shivambhardwaj75056@gmail.com',
  password: 'Password159@'
};

async function testAPI() {
  try {
    console.log('========================================');
    console.log('API Testing - User Registration');
    console.log('========================================\n');

    // 1. Register User
    console.log('1️⃣  REGISTERING USER...');
    console.log('Request Data:', JSON.stringify(userData, null, 2));
    
    const registerRes = await fetch('http://127.0.0.1:8000/api/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    console.log('Status Code:', registerRes.status);
    const registerData = await registerRes.json();
    console.log('Response:', JSON.stringify(registerData, null, 2));
    console.log('\n');

    if (!registerData.success) {
      console.error('❌ Registration failed!');
      process.exit(1);
    }

    console.log('✅ User registered successfully!');
    console.log('📧 OTP has been sent to the email address.');
    console.log('\n');

    // 2. Get OTP from email (in real scenario, user would copy from email)
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
    console.log('\n========================================\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testAPI();

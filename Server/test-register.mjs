const baseURL = 'http://localhost:8000';

async function testRegister() {
  try {
    const response = await fetch(`${baseURL}/api/user/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'TestPass123@'
      })
    });

    const json = await response.json();
    console.log('\n✅ Registration Response:');
    console.log(JSON.stringify(json, null, 2));

    if (json.data?.otp) {
      console.log('\n📧 OTP for email verification:', json.data.otp);
      console.log('Email to verify:', json.data.email);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testRegister();

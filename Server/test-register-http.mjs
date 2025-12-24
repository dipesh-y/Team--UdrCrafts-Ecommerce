import http from 'http';

const testData = {
  name: 'TestUser',
  email: 'testuser@example.com',
  password: 'TestPass123@'
};

const postData = JSON.stringify(testData);

const options = {
  hostname: 'localhost',
  port: 8000,
  path: '/api/user/register',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = http.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log('\n✅ Registration Response:');
    console.log('Status:', res.statusCode);
    console.log('Data:', data);
    
    try {
      const json = JSON.parse(data);
      if (json.data?.otp) {
        console.log('\n📧 OTP Generated:', json.data.otp);
        console.log('Email:', json.data.email);
        console.log('User ID:', json.data.userId);
      }
    } catch (e) {
      console.log('(Could not parse JSON)');
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Error:', error.message);
  console.error('Full error:', error);
});

req.write(postData);
req.end();

console.log('Testing registration at http://localhost:8000/api/user/register');
console.log('Sending:', testData);

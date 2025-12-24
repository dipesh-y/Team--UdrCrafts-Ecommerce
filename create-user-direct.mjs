import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config({
  path: './Server/.env'
});

// User model definition
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  mobile: String,
  role: {
    type: String,
    enum: ['admin', 'customer'],
    default: 'customer'
  },
  avatar: String,
  address_details: [],
  verify_email: {
    type: Boolean,
    default: false
  },
  otp: String,
  otpExpires: Date,
  last_login_date: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const UserModel = mongoose.model('User', userSchema);

async function createUser() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected\n');

    const userData = {
      name: 'Shivam Bhardwaj',
      email: 'shivambhardwaj75056@gmail.com',
      password: 'Password159@'
    };

    console.log('========================================');
    console.log('Creating User in Database');
    console.log('========================================\n');

    // Check if user already exists
    const existingUser = await UserModel.findOne({
      email: new RegExp('^' + userData.email.toLowerCase() + '$', 'i')
    });

    if (existingUser) {
      console.log('⚠️  User already exists!');
      console.log('Email:', existingUser.email);
      console.log('Name:', existingUser.name);
      console.log('\n✅ User Details:');
      console.log(JSON.stringify({
        _id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
        verify_email: existingUser.verify_email,
        createdAt: existingUser.createdAt
      }, null, 2));
      
      await mongoose.connection.close();
      return;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    // Create new user
    const newUser = new UserModel({
      name: userData.name,
      email: userData.email.toLowerCase(),
      password: hashedPassword,
      role: 'customer',
      verify_email: false
    });

    await newUser.save();

    console.log('✅ User created successfully!\n');
    console.log('User Details:');
    console.log(JSON.stringify({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      verify_email: newUser.verify_email,
      createdAt: newUser.createdAt
    }, null, 2));

    console.log('\n========================================');
    console.log('Credentials:');
    console.log('========================================');
    console.log('Email: shivambhardwaj75056@gmail.com');
    console.log('Password: Password159@');
    console.log('\n========================================');
    console.log('User is ready to login!');
    console.log('========================================\n');

    await mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

createUser();

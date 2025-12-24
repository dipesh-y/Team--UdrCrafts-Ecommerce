import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import UserModel from '../models/usermodel.js';

dotenv.config();

const MONGO = process.env.MONGODB_URI;
if (!MONGO) {
  console.error('MONGODB_URI not set in .env');
  process.exit(1);
}

const target = {
  name: process.env.UP_USER_NAME || 'Shivam GLBajaj Noida',
  email: process.env.UP_USER_EMAIL || 'shivambhardwaj75056@gmail.com',
  password: process.env.UP_USER_PASS || 'Password159@',
};

async function run() {
  await mongoose.connect(MONGO, { dbName: process.env.MONGODB_DB || undefined });
  console.log('Connected to MongoDB');

  // Try to find any user with an email that starts with the base name
  const regex = new RegExp('^shivambhardwaj', 'i');
  let user = await UserModel.findOne({ email: regex });

  // If not found by regex, also try exact target email
  if (!user) user = await UserModel.findOne({ email: target.email.toLowerCase() });

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(target.password, salt);

  if (user) {
    console.log('Updating existing user:', user.email);
    user.name = target.name;
    user.email = target.email.toLowerCase();
    user.password = hash;
    user.verify_email = true;
    user.otp = null;
    user.otpExpires = null;
    await user.save();
    console.log('User updated:', { id: user._id.toString(), email: user.email, name: user.name });
  } else {
    console.log('User not found — creating new user');
    const newUser = new UserModel({
      name: target.name,
      email: target.email.toLowerCase(),
      password: hash,
      verify_email: true,
      otp: null,
      otpExpires: null,
    });
    await newUser.save();
    console.log('User created:', { id: newUser._id.toString(), email: newUser.email, name: newUser.name });
  }

  await mongoose.disconnect();
  process.exit(0);
}

run().catch(err => {
  console.error('Error in upsert script:', err);
  process.exit(1);
});

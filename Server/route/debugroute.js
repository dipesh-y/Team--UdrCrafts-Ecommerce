import { Router } from 'express';
import UserModel from '../models/usermodel.js';

const debugRouter = Router();

// DEV ONLY: return OTP for a given email (useful for local testing)
debugRouter.post('/get-otp', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: 'email required' });
    const user = await UserModel.findOne({ email: new RegExp('^' + email.toLowerCase() + '$', 'i') });
    if (!user) return res.status(404).json({ success: false, message: 'user not found' });
    return res.json({ success: true, email: user.email, otp: user.otp, otpExpires: user.otpExpires });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message || String(err) });
  }
});

export default debugRouter;

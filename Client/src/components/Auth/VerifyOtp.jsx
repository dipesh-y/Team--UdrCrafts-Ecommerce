import React, { useEffect, useRef, useState } from 'react';
import { postJson } from '../../utils/api';

export default function VerifyOtp({ email, onVerified }) {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');
  const [cooldown, setCooldown] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!cooldown) return;
    timerRef.current = setInterval(() => setCooldown(c => {
      if (c <= 1) { clearInterval(timerRef.current); return 0; }
      return c - 1;
    }), 1000);
    return () => clearInterval(timerRef.current);
  }, [cooldown]);

  const submitOtp = async (e) => {
    e?.preventDefault();
    setError(''); setMsg('');
    try {
      await postJson('/api/user/verifyEmail', { email, otp });
      setMsg('Email verified successfully');
      onVerified?.();
    } catch (err) {
      setError(err?.message || 'Invalid OTP');
    }
  };

  const resend = async () => {
    if (cooldown > 0) return;
    setError(''); setMsg('');
    try {
      // server provides forgot-password which sends an OTP to existing users
      await postJson('/api/user/forgot-password', { email });
      setMsg('OTP resent — check email');
      setCooldown(60);
    } catch (err) {
      setError(err?.message || 'Could not resend OTP');
    }
  };

  return (
    <div style={{ marginTop: 12 }}>
      <form onSubmit={submitOtp}>
        <input placeholder="Enter OTP" value={otp} onChange={e => setOtp(e.target.value)} required />
        <button type="submit">Verify OTP</button>
      </form>
      <div style={{ marginTop: 8 }}>
        <button onClick={resend} disabled={cooldown > 0}>{cooldown > 0 ? `Resend in ${cooldown}s` : 'Resend OTP'}</button>
      </div>
      {msg && <div style={{ color: 'green', marginTop: 8 }}>{msg}</div>}
      {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
    </div>
  );
}

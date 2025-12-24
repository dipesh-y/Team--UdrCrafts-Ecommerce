import React, { useState } from 'react';
import { postJson } from '../../utils/api';
import VerifyOtp from './VerifyOtp';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [stage, setStage] = useState('form');
  const [serverData, setServerData] = useState(null);
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await postJson('/api/user/register', form);
      setServerData(res?.data || res);
      setStage('verify');
    } catch (err) {
      setError(err?.message || 'Registration failed');
    }
  };

  return (
    <div>
      {stage === 'form' && (
        <form onSubmit={submit}>
          <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
          <input type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
          <input type="password" placeholder="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
          <button type="submit">Register</button>
          {error && <div style={{ color: 'red' }}>{error}</div>}
        </form>
      )}

      {stage === 'verify' && (
        <div>
          <div>Registration created — check your email for OTP.</div>
          {serverData?.otp && <div style={{ marginTop: 8 }}>Dev OTP: <strong>{serverData.otp}</strong></div>}
          <VerifyOtp email={form.email} onVerified={() => { setStage('done'); }} />
        </div>
      )}

      {stage === 'done' && (
        <div>Account verified — you can now <a href="/login">login</a>.</div>
      )}
    </div>
  );
}

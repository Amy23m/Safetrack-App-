import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../auth.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setStatus('Logging in...');
    try {
      const res = await window.electronAPI.login({ email, password });
      if (res.success) {
        setStatus('Login successful — opening app...');
      } else {
        setStatus(res.message || 'Login failed');
      }
    } catch (e) {
      setStatus(e.message || 'Error');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>Sign in</h1>

        {status && <div className="error-message">{status}</div>}

        <form onSubmit={submit}>
          <div className="input-group">
            <label>Email</label>
            <input value={email} onChange={e => setEmail(e.target.value)} type="email" required />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input value={password} onChange={e => setPassword(e.target.value)} type="password" required />
          </div>

          <button className="auth-button" type="submit">Sign in</button>
        </form>

        <div className="auth-links">
          <p>Don't have an account? <Link to="/register">Register</Link></p>
        </div>
      </div>
    </div>
  );
}

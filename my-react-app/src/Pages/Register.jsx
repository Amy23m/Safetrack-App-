import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../auth.css';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setStatus('Registering...');
    try {
      const res = await window.electronAPI.register({ name, email, password });
      if (res.success) {
        setStatus('Registration successful — you can now sign in');
      } else {
        setStatus(res.message || 'Registration failed');
      }
    } catch (e) {
      setStatus(e.message || 'Error');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>Register</h1>

        {status && <div className="error-message">{status}</div>}

        <form onSubmit={submit}>
          <div className="input-group">
            <label>Name</label>
            <input value={name} onChange={e => setName(e.target.value)} required />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input value={email} onChange={e => setEmail(e.target.value)} type="email" required />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input value={password} onChange={e => setPassword(e.target.value)} type="password" required />
          </div>

          <button className="auth-button" type="submit">Register</button>
        </form>

        <div className="auth-links">
          <p>Already have an account? <Link to="/login">Sign in</Link></p>
        </div>
      </div>
    </div>
  );
}

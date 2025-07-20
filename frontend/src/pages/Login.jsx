import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; 

export default function Login() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:8080/api/auth/login',
        { email, password }
      );
      const { token } = res.data;
      localStorage.setItem('token', token);
      // Attach to axios defaults
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Redirect to home
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="login">
      <h2 className="login__title">Log In</h2>
      {error && <div className="login__error">{error}</div>}
      <form onSubmit={handleSubmit} className="login__form">
        <div className="login__group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="login__group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login__submit">
          Log In
        </button>
      </form>
    </div>
  );
}

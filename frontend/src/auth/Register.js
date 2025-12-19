import { useState } from 'react';
import axios from '../api/axios';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = async () => {
    try {
      setError('');

      // Register user
      await axios.post('/auth/register', {
        email,
        password
      });

      // Auto login
      const res = await axios.post('/auth/login', {
        email,
        password
      });

      const token = res.data.token;
      const payload = JSON.parse(atob(token.split('.')[1]));

      login(token, { roles: payload.roles || [] });
      navigate('/');
    } catch (e) {
      setError('Registration failed');
    }
  };

  return (
    <div className="container">
      <div className="form-box">
        <h2>Register</h2>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <br />
        <button onClick={submit}>Register</button>
      </div>
    </div>
  );
}

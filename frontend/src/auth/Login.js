import { useState } from 'react';
import axios from '../api/axios';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = async () => {
    try {
      setError('');

      const res = await axios.post('/auth/login', {
        email,
        password
      });

      const token = res.data.token;
      const payload = JSON.parse(atob(token.split('.')[1]));

      login(token, { roles: payload.roles || [] });
      navigate('/');
    } catch (e) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="container">
      <div className="form-box">
        <h2>Login</h2>

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
        <button onClick={submit}>Login</button>
      </div>
    </div>
  );
}

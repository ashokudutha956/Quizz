




import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === password) {
      navigate('/home');
    } else {
      console.log('Invalid credentials');
    }
  };

  return (
    <div className='ashok'>
      <h1>Login Page</h1>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <button className='asn' onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;

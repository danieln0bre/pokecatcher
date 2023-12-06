// Login.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../sessionContext'; // Update the path

const Login: React.FC = () => {
  const { updateSessionToken } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/auth/login', {
        withCredentials: true,
        email,
        password,
      });

      const sessionToken = response.data.authentication.sessionToken;

      // Update the sessionToken in the context
      updateSessionToken(sessionToken);

      // Log the updated token
      console.log('Updated Session Token in Login:', sessionToken);

      // Now you can do something with the cookies if needed
    } catch (error) {
      console.error('Login error:', error);
      // Handle errors
    }
  };

  return (
    <div className='main-div'>
      <div className='login'>
        <h2>Log in</h2>
        <form onSubmit={handleSubmit}>
          <input type='email' placeholder='Email' value={email} onChange={handleEmailChange} />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={handlePasswordChange}
          />
          <button type='submit'>Enter</button>
          <a className='login-register-redirect' href="/register">
            Not registered?
          </a>
        </form>
      </div>
    </div>
  );
};

export default Login;

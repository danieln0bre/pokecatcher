import React, { useState } from 'react';
import axios from 'axios';

const Login: React.FC = () => {
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
    const response = await axios.post('http://localhost:8080/auth/login', { email, password})
    console.log('Log in with:', {
      response,
    });
  };

  return (
    <div className='main-div'>
        <div className='login'>
            <h2>Log in</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type='email'
                    placeholder='Email'
                    value={email}
                    onChange={handleEmailChange}
                />
                <input
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={handlePasswordChange}
                />
                <button type='submit'>Enter</button>
                <a className='login-register-redirect' href="/register">Not registered?</a>
            </form>
        </div>
    </div>

  );
};

export default Login;
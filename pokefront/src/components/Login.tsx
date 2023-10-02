import React, { useState } from 'react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Add login logic here
    console.log('Logging in with:', { email, password });
  };

  return (
    <div className='login'>
      <h2>Login</h2>
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
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

export default Login;
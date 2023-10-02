import React, { useState } from 'react';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Add registration logic here
    console.log('Registering with:', {
      username,
      email,
      password,
      confirmPassword,
    });
  };

  return (
    <div className='register'>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Username'
          value={username}
          onChange={handleUsernameChange}
        />
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
        <input
          type='password'
          placeholder='Confirm Password'
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default Register;

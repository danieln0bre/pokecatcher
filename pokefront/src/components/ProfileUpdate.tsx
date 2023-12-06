import React, { useState } from 'react';

const ProfileUpdate: React.FC = () => {
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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Add update logic here
    console.log('Updating with:', {
      username,
      email,
      password,
      confirmPassword,
    });

    // Send only the fields that are not empty to the server for update
    const updatedFields: { [key: string]: string } = {};
    if (username !== '') updatedFields.username = username;
    if (email !== '') updatedFields.email = email;
    if (password !== '') updatedFields.password = password;
    if (confirmPassword !== '') updatedFields.confirmPassword = confirmPassword;

    // Send updatedFields to the server for processing
    // Example: updateProfile(updatedFields);
  };

  return (
    <div className='update'>
        <h2>Update</h2>
        <button type='submit'>Upload picture</button>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='New Username'
            value={username}
            onChange={handleUsernameChange}
          />
          <input
            type='email'
            placeholder='New Email'
            value={email}
            onChange={handleEmailChange}
          />
          <button type='submit'>Update</button>
        </form>
    </div>
  );
};

export default ProfileUpdate;

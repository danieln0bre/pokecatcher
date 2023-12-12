import React, { useState } from 'react';

const ProfileUpdate: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setProfilePicture(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Create a FormData object to send both text and file data
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    if (profilePicture) {
      formData.append('profilePicture', profilePicture);
    }

    // Send formData to the server for processing
    // Example: await updateProfile(formData);
    console.log('Updating with:', {
      username,
      email,
      profilePicture,
    });

    // Clear the form fields after submission
    setUsername('');
    setEmail('');
    setProfilePicture(null);
  };

  return (
    <div className='update'>
      <h2>Update</h2>
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
        <input
          type='file'
          accept='image/*'
          onChange={handleProfilePictureChange}
        />
        <button type='submit'>Update</button>
      </form>
    </div>
  );
};

export default ProfileUpdate;

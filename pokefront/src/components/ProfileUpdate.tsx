import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../sessionContext';
const ProfileUpdate: React.FC = () => {
  const { sessionToken, userId } = useAuth(); // Use the useAuth hook to get the sessionToken
  const [username, setUsername] = useState('');
  const [currentUsername, setCurrentUsername] = useState('');
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setProfilePicture(event.target.files[0]);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log('userId:', userId);
        if(userId){
          const response = await axios.get(
            `http://localhost:8080/users/${userId}`,
            {
              withCredentials: true,
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
          const data = response.data;
          setCurrentUsername(data.username);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, [currentUsername]);


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('username', username);
    if (profilePicture) {
      formData.append('profilePicture', profilePicture);
    }

    try {
      if(userId){
        const response = await axios.patch(
          `http://localhost:8080/users/${userId}`,
          formData,
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
  
        if (response.status === 200) {
          console.log('Profile updated successfully!');
          // Clear the form fields after a successful update
          setUsername('');
          setProfilePicture(null);
        } else {
          console.error('Error updating profile:', response.statusText);
          // Handle error as needed
        }
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      // Handle error as needed
    }
  };

  return (
    <div className='update'>
      <h2>Welcome {currentUsername}</h2>
      <h2>Update</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='New Username'
          value={username}
          onChange={handleUsernameChange}
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

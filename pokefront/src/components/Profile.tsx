import React, { useState } from 'react';
import ProfileUpdate from '../components/ProfileUpdate';

const Profile: React.FC = () => {
  return (
    <div className='main-div'>
        <div className='profile'>
            <h2>Profile</h2>
            <div className='profile-info'>
              <div>
              <img src="images/profile-picture.jpeg" alt={`Random Pokemon`} />
              </div>
              <ProfileUpdate/>
            </div>

        </div>
    </div>

  );
};

export default Profile;
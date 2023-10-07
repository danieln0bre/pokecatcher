import React from 'react';
import './Global.css';
import Navbar from '../components/Navbar';
import Profile from '../components/Profile';
import GlobalFooter from '../components/GlobalFooter';

const ProfilePage: React.FC = () => {
  return (
    <body>
      <div className='front-page'>
          <Navbar/>
          <Profile/>
          <GlobalFooter/>
      </div>
    </body>
  );
}

export default ProfilePage;

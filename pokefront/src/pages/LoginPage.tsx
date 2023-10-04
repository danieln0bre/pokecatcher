import React from 'react';
import './Global.css';
import Navbar from '../components/Navbar';
import Login from '../components/Login';
import GlobalFooter from '../components/GlobalFooter';

const LoginPage: React.FC = () => {
  return (
    <body>
      <div className='front-page'>
          <Navbar/>
          <Login/>
          <GlobalFooter/>
      </div>
    </body>
  );
}

export default LoginPage;

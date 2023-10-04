import React from 'react';
import './Global.css';
import Navbar from '../components/Navbar';
import Register from '../components/Register';
import GlobalFooter from '../components/GlobalFooter';

const RegisterPage: React.FC = () => {
  return (
    <body>
      <div className='front-page'>
          <Navbar/>
          <Register/>
          <GlobalFooter/>
      </div>
    </body>
  );
}

export default RegisterPage;

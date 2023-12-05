import React from 'react';
import './Global.css';
import Navbar from '../components/Navbar';
import Catcher from '../components/Catcher';
import GlobalFooter from '../components/GlobalFooter';

const CatcherPage: React.FC = () => {

  return (
    <body>
      <div className='front-page'>
        <Navbar />
        <Catcher/>
        <GlobalFooter />
      </div>
    </body>
  );
};

export default CatcherPage;

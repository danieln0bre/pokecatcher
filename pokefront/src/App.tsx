import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import GlobalFooter from './components/GlobalFooter';

const App: React.FC = () => {
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

export default App;

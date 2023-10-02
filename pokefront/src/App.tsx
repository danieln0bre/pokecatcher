import React from 'react';
import './App.css';
import Navbar from './components/navbar';
import Login from './components/Login';
import Register from './components/Register';

const App: React.FC = () => {
  return (
    <body>
      <Navbar/>
      <div className='front-page'>
          <Login/>
          <Register/>
      </div>
    </body>

  );
}

export default App;

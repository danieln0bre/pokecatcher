import React from 'react';
import './App.css';
import InputField from './components/InputField';

const App: React.FC = () => {
  return (
    <body>
    <header>
    <div className='title-div'>
      <h1>PokéCatcher</h1>
    </div>
    </header>
      <div className='front-page'>
        <div className='login'>
          <h2>Login</h2>
          <h3>Username: <InputField/></h3>
          <h3>Password: <InputField/></h3>
        </div>
        <div className='register'>
          <h2>Register</h2>
          <h3>Email: <InputField/></h3>
          <h3>Username: <InputField/></h3>
          <h3>Password: <InputField/></h3>
          <h3>Confirm Password: <InputField/></h3>
        </div>
      </div>
    </body>

  );
}

export default App;

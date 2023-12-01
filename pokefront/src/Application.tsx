import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CollectionPage from './pages/CollectionPage';
import ProfilePage from './pages/ProfilePage';
import CatcherPage from './pages/CatcherPage';

export interface IApplicationProps {}

const Application: React.FC<IApplicationProps> = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/collection" element={<CollectionPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/" element={<CatcherPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Application;



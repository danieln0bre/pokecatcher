// Application.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CollectionPage from './pages/CollectionPage';
import ProfilePage from './pages/ProfilePage';
import CatcherPage from './pages/CatcherPage';
import { AuthProvider } from './sessionContext';

const Application: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/collection" element={<CollectionPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/catcher" element={<CatcherPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Application;

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={<HomePage />}
        />

        <Route
          path='/login'
          element={<LoginPage />}
        />

        <Route
          path='/register'
          element={<SignUpPage />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

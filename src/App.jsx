import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import Header from './components/Header/Header';

const App = () => {
  return (
    <BrowserRouter>
      <Header />

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

        <Route
          path='*'
          element={<NotFoundPage />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

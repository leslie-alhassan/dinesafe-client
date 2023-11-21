import './HomePage.scss';
import LoadingPage from '../LoadingPage/LoadingPage';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [failedAuth, setFailedAuth] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('token');

    if (!token) {
      return setFailedAuth(true);
    }

    // get current user
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/api/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        setUser(data);
      })
      .catch((error) => {
        console.log(error);
        setFailedAuth(true);
      });
  }, []);

  // * if we're unable to authenticate the user, we should still allow them to use site with restricted access
  if (failedAuth) {
    return (
      <main>
        <h1>
          Welcome. Please <Link to='/login'>login</Link> for full access
        </h1>
      </main>
    );
  }

  return !user ? (
    <main>
      <LoadingPage />
    </main>
  ) : (
    <main>
      <h1>Welcome back, {user.username}</h1>
    </main>
  );
};

export default HomePage;

import './HomePage.scss';
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

  // * if we're unable to authenticate the user, we should still allow them to use
  if (failedAuth) {
    return (
      <main>
        Welcome! Please <Link to='/login'>log in</Link> to view this page.
      </main>
    );
  }

  return !user ? (
    <main>
      <h1>Loading... </h1>
    </main>
  ) : (
    <main>
      <h1>Welcome back, {user.username}</h1>
    </main>
  );
};

export default HomePage;

import './Header.scss';
import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem('token');

    if (!token) {
      return;
    } else {
      navigate('/');
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
      });
  }, []);

  return (
    <header className='header'>
      <Link
        to='/'
        className='header__link'
      >
        dinesafe
      </Link>
      {/* search bar */}
      <input
        type='search'
        placeholder={user ? 'Search' : 'Try searching to get started'}
        className='header__input'
      />

      {!user ? (
        <div className='header__buttons'>
          <button
            className='header__button header__button--login'
            onClick={() => navigate('/login')}
          >
            Login
          </button>
          <p className='or'>OR</p>
          <button
            className='header__button header__button--register'
            onClick={() => navigate('/register')}
          >
            Sign up
          </button>
        </div>
      ) : (
        <div className='header__user-profile'>Hello {user.username}</div>
      )}
    </header>
  );
};

export default Header;

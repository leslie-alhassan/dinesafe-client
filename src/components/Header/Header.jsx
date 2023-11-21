import './Header.scss';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = ({ user, onSetSearchResults }) => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const handleSearch = async (searchInput) => {
      if (searchInput.length === 0) {
        return;
      }

      try {
        const { data } = await axios.get(
          `${
            import.meta.env.VITE_SERVER_URL
          }/api/establishments?search=${searchInput}`
        );
        onSetSearchResults(data);
      } catch (err) {
        console.log('Unable to search for results', err);
      }
    };
    handleSearch(searchInput);
  }, [searchInput]);

  const handleRedirect = () => {
    navigate('/');
    window.location.reload();
  };

  return (
    <header className='header'>
      {/* <Link
        to='/'
        className='header__link'
      >
        dinesafe
      </Link> */}

      <h1
        className='header__link'
        onClick={handleRedirect}
      >
        dinesafe
      </h1>
      {/* search bar */}

      <input
        type='search'
        name='search'
        placeholder={user ? 'Search' : 'Try searching to get started'}
        className='header__input'
        onChange={(e) => setSearchInput(e.target.value)}
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

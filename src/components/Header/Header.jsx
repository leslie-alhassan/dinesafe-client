import './Header.scss';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = ({ user, onSetSearchResults, onSetSearch }) => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = async (event) => {
    event.preventDefault();

    if (searchInput.length === 0) {
      onSetSearch(false);
      return;
    }

    try {
      const search = searchInput.split(' ').join('_');
      const parsedSearchInput = search.replace('&', encodeURIComponent('&'));

      const { data } = await axios.get(
        `${
          import.meta.env.VITE_SERVER_URL
        }/api/establishments?search=${parsedSearchInput}`
      );

      onSetSearchResults(data);
      onSetSearch(true);
    } catch (err) {
      console.log('Unable to search for results', err);
    }
  };

  const handleRedirect = () => {
    navigate('/');
    window.location.reload();
  };

  return (
    <header className='header'>
      <div className='header-wrapper content-width-wrapper'>
        <h1
          className='header__link'
          onClick={handleRedirect}
        >
          dinesafe
        </h1>
        {/* search bar */}
        <form
          onSubmit={handleSearch}
          className='header__form'
        >
          <input
            type='search'
            name='search'
            placeholder={user ? 'Search' : 'Search for establishments'}
            className='header__input'
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </form>
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
          <div className='header__user-profile'>@{user.username}</div>
        )}
      </div>
    </header>
  );
};

export default Header;

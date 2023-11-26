import './Header.scss';
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import useDebounce from '../../utils/hooks/useDebounce';

const Header = ({ user, onSetSearchResults, onSetSearch }) => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');
  const debouncedSearch = useDebounce(searchInput);

  useEffect(() => {
    const handleSearch = async () => {
      if (debouncedSearch.length === 0) {
        onSetSearch(false);
        return;
      }

      try {
        const search = debouncedSearch.split(' ').join('_');
        const parsedSearchInput = search.replace('&', encodeURIComponent('&'));

        const { data } = await axios.get(
          `${
            import.meta.env.VITE_SERVER_URL
          }/api/establishments?search=${parsedSearchInput}`
        );

        onSetSearchResults(data);
        onSetSearch(true);
      } catch (err) {
        console.log({
          message: 'Unable to search for results',
          error: err,
        });
      }
    };

    handleSearch();
  }, [debouncedSearch]);

  return (
    <header className='header'>
      <div className='header-wrapper content-width-wrapper'>
        <Link
          to='/'
          className='header__link'
        >
          dinesafe
        </Link>
        {/* search bar */}
        <input
          type='search'
          name='search'
          placeholder={user ? 'Search' : 'Search for establishments'}
          className='header__input'
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
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
          <div className='header__user-profile'>@{user.username}</div>
        )}
      </div>
    </header>
  );
};

export default Header;

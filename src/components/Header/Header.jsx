import './Header.scss';
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import useDebounce from '../../utils/hooks/useDebounce';
import userIcon from '../../assets/icons/bx-user-pin.svg';

const Header = ({ user, onSetSearchResults }) => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');
  const debouncedSearch = useDebounce(searchInput);
  const [showSignOut, setShowSignOut] = useState(false);

  useEffect(() => {
    const handleSearch = async () => {
      if (searchInput.length === 0) {
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
      } catch (err) {
        console.error({
          message: 'Unable to search for results',
          error: err,
        });
      }
    };

    handleSearch();
  }, [debouncedSearch]);

  // handle sign-out
  const handleSignOut = () => {
    sessionStorage.removeItem('token');
    user = null;
    navigate('/');
  };

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
          onClick={(e) => {
            e.target.value = '';
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
          <div className='header__user-profile'>
            <p
              className='header__user'
              onClick={() => setShowSignOut(!showSignOut)}
            >
              <img
                className='user-icon'
                src={userIcon}
                alt='User icon'
              />
              {user.username}{' '}
            </p>

            {showSignOut && (
              <Link
                to='/'
                className='header__user__sign-out'
                onClick={handleSignOut}
              >
                SIGN OUT
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

import './HomePage.scss';
import Header from '../../components/Header/Header';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SearchResults from '../../components/SearchResults/SearchResults';

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  // console.log('results', searchResults);

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
    <>
      <Header
        user={user}
        onSetSearchResults={setSearchResults}
      />

      <main className='main'>
        {searchResults.length === 0 ? (
          `No search results. Try searching for some of your favourite establishments`
        ) : (
          <SearchResults searchResults={searchResults} />
        )}
      </main>
    </>
  );
};

export default HomePage;

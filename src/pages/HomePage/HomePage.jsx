import './HomePage.scss';
import Header from '../../components/Header/Header';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SearchResults from '../../components/SearchResults/SearchResults';
import { isPointWithinRadius, orderByDistance } from 'geolib';

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [nearbyEstablishments, setNearbyEstablishments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // get current users current location
    navigator.geolocation.watchPosition((position) => {
      const location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      const fetchNearbyEstablishments = async (center) => {
        const { data } = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/establishments`
        );

        const nearbyEstablishments = data.data.filter((establishment) => {
          return isPointWithinRadius(
            { latitude: establishment.lat, longitude: establishment.lng },
            { latitude: center.lat, longitude: center.lng },
            600
          );
        });

        setNearbyEstablishments({
          matches: nearbyEstablishments.length,
          data: nearbyEstablishments,
        });
      };

      fetchNearbyEstablishments(location);
    });

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

  {
    /* user location based render */
  }
  if (
    nearbyEstablishments?.data?.length > 0 &&
    searchResults.length === 0 &&
    !search
  ) {
    return (
      <>
        <Header
          user={user}
          onSetSearchResults={setSearchResults}
          onSetSearch={setSearch}
        />

        <main className='main'>
          <div className='main-wrapper content-width-wrapper'>
            {/* matches */}
            <p className='results__matches'>
              {nearbyEstablishments.matches}
              {' establishments near you'}
            </p>

            {/* results */}
            <SearchResults searchResults={nearbyEstablishments} />
          </div>
        </main>
      </>
    );
  }

  {
    /* NO user location based render */
  }
  return (
    <>
      <Header
        user={user}
        onSetSearchResults={setSearchResults}
        onSetSearch={setSearch}
      />

      <main className='main'>
        <div className='main-wrapper content-width-wrapper'>
          {/* matches */}
          <p className='results__matches'>
            {searchResults.matches ?? searchResults.length}
            {' matches'}
          </p>

          {/* results */}
          {searchResults.length === 0 ? (
            `No search results.`
          ) : (
            <SearchResults searchResults={searchResults} />
          )}
        </div>
      </main>
    </>
  );
};

export default HomePage;

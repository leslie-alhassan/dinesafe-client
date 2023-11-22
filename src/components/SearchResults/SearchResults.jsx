import React, { useState } from 'react';
import './SearchResults.scss';
import EstablishmentCard from '../EstablishmentCard/EstablishmentCard';

const SearchResults = ({ searchResults }) => {
  const [establishmentDetails, setEstablishmentDetails] = useState(null);

  const status =
    establishmentDetails &&
    establishmentDetails.status.split(' ').join('-').toLowerCase();
  const handleCardClick = (establishment) => {
    setEstablishmentDetails(establishment);
  };

  return (
    <section className='search-results'>
      <div className='search-results-wrapper scroll'>
        {searchResults.data.map((establishment) => {
          return (
            <EstablishmentCard
              key={establishment.id}
              establishment={establishment}
              onHandleCardClick={handleCardClick}
            />
          );
        })}
      </div>

      {establishmentDetails && (
        <div className='establishment'>
          <div className='establishment-wrapper-left'>
            <h1 className='establishment__name'>{establishmentDetails.name}</h1>
            <p className='establishment__address'>
              {establishmentDetails.address}
            </p>
          </div>

          <div className='establishment-wrapper-middle'>
            <h2 className='establishment__status__title'>CURRENT STATUS</h2>
            <p
              className={`establishment__status establishment__status--${status}`}
            >
              {establishmentDetails.status.toUpperCase()}
            </p>
          </div>

          <div className='establishment-wrapper-right'>
            <h2 className='establishment__rating__title'>RATING</h2>

            <p className='establishment__rating'>
              <span>4.5</span> / 5
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default SearchResults;

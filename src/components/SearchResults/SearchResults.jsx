import React from 'react';
import './SearchResults.scss';
import EstablishmentCard from '../EstablishmentCard/EstablishmentCard';

const SearchResults = ({ searchResults }) => {
  return (
    <section className='results'>
      <p className='results__matches'>{searchResults.matches} matches</p>
      {searchResults.data.map((establishment) => {
        return <EstablishmentCard establishment={establishment} />;
      })}
    </section>
  );
};

export default SearchResults;

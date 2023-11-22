import './EstablishmentCard.scss';
import React from 'react';

const EstablishmentCard = ({ establishment, onHandleCardClick }) => {
  const status = establishment.status.split(' ').join('-').toLowerCase();

  return (
    <article
      onClick={() => {
        onHandleCardClick(establishment);
      }}
      className={`establishment-card establishment-card--${status}`}
    >
      <div className='wrapper-left'>
        <h3 className='establishment-card__name'>{establishment.name}</h3>
        <p className='establishment-card__address'>{establishment.address}</p>
      </div>
      <p
        className={`establishment-card__status establishment-card__status--${status}`}
      >
        {establishment.status.toUpperCase()}
      </p>
    </article>
  );
};

export default EstablishmentCard;

import './EstablishmentCard.scss';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const EstablishmentCard = ({ establishment, onHandleCardClick }) => {
  const status = establishment.status.split(' ').join('-').toLowerCase();
  const [isSelected, setIsSelected] = useState(false);

  return (
    <article
      onClick={() => {
        onHandleCardClick(establishment);
        setIsSelected(!isSelected);
      }}
      className={
        isSelected
          ? `establishment-card establishment-card__${status} establishment-card--active`
          : `establishment-card establishment-card__${status}`
      }
      id={establishment.id}
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

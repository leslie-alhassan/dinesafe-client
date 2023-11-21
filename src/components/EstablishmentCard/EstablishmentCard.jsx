import React from 'react';

const EstablishmentCard = ({ establishment }) => {
  return (
    <div key={establishment.id}>
      <p>{establishment.name}</p>
      <p>{establishment.address}</p>
      <p>{establishment.status}</p>
    </div>
  );
};

export default EstablishmentCard;

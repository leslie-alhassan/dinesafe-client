import './EstablishmentCard.scss';

const EstablishmentCard = ({
  establishment,
  onHandleCardClick,
  isSelectedId,
}) => {
  const status = establishment.status.split(' ').join('-').toLowerCase();

  return (
    <article
      onClick={() => {
        onHandleCardClick(establishment);
      }}
      className={
        establishment.id === isSelectedId
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

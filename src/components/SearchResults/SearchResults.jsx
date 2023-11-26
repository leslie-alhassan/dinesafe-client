import React, { useEffect, useState } from 'react';
import './SearchResults.scss';
import EstablishmentCard from '../EstablishmentCard/EstablishmentCard';
import Modal from 'react-modal';
import exitIcon from '../../assets/icons/close-24px.svg';
import { v4 as uuid } from 'uuid';
import useFetchInspections from '../../utils/hooks/useFetchInspections';
import { useLoadScript } from '@react-google-maps/api';
import Map from '../Map/Map';
import { getHealthScore } from '../../utils/utils';

Modal.setAppElement('#root');
const googleMapsApiLibraries = ['places'];

const modalStyles = {
  overlay: {
    backgroundColor: '#000000bf',
  },
};

const SearchResults = ({ searchResults }) => {
  const [establishmentDetails, setEstablishmentDetails] = useState(null);
  const [inspections, setInspections] = useState(null);
  const [lastInspection, setLastInspection] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isSelectedId, setIsSelectedId] = useState('');

  // load google maps
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: googleMapsApiLibraries,
  });

  // set inspection dates
  let inspectionDates;
  if (inspections) {
    const [, ...dates] = inspections && Object.keys(inspections);
    inspectionDates = dates;
  }

  // fetch inspection details for establishment clicked
  useEffect(() => {
    const fetchInspections = async () => {
      const groupedInspections = await useFetchInspections(
        establishmentDetails.id,
        establishmentDetails.name
      );
      setInspections(groupedInspections);
      setLastInspection(groupedInspections[Object.keys(groupedInspections)[0]]);
    };

    if (establishmentDetails?.id) {
      fetchInspections();
      // set the id of the currently selected card in state
      setIsSelectedId(establishmentDetails.id);
    }
  }, [establishmentDetails]);

  // reformat establishment status for classNames
  const status =
    establishmentDetails &&
    establishmentDetails.status.split(' ').join('-').toLowerCase();

  // click event
  const handleCardClick = (establishment) => {
    setEstablishmentDetails(establishment);
  };

  return (
    <section className='search-results'>
      <div className='search-results-wrapper scroll'>
        {searchResults.data.map((establishment) => {
          return (
            <EstablishmentCard
              key={uuid()}
              id={establishmentDetails?.id}
              establishment={establishment}
              onHandleCardClick={handleCardClick}
              isSelectedId={isSelectedId}
            />
          );
        })}
      </div>

      {establishmentDetails && (
        <div className='establishment'>
          {/* header: establishment info */}
          <div className='establishment-header'>
            {/* left-wrapper: name & address */}
            <div className='establishment-wrapper-left'>
              <h1 className='establishment__name'>
                {establishmentDetails.name}
              </h1>
              <p className='establishment__address'>
                {establishmentDetails.address}
              </p>
            </div>

            {/* middle-wrapper: status */}
            <div className='establishment-wrapper-middle'>
              <h2 className='establishment__status__title'>CURRENT STATUS</h2>
              <p
                className={`establishment__status establishment__status--${status}`}
              >
                {establishmentDetails.status.toUpperCase()}
              </p>
            </div>

            {/* right-wrapper: rating */}
            <div className='establishment-wrapper-right'>
              <h2 className='establishment__rating__title'>HEALTH SCORE</h2>
              <p className='establishment__rating'>
                <span>
                  {getHealthScore(establishmentDetails.status, lastInspection)}
                </span>{' '}
                / 5
              </p>
            </div>
          </div>

          {/* last inspection */}
          <div className='inspections'>
            <div className='inspection__details inspection__details--last'>
              <h2 className='inspections__title'>LAST INSPECTION</h2>

              <div className='details'>
                <div className='details-brief'>
                  <div
                    className={
                      lastInspection
                        ? `details__legend details__legend--${
                            (lastInspection[0]?.status &&
                              lastInspection[0].status
                                .split(' ')
                                .join('-')
                                .toLowerCase()) ||
                            (lastInspection[0] &&
                              lastInspection[0]['Establishment Status']
                                .split(' ')
                                .join('-')
                                .toLowerCase())
                          }`
                        : 'details__legend'
                    }
                  ></div>
                  <p className='details__date'>
                    {lastInspection
                      ? new Date(
                          lastInspection[0]?.inspection_date
                        ).toLocaleDateString(
                          'en-CA',
                          {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                          } ||
                            (lastInspection[0] &&
                              new Date(
                                lastInspection[0][
                                  'Inspection Date'
                                ].toLocaleDateString('en-CA', {
                                  month: 'long',
                                  day: 'numeric',
                                  year: 'numeric',
                                })
                              ))
                        )
                      : 'No recent inspections'}
                  </p>
                  <p className='details__status'>
                    {lastInspection &&
                      (lastInspection[0]?.status ||
                        (lastInspection[0] &&
                          lastInspection[0]['Establishment Status']))}
                  </p>
                </div>

                <div className='details-long'>
                  {lastInspection &&
                    lastInspection.map((inspection) => {
                      return (
                        <p
                          key={uuid()}
                          className='details__content'
                        >
                          {inspection.inspection_details ||
                            inspection['Infraction Details']}
                        </p>
                      );
                    })}
                </div>
              </div>
            </div>

            <h2
              className='inspections__title inspections__title--past'
              onClick={() => {
                setModalIsOpen(true);
              }}
            >
              {`SEE PAST INSPECTIONS`}
              {` (${inspections && Object.keys(inspections).length - 1})`}
            </h2>

            {/* modal */}
            <Modal
              style={modalStyles}
              className='modal modal__scroll'
              isOpen={modalIsOpen}
              onRequestClose={() => {
                setModalIsOpen(false);
              }}
              // onAfterOpen={(document.body.style.overflow = 'hidden')}
            >
              <div className='modal-heading'>
                <h1 className='modal__title'>PAST INSPECTIONS</h1>

                <img
                  src={exitIcon}
                  alt='Exit icon'
                  onClick={() => setModalIsOpen(false)}
                  className='modal__exit-icon'
                />
              </div>

              {!inspectionDates?.length > 0 ? (
                <p className='modal__no-inspections'>
                  NO PAST INSPECTIONS TO SHOW
                </p>
              ) : (
                inspectionDates.map((date) => {
                  return (
                    <div
                      key={uuid()}
                      className='modal__inspection'
                    >
                      <div className='modal__inspection-brief'>
                        <div
                          className={
                            inspections &&
                            `details__legend details__legend--${(
                              inspections[date][0].status ||
                              inspections[date][0]['Establishment Status']
                            )
                              .split(' ')
                              .join('-')
                              .toLowerCase()}`
                          }
                        ></div>

                        <p className='modal__inspection__date'>
                          {new Date(date).toLocaleDateString('en-CA', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </p>

                        <p className='modal__inspection__status'>
                          {inspections &&
                            (inspections[date][0]['Establishment Status'] ||
                              inspections[date][0].status)}
                        </p>
                      </div>

                      {inspections &&
                        inspections[date].map((insp) => {
                          return (
                            <p
                              key={uuid()}
                              className='modal__inspection__details'
                            >
                              {insp.inspection_details ||
                                insp['Infraction Details']}
                            </p>
                          );
                        })}
                    </div>
                  );
                })
              )}
            </Modal>
          </div>

          <div className='container'>
            <h1 className='container__title'>LOCATION</h1>
            {!isLoaded ? (
              <p className='container__loading'>⚠️ UNABLE TO LOAD MAP</p>
            ) : (
              <Map
                position={{
                  lat: establishmentDetails.lat,
                  lng: establishmentDetails.lng,
                }}
              />
            )}
          </div>

          {/* submit complaints */}
          <div className='complaints'>
            <h3 className='complaints__title'>Submit a complaint</h3>
            <p className='complaints__text'>
              If you suspect you have become ill from this establishment or
              noticed any improper maintenance, submit a complaint to{' '}
              <a
                className='complaints__link'
                href='https://www.toronto.ca/community-people/health-wellness-care/health-inspections-monitoring/safe-complaints/?prog=DS&estId=10410875&estName=BROWNES%20BISTRO&estAddress=1251%20YONGE%20ST'
                target='blank'
              >
                Toronto Public Health.
              </a>
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default SearchResults;

import React, { useEffect, useState } from 'react';
import './SearchResults.scss';
import EstablishmentCard from '../EstablishmentCard/EstablishmentCard';
import inspectionData from '../../data/dinesafe.json';
import axios from 'axios';
import Modal from 'react-modal';
import exitIcon from '../../assets/icons/close-24px.svg';

Modal.setAppElement('#root');

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

  let inspectionDates;
  if (inspections) {
    const [, ...dates] = inspections && Object.keys(inspections);
    inspectionDates = dates;
  }

  useEffect(() => {
    const fetchInspections = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/inspections/${
            establishmentDetails.id
          }`
        );

        if (data.length === 0) {
          const details = inspectionData.filter((establishment) => {
            return (
              establishment['Establishment ID'] === establishmentDetails.id
            );
          });

          // populate database with inspection details
          details.forEach(async (insp) => {
            const inspectionDetails = {
              inspection_id: insp['Inspection ID'],
              establishment_id: insp['Establishment ID'],
              inspection_date: insp['Inspection Date'],
              status: insp['Establishment Status'],
              inspection_details: insp['Infraction Details'],
              severity: insp['Severity'],
              action: insp['Action'],
              outcome: insp['Outcome'],
              amount_fined: insp['Amount Fined'],
              establishment_type: insp['Establishment Type'],
            };

            try {
              await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/api/inspections/`,
                inspectionDetails
              );
            } catch (err) {
              console.log({
                message: `Unable to populate database with inspection details for ${establishmentDetails.name}`,
                error: err.message,
              });
            }
          });

          // group inspections by date
          const groupedInspections = {};
          details.reverse().forEach((inspection) => {
            if (!groupedInspections[inspection['Inspection Date']]) {
              groupedInspections[inspection['Inspection Date']] = [inspection];
            } else {
              groupedInspections[inspection['Inspection Date']].push(
                inspection
              );
            }
          });

          setInspections(groupedInspections);
          setLastInspection(
            groupedInspections[Object.keys(groupedInspections)[0]]
          );
        } else {
          // group inspections by date
          const groupedInspections = {};
          data.forEach((inspection) => {
            if (!groupedInspections[inspection.inspection_date]) {
              groupedInspections[inspection.inspection_date] = [inspection];
            } else {
              groupedInspections[inspection.inspection_date].push(inspection);
            }
          });

          setInspections(groupedInspections);
          setLastInspection(
            groupedInspections[Object.keys(groupedInspections)[0]]
          );
        }
      } catch (err) {
        console.log('Unable to fetch inspections');
      }
    };

    fetchInspections();
  }, [establishmentDetails]);

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
              <h2 className='establishment__rating__title'>RATING</h2>
              <p className='establishment__rating'>
                <span>
                  {establishmentDetails.status === 'Pass' ? '4.5' : '3.2'}
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
                        <p className='details__content'>
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
                document.body.style.overflow = 'hidden';
              }}
            >{`SEE PAST INSPECTIONS >`}</h2>

            {/* modal */}
            <Modal
              style={modalStyles}
              className='modal modal__scroll'
              isOpen={modalIsOpen}
              onRequestClose={() => {
                setModalIsOpen(false);
              }}
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
                    <div className='modal__inspection'>
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
                            <p className='modal__inspection__details'>
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

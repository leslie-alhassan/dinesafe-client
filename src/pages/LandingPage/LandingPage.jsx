import { Link, useNavigate } from 'react-router-dom';
import './LandingPage.scss';
import React from 'react';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <header className='landing-header'>
        <div className='header-wrapper content-width-wrapper'>
          <Link
            to='/'
            className='header__link header__link--landing'
          >
            dinesafe
          </Link>

          <div className='header__buttons'>
            <button
              className='header__button header__button--login'
              onClick={() => navigate('/login')}
            >
              Get started
            </button>
          </div>
        </div>
      </header>

      <section className='landing'>
        <div className='landing-wrapper'>
          <p className='landing__brief'>
            <span>Dinesafe</span> is Toronto Public Health's food safety program
            that inspects all establishments serving and preparing food. Each
            inspection results in a pass, a conditional pass or a closed notice.
          </p>
          <article className='about'>
            <ul className='about__status about__status--pass'>
              <h2 className='about__status__title about__status__title--pass'>
                PASS
              </h2>
              <li className='about__status__detail'>
                The operators are following the minimum standards fairly well.
              </li>
              <li className='about__status__detail'>
                A few critical infractions or non-critical infractions may have
                been observed.
              </li>
              <li className='about__status__detail'>
                A re-inspection may happen to make sure items are corrected as
                required. Minor issues may be followed up at the next routine
                inspection.
              </li>
            </ul>
            <ul className='about__status about__status--conditional'>
              <h2 className='about__status__title about__status__title--conditional'>
                CONDITIONAL PASS
              </h2>
              <li className='about__status__detail'>
                The food premises can remain open, but the operators need to
                make corrections in the categories that are checked off on the
                sign.
              </li>
              <li className='about__status__detail'>
                A re-inspection will happen within 24-72 hours (1-3 business
                days), or as soon as possible after the operators advise they
                are ready.
              </li>
              <h3 className='about__status__subheader'>
                Correction Categories
              </h3>
              <li className='about__status__detail'>
                Food Temperature Control
              </li>
              <li className='about__status__detail'>
                Food Protected from Contamination
              </li>
              <li className='about__status__detail'>
                Food Handler Hygiene and Handwashing
              </li>
              <li className='about__status__detail'>Food Source and Supply</li>
              <li className='about__status__detail'>Pest Control</li>
              <li className='about__status__detail'>
                Storage and Removal of Waste, and/or Sanitation, Design or
                Maintenance of Surfaces, Utensils and Equipment
              </li>
            </ul>
            <ul className='about__status about__status--closed'>
              <h2 className='about__status__title about__status__title--closed'>
                CLOSED
              </h2>
              <li className='about__status__detail'>
                Indicates conditions represent an immediate health hazard to the
                public and the food premises was ordered closed by a Public
                Health Inspector.
              </li>
              <li className='about__status__detail'>
                The food premises must stay closed and not serve food to the
                public until it has earned a pass from a Public Health
                Inspector.
              </li>
              <h3 className='about__status__subheader'>
                Health hazards include, but are not limited to:
              </h3>
              <li className='about__status__detail'>
                No hot/cold running water
              </li>
              <li className='about__status__detail'>Sewage back-ups</li>
              <li className='about__status__detail'>Fires</li>
              <li className='about__status__detail'>Floods</li>
              <li className='about__status__detail'>Power outages</li>
              <li className='about__status__detail'>
                Major insect/rodent infestation
              </li>
            </ul>
          </article>
        </div>
      </section>
    </>
  );
};

export default LandingPage;

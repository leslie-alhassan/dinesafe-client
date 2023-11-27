import './Reviews.scss';
import React from 'react';
import avatar from '../../assets/icons/bxs-user-circle.svg';

const Reviews = ({ user }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className='reviews'>
      <h1 className='reviews__title'>LEAVE A REVIEW</h1>

      <div className='reviews-wrapper'>
        <div className='reviews__user'>
          {user ? (
            <p className='reviews__username'>@{user.username}</p>
          ) : (
            <img
              src={avatar}
              className='reviews__avatar'
            ></img>
          )}
        </div>

        <form
          className='reviews__form'
          onSubmit={handleSubmit}
        >
          <input
            type='text'
            className={
              user
                ? 'reviews__form__input'
                : 'reviews__form__input reviews__form__input--no-user'
            }
            name='review'
            placeholder={
              !user
                ? 'You must be logged in to leave a review'
                : 'Share your experiences...'
            }
            disabled={!user}
          />
          <button
            type='submit'
            className='reviews__form__button'
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default Reviews;

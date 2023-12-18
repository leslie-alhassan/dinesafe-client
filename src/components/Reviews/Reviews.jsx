import './Reviews.scss';
import React, { useEffect, useState } from 'react';
import avatar from '../../assets/icons/bxs-user-circle.svg';
import axios from 'axios';

const Reviews = ({ user, establishmentId }) => {
  const [comments, setComments] = useState(null);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  const fetchComments = async () => {
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_SERVER_URL
        }/api/comments/establishments/${establishmentId}`
      );

      // fetch comment usernames
      if (!data) {
        return setComments(null);
      }

      setComments(data);
    } catch (err) {
      console.error(
        `Unable to fetch comments for establishment with ID ${establishmentId}`
      );
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.target.reset();

    if (!comment) {
      return setError('Comment section cannot be empty');
    }

    const commentObj = {
      establishment_id: establishmentId,
      user_id: user?.id,
      comment: comment,
      username: user?.username,
    };

    await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/comments`,
      commentObj
    );

    // refetch new comments
    await fetchComments();
  };

  useEffect(() => {
    fetchComments();
  }, [establishmentId]);

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
          <textarea
            onChange={(event) => setComment(event.target.value)}
            type='text'
            className={
              user
                ? 'reviews__form__input'
                : 'reviews__form__input reviews__form__input--no-user'
            }
            name='comment'
            placeholder={
              !user
                ? 'You must be logged in to leave a review'
                : 'Share your experiences...'
            }
            disabled={!user}
          />

          {error && (
            <div className='sign-up__message sign-up__message--error'>
              {error}
            </div>
          )}
          <button
            type='submit'
            className='reviews__form__button'
            disabled={!user}
          >
            Post
          </button>
        </form>
      </div>

      <div className='comments'>
        {/* comment count */}
        {comments && (
          <p className='comments__count'>
            {comments.length} {comments.length > 1 ? 'REVIEWS' : 'REVIEW'}
          </p>
        )}
        {comments ? (
          comments.map((comment) => {
            return (
              <article
                className='comments__comment-wrapper'
                key={comment.id}
              >
                <div className='comments__content'>
                  <p
                    className={
                      comment.user_id === user?.id
                        ? 'comments__username comments__username--user'
                        : 'comments__username'
                    }
                  >
                    {comment.user_id === user?.id
                      ? 'You'
                      : `@${comment.username}`}
                  </p>
                  <p className='comments__comment'>{comment.comment}</p>
                </div>
                <p className='comments__timestamp'>
                  {comment &&
                    new Date(comment.created_at).toLocaleDateString('en-CA', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                </p>
              </article>
            );
          })
        ) : (
          <p className='comments__comment-wrapper comments__comment-wrapper--none'>
            NO REVIEWS
          </p>
        )}
      </div>
    </div>
  );
};

export default Reviews;

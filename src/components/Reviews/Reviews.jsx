import './Reviews.scss';
import React, { useEffect, useState } from 'react';
import avatar from '../../assets/icons/bxs-user-circle.svg';
import axios from 'axios';

const Reviews = ({ user, establishmentId }) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    console.log('handling submit');
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
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { data } = await axios.get(
          `${
            import.meta.env.VITE_SERVER_URL
          }/api/comments/establishments/${establishmentId}`
        );

        // fetch comment usernames
        setComments(data);
        console.log('setting comments', data);
      } catch (err) {
        console.log(
          `Unable to fetch comments for establishment with ID ${establishmentId}`
        );
      }
    };

    fetchComments();
  }, [establishmentId, handleSubmit]);

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
        {comments.length > 0 && (
          <p className='comments__count'>{comments.length} COMMENTS</p>
        )}
        {comments.length !== 0 ? (
          comments.map((comment) => {
            return (
              <article
                className='comments__comment-wrapper'
                key={comment.id}
              >
                <p
                  className={
                    comment.user_id === user?.id
                      ? 'comments__username comments__username--user'
                      : 'comments__username'
                  }
                >
                  {comment.user_id === user?.id
                    ? 'you'
                    : `@${comment.username}`}
                </p>
                <p className='comments__comment'>{comment.comment}</p>
              </article>
            );
          })
        ) : (
          <p className='comments__comment-wrapper comments__comment-wrapper--none'>
            NO COMMENTS
          </p>
        )}
      </div>
    </div>
  );
};

export default Reviews;

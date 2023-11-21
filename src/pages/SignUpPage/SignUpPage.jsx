import React, { useEffect, useState } from 'react';
import './SignUpPage.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SignUpPage = () => {
  document.title = 'DineSafe | Register';

  // form values
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // validation
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSignUp = async (event) => {
    event.preventDefault();

    if (!(password === confirmPassword)) {
      setError(`Passwords don't match`);
      return;
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/users/register`,
        {
          email: email,
          username: username,
          password: password,
        }
      );

      setError('');
      setSuccess(true);
    } catch (err) {
      console.log({ message: err.message, error: err.response.data });
      setError(err.response.data);
      setSuccess(false);
    }
  };

  return (
    <section className='sign-up'>
      <article className='sign-up__about'>
        <h1 className='sign-up__about__title'>DineSafe</h1>

        <p className='sign-up__about__content'>
          DineSafe is Toronto Public Health’s food safety program that inspects
          all establishments serving and preparing food. Each inspection results
          in a pass, a conditional pass or a closed notice.
        </p>

        <p className='sign-up__about__quote'>- City of Toronto Open Data</p>
      </article>

      <div className='sign-up-wrapper'>
        {/* sign-up form */}
        <form
          className='sign-up__form'
          onSubmit={handleSignUp}
        >
          {/* Email */}
          <label
            htmlFor='email'
            className='sign-up__form__label'
          >
            Email <sup>*</sup>
          </label>
          <input
            type='text'
            id='email'
            className='sign-up__form__input'
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Email */}
          <label
            htmlFor='username'
            className='sign-up__form__label'
          >
            Username <sup>*</sup>
          </label>
          <input
            type='username'
            id='username'
            className='sign-up__form__input'
            placeholder='Username'
            onChange={(e) => setUsername(e.target.value)}
          />

          {/* Password */}
          <label
            htmlFor='password'
            className='sign-up__form__label'
          >
            Password <sup>*</sup>
          </label>
          <input
            type='password'
            id='password'
            className='sign-up__form__input'
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Password */}
          <label
            htmlFor='confirmPassword'
            className='sign-up__form__label'
          >
            Confirm password <sup>*</sup>
          </label>
          <input
            type='password'
            id='confirmPassword'
            className='sign-up__form__input'
            placeholder='Confirm password'
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {/* error handling */}
          {error && (
            <div className='sign-up__message sign-up__message--error'>
              {error}
            </div>
          )}

          {/* successful sign up */}
          {success && (
            <div className='sign-up__message'>
              Signed up!{' '}
              <Link
                to='/login'
                className='sign-up__message__link'
              >
                Log in
              </Link>
            </div>
          )}
          <button className='sign-up__form__button button'>Sign Up</button>
        </form>

        <p className='sign-up__login'>
          Already have an account?{' '}
          <Link
            to='/login'
            className='sign-up__login__link'
          >
            Log in
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SignUpPage;

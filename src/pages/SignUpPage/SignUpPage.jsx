import React, { useState } from 'react';
import './SignUpPage.scss';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';

const SignUpPage = () => {
  document.title = 'DineSafe | Register';
  const navigate = useNavigate();

  // form values
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // validation
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSignUp = async (event) => {
    event.preventDefault();

    if (!password === confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      await axios.post(`${import.meta.en.VITE_SERVER_URL}/api/users/register`, {
        email: email,
        username: username,
        password: password,
      });

      setError('');
      setSuccess(true);
      navigate('/');
    } catch (err) {
      console.log({ message: err.message, error: err.response.data });
      setError(err.response.data);
      setError(true);
      setSuccess(false);
    }
  };

  return (
    <section className='login'>
      <article className='login__about'>
        <h1 className='login__about__title'>DineSafe</h1>

        <p className='login__about__content'>
          DineSafe is Toronto Public Health’s food safety program that inspects
          all establishments serving and preparing food. Each inspection results
          in a pass, a conditional pass or a closed notice.
        </p>

        <p className='login__about__quote'>- City of Toronto Open Data</p>
      </article>

      <div className='sign-up'>
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
            Email
          </label>
          <input
            type='email'
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
            Username
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
            Password
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
            Confirm password
          </label>
          <input
            type='password'
            id='confirmPassword'
            className='sign-up__form__input'
            placeholder='Confirm password'
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button className='sign-up__form__button button'>Sign Up</button>
        </form>
      </div>
    </section>
  );
};

export default SignUpPage;

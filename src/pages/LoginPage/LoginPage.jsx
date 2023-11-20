import './LoginPage.scss';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  document.title = 'DineSafe | Login';
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/users/login`,
        {
          username: username,
          password: password,
        }
      );

      sessionStorage.setItem('token', data.token);
      navigate('/');
    } catch (err) {
      console.log({ message: err.message, error: err.response.data });
      setError(err.response.data);
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

      <div className='login-wrapper'>
        {/* login form */}
        <form
          onSubmit={handleLogin}
          className='login__form'
        >
          {/* username */}
          <input
            type='text'
            name='username'
            placeholder='Email or username'
            className='login__form__input'
            onChange={(e) => setUsername(e.target.value)}
          />
          {/* password */}
          <input
            type='password'
            name='password'
            placeholder='Password'
            className='login__form__input'
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className='login__form__button button'>Login</button>

          {error && <div className='login__message'>{error}</div>}
        </form>
        <Link
          to='/'
          className='login__link'
        >
          Continue without logging in
        </Link>

        <Link
          className='sign-up__link'
          to='/register'
        >
          <button className='login__button button'>Sign Up</button>
        </Link>
      </div>
    </section>
  );
};

export default Login;

import './LoginPage.scss';
import { useState } from 'react';
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
      <div className='login-wrapper'>
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

          {/* login */}
          <button className='login__form__button'>Login</button>
          {error && <div className='login__form__message'>{error}</div>}
        </form>
        <Link
          to='/'
          className='login__link'
        >
          Continue without logging in
        </Link>

        {/* registration */}
        <Link
          className='sign-up__link'
          to='/register'
        >
          <button className='login__form__button login__form__button--sign-up'>
            Sign Up
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Login;

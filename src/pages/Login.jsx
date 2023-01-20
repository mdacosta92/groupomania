import React, { useState } from 'react';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { NavRegister } from '../components/NavRegister';
import SecurityManager from '../manager/SecurityManager';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import AbstractManager from '../manager/AbstractManager';
import thumb from '../assets/thumb.png';
import thumbSwap from '../assets/thumbSwap.png';

function Login() {

  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setCredentials((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await SecurityManager.login(credentials);
      localStorage.setItem('userId', response.data.userId);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('isAdmin', response.data.isAdmin);
      AbstractManager.token = response.data.token;
      alert('Connection Successful');
      navigate('/');
    } catch (e) {
      if (e instanceof AxiosError) {
        alert('Email ou mot de passe incorrect');
        return;
      }
      throw e;
    }
  }

  return (
    <div id="header">
      <Header></Header>
      <NavRegister></NavRegister>
      <form id="login" onSubmit={handleSubmit}>
        <div className="lmj-unfold">
          <p className="guidance">
            Veuillez renseigner votre email employé et votre mot de passe
          </p>
          <input
            onChange={handleChange}
            name="email"
            value={credentials.email}
            autoComplete="off"
            className="my_input"
            placeholder="email"
            required
          />

          <input
            type="password"
            onChange={handleChange}
            name="password"
            value={credentials.password}
            autoComplete="off"
            className="my_input"
            placeholder="Mot de Passe"
            required
          />
          <button type="submit" className="button">
            <img src={thumb} alt="thumb" className="thumb" />
            <img src={thumbSwap} alt="thumb" className="thumbSwap" />
          </button>
        </div>
      </form>
      <Footer></Footer>
    </div>
  );
}

export default Login;

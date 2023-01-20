import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { NavRegister } from '../components/NavRegister';
import thumb from '../assets/thumb.png';
import thumbSwap from '../assets/thumbSwap.png';
import SignupManager from '../manager/SignupManager';
import AbstractManager from '../manager/AbstractManager';

function Register() {
  const navigate = useNavigate();
  const [newUser, setUser] = useState({
    email: '',
    password: '',
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setUser((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await SignupManager.signup(newUser);

      localStorage.setItem('userId', response.data.userId);

      AbstractManager.token = response.data.token;

      alert('Creation réussie');

      navigate('/login');
    } catch (e) {
      if (e instanceof AxiosError) {
        alert('utilisateur déjà existant');
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
          <p class="guidance">
            Veuillez renseigner votre email employé et votre mot de passe
          </p>

          <input
            onChange={handleChange}
            name="email"
            value={newUser.email}
            autoComplete="off"
            className="my_input"
            placeholder="email"
            required
          />

          <input
            type="password"
            onChange={handleChange}
            name="password"
            value={newUser.password}
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
        <div id="Footer">
          <Footer></Footer>
        </div>
      </form>
    </div>
  );
}

export default Register;

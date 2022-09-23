import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import thumb from '../assets/thumb.png';
import thumbSwap from '../assets/thumbSwap.png';
import '../styles/Menu.css';
import axios from 'axios';

function Menu() {
  const [input, setInput] = useState({
    email: '',
    password: '',
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setInput((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  }

  function handleClick(event) {
    event.preventDefault();
    const User = {
      email: input.email,
      password: input.password,
    };
    axios.post('http://localhost:5000/auth/signup', User);
  }

  function signupClick() {
    document.getElementById('signup').style.display = 'flex';
    document.getElementById('register').style.display = 'none';
  }
  function registerClick() {
    document.getElementById('signup').style.display = 'none';
    document.getElementById('register').style.display = 'flex';
  }

  return (
    <div className="lmj-nofold">
      <div className="lmj-menu">
        <ul className="lmj-menu">
          <li className="menu" onClick={signupClick}>
            S'INSCRIRE
          </li>
          <li className="menu" onClick={registerClick}>
            SE CONNECTER
          </li>
        </ul>
      </div>

      <form id="signup">
        <div className="lmj-unfold">
          <p>
            Pour la création d'un compte, merci de renseigner votre email
            employé et votre mot de passe
          </p>

          <input
            onChange={handleChange}
            name="email"
            value={input.email}
            autoComplete="off"
            className="my_input"
            placeholder="email"
            required
          />

          <input
            onChange={handleChange}
            name="password"
            value={input.password}
            autoComplete="off"
            className="my_input"
            placeholder="Mot de Passe"
            required
          />

          <button onClick={handleClick} type="submit" className="button">
            <img src={thumb} alt="thumb" className="thumb" />
            <img src={thumbSwap} alt="thumb" className="thumbSwap" />
          </button>
        </div>
      </form>

      <form id="register">
        <div className="lmj-unfold">
          <p>Merci de renseigner votre email employé et votre mot de passe</p>

          <input
            type="text"
            className="my_input"
            placeholder="email"
            required
          />

          <input
            type="text"
            className="my_input"
            placeholder="Mot de Passe"
            required
          />

          <button type="submit" className="button">
            <Link to="/user">
              <img src={thumb} alt="thumb" className="thumb" />
              <img src={thumbSwap} alt="thumb" className="thumbSwap" />
            </Link>
          </button>
        </div>
      </form>
    </div>
  );
}

export { Menu };

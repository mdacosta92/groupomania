import { useState } from 'react';
import { Link } from 'react-router-dom';
import thumb from '../assets/thumb.png';
import thumbSwap from '../assets/thumbSwap.png';
import '../styles/Menu.css';

function Menu() {
  function signupClick() {
    document.getElementById('signup').style.display = 'flex';
    document.getElementById('register').style.display = 'none';
  }
  function registerClick() {
    document.getElementById('signup').style.display = 'none';
    document.getElementById('register').style.display = 'flex';
  }

  const [inputValue, setInputValue] = useState();

  function checkValue(value) {
    if (!value.includes('@')) {
      setInputValue(value);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
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

      <form id="signup" onSubmit={handleSubmit}>
        <div className="lmj-unfold">
          <p>
            Pour la création d'un compte, merci de renseigner votre email
            employé et votre mot de passe
          </p>

          <input
            type="text"
            className="my_input"
            placeholder="email"
            onChange={(e) => checkValue(e.target.value)}
          />

          <input
            type="text"
            className="my_input"
            placeholder="Mot de Passe"
            onChange={(e) => checkValue(e.target.value)}
          />

          <button
            type="submit"
            className="button"
            onClick={() =>
              alert(
                'compte créé, veuillez vous connecter dans la section login'
              )
            }
          >
            <img src={thumb} alt="thumb" className="thumb" />
            <img src={thumbSwap} alt="thumb" className="thumbSwap" />
          </button>
        </div>
      </form>

      <form id="register" onSubmit={handleSubmit}>
        <div className="lmj-unfold">
          <p>Merci de renseigner votre email employé et votre mot de passe</p>

          <input
            type="text"
            className="my_input"
            placeholder="email"
            onChange={(e) => checkValue(e.target.value)}
          />

          <input
            type="text"
            className="my_input"
            placeholder="Mot de Passe"
            onChange={(e) => checkValue(e.target.value)}
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

import logo from '../assets/logo.png';
import '../styles/App.css';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div id="root">
      <div className="lmj-banner">
        <Link className="home" to="/">
          <img src={logo} alt="groupomania" className="lmj-logo" />
        </Link>
      </div>
    </div>
  );
}

export { Header };

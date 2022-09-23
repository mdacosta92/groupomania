import logo from '../assets/logo.png';
import '../styles/Header.css';

function Header() {
  return (
    <div id="root">
      <div className="lmj-banner">
        <img src={logo} alt="groupomania" className="lmj-logo" />
      </div>
    </div>
  );
}

export { Header };

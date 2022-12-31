import { Link } from 'react-router-dom';
import '../styles/App.css';

function NavRegister() {
  return (
    <div className="navigationRegister">
      <Link className="lmj.userNavigation" to="/login">
        <p className="navigation">Connexion</p>
      </Link>
      <Link className="lmj.userNavigation" to="/signup">
        <p className="navigation">S'inscrire</p>
      </Link>
    </div>
  );
}

export { NavRegister };

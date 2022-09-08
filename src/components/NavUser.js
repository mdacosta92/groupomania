import { Link } from 'react-router-dom';
import '../styles/NavUser.css';

function NavUser() {
  function navClick() {
    document.getElementById('userAct').style.display = 'flex';
  }

  return (
    <Link className="lmj.userMenu" to="/posts">
      <p className="toPost">CREER UN POST</p>
    </Link>
  );
}

export { NavUser };

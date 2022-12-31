import '../styles/App.css';
import { Link } from 'react-router-dom';

function Menu() {
  return (
    <div className="lmj-nofold">
      <div className="lmj-menu">
        <Link className="lmj.userMenu" to="/posts">
          <p className="toPost">Créer un post</p>
        </Link>
      </div>
    </div>
  );
}

export { Menu };

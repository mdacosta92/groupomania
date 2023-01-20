import '../styles/App.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="infoContainer">
        <ul className="links">
          <p className="footerTitle">Groupomania</p>
          <li>A propos</li>
          <li>Blogs</li>
          <li>Carrières</li>
        </ul>

        <ul className="links">
          <p className="footerTitle">Besoin d'aide?</p>
          <li>Aide</li>
          <li>Réclamation</li>
          <li>Signaler un problème</li>
        </ul>

        <ul className="links">
          <p className="footerTitle">Paternaires</p>
          <li>random</li>
          <li>random</li>
          <li>random</li>
        </ul>
      </div>
    </footer>
  );
}

export { Footer };

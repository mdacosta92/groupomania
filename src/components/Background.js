import background from '../assets/background2.jpg';
import '../styles/Background.css';

function Background() {
  return (
    <div className="backgroundContainer">
      <img src={background} alt="background" className="background" />
    </div>
  );
}
export { Background };

import background from '../assets/background22.jpg';

function Background() {
    return (
        <div className="backgroundContainer">
            <img src={background} alt="background" className="background"/>
        </div>
    );
}

export {Background};

import React from 'react';
import {Link} from 'react-router-dom';

function Menu() {
    return (
        <div className="lmj-nofold">
            <div className="lmj-menu">
                <ul className="lmj-menu">
                    <li className="menu">
                        <Link to={'register'}>S'INSCRIRE</Link>
                    </li>
                    <li className="menu">
                        <Link to={'login'}>SE CONNECTER</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export {Menu};

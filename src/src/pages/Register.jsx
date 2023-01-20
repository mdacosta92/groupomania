import React from 'react';
import thumb from "../assets/thumb.png";
import thumbSwap from "../assets/thumbSwap.png";
import {Link} from "react-router-dom";

function Register() {
    return (
        <form id="register">
            <div className="lmj-unfold">
                <p>Merci de renseigner votre email employé et votre mot de passe</p>

                <input
                    type="text"
                    className="my_input"
                    placeholder="email"
                    required
                />

                <input
                    type="text"
                    className="my_input"
                    placeholder="Mot de Passe"
                    required
                />

                <button type="submit" className="button">
                    <Link to="/user">
                        <img src={thumb} alt="thumb" className="thumb"/>
                        <img src={thumbSwap} alt="thumb" className="thumbSwap"/>
                    </Link>
                </button>
            </div>
        </form>
    );
}

export default Register;
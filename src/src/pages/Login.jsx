import React, {useState} from 'react';
import thumb from "../assets/thumb.png";
import thumbSwap from "../assets/thumbSwap.png";
import SecurityManager from "../manager/SecurityManager";
import {useNavigate} from "react-router-dom";
import {AxiosError} from "axios";
import AbstractManager from "../manager/AbstractManager";

function Login() {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });

    function handleChange(event) {
        const {name, value} = event.target;

        setCredentials((prevInput) => {
            return {
                ...prevInput,
                [name]: value,
            };
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const response = await SecurityManager.login(credentials);

            localStorage.setItem('userId', response.data.userId);
            localStorage.setItem('token', response.data.token);
            AbstractManager.token = response.data.token;

            alert('Connection Successful');

            navigate('/');
        } catch (e) {
            if (e instanceof AxiosError) {
                if (e.response.status === 400) {
                    alert('Bad Credentials');
                    return;
                }
            }

            throw e;
        }
    }

    return (
        <form id="signup" onSubmit={handleSubmit}>
            <div className="lmj-unfold">
                <p>
                    Pour la création d'un compte, merci de renseigner votre email
                    employé et votre mot de passe
                </p>

                <input
                    onChange={handleChange}
                    name="email"
                    value={credentials.email}
                    autoComplete="off"
                    className="my_input"
                    placeholder="email"
                    required
                />

                <input
                    onChange={handleChange}
                    name="password"
                    value={credentials.password}
                    autoComplete="off"
                    className="my_input"
                    placeholder="Mot de Passe"
                    required
                />

                <button type="submit" className="button">
                    <img src={thumb} alt="thumb" className="thumb"/>
                    <img src={thumbSwap} alt="thumb" className="thumbSwap"/>
                </button>
            </div>
        </form>
    );
}

export default Login;
import axios from "axios";
import AbstractManager from "./AbstractManager";

const API_URL = process.env.REACT_APP_API_URL;

export default new class SecurityManager extends AbstractManager {
    login(credentials) {
        return axios.post(AbstractManager.apiUrl + '/auth/login', credentials);
    }
};
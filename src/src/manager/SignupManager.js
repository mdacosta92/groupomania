import axios from 'axios';
import AbstractManager from './AbstractManager';

const API_URL = process.env.REACT_APP_API_URL;

export default new (class signupManager extends AbstractManager {
  signup(newUser) {
    return axios.post(AbstractManager.apiUrl + '/auth/signup', newUser);
  }
})();

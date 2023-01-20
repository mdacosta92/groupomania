export default class AbstractManager {
    static apiUrl = process.env.REACT_APP_API_URL;
    static token = localStorage.getItem('token');
}
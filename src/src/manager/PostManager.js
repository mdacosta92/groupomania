import axios from "axios";
import AbstractManager from "./AbstractManager";

export default new class PostManager extends AbstractManager {
    getAllPosts() {
        return axios.get(AbstractManager.apiUrl + '/posts', {
            headers: {
                Authorization: `Bearer ${AbstractManager.token}`
            }
        });
    }
};
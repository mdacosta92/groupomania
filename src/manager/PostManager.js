import axios from 'axios';
import AbstractManager from './AbstractManager';

export default new (class PostManager extends AbstractManager {
  getAllPosts() {
    return axios.get(AbstractManager.apiUrl + '/posts', {
      headers: {
        Authorization: `Bearer ${AbstractManager.token}`,
      },
    });
  }

  likeModify(postId, status) {
    return axios.post(
      'http://localhost:5000/api/posts/like/' + postId,
      {
        like: status,
      },
      {
        headers: {
          Authorization: `Bearer ${AbstractManager.token}`,
        },
      }
    );
  }
})();

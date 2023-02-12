import { useState, useEffect } from 'react';
import AbstractManager from '../manager/AbstractManager';
import PostManager from '../manager/PostManager';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHeartBroken } from '@fortawesome/free-solid-svg-icons';
import '../styles/App.css';

// -- récupération et affichage d'un post -- //
function OnePost() {
  const config = {
    headers: { Authorization: `Bearer ${AbstractManager.token}` },
  };

  const params = useParams();
  const [post, setPost] = useState({
    title: '',
    description: '',
    image: null,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
  });

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/posts/' + params.id, config)
      .then((response) => {
        setPost(response.data);
      });
  }, []);

  const currentId = localStorage.getItem('userId');

  const hasLiked = () => {
    return post.usersLiked.includes(currentId);
  };

  const hasDisliked = () => {
    return post.usersDisliked.includes(currentId);
  };
  const like = (e) => {
    e.preventDefault();

    PostManager.likeModify(params.id, hasLiked() ? 0 : 1).then(() => {
      if (hasLiked()) {
        setPost({
          ...post,
          likes: post.likes - 1,
          usersLiked: post.usersLiked.filter((user) => user !== currentId),
        });
      } else {
        setPost({
          ...post,
          likes: post.likes + 1,
          usersLiked: [...post.usersLiked, currentId],
        });
      }
    });
  };

  const dislike = (e) => {
    e.preventDefault();

    PostManager.likeModify(params.id, hasDisliked() ? 0 : -1).then(() => {
      if (hasDisliked()) {
        setPost({
          ...post,
          dislikes: post.dislikes - 1,
          usersDisliked: post.usersDisliked.filter(
            (user) => user !== currentId
          ),
        });
      } else {
        setPost({
          ...post,
          dislikes: post.dislikes + 1,
          usersDisliked: [...post.usersDisliked, currentId],
        });
      }
    });
  };

  return (
    <div id="header">
      <Header></Header>
      <div id="displayPost">
        <div className="displayImage">
          <img src={post.imageUrl} width="50%" height="400" />
        </div>

        <div className="displayInfo">
          <input
            readOnly
            className="displayTitle"
            type="text"
            name="title"
            value={post.title}
            required
          />

          <div className="like">
            <button
              onClick={like}
              className={[hasLiked() ? 'btn-pink' : null]}
              disabled={hasDisliked()}
            >
              {' '}
              <FontAwesomeIcon icon={faHeart} /> {post.likes}
            </button>

            <button
              onClick={dislike}
              className={[hasDisliked() ? 'btn-pink' : null]}
              disabled={hasLiked()}
            >
              {' '}
              <FontAwesomeIcon icon={faHeartBroken } /> {post.dislikes}
            </button>
          </div>

          <textarea
            readOnly
            className="displayDescription"
            type="text"
            name="description"
            value={post.description}
            required
          />
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
export default OnePost;

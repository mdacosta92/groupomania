import { useState, useEffect } from 'react';
import AbstractManager from '../manager/AbstractManager';
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
        console.log(response.data);
      });
  }, []);

  const [like, setLike] = useState(0);
  const [dislike, setDislike] = useState(0);

  const usersLiked = post.usersLiked;
  const usersDisliked = post.usersDisliked;

  const currentId = localStorage.getItem('userId');

  function likef() {
    if (
      like >= 0 &&
      !usersDisliked.includes(currentId) &&
      !usersLiked.includes(currentId)
    ) {
      post.likes = post.likes + 1;
      usersLiked.push();
      setLike();
    } else if (like === 0 && usersLiked.includes(currentId)) {
      post.likes = post.likes - 1;
      usersLiked.shift();
      setLike();
    }
    likePost();
  }

  const likePost = () => {
    const liked = {
      like: post.likes,
    };
    axios
      .post(
        'http://localhost:5000/api/posts/like/' + params.id,
        liked,
        config,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      .then((response) => {});
  };

  function dislikef() {
    if (
      dislike >= 0 &&
      !usersDisliked.includes(currentId) &&
      !usersLiked.includes(currentId)
    ) {
      post.dislikes = post.dislikes + 1;
      usersDisliked.push();
      setDislike(1);
    } else if (dislike === 0 && usersDisliked.includes(currentId)) {
      post.dislikes = post.dislikes - 1;
      usersDisliked.shift();
      setDislike(0);
    }
    dislikePost();
  }

  const dislikePost = () => {
    const disliked = {
      dislike: post.dislikes,
    };
    axios
      .post(
        'http://localhost:5000/api/posts/like/' + params.id,
        disliked,
        config,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      .then((response) => {
        setLike(response.data);
        console.log(response.data);
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
              id="btn-pink"
              onClick={likef}
              className={[
                like === post.likes ? 'btn-pink' : null,
                'btn-pink',
              ].join()}
            >
              {''}
              <FontAwesomeIcon icon={faHeart} /> {post.likes}
            </button>

            <button
              id="btn-red"
              onClick={dislikef}
              className={[
                dislike === post.dislikes ? 'btn-red' : null,
                'btn-red',
              ].join()}
            >
              {''}
              <FontAwesomeIcon icon={faHeartBroken} /> {post.dislikes}
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

import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart,
  faHeartBroken,
  faEdit,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

import AbstractManager from '../manager/AbstractManager';

import axios from 'axios';
import '../styles/App.css';

function OnePost() {
  const params = useParams();
  console.log(params);

  const [post, setPost] = useState({
    title: '',
    description: '',
    image: null,
  });

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/posts/' + params.id, config)
      .then((response) => {
        console.log(response.data);
        setPost(response.data);
      });
  }, []);

  const config = {
    headers: { Authorization: `Bearer ${AbstractManager.token}` },
  };

  const [likeState, setLikeState] = useState(0);

  function likef() {
    if (likeState === 0) {
      setLikeState(1);
    } else if (likeState === 1) {
      setLikeState(0);
    }
  }

  function dislikef() {
    if (likeState === 0) {
      setLikeState(-1);
    } else if (likeState === -1) {
      setLikeState(0);
    }
  }

  return (
    <div id="header">
      <Header></Header>
      <div id="displayPost">
        <div className="displayImage">
          <img src={post.imageUrl} width="50%" height="400" />
        </div>

        <div className="displayInfo">
          <input
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
              className={[likeState === 1 ? 'btn-pink' : null, 'btn-pink'].join(
                post.likes
              )}
            >
              <FontAwesomeIcon icon={faHeart} />
            </button>

            <button
              onClick={dislikef}
              className={[likeState === -1 ? 'btn-red' : null, 'btn-red'].join(
                ''
              )}
            >
              <FontAwesomeIcon icon={faHeartBroken} /> {likeState}
            </button>
          </div>

          <textarea
            className="displayDescription"
            type="text"
            name="description"
            value={post.description}
            required
          />
        </div>
      </div>
      <div className="postModification">
        <button
          className="modify"
          onClickCapture={() => modifyOnePost(post)}
        ></button>
        <button
          className="delete"
          onClickCapture={() => deletePost(post)}
        ></button>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default OnePost;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

import AbstractManager from '../manager/AbstractManager';

import axios from 'axios';
import '../styles/App.css';

function DisplayMod() {
  const config = {
    headers: { Authorization: `Bearer ${AbstractManager.token}` },
  };

  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  const location = useLocation();

  useEffect(() => {
    fetchAllPosts();
  }, [location]);

  const fetchAllPosts = () => {
    axios.get('http://localhost:5000/api/posts', config).then((response) => {
      setPosts(response.data);
    });
  };

  const modifyOnePost = (post) => {
    window.location.replace('http://localhost:3000/posts/' + post._id);
  };

  const deletePost = (post) => {
    const url = 'http://localhost:5000/api/posts/' + post._id;
    fetch(url, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${AbstractManager.token}` },
    })
      .then((response) => {
        fetchAllPosts();
      })
      .catch((e) => {});
  };

  return (
    <div>
      {posts.map((post) => {
        return (
          <div className="postModification">
            <button onClickCapture={() => modifyOnePost(post)}>
              <FontAwesomeIcon icon={faEdit} />
            </button>

            <button onClickCapture={() => deletePost(post)}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
export { DisplayMod };

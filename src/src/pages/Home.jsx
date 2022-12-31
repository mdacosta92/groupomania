import React, { useState, useEffect } from 'react';

import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { DisplayMod } from '../components/DisplayMod';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import AbstractManager from '../manager/AbstractManager';

import axios from 'axios';
import '../styles/App.css';

function Home() {
  // -- disconnect -- //
  const config = {
    headers: { Authorization: `Bearer ${AbstractManager.token}` },
  };

  const logout = () => {
    localStorage.removeItem(config);
    localStorage.clear();
    document.location.replace('http://localhost:3000/login');
    return false;
  };

  // -- get all posts -- //
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

  const getOnePost = (post) => {
    window.location.replace('http://localhost:3000/' + post._id);
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
    <div className="App">
      <Header></Header>
      <div className="lmj-userMenu">
        <input type="checkbox" id="menu"></input>
        <div className="cross">
          <label className="cross" htmlFor="menu"></label>
        </div>
        <ul className="menu-content">
          <li className="list">
            <div></div>
            <Link className="lmj.userMenu" to="/posts">
              <p className="toPost">Créer une annonce</p>
            </Link>
          </li>
          <li className="list">
            <Link
              className="lmj.userMenu"
              to="/"
              onClickCapture={() => logout()}
            >
              <p className="toPost">Déconnexion</p>
            </Link>
          </li>
        </ul>
      </div>

      <div className="galleryContainer">
        {posts.map((post) => {
          return (
            <div className="gallery">
              <figure className="galleryThumb">
                <div className="imageContainer" key={post._id}>
                  <img className="postImage" src={post.imageUrl}></img>
                  <div className="middle">
                    <div className="text">
                      <FontAwesomeIcon
                        icon={faEye}
                        onClickCapture={() => getOnePost(post)}
                      />
                    </div>
                  </div>
                </div>

                <div className="figureInfo">
                  <figcaption className="postCaption">
                    {post.title}{' '}
                    <div className="postModification">
                      <button onClickCapture={() => modifyOnePost(post)}>
                        <FontAwesomeIcon icon={faEdit} />
                      </button>

                      <button onClickCapture={() => deletePost(post)}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </button>
                    </div>
                  </figcaption>

                  <figcaption className="postDescription" maxLength="50">
                    {post.description}
                  </figcaption>
                </div>
              </figure>
            </div>
          );
        })}
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Home;

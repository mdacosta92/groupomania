import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';

import AbstractManager from '../manager/AbstractManager';

import axios from 'axios';
import '../styles/App.css';

function ModifyPost() {
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

  const clearInput = (e) => {
    e.target.value = '';
  };

  const handleChange = (e) => {
    const value = e.target.files ? e.target.files[0] : e.target.value;
    setPost({
      ...post,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      title: post.title,
      description: post.description,
      image: post.image,
    };

    const formData = new FormData();
    formData.append('post', JSON.stringify(newPost));
    formData.append('image', post.image);
    console.log(post.image);

    console.log(formData);

    axios
      .put('http://localhost:5000/api/posts/' + params.id, formData, config)
      .then((response) => {
        alert('post modifié');
      });
  };

  return (
    <div id="header">
      <Header></Header>
      <form id="postCreate" onSubmit={handleSubmit}>
        <div className="addImage">
          <p className="info">IMAGE</p>

          <div>
            <input
              id="image"
              name="image"
              type="file"
              onChange={handleChange}
              placeholder="image"
              required
            />
            <label htmlFor="image" className="imageContainer">
              {post && (post.image || post.imageUrl) ? (
                <img
                  src={
                    post.image ? URL.createObjectURL(post.image) : post.imageUrl
                  }
                  width="50%"
                  height="400"
                />
              ) : (
                'Ajouter une image'
              )}
            </label>
          </div>
        </div>

        <div className="postInfo">
          <p className="infos">TITRE</p>
          <input
            className="myTitle"
            type="text"
            onClick={clearInput}
            onChange={handleChange}
            name="title"
            value={post.title}
            required
          />

          <p className="infos">DESCRIPTION</p>
          <textarea
            className="myDescription"
            type="text"
            onChange={handleChange}
            onClick={clearInput}
            name="description"
            value={post.description}
            required
          />

          <div className="submitPost">
            <button
              type="submit"
              className="submitButton"
              onClick={handleSubmit}
            >
              <Link className="lmj.userMenu" to="/">
                ENVOYER
              </Link>
            </button>
          </div>
        </div>
      </form>
      <Footer></Footer>
    </div>
  );
}

export default ModifyPost;

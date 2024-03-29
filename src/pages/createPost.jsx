import React, { useState } from 'react';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Link, useParams } from 'react-router-dom';
import AbstractManager from '../manager/AbstractManager';
import axios from 'axios';
import '../styles/App.css';

function createPost() {
  const config = {
    headers: { Authorization: `Bearer ${AbstractManager.token}` },
  };

  const params = useParams();

  const [post, setPost] = useState({
    title: '',
    description: '',
    image: null,
    date: '',
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
  });

  const handleChange = (e) => {
    const value = e.target.files ? e.target.files[0] : e.target.value;
    setPost({
      ...post,
      [e.target.name]: value,
    });
    console.log(post);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      title: post.title,
      description: post.description,
      date: new Date(),
      likes: post.likes,
      dislikes: post.dislikes,
      usersLiked: [],
      usersDisliked: [],
    };

    const formData = new FormData();
    formData.append('post', JSON.stringify(newPost));
    formData.append('image', post.image);
    formData.append('date', post.date);
    axios
      .post('http://localhost:5000/api/posts', formData, config)
      .then((response) => {
        alert('Post Enregistré');
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
              {post.image ? (
                <img
                  src={URL.createObjectURL(post.image)}
                  width="50%"
                  height="400"
                />
              ) : (
                <p className="textImage">AJOUTER</p>
              )}
            </label>
          </div>
        </div>

        <div className="postInfo">
          <p className="infos">TITRE</p>
          <input
            className="myTitle"
            type="text"
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

export default createPost;

import '../styles/CreatePost.css';
import axios from 'axios';

import React, { useState } from 'react';

function Posting() {
  const [selectedImage, setSelectedImage] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  return (
    <div id="postCreate">
      <div className="addImage">
        <p className="info">IMAGE</p>
        {selectedImage && (
          <div>
            <img
              alt="not found"
              className="image"
              width={'250px'}
              src={URL.createObjectURL(selectedImage)}
            />
            <br />
            <button
              className="createButton"
              onClick={() => setSelectedImage('')}
            >
              Supprimer
            </button>
          </div>
        )}
        <label class="custom-file-upload">
          <p className="adding">Ajouter une Image</p>
          <input
            type="file"
            className="myImage"
            onChange={(event) => {
              console.log(event.target.files[0]);
              setSelectedImage(event.target.files[0]);
            }}
          />
        </label>
      </div>
      <div className="postInfo">
        <p className="infos">TITRE</p>
        <textarea type="text" className="myTitle" required />
        <p>{title}</p>
        <p className="infos">DESCRIPTION</p>
        <textarea type="text" className="myDescription" required />
        <p>{description}</p>
        <div className="submitPost">
          <button type="submit" className="submitButton">
            ENVOYER
          </button>
        </div>
      </div>
    </div>
  );
}

export { Posting };

import '../styles/Posts.css';
import newPost from '../assets/newPost.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHeartBroken } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { API_URL } from '../config/config';

function Posts() {
  axios.get(API_URL + '/posts').then(console.log);
  return (
    <div id="postsGallery">
      <div className="gallery">
        <figure className="galleryThumb">
          <img src={newPost} alt="newPost" className="newPost" />
          <figcaption className="postCaption">
            Exclusive Art Retailing
          </figcaption>
          <figcaption className="postDescription">
            An art exhibition is traditionally the space in which art objects
            meet an audience. The exhibit is universally understood to be for
            some temporary period unless, as is rarely true, it is stated to be
            a 'permanent exhibition'.
          </figcaption>
          <div className="like">
            <button className="btn-pink">
              <FontAwesomeIcon icon={faHeart} />
            </button>
            <button className="btn-red">
              <FontAwesomeIcon icon={faHeartBroken} />
            </button>
          </div>
          <div className="postModification">
            <button className="modify">
              <p>Modifier</p>
            </button>
            <button className="modify">
              <p>Supprimer</p>
            </button>
          </div>
        </figure>
      </div>
    </div>
  );
}

export { Posts };

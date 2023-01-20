import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHeart, faHeartBroken} from '@fortawesome/free-solid-svg-icons';
import postManager from "../manager/PostManager";
import {useEffect, useState} from "react";

function Posts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        postManager.getAll().then((response) => {
            setPosts(response.data);
            console.log(response.data);
        });
    }, []);

    return (
        <div id="postsGallery">
            {
                posts.map((post) => {
                    return (
                        <div key={post._id} className="gallery">
                            <figure className="galleryThumb">
                                <img src={post.imageUrl} alt="newPost" className="newPost"/>
                                <figcaption className="postCaption">
                                    {post.title}
                                </figcaption>
                                <figcaption className="postDescription">
                                    {post.description}
                                </figcaption>
                                <div className="like">
                                    <button className="btn-pink">
                                        <FontAwesomeIcon icon={faHeart}/>
                                    </button>
                                    <button className="btn-red">
                                        <FontAwesomeIcon icon={faHeartBroken}/>
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
                    );
                })
            }
        </div>
    );
}

export {Posts};

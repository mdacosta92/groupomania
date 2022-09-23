import React from 'react'; 
import {Header} from '../components/Header';
import {Posting} from '../components/CreatePost'
import {Footer} from '../components/Footer';

function createPost() {

 return (
 <div>
    <Header /> 
    <Posting />
    <Footer />
</div>
)
}

export default createPost;
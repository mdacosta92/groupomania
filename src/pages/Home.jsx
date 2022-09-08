import React from 'react'; 
import {Header} from '../components/Header';
import {Menu} from '../components/Menu';
import {Posts} from '../components/Posts'
import {Footer} from '../components/Footer';

function Home() {

 return (
 <div>
    <Header /> 
    <Menu />
    <Posts />
    <Footer />
</div>
)
}

export default Home;
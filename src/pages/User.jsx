import {Header} from '../components/Header';
import {Footer} from '../components/Footer';
import {NavUser} from '../components/NavUser';
import {Posts} from '../components/Posts'

function User() {
    
    return(
        <div>
            <Header />
            <Posts />
            <NavUser />
            <Footer />
        </div>
    )
}

export default User;
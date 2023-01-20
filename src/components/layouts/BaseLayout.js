import {Outlet} from "react-router-dom";
import {Footer} from "../Footer";
import {Menu} from "../Menu";
import {Header} from "../Header";

function BaseLayout() {
    return (
        <div>
            <Header/>
            <Menu/>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
}

export {BaseLayout};

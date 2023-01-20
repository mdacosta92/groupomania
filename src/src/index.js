import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import React, {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import Login from './pages/Login';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import Register from "./pages/Register";
import {SecurityLayout} from "./components/layouts/SecurityLayout";
import {BaseLayout} from "./components/layouts/BaseLayout";
import {Posts} from "./components/Posts";

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    <StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<SecurityLayout/>}>
                    <Route id={"register"} path="/register" element={<Register/>}></Route>
                    <Route id={"register"} path="/login" element={<Login/>}></Route>
                </Route>
                <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <BaseLayout/>
                        </PrivateRoute>
                    }
                >
                    <Route index path="/" element={<Posts/>}
                    />
                </Route>
                <Route path="*" element={<p>There's nothing here: 404!</p>}/>
            </Routes>
        </Router>
    </StrictMode>
);

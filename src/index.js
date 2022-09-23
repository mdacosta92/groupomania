import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import Login from './pages/Login';
import Home from './pages/Home';
import User from './pages/User';
import Posts from './pages/Posts';
import Error from './components/Error';
import PrivateRoute from './PrivateRoute/PrivateRoute';

import '../src/styles/index.css';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/signup" element={<Login />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route exact path="/" element={<PrivateRoute />} />
        <Route exact path="/" element={<Home />} />
        <Route exact path="/user" element={<PrivateRoute />} />
        <Route exact path="/user" element={<User />} />
        <Route exact path="/posts" element={<PrivateRoute />} />
        <Route exact path="/posts" element={<Posts />} />
        <Route path="*" element={<Error />}></Route>
      </Routes>
    </Router>
  </StrictMode>
);

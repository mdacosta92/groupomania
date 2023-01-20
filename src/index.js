import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

('../styles/index.css');

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Posting from './pages/createPost';
import ModifyPost from './pages/ModifyPost';
import OnePost from './pages/OnePost';

import PrivateRoute from './PrivateRoute/PrivateRoute';
import { BaseLayout } from './components/layouts/BaseLayout';
import { SecurityLayout } from './components/layouts/SecurityLayout';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<SecurityLayout />}>
          <Route id={'register'} path="/signup" element={<Register />}></Route>
          <Route id={'login'} path="/login" element={<Login />}></Route>
        </Route>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <BaseLayout />
            </PrivateRoute>
          }
        >
          <Route index path="/" element={<Home />} />
          <Route index path="/posts" element={<Posting />} />
          <Route index path="/:id" element={<OnePost />} />
          <Route index path="/posts/:id" element={<ModifyPost />} />
        </Route>
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </Router>
  </StrictMode>
);

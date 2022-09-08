import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import User from './pages/User';
import Posts from './pages/Posts'
import Error from './components/Error'
import '../src/styles/index.css';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Router>
      <Routes>
      <Route path="/" element={<Home />} >
      </Route>
      <Route path="/auth/signup" element ={<Home />} >
      </Route>
      <Route path="/auth/login" element ={<Home />} >
      </Route>
      <Route path="/user" element={<User />}>
      </Route>
      <Route path='/posts' element = {<Posts />}>
      </Route>
      <Route path ='*' element = {<Error />}>
      </Route>
      </Routes>
    </Router>
  </StrictMode>,
);


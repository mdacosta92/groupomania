import { useEffect, useState } from 'react';
import React from 'react';
import { Header } from '../components/Header';
import { Menu } from '../components/Menu';
import { Footer } from '../components/Footer';
import { Background } from '../components/Background';

function Login() {

  return (
    <div>
      <Header />
      <Menu />
      <Background />
      <Footer />
    </div>
  );
}

export default Login;
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '././components/Home/Home';
import Login from '././components/Login/Login';
import Signup from './components/Signup/Signup';
import NotFound from '././components/NotFound/NotFound';

const Routess = () => (
  <BrowserRouter >
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/Registro" element={<Signup />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default Routess;
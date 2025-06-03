// src/App.jsx
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Navbar from './components/Navbar/Navbar';
import axios from 'axios';
import About from './pages/About/About';
import Auth from './components/Auth/Auth';

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem("token");
  return token ? element : <Navigate to="/" replace />;
};

function App() {
  return (
    <>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path='/' element={<Auth />} />
            <Route path='/about' element={<About />} />
            <Route path='/home' element={<PrivateRoute element={<Home />} />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;

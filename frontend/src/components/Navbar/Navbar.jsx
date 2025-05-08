// src/components/Navbar/Navbar.jsx
import React from 'react';
import './Navbar.css';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className='navbar'>
      <div className='navbar-left'>
        <span className='logo'>Notebook</span>
      </div>
      <div className='navbar-center'>
        <ul className='navbar-list'>
          <li><a href="/home" className='navbar-link'>Home</a></li>
          <li><a href="/about" className='navbar-link'>About</a></li>
        </ul>
      </div>
      <div className='navbar-right'>
        {location.pathname !== "/" && (
          <button className='sign-in-button' onClick={handleLogout}>Logout</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

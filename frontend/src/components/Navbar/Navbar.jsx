// src/components/Navbar/Navbar.jsx
import React from 'react';
import './Navbar.css';
import { useNavigate, useLocation, Link } from 'react-router-dom';

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
          <li><Link to="/home" className='navbar-link'>Home</Link></li>
          <li><Link to="/about" className='navbar-link'>About</Link></li>
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

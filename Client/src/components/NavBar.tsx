// Navbar.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/Navbar.css';

const Navbar: React.FC = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const handleLogoutClick = () => {
   localStorage.setItem("authToken",'');
   window.location.pathname='/login'
  };

  return (
    <header className="navbar">
      <h2 className="cursor-pointer uppercase font-medium">
        <Link to="/"> Task Manager </Link>
      </h2>
      <ul className="hidden md:flex gap-4 uppercase font-medium">
        {localStorage.getItem("authToken")?<li onClick={handleLogoutClick} className="py-2 px-3 cursor-pointer text-primary hover:bg-gray-100 transition rounded-sm">
            Logout
          </li>: (
          <li className="py-2 px-3 cursor-pointer text-primary hover:bg-gray-100 transition rounded-sm">
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
      <span className="md:hidden cursor-pointer" onClick={toggleNavbar}>
        <i className="fa-solid fa-bars"></i>
      </span>
    </header>
  );
};

export default Navbar;

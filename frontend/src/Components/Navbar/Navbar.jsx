import React, { useState } from "react";
import "./Navbar.css";
import { FaAlignJustify, FaTimes } from "react-icons/fa";
// import { Box, Button, Select, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Button } from '@chakra-ui/react'

function Navbar() {
  const [toggleMenu, setToggleMenu] = useState(false);

  const navigate = useNavigate();
  const handleToggle = () => {
    setToggleMenu(!toggleMenu);
  };

  const handleLogout = () => {
    localStorage.setItem("userToken", "");
    localStorage.setItem("adminToken", "");
    // navigate("/");
    navigate("/");
  };

  return (
    <nav>
      <div className="logo">
        <img src="https://www.91-img.com/images/logo.gif" alt="logo" />
      </div>
      <ul className={toggleMenu ? "nav-links mobile" : "nav-links"}>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/user/login">Log in</a>
        </li>
        <li>
          <a href="/user/signup">Signup</a>
        </li>
        <li>
          <a href="/upload">Upload</a>
        </li>
        <li>
          <a href="/user/dashboard">User Dashboard </a>
        </li>

        <li>
          <Button colorScheme={"red"} onClick={handleLogout} >
            Logout
          </Button>
        </li>
      </ul>
      <div className="menu-icon" onClick={handleToggle}>
        {toggleMenu ? <FaTimes /> : <FaAlignJustify />}
      </div>
    </nav>
  );
}

export default Navbar;

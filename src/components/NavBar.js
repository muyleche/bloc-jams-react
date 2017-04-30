import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';
import './../styles/main.css';
import logo from "./../assets/images/bloc_jams_logo.png";

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar">
        <Link to="/" className="logo">
          <img src={logo} alt="bloc jams logo" />
        </Link>
        <div className="links-container">
          <Link to="/collections"
                className="navbar-link">
            collections
          </Link>
        </div>
      </nav>
    );
  }
}

export default NavBar;

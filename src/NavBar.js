import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';

class NavBar extends Component {
  render() {
    return (
      <div className="navbar">
        <Link to="/" className="logo">
          <img src="src/assets/images/bloc_jams_logo.png"
                alt="bloc jams logo" />
        </Link>
        <div className="links-container">
          <Link to="/collections"
                className="navbar-link">
            collection
          </Link>
        </div>
      </div>
    );
  }
}

export default NavBar;

import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import './styles/main.css';
import './styles/normalize.css';
import NavBar from './NavBar';
import Landing from './Landing';
import Collection from './Collection';
import Album from './Album';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="background">
          <NavBar/>
          <Route exact path="/" component={Landing}/>
          <Route path="/collections" component={Collection}/>
          <Route path="/album/:id" component={Album}/>
        </div>
      </Router>
    );
  }
}

export default App;

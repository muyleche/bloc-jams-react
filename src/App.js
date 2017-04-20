import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import Landing from './Landing';
import NavBar from './NavBar';
import Collections from './Collections';
import { Album } from './Album';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar/>
          <Route exact path="/" component={Landing}/>
          <Route path="/collections" component={Collections}/>
          <Route path="/album" component={Album}/>
        </div>
      </Router>
    );
  }
}

export default App;

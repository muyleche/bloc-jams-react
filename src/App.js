import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import './styles/main.css';
import './styles/normalize.css';
import NavBar from './components/NavBar';
import Landing from './components/Landing';
import Collection from './components/Collection';
import Album from './components/Album';

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

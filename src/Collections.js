import React, { Component } from 'react';
//import './styles/collections.css';
import ALBUMS from './data/album_data';
import { Link } from 'react-router-dom';

class Collections extends Component {
  render() {
    return (
      <div>
        <h1>Collections</h1>
        {ALBUMS.map((album, index) => (
          <AlbumThumbnail key={index}
            title={album.title}
            artist={album.artist}
            songs={album.songs.length}
            index={index}/>
        ))}
      </div>
    );
  }
}

class AlbumThumbnail extends Component {
  render() {
    return (
      <Link to={`album/${this.props.index}`}>
        <h2>{this.props.title}</h2>
        <span>{this.props.artist}</span>
        <span>{this.props.songs}</span>
      </Link>
    );
  }
}

export default Collections;

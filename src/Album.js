import React, { Component } from 'react';
//import './styles/album.css';
import ALBUMS from './data/album_data';

class Album extends Component {
  render() {
    let album = ALBUMS[parseInt(this.props.location.pathname.split('/').pop(),10)];
    console.log();
    return (
      <div className="">
        <img alt="Album Cover Art" />
        <h1>{album.title}</h1>
        <h2>{album.artist}</h2>
        <table>
          <thead>
            <tr></tr>
          </thead>
          <tbody>
            {album.songs.map((song, index) => (<Song key={index} songNumber={index+1}/>))}
          </tbody>
        </table>
      </div>
    );
  }
}

class Song extends Component {
  render() {
    return (<tr key={this.props.songNumber}><td>Song</td></tr>);
  }
}

export { Album, Song };

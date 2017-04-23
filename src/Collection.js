import React, { Component } from 'react';
import './styles/collection.css';
import albumData from './data/album_data';
import AlbumThumbnail from './AlbumThumbnail';


class Collection extends Component {
  constructor(props){
    super(props);
    this.state = { albums: null };
  }
  render() {
    return (
      !this.state.albums ?
      <div className="loading"></div>
      :
      <div className="collection">
        <section className="album-covers container clearfix">
          {this.state.albums.map((album, index) => (
            <AlbumThumbnail key={index}
              albumArtUrl={album.albumArtUrl}
              title={album.title}
              artist={album.artist}
              songs={album.songs}
              index={index}/>
          ))}
        </section>
      </div>
    );
  }
  componentDidMount() {
    // wait 0.5 seconds just to give the illusion of loading server data.
    setInterval(() => {this.setState({
      albums: albumData
    });}, 500);
    console.log(this.state);
  }
}

export default Collection;

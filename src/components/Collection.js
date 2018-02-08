import React, { Component } from 'react';
import './../styles/collection.css';
import albumData from './../data/album_data';
import AlbumThumbnail from './AlbumThumbnail';


class Collection extends Component {
  constructor(props){
    super(props);
    this.state = { albums: null };
  }

  // This lifecycle function will be called when this virtual DOM is ready to be rendered.
  componentDidMount() {
    this.setState({
      albums: albumData
    });
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
              album={album}
              index={index}/>
          ))}
        </section>
      </div>
    );
  }
}

export default Collection;

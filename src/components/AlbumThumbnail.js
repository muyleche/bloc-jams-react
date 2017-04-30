import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class AlbumThumbnail extends Component {
  render() {
    let album = this.props.album;
    return (
      <div className="collection-album-container column fourth">
       <Link to={`album/${this.props.index}`}>
         <div className="image-container">
            <img src={require(`./../${album.albumArtUrl}`)} alt="Album Cover Art" />
            <div className="label">  {album.songs.length}   songs</div>
         </div>
         <p className="caption">
           <span className="album-name">  {album.title}  </span>
           <br/>  {album.artist}
         </p>
       </Link>
     </div>
    );
  }
}

export default AlbumThumbnail;

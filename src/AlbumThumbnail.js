import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class AlbumThumbnail extends Component {
  render() {
    return (
      <div className="collection-album-container column fourth">
       <Link to={`album/${this.props.index}`}>
         <div className="image-container">
            <img src={require(`./${this.props.albumArtUrl}`)} alt="Album Cover Art" />
            <div className="label">  {this.props.songs.length}   songs</div>
         </div>
         <p className="caption">
           <span className="album-name">  {this.props.title}  </span>
           <br/>  {this.props.artist}
         </p>
       </Link>
     </div>
    );
  }
}

export default AlbumThumbnail;

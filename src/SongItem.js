import React, { Component } from 'react';

class SongItem extends Component {
  render() {
    return (
      <tr className={"album-view-song-item"+(this.props.playing ? ' playing' : "")} data-song-index={this.props.songIndex}>
        <td className="song-item-number" data-song-number={this.props.songNumber}>
          <a className="album-song-button ion-play"></a>
          <a className="album-song-button ion-pause"></a>
        </td>
        <td className="song-item-title">
          {this.props.title}
          <div className="sound-bars">
            <div className="bar bar1"></div>
            <div className="bar bar2"></div>
            <div className="bar bar3"></div>
            <div className="bar bar4"></div>
          </div>
        </td>
        <td className="song-item-duration">{this.props.duration}</td>
        <td className="song-item-play-count">{this.props.playCount}</td>
      </tr>);
  }
}

export default SongItem;

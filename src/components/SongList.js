import React, { Component } from 'react';
import SongItem from './SongItem';

class SongList extends Component {
  render() {
    return (
      <table className="album-view-song-list">
        <thead>
          <tr>
            <td className="song-item-number">#</td>
            <td className="song-item-title">Title</td>
            <td className="song-item-duration">Length</td>
            <td className="song-item-play-count">Plays</td>
          </tr>
        </thead>
        <tbody>
          {this.props.songs.map((song, index) => (
            <SongItem key={index}
                      songIndex={index}
                      title={song.title}
                      duration={song.duration}
                      playCount={song.playCount}
                      selected={this.props.currentSongIndex === index}
                      playing={this.props.playing}
                      />)
          )}
        </tbody>
      </table>
    );
  }
}

export default SongList;

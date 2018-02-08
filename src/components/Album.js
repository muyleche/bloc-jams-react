import React, { Component } from 'react';
import './../styles/album.css';
import albumData from './../data/album_data';
import * as utils from './../scripts/utilities';
import SongList from './SongList';
import PlayerBar from './PlayerBar';

class Album extends Component {
  constructor(props) {
    super(props);
    this.state = { currentSongIndex: -1, album: null, playing: false };
  }

  // Callback function for changing the currently selected (playing) song or toggling current song's play state.
  selectSong = (event) => {
    // only do stuff if you clicked in the album-song-button
    if (event.target.classList.contains('album-song-button')) {
      let songIndex = utils.getFirstParentByClassName(event.target,'album-view-song-item').dataset.songIndex;
      songIndex = parseInt(songIndex,10);
      // stop playing if the user clicked the currently playing song.
      if (songIndex === this.state.currentSongIndex)
        this.setState({ currentSongIndex: -1, playing: false });
      else
        this.changeSong(songIndex);
    }
  }

  // If a new song is selected, play it.
  changeSong = (index = -1) => {
    // if you played a new song, increment playCount.
    if (this.state.album.songs[index]) { this.state.album.songs[index].playCount++; }
    // update currentSong and 'playing' state.
    this.setState({ currentSongIndex: index, playing: index >= 0 });
  }

  // Callback function for the play/pause button.
  playPauseHandler = () => {
    this.setState(prevState => ({ playing: !prevState.playing }));
  }

  // This lifecycle function will be called when this virtual DOM is ready to be rendered. It will set the current album information according to the current props.
  componentDidMount() {
    this.setState({
      album: albumData[parseInt(this.props.match.params.id,10)]
    });
  }

  // The virtual DOM to render.
  render() {
    return (
      !this.state.album ?
      <div className="loading"></div>
      :
      <div className="album">
        <main className="album-view container narrow">
          <section className="clearfix">
            <div className="column half">
              <img src={require(`./../${this.state.album.albumArtUrl}`)} className="album-cover-art" alt="" />
            </div>
            <div className="album-view-details column half">
              <h2 className="album-view-title">{this.state.album.title}</h2>
              <h3 className="album-view-artist">{this.state.album.artist}</h3>
              <h5 className="album-view-release-info">{`${this.state.album.year} ${this.state.album.label}`}</h5>
            </div>
          </section>
          <div onClick={this.selectSong} className="song-list-container">
            <SongList songs={this.state.album.songs}
                      currentSongIndex={this.state.currentSongIndex}
                      playing={this.state.playing}/>
          </div>
        </main>
        <PlayerBar currentSongIndex={this.state.currentSongIndex}
                    currentSong={this.state.album.songs[this.state.currentSongIndex]}
                    playing={this.state.playing}
                    artist={this.state.album.artist}
                    playPause={this.playPauseHandler}
                    changeSong={this.changeSong} />
      </div>
    );
  }
}

export default Album;

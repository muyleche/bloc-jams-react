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

  changeSong = (index = -1) => {
    const song = this.state.album.songs[index]
    // if you played a valid song, increment playCount.
    if (song) song.playCount++;
    // update currentSong and 'playing' state.
    this.setState({ currentSongIndex: index, playing: index >= 0 });
  }

  playPauseHandler = () => {
    this.setState(prevState => ({ playing: !prevState.playing }));
  }

  componentDidMount() {
    this.setState({
      album: albumData[parseInt(this.props.match.params.id,10)]
    });
  }

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

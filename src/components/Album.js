import React, { Component } from 'react';
import './../styles/album.css';
import albumData from './../data/album_data';
import * as utils from './../scripts/utilities';
import SongList from './SongList';
import PlayerBar from './PlayerBar';

class Album extends Component {
  constructor(props) {
    super(props);
    this.state = { currentSong: null, album: null, playing: false };
  }

  selectSong = (event) => {
    // only do stuff if you clicked in the album-song-button
    if (event.target.classList.contains('album-song-button')) {
      let songIndex = utils.getFirstParentByClassName(event.target,'album-view-song-item').dataset.songIndex,
          thisSong = this.state.album.songs[parseInt(songIndex,10)];
      // increment playCount and update currentSong song.
      if (thisSong !== this.state.currentSong) {
        thisSong.playCount++;
        this.setState({ currentSong: thisSong, playing: true });
      }
      else {
        this.clearSong();
      }
    }
  }

  clearSong = () => {
    this.setState({currentSong: null, playing: false});
  }

  playPauseHandler = () => {
    this.setState(prevState => ({ playing: !prevState.playing }));
  }

  playNext = () => {
    let songs = this.state.album.songs,
        songIndex = songs.indexOf(this.state.currentSong);
    if (songIndex++ <= this.state.album.songs.length-1)
      this.setState({currentSong: songs[songIndex]});
    else
      this.setState({currentSong: null});
  }

  playPrevious = () => {
    let songs = this.state.album.songs,
        songIndex = songs.indexOf(this.state.currentSong);
    if (songIndex-- >= 0)
      this.setState({currentSong: songs[songIndex]});
    else
      this.setState({currentSong: null});
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
          <SongList clickHandler={this.selectSong}
                    songs={this.state.album.songs}
                    currentSong={this.state.currentSong}
                    playing={this.state.playing}/>
        </main>
        <PlayerBar currentSong={this.state.currentSong}
                    playing={this.state.playing}
                    artist={this.state.album.artist}
                    playPause={this.playPauseHandler}
                    next={this.playNext}
                    previous={this.playPrevious}
                    clear={this.clearSong}/>
      </div>
    );
  }
}

export default Album;

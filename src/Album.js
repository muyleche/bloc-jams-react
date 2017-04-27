import React, { Component } from 'react';
import './styles/album.css';
import albumData from './data/album_data';
import * as utils from './scripts/utilities';
import SongList from './SongList';
import PlayerBar from './PlayerBar';

class Album extends Component {
  constructor(props) {
    super(props);
    this.state = { currentlyPlaying: {}, album: null };
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
              <img src={require(`./${this.state.album.albumArtUrl}`)} className="album-cover-art" alt="" />
            </div>
            <div className="album-view-details column half">
              <h2 className="album-view-title">{this.state.album.title}</h2>
              <h3 className="album-view-artist">{this.state.album.artist}</h3>
              <h5 className="album-view-release-info">{`${this.state.album.year} ${this.state.album.label}`}</h5>
            </div>
          </section>
          <SongList clickHandler={this.playSong} songs={this.state.album.songs} currentlyPlaying={this.state.currentlyPlaying}/>
        </main>
        <PlayerBar songs={this.state.album.songs} currentlyPlaying={this.state.currentlyPlaying} artist={this.state.album.artist}/>
      </div>
    );
  }

  playSong = (event) => {
    // only do stuff if you clicked in the album-song-button
    if (event.target.classList.contains('album-song-button')) {
      let songIndex = utils.getFirstParentByClassName(event.target,'album-view-song-item').dataset.songIndex,
          thisSong = this.state.album.songs[parseInt(songIndex,10)];

      // increment playCount and update currentlyPlaying song.
      if (thisSong !== this.state.currentlyPlaying) {
        thisSong.playCount++;
      }
      this.setState(prevState => ({ currentlyPlaying: thisSong === prevState.currentlyPlaying ? {} : thisSong }));

      if (this.state.currentlyPlaying.title) console.log(`Now playing '${this.state.currentlyPlaying.title}'.`);
    }

  }
  componentDidMount() {
    this.setState({
      album: albumData[parseInt(this.props.match.params.id,10)]
    });
  }
}

export default Album;

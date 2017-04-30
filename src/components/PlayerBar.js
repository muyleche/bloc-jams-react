import React, { Component } from 'react';
import './../styles/player_bar.css';
import * as utils from './../scripts/utilities';
import plyr from './../../node_modules/plyr/dist/plyr';

class PlayerBar extends Component {
  constructor(props) {
    super(props);
    this.state = { volume: 5, position: 0 };
  }

  playerBarPlayPause = (target = document.querySelector('.play-pause'), props = this.props) => {
    if (props.playing && this.player.isPaused()) {
      this.player.play();
      utils.removeClass('ion-play', target);
      utils.addClass('ion-pause', target);
    }
    else if (!props.playing && !this.player.isPaused()) {
      this.player.pause();
      utils.removeClass('ion-pause', target);
      utils.addClass('ion-play', target);
    }
  }

  positionUpdater = () => {
    this.setState({position: this.player.getCurrentTime()});
  }

  nextHandler = (event) => {
    this.props.changeSong(this.props.currentSongIndex+1);
  }

  previousHandler = (event) => {
    this.props.changeSong(this.props.currentSongIndex-1);
  }

  seekHandler = (event) => {
    this.setState({position: parseFloat(event.target.value)});
    document.removeEventListener('timeupdate', this.positionUpdater);
    if (this.seekTimer) {
      clearTimeout(this.seekTimer);
      this.seekTimer = null;
    }
    this.seekTimer = setTimeout(() => {
        this.player.pause();
        this.player.seek(this.state.position);
        document.addEventListener('timeupdate', this.positionUpdater);
        this.playerBarPlayPause();
    }, 250);
  }

  volumeHandler = (event) => {
    let newState = { 'volume': event.target.value };
    this.player.setVolume(newState.volume);
    this.setState(newState);
  }

  updateCurrentSongInPlayer = (song) => {
    this.player.source({
      type: 'audio',
      title: song ? song.title : this.props.currentSong.title,
      sources: [{
        src: process.env.PUBLIC_URL + "/music/" + encodeURI(song ? song.file : this.props.currentSong.file),
        type: song ? song.fileType : this.props.currentSong.fileType
      }]
    });
    this.player.seek(0);
    this.positionUpdater();
  }

  componentDidMount() {
    this.player = plyr.setup('.audio-player',{})[0];
    this.player.setVolume(this.state.volume);
    document.addEventListener('timeupdate', this.positionUpdater);
  }

  componentWillReceiveProps(nextProps) {
    // the props are about to be updated.
    // the song just changed, upate the player.
    if (nextProps.currentSong && this.props.currentSong !== nextProps.currentSong) {
      this.updateCurrentSongInPlayer(nextProps.currentSong);
    }
    if (this.player.isReady()) {
      this.playerBarPlayPause(undefined, nextProps);
    }
  }

  render() {
    let song = this.props.currentSong,
        {title, artist, duration} = Object.assign({artist: this.props.artist}, song || {});

    return (
      <section className={"player-bar" + (song  ? " active" : "")}>
        <button className="close ion-close clear-style" onClick={this.props.changeSong}></button>
        <div className="container">
          <div className="control-group main-controls">
            <div className="button-group">
              <button className="previous clear-style ion-skip-backward" onClick={this.previousHandler}></button>
              <button className="play-pause clear-style ion-play" onClick={this.props.playPause}></button>
              <button className="next clear-style ion-skip-forward" onClick={this.nextHandler}></button>
            </div>
          </div>
          {song &&
          <div className="control-group currently-playing">
            <h2 className="song-name">{title}</h2>
            <div className="seek-control">
              <input type="range" id="seek-bar" className="seek-bar" value={this.state.position} onChange={this.seekHandler} min="0" max={utils.durationStringToSeconds(duration)} step="0.25"/>
              <div className="current-time">{utils.secondsToDurationString(this.state.position)}</div>
              <div className="total-time">{duration}</div>
            </div>
            <h2 className="artist-song-mobile">{`${title} - ${artist}`}</h2>
            <h3 className="artist-name">{artist}</h3>
          </div>}
          <div className="control-group volume">
            <input id="volume" type="range" className="volume" value={this.state.volume} onChange={this.volumeHandler} min="0" max="10" step="1" />
            <span className={"icon volume-icon" + (this.state.volume < 1 ? " ion-volume-mute" : (this.state.volume < 3 ? " ion-volume-low" : (this.state.volume < 7 ? " ion-volume-medium" : " ion-volume-high")))}></span>
            <div className="volume-number">
              <span>{this.state.volume}</span>
            </div>
          </div>
        </div>
        <audio className="audio-player">
        </audio>
      </section>
    );
  }
  componentWillUnMount() {
    this.player.destroy();
    clearInterval(this.state.positionTimer);
    document.removeEventListener('timeupdate', this.positionUpdater);
  }
}

export default PlayerBar;

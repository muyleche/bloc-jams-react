import React, { Component } from 'react';
import './../styles/player_bar.css';
import * as utils from './../scripts/utilities';
import plyr from './../../node_modules/plyr/dist/plyr';

class PlayerBar extends Component {
  constructor(props) {
    super(props);
    this.state = { volume: 5, position: 0 };
  }

  // Callback function for the player bar's play/pause button.
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

  // Callback function to update the position of the playback slider.
  positionUpdater = () => {
    this.setState({position: this.player.getCurrentTime()});
  }

  // Callback function for the player bar's 'next' button.
  nextHandler = (event) => {
    this.props.changeSong(this.props.currentSongIndex+1);
  }

  // Callback function for the player bar's 'previous' button.
  previousHandler = (event) => {
    this.props.changeSong(this.props.currentSongIndex-1);
  }

  // Callback function for the player bar's playback position slider.
  seekHandler = (event) => {
    // The user is manually changing the playback position. Update the plyr position accordingly.
    this.setState({position: parseFloat(event.target.value)});
    // remove the event listener in case the user continues adjusting postion.
    document.removeEventListener('timeupdate', this.positionUpdater);
    if (this.seekTimer) {
      clearTimeout(this.seekTimer);
      this.seekTimer = null;
    }
    // Prepare to start a new event listener for when the user stops updating position. It will take effect in 250 ms if the user is done updating postion.
    this.seekTimer = setTimeout(() => {
        this.player.pause();
        this.player.seek(this.state.position);
        document.addEventListener('timeupdate', this.positionUpdater);
        this.playerBarPlayPause();
    }, 250);
  }

  // Callback function for the player bar's volume slider.
  volumeHandler = (event) => {
    let newState = { 'volume': event.target.value };
    this.player.setVolume(newState.volume);
    this.setState(newState);
  }

  // Function that will change the currently playing song in the plyr object.
  updateCurrentSongInPlayer = (song) => {
    // Set new song in plyr object.
    this.player.source({
      type: 'audio',
      title: song ? song.title : this.props.currentSong.title,
      sources: [{
        src: process.env.PUBLIC_URL + "/music/" + encodeURI(song ? song.file : this.props.currentSong.file),
        type: song ? song.fileType : this.props.currentSong.fileType
      }]
    });
    // Start the song from the beginning.
    this.player.seek(0);
    this.positionUpdater();
  }

  // This lifecycle function will be called when this virtual DOM is ready to be rendered.
  componentDidMount() {
    this.player = plyr.setup('.audio-player',{})[0];
    this.player.setVolume(this.state.volume);
    document.addEventListener('timeupdate', this.positionUpdater);
  }

  // This lifecycle function will be called before applying the new 'props'. it will provide the new props so that you can perform some logic before 'props' are updated.
  componentWillReceiveProps(nextProps) {
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

  // This lifecycle function will be called when this virtual DOM is ready to be cleaned up.
  componentWillUnMount() {
    this.player.destroy();
    clearInterval(this.state.positionTimer);
    document.removeEventListener('timeupdate', this.positionUpdater);
  }
}

export default PlayerBar;

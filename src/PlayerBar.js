import React, { Component } from 'react';
import './styles/player_bar.css';
import * as utils from './scripts/utilities';
import plyr from './../node_modules/plyr/dist/plyr';

class PlayerBar extends Component {
  constructor(props) {
    super(props);
    this.state = { volume: 50, position: 0, playing: !!this.props.currentlyPlaying.title  };
  }
  handleChange = (event) => {
    let newState, classes = event.target.className;
    switch (true) {
      case(/play-pause/.test(classes)): {
        this.player.togglePlay();
        console.log('Pressed play/pause.');
        newState = { playing: !this.state.playing };
        console.log('player ready: ',this.player.isReady());
        console.log('position: ', this.player.getCurrentTime());
        console.log('volume: ', this.player.getVolume());
        break;
      }
      case (/volume/.test(classes)) : {
        newState = { 'volume': event.target.value };
        this.player.setVolume(newState.volume/10);
        break;
      }
      case (/seek-bar/.test(classes)): {
        newState = { 'position': event.target.value };
        this.player.seek(newState.position);
        break;
      }
      default: {

      }
    }
    this.setState(newState);
  }
  componentDidMount() {
    this.player = plyr.setup('.audio-player',{})[0];
    this.player.setVolume(this.state.volume/10);
  }
  render() {
    let {title, artist, duration} = Object.assign({artist: this.props.artist},this.props.currentlyPlaying),
        seconds = (duration ? parseInt(duration.replace(/.*:/,''),10) : 0)
                  +(duration ? parseInt(duration.replace(/:.*/,''),10) : 0)*60;
    return (
      <section className={"player-bar" + (this.props.currentlyPlaying.title  ? " active" : "")}>
        <div className="container">
          <div className="control-group main-controls">
            <div className="button-group">
              <button className="previous ion-skip-backward" onClick={this.handleChange}></button>
              <button className="play-pause ion-play" onClick={this.handleChange}></button>
              <button className="next ion-skip-forward" onClick={this.handleChange}></button>
            </div>
          </div>
          <div className="control-group currently-playing">
            <h2 className="song-name">{title}</h2>
            <div className="seek-control">
              <input type="range" id="seek-bar" className="seek-bar" value={this.state.position} onChange={this.handleChange} min="0" max={seconds} step="1"/>
              <div className="current-time">{Math.floor(this.state.position/60)+':'+utils.numberPad(this.state.position%60,2)}</div>
              <div className="total-time">{duration}</div>
            </div>
            <h2 className="artist-song-mobile">{`${title} - ${artist}`}</h2>
            <h3 className="artist-name">{artist}</h3>
          </div>
          <div className="control-group volume">
            <input id="volume" type="range" className="volume" value={this.state.volume} onChange={this.handleChange} min="0" max="100" step="1" />
            <span className="ion-volume-high icon"></span>
            <div className="volume-number">
              <span>{this.state.volume}</span>
            </div>
          </div>
        </div>
        <audio className="audio-player">
          <source src={this.props.currentlyPlaying.file && require(this.props.currentlyPlaying.file)} type={this.props.currentlyPlaying.fileType}></source>
        </audio>
      </section>
    );
  }
}

export default PlayerBar;

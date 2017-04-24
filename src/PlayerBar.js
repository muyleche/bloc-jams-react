import React, { Component } from 'react';
import './styles/player_bar.css';
import * as utils from './scripts/utilities';
import plyr from './../node_modules/plyr/dist/plyr';

class PlayerBar extends Component {
  constructor(props) {
    super(props);
    plyr.setup('.player');
    this.state = { volume: 50, position: 0 };
    console.log(plyr.setup('.player'));
    // this.player.source({
    //   type: 'audio',
    //   sources: this.props.songs
    // });
  }
  handleChange = (event) => {
    let newState, classes = event.target.className;
    switch (true) {
      case (/volume/.test(classes)) : {
        newState = { 'volume': event.target.value };
        break;
      }
      case (/seek-bar/.test(classes)): {
        newState = { 'position': event.target.value };
        break;
      }
      default: {

      }
    }
    this.setState(newState);
  }
  render() {
    let {title, artist, duration} = Object.assign({artist: this.props.artist},this.props.currentlyPlaying),
        seconds = (duration ? parseInt(duration.replace(/.*:/,''),10) : 0)
                  +(duration ? parseInt(duration.replace(/:.*/,''),10) : 0)*60;
    return (
      <section className={"player-bar" + (this.props.currentlyPlaying ? " active" : "")}>
        <audio className="player">
          <source src={require('./assets/music/01 Gorecki_ Symphony No. 3, _Symphony of Sorrowful Songs__ I. Lento - Sostenuto tranquillo ma cantabile.mp3')}  type="audio/mp3"></source>
        </audio>
        <div className="container">
          <div className="control-group main-controls">
            <a className="previous" href="#">
              <span className="ion-skip-backward"></span>
            </a>
            <a className="play-pause" href="#">
              <span className="ion-play"></span>
            </a>
            <a className="next" href="#">
              <span className="ion-skip-forward"></span>
            </a>
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
      </section>
    );
  }
}

export default PlayerBar;

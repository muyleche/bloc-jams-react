import React, { Component } from 'react';
import './../styles/landing.css';
import * as utils from './../scripts/utilities';

class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <header className="hero-content">
          <h1 className="hero-title">Turn the music up!</h1>
        </header>
        <section className="selling-points container clearfix">
          <div className="arrow"><div className='left'></div><div className='right'></div></div>
          <div className="point column third">
            <span className="ion-music-note"></span>
            <h5 className="point-title">Choose your music</h5>
            <p className="point-description">The world is full of music; why should you have to listen to music that someone else chose?</p>
          </div>
          <div className="point column third">
            <span className="ion-radio-waves"></span>
            <h5 className="point-title">Unlimited streaming, ad-free</h5>
            <p className="point-description">No arbitrary limits. No distractions.</p>
          </div>
          <div className="point column third">
            <span className="ion-iphone"></span>
            <h5 className="point-title">Mobile enabled</h5>
            <p className="point-description">Listen to your music on the go. This streaming service is available on all mobile platforms.</p>
          </div>
        </section>
        <script src="scripts/landing.js"></script>
        <script src="scripts/utilities.js"></script>
      </div>
    );
  }

  componentDidMount() {
    // get the point elements.
    const points = document.getElementsByClassName('point'),
          pointWrapper = document.getElementsByClassName('selling-points')[0],
          scrollDistance = pointWrapper.getBoundingClientRect().top - window.innerHeight + 200,
          arrowElement = document.getElementsByClassName('arrow')[0];

    // if this is a tall enough window, show the points and hide the arrow.
    if (window.innerHeight > 950) {
      utils.forEach(points, this.revealPoint);
      arrowElement.style.opacity = 0;
    }
    else {
      //otherwise, show them only when you scroll 200px beyond the bottom of the image.
      window.addEventListener('scroll',(event) => {
        if (document.documentElement.scrollTop || document.body.scrollTop >= scrollDistance) {
          utils.forEach(points, this.revealPoint);
          arrowElement.style.opacity = 0;
        }
      });
    }
  }

  // function to display a point element
  revealPoint(point) {
    point.style.opacity = 1;
    point.style.transform = "scaleX(1) translateY(0)";
    point.style.msTransform = "scaleX(1) translateY(0)";
    point.style.WebkitTransform = "scaleX(1) translateY(0)";
  }
}

export default Landing;

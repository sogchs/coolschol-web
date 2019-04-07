import React, { Component } from 'react';

class Chronometer extends Component{

  state = {
    startTS: null,
    diff: null,
    suspended: 0,
    interval: null
  }

  // componentDidMount(){
  //   window.addEventListener('keydown', this.onKeyDown);
  // }

  onKeyDown = (evt) =>{
    evt.preventDefault();
    // start|stop on [space]
    evt.keyCode === 32 && this[!this.state.startTS ? 'start' : 'stop']();
    // reset on [escape]
    evt.keyCode === 27 && this.reset();
  }

  start = () => {
    if (this.state.startTS) {
      // prevent multi clicks on start
      return;
    }
    this.setState({
      startTS: +new Date() - this.state.suspended,
      interval: requestAnimationFrame(this.tick),
      suspended: 0
    });
  }

  stop = () => {
    cancelAnimationFrame(this.state.interval);
    this.setState({
      startTS: null,
      suspended: +this.state.diff
    });
  }

  reset = () => {
    cancelAnimationFrame(this.state.interval);
    this.setState({
      startTS: null,
      diff: null,
      suspended: 0,
      interval: null});
  }

  tick = () => {
    this.setState({
      diff: new Date(+new Date() - this.state.startTS),
      interval: requestAnimationFrame(this.tick)
    });
  }

  addZero = (n) => {
    return n < 10 ? '0' + n : n;
  }
  
  render(){

    const diff = this.state.diff;
    const hundredths = diff ? Math.round(this.state.diff.getMilliseconds()/10) : 0;
    const seconds = diff ? this.state.diff.getSeconds() : 0;
    const minutes = diff ? this.state.diff.getMinutes() : 0;

    //if (hundredths === 100) hundredths = 0;

    return(
      <section className="chronometer">
        <h1 className="numbers-chronometer">{this.addZero(minutes)}:{this.addZero(seconds)}:{this.addZero(hundredths)}</h1>
        <div className="buttons-chronometer">
          <button onClick={this.start} className="text-info">start</button>
          <button onClick={this.stop} className="text-info">stop</button>
          <button onClick={this.reset}>reset</button>
        </div>
    </section>
    )
  }
}

export default Chronometer;

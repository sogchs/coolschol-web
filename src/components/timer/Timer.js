import React, { Component } from 'react';
import { Collapse, Button, ButtonGroup } from 'react-bootstrap';
import Chronometer from './Chronometer';
import Countdown from './Countdown';

class Timer extends Component{

  state = {
    show: false,
    chronometer: false,
    countdown: true,
  }


  render(){
    const { chronometer, countdown } = this.state;

    return(
      
      <div className="container-timer">
        <ButtonGroup className="btn-group-timer">
        <Button
          onClick={() => this.setState({ countdown: true, chronometer: false })}
          aria-controls="collapse-countdown"
          aria-expanded={countdown}
          variant="outline-secondary"
        >
          Countdown
        </Button>
        <Button
          onClick={() => this.setState({ chronometer: true, countdown: false })}
          aria-controls="collapse-chronometer"
          aria-expanded={chronometer}
          variant="outline-secondary"
        >
          Chronometer
        </Button>
      </ButtonGroup>
      <Collapse in={this.state.countdown}>
        <div id="collapse-countdown" className="collapse-c">
          <Countdown />
          
        </div>
        
      </Collapse>
      <Collapse in={this.state.chronometer}>
        <div id="collapse-chronometer" className="collapse-c">
          <Chronometer />
        </div>
      </Collapse>
    </div>
    )
  }
}

export default Timer;




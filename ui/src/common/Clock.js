import React, {Component} from 'react';

class Clock extends Component {
  state = {
    time: new Date()
  };

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      time: new Date()
    });
  }

  render() {
    const options = { hour12: false };
    return (
        <div>
          {this.state.time.toLocaleTimeString('pl-PL', options)}
        </div>
    );
  }
}

export default Clock;

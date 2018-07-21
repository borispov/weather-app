import React, { Component } from 'react';
import './Timer.css'

export default class Timer extends Component {

  state = {
    time: '',
  }

  check = (i) => i < 10 ? (i = '0' + i) : i;
  
  timer = () => {
    let t = new Date();
    let h = t.getHours();
    let m = t.getMinutes();
    let s = t.getSeconds();
    h = this.check(h);
    m = this.check(m);
    s = this.check(s);
    let time = `${h} ${m} ${s}`;
    return time;
  }

  componentDidMount() {
    let d = this.timer();
    this.setState({time: d});
  }

  render() {
    setTimeout(() => {
      let d = this.timer();
      this.setState({ time: d })
    }, 1000);

    return (
      <div>
        <h1 className="timer">{this.state.time}</h1>
      </div>
    )
  }
}

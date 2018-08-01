import React, { Component } from 'react';
import './App.css';
import Form from '../components/Input/Input';
import Forecast from '../components/Forecast/Forecast';
import Timer from '../components/Timer/Timer';

class App extends Component {

  state = {
    input: '',
    search: '',
  } 

  submitHandler = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    let city = data.get('city');
    this.setState({ search: city })
    event.target.reset();
  }

  shouldComponentUpdate(nextProps, nextState) {
   if (this.state.search !== nextState.search) {
     return true;
   } else {
     return false;
   }
  }

  render() {
    return (
      <div className="App">
        <Timer />
        <Forecast cityName={this.state.search}  />
        <br/>
        {/* <p className="cityName">{this.state.search}</p> */}
        <Form click={this.submitHandler} />
      </div>
    );
  }
}

export default App;

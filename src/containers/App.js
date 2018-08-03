import React, { Component } from 'react';
import './App.css';
import Form from '../components/Input/Input';
import Forecast from '../components/Forecast/Forecast';
import Timer from '../components/Timer/Timer';

class App extends Component {

  state = {
    input: '',
    search: '',
    error: '',
  } 

  handleError = (errMsg = null) => {
    this.setState({ error: errMsg })
    this.forceUpdate();
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
        <Forecast cityName={this.state.search} passErrorMsg={this.handleError} />
        <br/>
        {/* <p className="cityName">{this.state.search}</p> */}
        <Form click={this.submitHandler} error={this.state.error} />
      </div>
    );
  }
}

export default App;

import React from 'react';
import fetchapi from '../../api';
import ForecastView from './ForecastView/ForecastView';
import './Forecast.css'
import moment from 'moment';

class Forecast extends React.Component {
  state = {
    loading: false,
    forecast: [],
    cityName: this.props.cityName,
  }
  
  componentDidMount() {
    this.getForecastData(this.props.cityName);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.cityName !== nextProps.cityName || !this.state.forecast.length) {
      const cityName = nextProps.cityName;
      this.setState(() =>{return {cityName: cityName}})
      this.setState({cityName: nextProps.cityName})
      console.log(nextProps.cityName)
      this.getForecastData(nextProps.cityName);
      return true;
    }
    return false;
  }

  async getForecastData(city) {
    const result = await fetchapi(city || this.state.cityName)
    this.setState({
      loading: false,
      forecast: result.map(day => ({
        date: moment.utc(day.dt * 1000).format('dddd Do'),
        temp: day.main.temp.toFixed(1),
        humidity: day.main.humidity,
        weather: day.weather[0],
      }))
    });
    this.forceUpdate();
  }

  render() {

    return (
      <div className="forecast" >
        {
        this.state.forecast.length ? (
          <div className="forecaster">
            {this.state.forecast.map((item, index) => 
              (index < 5) && ( 
              <ForecastView className={`day${index+1}`}
                key={item.date + '_' + index} 
                loading={this.state.loading}
                date={item.date}
                temp={item.temp}
                humidity={item.humidity}
                weather={item.weather.id}  
              />)
            )}
          </div>
        ) : null
        }
      </div>
    )
  }
}

export default Forecast;
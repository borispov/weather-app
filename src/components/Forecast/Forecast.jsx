import React from 'react';
import { getLocation, reqByCity } from "../../api";
import ForecastView from './ForecastView/ForecastView';
import './Forecast.css'
import moment from 'moment';

class Forecast extends React.Component {

  state = {
    location: {
      lat: null,
      lon: null,
    },
    loading: false,
    forecast: [],
    current: [],
    cityName: this.props.cityName,
  }
  
  componentDidMount() {
    this.geoPosition()
  }

  geoPosition = () => {
    console.log('geoPOsition)')
    this.setState({loading: true})
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState(prevState => ({
          location: {
            ...prevState.location,
            lat: position.coords.latitude.toFixed(2),
            lon: position.coords.longitude.toFixed(2),
          }
        }))
      }
    )
  }

  async fetchCurrent(lat, lng) {
    getLocation(lat, lng)
    .then(data => {
      const result = data
      this.filterFetchedData(result);
      if (result !== undefined) this.forceUpdate();
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.cityName !== nextProps.cityName) {
      const cityName = nextProps.cityName
      this.setState(prevState => ({ cityName: cityName }))
      this.getForecastData(cityName)
      return true
    } 
    else if (nextState.location.lat !== this.state.location.lat) {
      const { lat, lon } = nextState.location
      this.fetchCurrent(lat, lon)
      return true
    }
    return false
  }

  async getForecastData(city) {
    let result;
    if (city) {
      result = await reqByCity(city)
      this.filterFetchedData(result);
    } 
    this.forceUpdate();
  }

  filterFetchedData = (result) => {
    result !== undefined && this.setState({
      loading: false,
      place: result.city_name + ', ' + result.country_code,
      forecast: result.data.map(day => ({
        date: moment.utc(day.ts * 1000).format("MMM Do dddd"),
        temp_max: day.max_temp,
        temp_min: day.min_temp,
        humidity: day.rh,
        weather: day.weather
      }))
    });
  }

  render() {
    console.log(this.state.location)
    return (
      <React.Fragment >
        <div className="forecast" >
          {
          this.state.forecast.length ? (
            <React.Fragment>
            <h1 style={{color: 'whitesmoked'}} className="forecaster__location">{this.state.place}</h1>
              <div className="forecaster">
                {this.state.forecast.map((item, index) => 
                  (index < 5) && ( 
                  <ForecastView className={`day${index+1}`}
                    key={item.date + '_' + index} 
                    loading={this.state.loading}
                    place={item.place}
                    date={!index ? 'Today' : item.date}
                    temp_max={item.temp_max}
                    temp_min={item.temp_min}
                    humidity={item.humidity}
                    weather={item.weather.code}  
                  />)
                )}
              </div>
            </React.Fragment>
          ) : null
          }
        </div>
      </React.Fragment>
    )
  }
}

export default Forecast;
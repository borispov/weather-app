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
    errorMessage: '',
  }
  
  componentDidMount() {
    this.geoPosition()
  }

  geoPosition = () => {
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

  handleErrorMsg = (msg) => {
    this.props.passErrorMsg(msg)
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
      if (this.state.location.lat !== null) {return false}
      const { lat, lon } = nextState.location
      this.fetchCurrent(lat, lon)
      return true
    }
    return false
  }

  async getForecastData(city) {
    // function to handle Wrong Cities In The Input
    const handleWrongInput = () => {
      let errorMessage = 'Invalid City, Please Insert Correct City';
      this.setState({ errorMessage })
    }

    let result; // store the fetch values here. 
    if (city) {
      result = await reqByCity(city)
      if (typeof result === "object") {
        this.filterFetchedData(result)
        this.setState({ errorMessage: null})
        this.forceUpdate()
      }
      typeof result === 'string' && handleWrongInput()
    } 
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

    this.state.errorMessage ? this.handleErrorMsg(this.state.errorMessage) : this.handleErrorMsg(null);

    return <React.Fragment>
        <div className="forecast">
          {this.state.forecast.length ? <React.Fragment>
              <h1 style={{ color: "whitesmoked" }} className="forecaster__location">
                {this.state.place}
              </h1>
              <div className="forecaster">
                {this.state.forecast.map(
                  (item, index) =>
                    index < 5 && (
                      <ForecastView
                        className={`day${index + 1}`}
                        key={item.date + "_" + index}
                        loading={this.state.loading}
                        place={item.place}
                        date={!index ? "Today" : item.date}
                        temp_max={item.temp_max}
                        temp_min={item.temp_min}
                        humidity={item.humidity}
                        weather={item.weather.code}
                      />
                    )
                )}
              </div>
            </React.Fragment> : null}
        </div>
      </React.Fragment>;
  }
}

export default Forecast;
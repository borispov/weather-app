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

  // get user's geolocation and set it to the state. 
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

  // method to fetch Weather with user's current location, 
  // the purpose is to show data before the user searches for anything. 
  async fetchCurrent(lat, lng) {
    getLocation(lat, lng)
    .then(data => {
      const result = data
      this.filterFetchedData(result);
      if (result !== undefined) this.forceUpdate();
    })
  }

  // Somewhat complicated shouldComponentUpdate List.. will try to refactor it later. bh                                                                                                                                                                                                                                bgit
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.cityName !== nextProps.cityName) {
      const cityName = nextProps.cityName
      this.setState(prevState => ({ cityName: cityName }))
      this.getForecastData(cityName)
      if (this.state.errorMessage) return false
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
    const handleWrongInput = async () => {
      let errorMessage = 'Invalid City, Please Insert Correct City';
      console.log(errorMessage)
      await this.setState({ errorMessage })

      //handle the Error to the Parent Component, Which passed it to the Input Component
      this.handleErrorMsg(errorMessage) 
    }

    let result; // store the fetch values here. 
    if (city) {
      result = await reqByCity(city)
      if (typeof result === "object") {
        this.filterFetchedData(result)
        this.setState({ errorMessage: null})
        // Let the Input Component Know that there is no error to show. pass null.
        this.handleErrorMsg(null)
        this.forceUpdate()
      }
      // if result contains a 'string', it means an Error occured typing wrong City. 
      typeof result === 'string' && handleWrongInput()
    } 
  }

  filterFetchedData = (result) => {
    result !== undefined && this.setState({
      loading: false,
      place: result.city_name + ', ' + result.country_code,
      forecast: result.data.map(day => ({
        date: moment.utc(day.ts * 1000).format("MMM Do dddd"),
        temp_max: day.max_temp.toFixed(0),
        temp_min: day.min_temp.toFixed(0),
        humidity: day.rh,
        weather: day.weather
      }))
    });
  }

  render() {
    return <React.Fragment>
        <div className="forecast">
        {/* check if this.state.forecast contains the array of data fetched, if yes, render it.  */}
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
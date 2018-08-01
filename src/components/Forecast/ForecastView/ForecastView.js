import React from 'react';
import './ForecastView.css';
import './owf/css/owfont-regular.css';
import './weather-icons-master/css/weather-icons.css';

const forecastView = props => (
  <div className={props.classname}>
    <div className="ForecastView__weather">
      <p>
        <span className="date">{props.date}</span>
      </p>
      <p className="temps">
        <span
          className="wi wi-thermometer"
          style={{ fontSize: "24px", paddingLeft: '-15px', paddingRight: "15px", opacity: '0.5' }}
        />
        <span className="ForecastView__weather__temp-high">
          {props.temp_max}
        </span>
        <span className="ForecastView__weather__temp-min">
          {props.temp_min}
        </span>
      </p>
      <p>
        Humidity: <span className="desc">{props.humidity}%</span>
      </p>
      <div>
        <i className={`wi wi-owm-${props.weather}`} />
      </div>
    </div>
  </div>
);

export default forecastView
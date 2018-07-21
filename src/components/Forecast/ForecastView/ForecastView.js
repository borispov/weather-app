import React from 'react';
import './ForecastView.css';
import './owf/css/owfont-regular.css';

const forecastView = props => (

  <div className={props.classname}>
    <div className="ForecastView__weather">
      <p><span className="date">{props.date}</span></p>
      <p>Temp: <span className="desc">{props.temp} &#8451;</span></p>
      <p>Humidity: <span className="desc">{props.humidity}%</span></p>
      <div className={`owf owf-${props.weather}`} style={{fontSize: '72px', color: 'white'}}></div>
    </div>
  
  </div>
)

export default forecastView
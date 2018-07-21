import React from 'react'; 

const desc = props => {
  return (
    <div className="description">
      <p className="description__para">{props.date}</p>
      <p className="description__para">{props.temp}</p>
      <p className="description__para">{props.humidity}</p>
      <p className="description__para">{props.weather}</p>
    </div>
  )
}

export default desc;
import React from 'react'; 
import './Input.css';

const input = props => {
  return (
    <div>
      <form onSubmit={props.click} className="search-form" action="">
        <input name="city" className="search-form__input" type="text" autoComplete="off" autoFocus="true"/>
        <br/>
        <button className="search-form__button">Get Forecast!</button>
      </form>
    </div>
  )
}

export default input;
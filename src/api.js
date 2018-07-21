import moment from 'moment';
const BASE_URL = "http://api.openweathermap.org/data/2.5/forecast?";
const API_KEY = "72d5271adda69d920581266b4f58bfa4";

const reqByCity = (city = 'London') => {
  let qFill = `q=${city || 'London'}&units=metric&appid=`;
  let url = BASE_URL + qFill + API_KEY;

  return fetch(url)
  .then((response) => (
    response.json()
      .then(json => ({json, response}))
      .catch(() => ({ json: {}, response}))
  ))
  .then(({ json, response}) => {
    if ( response.ok === 'false') throw json
    console.log(json);
    let currentTime = json.list[0].dt_txt.slice(11);
    let timeIsLate = false;
    Number(currentTime.slice(0,2)) >= 21 ? timeIsLate = true : timeIsLate = false;
    
    let weather = json.list.filter((day, index) => {
      return timeIsLate ? (index === 0 ? day.dt_txt.indexOf(currentTime) !== -1 : day.dt_txt.indexOf('15:00:00') !== -1) : day.dt_txt.indexOf(currentTime) !== -1;
    })
    return weather
  })
}

export default reqByCity;
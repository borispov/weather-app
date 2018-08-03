import axios from 'axios'

const BASE_URL = `https://api.weatherbit.io/v2.0/forecast/daily?`
const API_KEY = '904353f24dcf48fcac3795521e1259b9'

export const reqByCity = (city) => {
  let url = `${BASE_URL}city=${city}&days=5&key=${API_KEY}`
  return axios.get(url)
    .then((response, error) => {
      if (error) {
        console.log(error)
      }
      return response.data
    })
    .catch(e => { console.log(e) })
}

export function getLocation(lat, lon) {
  let geoStats = `lat=${lat}&lon=${lon}&days=5&key=`
  let url = BASE_URL + geoStats + API_KEY
  return axios.get(url)
  .then(data => data.data)
  .catch(e => console.log(e) )
}
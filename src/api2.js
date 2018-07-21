const BASE_URL = "https://api.openweathermap.org/data/2.5/forecast?";
const API_KEY = "72d5271adda69d920581266b4f58bfa4";
const defaultCity = 'London';

const fetchapi = (city = defaultCity) => {
  let qFill = `q=${city}&units=metric&appid=`;
  let url = BASE_URL + qFill + API_KEY;

  return fetch(url)
  .then((response) => (
    response.json()
      .then(json => ({json, response}))
      .catch(() => ({ json: {}, response }))
  ))
  // next is the receiving of the Object from the API 
  .then(({ json, response }) => {
    // if response is not 200 , throw json as Error
    if (response.ok === false) {
      throw json;
    }
    // return the object.
    return json;
  })
  // Error Handling 
  .catch((e) => {
    if (e.response && e.response.json) {
      return e.response.json().then((json) => {
        if ( json ) throw json;
        throw e
      });
    } else {
      throw e;
    }
  });
}

export default fetchapi;
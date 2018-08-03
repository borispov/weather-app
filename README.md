[https://raypo-weather.herokuapp.com/]

A simple weather app built with React for practice & studying purposes. 

Initially I went with OpenWeatherMap API, but achieving what I want with no 5 days forecast (without 3hourly) wasn't free, 
I chose Wetherbit.io API, the problem here was the API request limitation, My app broke because I was sending way too many requests.
I basically messed up the code and was re-rendering and executing the fetching function. yet, the API is limited to 1,000 requests per day.


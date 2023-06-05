import './css/style.css'
import * as apiFunction from './apiFunction'

let search = document.querySelector("#search");
let search_icon = document.querySelector("#search-icon")

search_icon.addEventListener('click', getWeatherData)


async function processWeatherData(location){
    let weatherData = await apiFunction.getForecast(location)
    let result = {
        "location": [weatherData.location.name, weatherData.location.country],
        "curr":{
            "condition": weatherData.current.condition.text,
            "temp": weatherData.current.temp_c,
            "feels_like": weatherData.current.feelslike_c,
            "humidity": weatherData.current.humidity,
            "visibility": weatherData.current.vis_km,
            "wind": weatherData.current.wind_kph,
            "min_temp": weatherData.forecast.forecastday["0"].day.mintemp_c,
            "max_temp": weatherData.forecast.forecastday["0"].day.maxtemp_c
        },
        "hour":[]
    }
    for(let index=0; index<24; index++){
        let hourData = {}
        hourData.time= weatherData.forecast.forecastday["0"].hour[index].time;
        hourData.temp= weatherData.forecast.forecastday["0"].hour[index].temp_c;
        hourData.rain= weatherData.forecast.forecastday["0"].hour[index].chance_of_rain;
        hourData.condition= weatherData.forecast.forecastday["0"].hour[index].condition.text;

        result.hour.push(hourData)
    }
    return result;
}

async function getWeatherData(){
    let location = search.value
    let weatherData = await processWeatherData(location)
    console.log(weatherData);
}





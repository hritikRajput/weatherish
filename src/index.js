import './css/style.css'
import * as apiFunction from './apiFunction'



async function processWeatherData(location){
    let weatherData = await apiFunction.getForecast(location)
    let result = {
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

async function getWeatherData(location){
    let weatherData = await processWeatherData(location)
    console.log(weatherData);
}
getWeatherData("kanpur")
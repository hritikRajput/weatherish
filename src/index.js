import './css/style.css'
import * as apiFunction from './apiFunction'
import * as UI from './UI'


let search = document.querySelector("#search");
let search_icon = document.querySelector("#search-icon")

search_icon.addEventListener('click', getWeatherData)

let initialLoad = true;


async function processWeatherData(location){
    let weatherData = await apiFunction.getForecast(location)
    let result = {
        "location": [weatherData.location.name, weatherData.location.country],
        "curr":{
            "localtime": weatherData.location.localtime,
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
    let nextHours = []
    for(let day=0; day<2; day++){
        for(let index=0; index<24; index++){
        let hourData = {}
        hourData.time= weatherData.forecast.forecastday[`${day}`].hour[index].time;
        hourData.temp= weatherData.forecast.forecastday[`${day}`].hour[index].temp_c;
        hourData.rain= weatherData.forecast.forecastday[`${day}`].hour[index].chance_of_rain;
        hourData.condition= weatherData.forecast.forecastday[`${day}`].hour[index].condition.text;

        nextHours.push(hourData)
    }
}
    let currIndex = parseInt(result.curr.localtime.slice(11,13))
    
    for(let i=currIndex+1; i<=(currIndex+24); i++){
        result.hour.push(nextHours[i])
    }
   
    return result;
}

async function getWeatherData(){
    let location = "mumbai";
   if(initialLoad){
    initialLoad=false;
   }
   else{
    location = search.value;
    UI.clearUI()
   }
    
    
    let weatherData = await processWeatherData(location)
    UI.updateWeatherUI(weatherData)
}
getWeatherData()






import './css/style.css'
import * as apiFunction from './apiFunction'
import * as UI from './UI'

//text input to search city
let search = document.querySelector("#search");
//search icon next to search box
let searchIcon = document.querySelector("#search-icon")

// hide data labels until the data has loaded
document.querySelector('body').style.visibility = 'hidden';

// city is searched using search icon or enter key in search
searchIcon.addEventListener('click', ()=>{
    getWeatherData();
})
search.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      getWeatherData();
    }
  });

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

async function getWeatherData(initialLoad=false){
    try{
        let location;
    if(initialLoad){
        location="Delhi";
    }
    else{
        location = search.value;
        console.log(location)
    }
    // remove error msg if previous search succeed
    document.querySelector('.error-msg').style.visibility = 'hidden';

   
    let weatherData = await processWeatherData(location)
    UI.clearUI();
    UI.updateWeatherUI(weatherData)

    //set the body to visible which was set hidden initially
    document.querySelector('body').style.visibility = 'visible';
    }
    catch (err) {
        // display input search error to user if the searched location does not return
        // any weather data
        document.querySelector('.error-msg').style.visibility = 'visible';
      }

    //clear search input
    document.querySelector('#search').value = '';
    
}

//initial load 
getWeatherData(initialLoad)






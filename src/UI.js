let currentWeatherContainer = document.querySelector(".currentWeatherContainer")
let hourlyWeatherContainer = document.querySelector(".hourlyWeatherContainer")

function updateWeatherUI(weatherData){
    console.log(weatherData)
    let condition = weatherData.curr.condition;
    let temp = weatherData.curr.temp;
    let mintemp = weatherData.curr.min_temp;
    let maxtemp= weatherData.curr.max_temp;
    let location = weatherData.location["0"] + ", " + weatherData.location["1"];
    let feelsLike = weatherData.curr.feels_like;
    let humidity = weatherData.curr.humidity;
    let visibility = weatherData.curr.visibility;
    let windSpeed = weatherData.curr.wind;
    let time = weatherData.curr.localtime;
    let hour = weatherData.hour;

    // 2 section ---- hourly, currentWeather-- TempInfo ExtraInfo
    let tempInfoContainer = createTempInfo(condition, location, time, temp, mintemp, maxtemp);
    currentWeatherContainer.append(tempInfoContainer)
    let extraInfoContainer = createExtraInfo(feelsLike, humidity, visibility, windSpeed)
    currentWeatherContainer.append(extraInfoContainer)
    let hourlyInfoContainer = createHourlyInfo(hour)
    hourlyWeatherContainer.append(hourlyInfoContainer)
}

function createTempInfo(condition, location, time, temp, mintemp, maxtemp){
    const tempInfoContainer = document.createElement("div");
    tempInfoContainer.className = "tempInfoContainer"
    const currentCondition = document.createElement("p");
    const currentCity = document.createElement("p");
    const currentTime = document.createElement("p");
    const currentTemp = document.createElement("p");
    const minmaxTemp = document.createElement("p");

    currentCondition.textContent=condition;
    currentCity.textContent=location;
    currentTime.textContent=time;
    currentTemp.textContent=`${temp} \xB0C`;
    minmaxTemp.textContent = `${mintemp}/${maxtemp} \xB0C`;

    tempInfoContainer.appendChild(currentCondition)
    tempInfoContainer.appendChild(currentCity)
    tempInfoContainer.appendChild(currentTime)
    tempInfoContainer.appendChild(currentTemp)
    tempInfoContainer.appendChild(minmaxTemp)

    return tempInfoContainer;
}

function createExtraInfo(feelsLike, humidity, visibility, windSpeed){
    const extraInfoContainer = document.createElement("div");
    extraInfoContainer.className = "extraInfoContainer"
    const feelsLikeEl = document.createElement("p");
    const humidityEl = document.createElement("p");
    const visibilityEl = document.createElement("p");
    const windSpeedEl = document.createElement("p");

    feelsLikeEl.textContent = `${feelsLike} \xB0C`;
    humidityEl.textContent = `${humidity} \u0025`;
    visibilityEl.textContent= `${visibility} \u0025`;
    windSpeedEl.textContent= `${windSpeed} km/h`;

    extraInfoContainer.append(feelsLikeEl)
    extraInfoContainer.append(humidityEl)
    extraInfoContainer.append(visibilityEl)
    extraInfoContainer.append(windSpeedEl)

    return extraInfoContainer;
}

function createHourlyInfo(hour){
    const hourlyInfoContainer = document.createElement("div");
    hourlyInfoContainer.className = "hourlyInfoContainer"

    for(let i=0; i<24; i++){
        const div = document.createElement("div");
        div.className="hour"
        const time = document.createElement("p");
        const temp = document.createElement("p");
        time.textContent=`${hour[i].time.slice(11,16)}`;
        temp.textContent=`${hour[i].temp} \xB0C`;
        div.append(time);
        div.append(temp);

        hourlyInfoContainer.append(div);
    }
    


    return hourlyInfoContainer;
}

function clearUI(){
    while (currentWeatherContainer.firstChild) {
        currentWeatherContainer.removeChild(currentWeatherContainer.lastChild);
      }
    while (hourlyWeatherContainer.firstChild) {
        hourlyWeatherContainer.removeChild(hourlyWeatherContainer.lastChild);
      }
      
      
   
}


export {updateWeatherUI, clearUI}